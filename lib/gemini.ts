import { GoogleGenAI, Type, Modality } from "@google/genai";

// This is a browser environment, but we are polyfilling process.env via a build script
// for secure API key handling on deployment platforms.
declare global {
  interface Window {
    process: {
      env: {
        API_KEY: string;
      }
    }
  }
}

const apiKey = window.process?.env?.API_KEY;

// Ensure the API key is available from the environment variables
if (!apiKey) {
  throw new Error("API_KEY environment variable not set. Please set it in your deployment environment (e.g., Netlify, Vercel).");
}

const ai = new GoogleGenAI({ apiKey });

// --- TYPE DEFINITIONS for Level Data ---
interface Vector2 { x: number; y: number; }
interface GameObject { x: number; y: number; width: number; height: number; }
interface MovingPlatform extends GameObject {
    moveType: 'horizontal' | 'vertical';
    moveRange: number;
}

export interface LevelData {
  gameType: 'platformer' | 'maze' | 'falling-dodger';
  playerStart: Vector2;
  platforms: GameObject[]; // Also used as walls for maze
  goals: Vector2[];
  hazards: GameObject[];
  movingPlatforms?: MovingPlatform[];
}


const levelSchema = {
    type: Type.OBJECT,
    properties: {
        gameType: {
            type: Type.STRING,
            description: "The type of game detected. Can be 'platformer', 'maze', or 'falling-dodger'.",
            enum: ['platformer', 'maze', 'falling-dodger']
        },
        playerStart: {
            type: Type.OBJECT,
            description: "The starting coordinates of the player character, derived from the green element.",
            properties: {
                x: { type: Type.NUMBER, description: "X coordinate as a percentage of canvas width." },
                y: { type: Type.NUMBER, description: "Y coordinate as a percentage of canvas height." },
            },
        },
        platforms: {
            type: Type.ARRAY,
            description: "For 'platformer', these are solid ground. For 'maze', these are impassable walls. For 'falling-dodger', this is usually empty.",
            items: {
                type: Type.OBJECT,
                properties: {
                    x: { type: Type.NUMBER, description: "Top-left X coordinate as a percentage of canvas width." },
                    y: { type: Type.NUMBER, description: "Top-left Y coordinate as a percentage of canvas height." },
                    width: { type: Type.NUMBER, description: "Width as a percentage of canvas width." },
                    height: { type: Type.NUMBER, description: "Height as a percentage of canvas height." },
                },
            },
        },
        goals: {
            type: Type.ARRAY,
            description: "A list of all goal items (collectibles/power-ups), derived from the blue shapes.",
            items: {
                type: Type.OBJECT,
                properties: {
                    x: { type: Type.NUMBER, description: "Center X coordinate as a percentage of canvas width." },
                    y: { type: Type.NUMBER, description: "Center Y coordinate as a percentage of canvas height." },
                },
            },
        },
        hazards: {
            type: Type.ARRAY,
            description: "A list of all hazards, derived from the red shapes.",
            items: {
                type: Type.OBJECT,
                properties: {
                    x: { type: Type.NUMBER, description: "Top-left X coordinate as a percentage of canvas width." },
                    y: { type: Type.NUMBER, description: "Top-left Y coordinate as a percentage of canvas height." },
                    width: { type: Type.NUMBER, description: "Width as a percentage of canvas width." },
                    height: { type: Type.NUMBER, description: "Height as a percentage of canvas height." },
                },
            },
        },
        movingPlatforms: {
            type: Type.ARRAY,
            description: "A list of all moving platforms, derived from the purple shapes (for platformers only).",
            items: {
                type: Type.OBJECT,
                properties: {
                    x: { type: Type.NUMBER, description: "Initial top-left X coordinate as a percentage of canvas width." },
                    y: { type: Type.NUMBER, description: "Initial top-left Y coordinate as a percentage of canvas height." },
                    width: { type: Type.NUMBER, description: "Width as a percentage of canvas width." },
                    height: { type: Type.NUMBER, description: "Height as a percentage of canvas height." },
                    moveType: { type: Type.STRING, description: "Movement axis, either 'horizontal' or 'vertical', based on shape." },
                    moveRange: { type: Type.NUMBER, description: "Movement distance as a percentage of canvas dimension." }
                },
                required: ["x", "y", "width", "height", "moveType", "moveRange"]
            },
        },
    },
    required: ["gameType", "playerStart", "platforms", "goals", "hazards"],
};


const systemInstruction = `
You are a creative and helpful game engine that converts a child's drawing into a playable 2D game level. Your main goal is to always produce a fun, complete, and playable level, even if the drawing is sparse or incomplete.

First, analyze the overall structure of the drawing to determine the game type.
- If the drawing consists of many red hazard shapes near the top and a green player start near the bottom with very few or no platforms, classify the gameType as 'falling-dodger'.
- If the drawing consists of many interconnected black lines forming paths and corridors, classify the gameType as 'maze'.
- Otherwise, if the drawing consists of separate, flat surfaces that look like platforms for jumping on, classify the gameType as 'platformer'.

Then, identify the game elements based on their color.
- DARK SLATE (#475569) elements are static platforms (for 'platformer') or impassable walls (for 'maze').
- GREEN (#22C55E) elements represent the player's starting position. Find the center of the green object.
- BLUE (#3B82F6) elements are goals (collectibles in 'platformer', the exit in 'maze', or power-ups in 'falling-dodger'). Find the center of each blue object.
- RED (#EF4444) elements are hazards the player must avoid.
- PURPLE (#A855F7) elements are moving platforms (only for 'platformer' type).
  - If a purple shape is wider than it is tall, its moveType should be 'horizontal'.
  - If it is taller than it is wide, its moveType should be 'vertical'.
  - Set its moveRange to be a sensible value, like 30.

**CRITICAL RULE: PLAYABILITY ANALYSIS**
Before finalizing the level data, you MUST perform a mental play-through to ensure the level is winnable.
- For a 'platformer', trace a path from the player start. Can the player realistically jump between platforms to reach the goal(s)? If a jump is impossible, adjust the platform position to make it possible.
- For a 'maze', you must trace a path from the player start to the goal. This path must be wide enough for the player character to fit through at all points. Imagine the player is a small square; the corridors must be wider than this square. If any part of the path is too narrow, you must adjust the wall positions ('platforms') to create a clear, navigable corridor. There must be a guaranteed, completable route from start to finish.
- For a 'falling-dodger', ensure the density of hazards is challenging but survivable for a reasonable amount of time.
- The level MUST always be completable by the player.

**IMPORTANT RULES FOR ROBUSTNESS:**
- **Always create a playable level.** If the drawing seems sparse, create a simple but complete level based on the user's intent.
- For a 'platformer', ensure there's at least one platform and at least one goal that is reachable. If no platforms are drawn, create a simple ground platform.
- For a 'maze', if there is no goal, add one in a reachable location.
- For a 'falling-dodger', if there are no hazards, add a few simple ones falling from the top.
- If the player start (green) is missing, place it at a logical starting point: {x: 10, y: 80} for platformers, {x: 5, y: 5} for mazes, or {x: 50, y: 90} for falling-dodgers.
- If a color is missing for an optional element, return an empty array for that element type.

Your response MUST be a valid JSON object that strictly adheres to the provided schema.
All coordinates and dimensions must be percentages of the total canvas size (0 to 100).
`;


export const generateLevelFromDrawing = async (imageBase64: string): Promise<LevelData> => {
    const imagePart = {
        inlineData: {
            mimeType: 'image/png',
            data: imageBase64,
        },
    };
    const textPart = {
        text: "Analyze this drawing and generate the level data based on the color-coded elements and overall structure."
    };

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: { parts: [imagePart, textPart] },
            config: {
                systemInstruction,
                responseMimeType: "application/json",
                responseSchema: levelSchema,
                temperature: 0.1,
            },
        });

        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);

        // Ensure optional fields are arrays if they don't exist
        if (!parsedJson.movingPlatforms) {
            parsedJson.movingPlatforms = [];
        }
        
        return parsedJson as LevelData;
    } catch (error) {
        console.error("Error generating level from drawing:", error);
        throw new Error("Failed to generate level from AI.");
    }
};


export const generateImageAsset = async (prompt: string): Promise<string> => {
  try {
    const fullPrompt = `A single, centered game asset of (${prompt}). The asset should be in a 2D style, suitable for a platformer game. It must have a transparent background.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: fullPrompt }],
      },
      config: {
          responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        return `data:image/png;base64,${base64ImageBytes}`;
      }
    }
    throw new Error("No image data found in response.");

  } catch (error) {
    console.error("Error generating image asset:", error);
    throw new Error("Failed to generate image asset from AI.");
  }
};