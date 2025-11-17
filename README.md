
# Aurora: Hackathon Submission

---

### **Project Description**

**Aurora** is a personal learning companion that transforms any study material into an enchanting world of interactive games and challenges. At its core, Aurora is a tool designed to combat learning fatigue by making education magical and engaging. Users simply provide their notes—by typing, pasting, or uploading a file—and with a single click, our AI generates a comprehensive suite of nine distinct, fully-playable educational games, each tailored to the provided text. The journey is guided by a cute, animated companion, turning a study session into a delightful adventure.

Our inspiration came from the universal feeling that studying can often be a monotonous and isolating chore. We wanted to build something that felt less like a productivity tool and more like a creative escape. We imagined a learning partner that wasn't just a passive repository for notes, but an active participant that could make knowledge come alive. The project is built on a modern frontend stack, using **React** and **TypeScript** for a robust structure, **Tailwind CSS** for a highly customized and beautiful design system, and the **Google Gemini API** as the intelligent core that powers all content generation.

---

### **Inspiration**

The inspiration for Aurora stems from a simple question: "What if learning felt like playing a cozy video game?" We've all faced the challenge of rereading dense notes, trying to force information into our brains through sheer repetition. It’s often inefficient and demoralizing.

We were inspired by the power of narrative and companionship in games to create engagement and emotional investment. We didn't just want to build another flashcard app; we wanted to create an *experience*. The idea of having a magical, animated companion who guides you on your "learning journey" became the central pillar of our design. This companion transforms the solitary act of studying into a shared adventure, providing encouragement and a touch of wonder. The goal was to build a tool that users would be genuinely excited to open, fostering a positive and sustainable relationship with their education.

### **What it does**

Aurora is an AI-powered learning platform that gamifies any text-based subject matter. The user workflow is simple and powerful:

1.  **Input Knowledge:** The user starts in the "Creation Hub," where they can type, paste, or upload their notes (up to 5,000 characters).
2.  **Conjure Activities:** The user then clicks any of the nine activity buttons, such as "Create Puzzles" or "Create Mini Adventures."
3.  **One-Click Generation:** Aurora makes a single, intelligent call to the Gemini API, which generates the data for *all nine game types simultaneously* based on the user's notes.
4.  **Play & Learn:** The user is immediately transported to their chosen game. After playing, they can return to the Hub and instantly access any of the other eight pre-generated games without any additional waiting.

The platform creates a diverse suite of activities, including:
*   **Puzzles:** Crosswords, word searches, and matching games.
*   **Interactive Games:** Drag-and-drop categorization challenges.
*   **Critical Thinking:** "Find the Mist