# 🎰 CLI Slot Machine: A Node.js Gambling Simulation

A terminal-based 3x3 slot machine game built with **Vanilla JavaScript** and **Node.js**. This project was created to explore backend logic, matrix manipulation, and user input validation in a command-line environment.

---

## 🎮 How the Game Works
The application simulates a real slot machine experience through a series of logical steps:
1. **Deposit:** The user initializes their bankroll with a starting amount.
2. **Bet Lines:** The user decides how many lines (1 to 3) they want to bet on.
3. **Wager:** The user sets the bet amount per line (validated against their current balance).
4. **The Spin:** The machine generates three reels of symbols based on predefined frequencies.
5. **Evaluation:** The engine transposes the reels (columns) into rows and checks for three-of-a-kind matches.
6. **Payout:** Winnings are calculated using symbol-specific multipliers and added to the user's balance.

---

## 🛠️ Machine Mechanics

### Symbol Probability & Payouts
The game uses a weighted system. Rarer symbols (like **A**) provide much higher payouts than common ones (like **D**).

| Symbol | Frequency (Count) | Payout Multiplier |
| :--- | :--- | :--- |
| **A** | 2 | **5x** |
| **B** | 4 | **4x** |
| **C** | 6 | **3x** |
| **D** | 8 | **2x** |

### Logic Highlights
* **Matrix Transposition:** To check for winning rows, the code converts the vertical "reels" array into a horizontal "rows" array.
* **Input Validation:** Uses recursive-style `while(true)` loops to ensure the user provides valid numbers and doesn't bet more than they own.
* **Randomization:** Employs a "weighted pool" logic where symbols are selected randomly and removed from the available pool for that specific reel.



---

## 🚦 Getting Started

### Prerequisites
* **Node.js** (Installed on your system)
* **npm** (Node Package Manager)

### Installation
1. Clone this repository
2. Navigate to the project folder
3. Install the required dependency for terminal input

### Running the App
Start the game by running:
```bash
node project.js
