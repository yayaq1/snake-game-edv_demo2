# 🐍 React Snake (Nokia 3310 Clone)
A modern web-based implementation of the classic Nokia 3310 Snake game, built entirely with **React**. This project brings the nostalgic gameplay to the browser using functional components and React Hooks.

## 📺 Live Demo
**[Link to your deployed game (e.g., Vercel/Netlify)]**

---

## ✨ Features

* **High Score Tracking:** Saves your best score to local storage so you never lose your record.
* **Dynamic Speed:** The game gets faster as you eat more food (difficulty progression).
* **Responsive Control:** Play using keyboard arrow keys.
* **Zero Dependencies:** Built with pure React state management (no Redux or complex game engines).

---

## 🛠️ Tech Stack

* **Library:** React.js (Create React App / Vite)
* **State Management:** React Hooks (`useState`, `useEffect`, `useRef`)
* **Styling:** CSS / CSS Modules
* **Logic:** Custom game loop using `setInterval`

---

## 🚀 Getting Started

Follow these instructions to run the game locally on your machine.

### Prerequisites

Make sure you have Node.js installed.

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/[your-username]/[repo-name].git

```


2. **Navigate to the project directory:**
```bash
cd [repo-name]

```


3. **Install dependencies:**
```bash
npm install
# or
yarn install

```


4. **Start the development server:**
```bash
npm start
# or
yarn start

```



Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) to view it in the browser.

---

## 🎮 How to Play

1. Press **Start** to begin the game.
2. Use the **Arrow Keys** (⬆️ ⬇️ ⬅️ ➡️) to change the snake's direction.
3. Eat the **Food** (usually represented by a dot/pixel) to grow.
4. Avoid hitting the walls or your own tail.

---

## 🧠 How it Works

The game logic relies on a grid system.

* **The Grid:** The game board is an array of coordinate pairs `[x, y]`.
* **The Snake:** An array of coordinates. `[[10, 10], [10, 11], [10, 12]]`.
* **Movement:** On every "tick" (interval), the head moves to a new coordinate based on the current direction. The last segment (tail) is removed unless food was eaten.
* **Collision Detection:** Every tick checks if the `head` coordinate matches a wall boundary or any coordinate currently inside the `snake` array.

---

## 🔮 Future Improvements

* [ ] Add mobile touch controls (Swipe gestures).
* [ ] Add sound effects for eating and game over.
* [ ] Implement a Dark Mode.
* [ ] Add varying difficulty levels (Easy, Medium, Hard).

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or bug fixes:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
