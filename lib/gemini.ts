import { GoogleGenAI, Type } from "@google/genai";

// FIX: Define PuzzleData and related types here instead of importing from a non-existent export in App.tsx.
export interface CrosswordData {
    title: string;
    size: number;
    grid: ({ number?: number; letter?: string } | null)[][];
    clues: {
        across: string[];
        down: string[];
    };
}

export interface WordSearchData {
    title: string;
    grid: string[][];
    words: string[];
}

export interface FillInTheBlanksData {
    title: string;
    questions: {
        question: string;
        answer: string;
    }[];
}

export interface MatchingData {
    title: string;
    pairs: {
        term: string;
        definition: string;
    }[];
}

export interface PuzzleData {
    crossword: CrosswordData;
    wordSearch: WordSearchData;
    fillInTheBlanks: FillInTheBlanksData;
    matching: MatchingData;
}


// --- Data Type Interfaces ---

export interface DragAndDropGameData {
    title: string;
    instruction: string;
    categories: string[];
    items: {
        text: string;
        category: string;
    }[];
}

export interface Mistake {
    incorrectText: string;
    correctText: string;
    explanation: string;
}

export interface FindTheMistakeData {
    title: string;
    instruction: string;
    challengeText: string;
    mistakes: Mistake[];
}

export interface SpeedRoundQuestion {
    questionText: string;
    options: string[];
    correctAnswer: string;
}

export interface SpeedRoundsData {
    title: string;
    instruction: string;
    questions: SpeedRoundQuestion[];
}

export interface StoryNode {
    storyText: string;
    question: string;
    options: {
        text: string;
        isCorrect: boolean;
        feedback: string;
    }[];
}

export interface StoryBasedChallengeData {
    title: string;
    introduction: string;
    nodes: StoryNode[];
    conclusion: string;
}

export interface ChallengeItem {
    type: 'Scenario' | 'Analogy';
    title: string;
    text: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
}

export interface ScenariosAndAnalogiesData {
    title: string;
    challenges: ChallengeItem[];
}

export interface OutsideTheBoxData {
    title: string;
    problemStatement: string;
    hints: string[];
    solutionExplanation: string;
}

export interface AdventureStage {
    description: string;
    companionDialogue: string;
    challenge: {
        question: string;
        options: string[];
        correctAnswer: string;
    };
    successResponse: string;
    failureResponse: string;
}

export interface MiniAdventureData {
    title: string;
    introduction: string;
    stages: AdventureStage[];
    conclusion: string;
}

export interface KnowledgeTrackerData {
    title: string;
    overallSummary: string;
    activitySummaries: {
        activity: string;
        skill: string;
    }[];
    reflectionPrompts: string[];
}

export interface AllGamesData {
    puzzles: PuzzleData;
    dragAndDrop: DragAndDropGameData;
    findTheMistake: FindTheMistakeData;
    speedRounds: SpeedRoundsData;
    storyBasedChallenge: StoryBasedChallengeData;
    scenariosAndAnalogies: ScenariosAndAnalogiesData;
    outsideTheBox: OutsideTheBoxData;
    miniAdventure: MiniAdventureData;
    knowledgeTracker: KnowledgeTrackerData;
}

// --- Knowledge Map Interfaces ---
export interface KnowledgeMapNode {
    id: string;
    label: string;
    summary: string;
    isCentral: boolean;
}

export interface KnowledgeMapEdge {
    from: string;
    to: string;
    label: string;
}

export interface KnowledgeMapData {
    nodes: KnowledgeMapNode[];
    edges: KnowledgeMapEdge[];
}

// --- Flashcard Interfaces ---
export interface Flashcard {
    front: string;
    back: string;
}

export interface FlashcardData {
    title: string;
    cards: Flashcard[];
}


// --- Schemas for Generation ---

const puzzleSchema = {
    type: Type.OBJECT,
    properties: {
        crossword: {
            type: Type.OBJECT,
            description: "A crossword puzzle with a grid, clues, and answers.",
            properties: {
                title: { type: Type.STRING },
                size: { type: Type.INTEGER, description: "The grid size, e.g., 10 for a 10x10 grid." },
                grid: {
                    type: Type.ARRAY,
                    description: "A 2D array representing the crossword grid. Use null for black squares and a number for the start of a clue.",
                    items: {
                        type: Type.ARRAY,
                        items: { type: Type.OBJECT, properties: { number: { type: Type.INTEGER }, letter: { type: Type.STRING } }, nullable: true }
                    }
                },
                clues: {
                    type: Type.OBJECT,
                    properties: {
                        across: { type: Type.ARRAY, items: { type: Type.STRING, description: "Clue format: '1. The clue text'" } },
                        down: { type: Type.ARRAY, items: { type: Type.STRING, description: "Clue format: '2. The clue text'" } }
                    }
                }
            }
        },
        wordSearch: {
            type: Type.OBJECT,
            description: "A word search puzzle with a grid of letters and a list of words to find.",
            properties: {
                title: { type: Type.STRING },
                grid: {
                    type: Type.ARRAY,
                    description: "A 2D array of letters.",
                    items: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                words: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
        },
        fillInTheBlanks: {
            type: Type.OBJECT,
            description: "A quiz with sentences where a key word is missing.",
            properties: {
                title: { type: Type.STRING },
                questions: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            question: { type: Type.STRING, description: "The sentence with '___' for the blank." },
                            answer: { type: Type.STRING }
                        }
                    }
                }
            }
        },
        matching: {
            type: Type.OBJECT,
            description: "An exercise to match terms with their definitions.",
            properties: {
                title: { type: Type.STRING },
                pairs: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            term: { type: Type.STRING },
                            definition: { type: Type.STRING }
                        }
                    }
                }
            }
        }
    }
};

const dragAndDropSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A creative title for the game." },
        instruction: { type: Type.STRING, description: "A simple instruction for the player." },
        categories: { 
            type: Type.ARRAY,
            description: "An array of exactly 3 category names.",
            items: { type: Type.STRING }
        },
        items: {
            type: Type.ARRAY,
            description: "An array of exactly 8 items to be categorized. Each item must belong to one of the defined categories.",
            items: {
                type: Type.OBJECT,
                properties: {
                    text: { type: Type.STRING, description: "The text of the draggable item." },
                    category: { type: Type.STRING, description: "The correct category name for this item." }
                }
            }
        }
    }
};

const findTheMistakeSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A creative title for the challenge." },
        instruction: { type: Type.STRING, description: "A simple instruction for the player." },
        challengeText: { type: Type.STRING, description: "A paragraph of text derived from the user's notes, but with 3 subtle factual errors intentionally introduced." },
        mistakes: {
            type: Type.ARRAY,
            description: "An array of objects detailing each mistake.",
            items: {
                type: Type.OBJECT,
                properties: {
                    incorrectText: { type: Type.STRING, description: "The exact word or phrase that is incorrect in the challenge text." },
                    correctText: { type: Type.STRING, description: "The correct word or phrase." },
                    explanation: { type: Type.STRING, description: "A brief explanation of why the original text was incorrect." }
                }
            }
        }
    }
};

const speedRoundsSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A creative title for the speed round." },
        instruction: { type: Type.STRING, description: "A simple instruction for the player about the timed quiz." },
        questions: {
            type: Type.ARRAY,
            description: "An array of exactly 8 multiple-choice questions.",
            items: {
                type: Type.OBJECT,
                properties: {
                    questionText: { type: Type.STRING, description: "The question to be asked." },
                    options: { 
                        type: Type.ARRAY,
                        description: "An array of 4 string options for the multiple-choice question.",
                        items: { type: Type.STRING }
                    },
                    correctAnswer: { type: Type.STRING, description: "The correct answer, which must be one of the provided options." }
                }
            }
        }
    }
};

const storyBasedChallengeSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A creative, adventurous title for the story." },
        introduction: { type: Type.STRING, description: "A short introductory paragraph to set the scene." },
        nodes: {
            type: Type.ARRAY,
            description: "An array of exactly 3 story nodes, each representing a step in the adventure.",
            items: {
                type: Type.OBJECT,
                properties: {
                    storyText: { type: Type.STRING, description: "The narrative text for this part of the story." },
                    question: { type: Type.STRING, description: "A multiple-choice question based on the user's notes to challenge the player." },
                    options: {
                        type: Type.ARRAY,
                        description: "An array of 3 or 4 options for the question.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                text: { type: Type.STRING, description: "The text of the choice." },
                                isCorrect: { type: Type.BOOLEAN, description: "Whether this choice is the correct answer." },
                                feedback: { type: Type.STRING, description: "Feedback to show the user after they select this option, explaining the consequence or correcting their knowledge." }
                            }
                        }
                    }
                }
            }
        },
        conclusion: { type: Type.STRING, description: "A concluding paragraph to wrap up the story after the final challenge." }
    }
};

const scenariosAndAnalogiesSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A creative title for this set of challenges." },
        challenges: {
            type: Type.ARRAY,
            description: "An array of exactly 3 challenges, mixing scenarios and analogies.",
            items: {
                type: Type.OBJECT,
                properties: {
                    type: { type: Type.STRING, description: "The type of challenge, either 'Scenario' or 'Analogy'." },
                    title: { type: Type.STRING, description: "A specific title for this challenge, e.g., 'A Real-World Scenario' or 'Analogy: The Solar System'." },
                    text: { type: Type.STRING, description: "The descriptive text for the scenario or analogy." },
                    question: { type: Type.STRING, description: "A multiple-choice question to test the user's understanding of the concept's application." },
                    options: {
                        type: Type.ARRAY,
                        description: "An array of 4 string options for the multiple-choice question.",
                        items: { type: Type.STRING }
                    },
                    correctAnswer: { type: Type.STRING, description: "The correct answer, which must be one of the provided options." },
                    explanation: { type: Type.STRING, description: "A brief explanation of why the correct answer is right, reinforcing the learning concept." }
                }
            }
        }
    }
};

const outsideTheBoxSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A creative and intriguing title for the problem." },
        problemStatement: { type: Type.STRING, description: "A paragraph describing a non-obvious, creative problem related to the user's text. It should require lateral thinking." },
        hints: {
            type: Type.ARRAY,
            description: "An array of 3 hints that progressively guide the user towards the solution without giving it away.",
            items: { type: Type.STRING }
        },
        solutionExplanation: { type: Type.STRING, description: "A detailed explanation of the creative solution and the thought process behind it." }
    }
};

const miniAdventureSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A whimsical title for the mini-adventure." },
        introduction: { type: Type.STRING, description: "An introductory paragraph that sets the scene for an adventure with a companion." },
        stages: {
            type: Type.ARRAY,
            description: "An array of exactly 3 stages for the adventure.",
            items: {
                type: Type.OBJECT,
                properties: {
                    description: { type: Type.STRING, description: "The narrative text describing this stage of the adventure." },
                    companionDialogue: { type: Type.STRING, description: "A short, encouraging, or curious line of dialogue for the user's companion." },
                    challenge: {
                        type: Type.OBJECT,
                        properties: {
                            question: { type: Type.STRING, description: "A multiple-choice question related to the user's notes, framed as a challenge in the story." },
                            options: {
                                type: Type.ARRAY,
                                description: "An array of 3 or 4 options for the question.",
                                items: { type: Type.STRING }
                            },
                            correctAnswer: { type: Type.STRING, description: "The correct answer, which must be one of the options." }
                        }
                    },
                    successResponse: { type: Type.STRING, description: "A short narrative text describing the positive outcome of answering correctly." },
                    failureResponse: { type: Type.STRING, description: "A short narrative text describing the consequence of answering incorrectly, which should still allow the story to progress." }
                }
            }
        },
        conclusion: { type: Type.STRING, description: "A concluding paragraph that wraps up the adventure and praises the user." }
    }
};

const knowledgeTrackerSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A creative title for the knowledge tracker page, like 'Your Learning Constellation'." },
        overallSummary: { type: Type.STRING, description: "A brief, encouraging summary of the key concepts found in the user's text." },
        activitySummaries: {
            type: Type.ARRAY,
            description: "An array of objects summarizing the skill tested by each activity type, based on the provided text.",
            items: {
                type: Type.OBJECT,
                properties: {
                    activity: { type: Type.STRING, description: "The name of the learning activity (e.g., 'Puzzles', 'Mini-Adventures')." },
                    skill: { type: Type.STRING, description: "The core skill this activity helps develop with this specific knowledge (e.g., 'Pattern Recognition', 'Narrative Application')." }
                }
            }
        },
        reflectionPrompts: {
            type: Type.ARRAY,
            description: "An array of 3 thoughtful, open-ended questions to prompt user reflection.",
            items: { type: Type.STRING }
        }
    }
};

const knowledgeMapSchema = {
    type: Type.OBJECT,
    properties: {
        nodes: {
            type: Type.ARRAY,
            description: "An array of concept nodes.",
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.STRING, description: "A unique, concise ID for the node (e.g., 'photosynthesis')." },
                    label: { type: Type.STRING, description: "The display label for the node (e.g., 'Photosynthesis')." },
                    summary: { type: Type.STRING, description: "A 1-2 sentence explanation of the concept." },
                    isCentral: { type: Type.BOOLEAN, description: "True if this is a primary topic, false otherwise." }
                },
                required: ["id", "label", "summary", "isCentral"],
            }
        },
        edges: {
            type: Type.ARRAY,
            description: "An array of edges connecting the nodes.",
            items: {
                type: Type.OBJECT,
                properties: {
                    from: { type: Type.STRING, description: "The ID of the starting node." },
                    to: { type: Type.STRING, description: "The ID of the ending node." },
                    label: { type: Type.STRING, description: "A short label describing the relationship (e.g., 'is part of')." }
                },
                required: ["from", "to", "label"],
            }
        }
    },
    required: ["nodes", "edges"],
};

const flashcardSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A concise, relevant title for the flashcard deck based on the text." },
        cards: {
            type: Type.ARRAY,
            description: "An array of 5 to 10 flashcards.",
            items: {
                type: Type.OBJECT,
                properties: {
                    front: { type: Type.STRING, description: "The front of the card, typically a question or a key term." },
                    back: { type: Type.STRING, description: "The back of the card, containing the answer or definition." }
                },
                required: ["front", "back"]
            }
        }
    },
    required: ["title", "cards"]
};



// --- Combined Schema and Generation Function ---

const allGamesSchema = {
    type: Type.OBJECT,
    properties: {
        puzzles: puzzleSchema,
        dragAndDrop: dragAndDropSchema,
        findTheMistake: findTheMistakeSchema,
        speedRounds: speedRoundsSchema,
        storyBasedChallenge: storyBasedChallengeSchema,
        scenariosAndAnalogies: scenariosAndAnalogiesSchema,
        outsideTheBox: outsideTheBoxSchema,
        miniAdventure: miniAdventureSchema,
        knowledgeTracker: knowledgeTrackerSchema,
    }
};


export async function generateAllGames(text: string): Promise<AllGamesData | null> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        
        const prompt = `Based on the following text, create a comprehensive set of educational games and challenges. Generate content for ALL of the following categories: puzzles (crossword, word search, fill-in-the-blanks, matching), a drag-and-drop game, a find-the-mistake challenge, a speed round quiz, a story-based challenge, a scenarios & analogies challenge, an outside-the-box problem, a mini-adventure, and knowledge tracker data.

Ensure all content is directly derived from the text and that the entire response is a single JSON object that adheres to the provided schema.

Text:
---
${text}
---`;

        const response = await ai.models.generateContent({
            model: 'gemini-flash-latest',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: allGamesSchema,
                thinkingConfig: { thinkingBudget: 0 },
            }
        });

        const jsonString = response.text.trim();
        const allGames = JSON.parse(jsonString);

        return allGames;

    } catch (error) {
        console.error("Gemini API call for all games failed:", error);
        return null;
    }
}


// --- Knowledge Map Generation Function ---
export async function generateKnowledgeMap(text: string): Promise<KnowledgeMapData | null> {
    if (!text || text.trim().length < 50) {
        console.error("Input text is too short for knowledge map generation.");
        return null;
    }
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

        const prompt = `Analyze the following text. Identify the main topics and related sub-topics. Structure this information as a knowledge graph in a JSON format. The graph should consist of nodes and edges.
- Each node must have a unique 'id' (a concise key, e.g., 'photosynthesis'), a 'label' for display (e.g., 'Photosynthesis'), a 'summary' (a 1-2 sentence explanation), and an 'isCentral' boolean flag to indicate if it's a primary topic.
- Each edge must have a 'from' and 'to' field corresponding to node ids, and a 'label' describing the relationship (e.g., 'is a type of', 'requires', 'produces').
- Identify 1-3 central topics. Create around 5-10 nodes in total.
- Ensure the output is a single, valid JSON object that strictly adheres to the provided schema.

Text:
---
${text}
---`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: knowledgeMapSchema,
            }
        });

        const jsonString = response.text.trim();
        const mapData = JSON.parse(jsonString);
        return mapData;

    } catch (error) {
        console.error("Gemini API call for knowledge map failed:", error);
        return null;
    }
}

// --- Flashcard Generation Function ---
export async function generateFlashcards(text: string): Promise<FlashcardData | null> {
    if (!text || text.trim().length < 50) {
        console.error("Input text is too short for flashcard generation.");
        return null;
    }
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

        const prompt = `From the following text, create a set of flashcards for studying. Each flashcard should have a 'front' (a question or a key term) and a 'back' (the corresponding answer or definition). Generate between 5 and 10 cards. The output must be a single, valid JSON object that strictly adheres to the provided schema.

Text:
---
${text}
---`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: flashcardSchema,
            }
        });

        const jsonString = response.text.trim();
        const cardData = JSON.parse(jsonString);
        return cardData;

    } catch (error) {
        console.error("Gemini API call for flashcards failed:", error);
        return null;
    }
}


// --- Default Data for Knowledge Tracker ---

export function generateDefaultKnowledgeTrackerData(): KnowledgeTrackerData {
    return {
        title: "Your Learning Journey Awaits",
        overallSummary: "This is your personal space to watch your knowledge grow! Start by adding some notes, and I'll help you turn them into fun activities and track your progress.",
        activitySummaries: [
            { activity: "Puzzles", skill: "Detail Recall" },
            { activity: "Drag-and-Drop", skill: "Categorization" },
            { activity: "Find the Mistake", skill: "Critical Analysis" },
            { activity: "Speed Rounds", skill: "Quick Recall" },
            { activity: "Story Challenges", skill: "Applied Knowledge" },
            { activity: "Scenarios", skill: "Practical Application" },
            { activity: "Creative Problems", skill: "Lateral Thinking" },
            { activity: "Adventures", skill: "Engaged Learning" },
        ],
        reflectionPrompts: [
            "What was the most interesting thing I learned today?",
            "How can I use this knowledge in a real-life situation?",
            "What concept is still a little fuzzy to me?"
        ]
    };
}