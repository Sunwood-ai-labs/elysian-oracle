# ◈ Elysian Dice Oracle

A high-end, stylish TRPG dice roller designed for immersive roleplaying sessions. Elysian Oracle combines elegant glassmorphism aesthetics with the power of AI to provide not just numbers, but narrative context for your game.

## ✨ Created with AI
This app was created using **Claude AI in Chrome** and **Google AI Studio** with **Gemini 3 Flash**.

## 🚀 Quick Start
You can access the live application here:
[**Launch Elysian Dice Oracle**](https://ai.studio/apps/drive/1vg0mTr94Gwip3rME1W)

## 🌟 Detailed Features
- 🎲 **Full Polyhedral Set**: Support for d4, d6, d8, d10, d12, and d20.
- 🪙 **Coin Flip**: Elegant heads or tails mechanic for simple binary fates.
- 🔮 **AI Narrative Oracle**: Powered by Gemini 3 Flash, the app interprets your rolls into 1-2 sentences of thematic story description.
- 📈 **Multiple Rolls**: Roll up to 10 dice at once with automatic total calculation.
- 📜 **Fate History**: Keep track of your last 20 rolls with timestamps and AI interpretations.
- 🎨 **Premium UI/UX**: Dark-themed glassmorphism design with smooth transitions and tumble animations.
- 📱 **Responsive Design**: Fully functional on desktop and mobile browsers.

## 🛠 Technologies Used
- **React 19**: For modular and performant UI components.
- **Tailwind CSS**: For high-end styling and responsive layout.
- **Google Gemini API (@google/genai)**: Specifically using the `gemini-3-flash-preview` model for low-latency narrative generation.
- **TypeScript**: Ensuring type safety across the application.
- **ESM.sh**: Direct module imports for a lightweight, build-less feel.

## 📂 Project Structure
```text
.
├── index.html                # Entry point & Tailwind configuration
├── index.tsx                 # React application root
├── App.tsx                   # Main application logic & UI orchestration
├── types.ts                  # Global TypeScript interfaces
├── constants.tsx             # Dice configurations & visual constants
├── metadata.json             # App manifest & permissions
├── services/
│   └── geminiService.ts      # Google GenAI SDK implementation
└── components/
    └── DiceIcon.tsx          # Custom SVG/CSS dice shape rendering
```

## 📖 How to Use
1. **Choose Your Weapon**: On the left sidebar, select the type of die you wish to roll (e.g., d20 for initiative).
2. **Set the Scale**: Use the slider to select how many dice you are rolling (1 to 10).
3. **Cast Fate**: Click the large **ROLL DICE** button. Watch the tumble animation as the numbers settle.
4. **Consult the Oracle**: Once the result appears, click **"Interpret this Fate"**. The AI will analyze your total and individual dice to provide a DM-style narrative snippet.
5. **Review History**: Scroll through the history panel on the left to see previous rolls and their interpretations.

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.

## 🔗 Links
- **Gemini API Documentation**: [ai.google.dev](https://ai.google.dev/)
- **Project Repository**: [GitHub](https://github.com/)
- **Live App**: [Elysian Oracle](https://ai.studio/apps/drive/1vg0mTr94Gwip3rME1W)

---
*May your crits be natural and your adventures legendary.*