# Mira's Game of Life

An interactive implementation of **Conway’s Game of Life**, developed in **JavaScript** using the **p5.js** library.

This Game of Life is a cellular simulation where, using simple rules, a (simplified) simulation of complex behaviors occurs.

---

## About the Project

This project simulates a two-dimensional grid of cells that can be either **alive** or **dead**.  
At each iteration (generation), every cell updates its state based on its neighboring cells, following the classic Game of Life rules.

The main goals of this project are:
- Clear visualization of the game of life simulation
- Better understanding of the p5 library
- Acquiring a better grasp on creating simulations

---

## Game of Life Rules

For each cell:

1. A living cell with fewer than 2 live neighbors dies (underpopulation)
2. A living cell with 2 or 3 live neighbors survives
3. A living cell with more than 3 live neighbors dies (overpopulation)
4. A dead cell with exactly 3 live neighbors becomes alive (reproduction)

---

## Technologies Used

- **HTML / CSS**
- **JavaScript**
- **p5.js**

---

## Resources

- [p5.js 2.0](https://beta.p5js.org/)
- [p5.js Reference](https://p5js.org/reference/)

## How to Run

### Option 1 – Live site
1. Enter the live site (github pages):
    [https://pmiranda27.github.io/Mira-Game-of-Life/](https://pmiranda27.github.io/Mira-Game-of-Life/)

### Option 2 — Open locally
1. Clone the repository:
   ```bash
   git clone https://github.com/pmiranda27/Mira-Game-of-Life