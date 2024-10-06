# 3D Rubik's Cube Web Application

A 3D interactive Rubik's Cube implemented using **Three.js**. The cube can be shuffled, and the rotation of the slices can be controlled by dragging on specific faces. The application also includes a stopwatch feature to time the duration taken to solve the cube.

## Features

- **3D Rubik's Cube**: View, shuffle, and rotate slices of the cube.
- **Interactive Controls**: Click and drag to rotate individual slices of the cube.
- **Shuffle**: Shuffle the cube randomly using the "Shuffle" button.
- **Reset**: Reset the cube to its original state.
- **Stopwatch**: Start and stop the stopwatch to track how long it takes to solve the cube.
- **Responsive Design**: The layout is responsive and adjusts for different screen sizes.

## Technologies Used

- **Three.js**: A powerful library for 3D graphics.
- **JavaScript (ES6)**: The logic behind cube rotations, shuffling, and stopwatch functionality.
- **CSS3**: Styling for the page layout and buttons.
- **HTML5**: Structure of the web page.

## Installation

To run this project locally, follow these steps:

### Prerequisites

You need to have **Node.js** and **npm** installed. If not, download and install it from [Node.js official website](https://nodejs.org/).

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/mirza-mohibul-hasan/rubikcube-vanilla-js-and-three-js.git
   ```

2. **Navigate to the project folder**:

   ```bash
   cd rubikcube-vanilla-js-and-three-js
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Run the application**:

   ```bash
   npm run dev
   ```

5. **Open the project** in your browser at `http://localhost:5173`.

## Usage

1. **Shuffle the Cube**: Click the "Shuffle" button to scramble the cube.
2. **Drag to Rotate**: Click and drag on a specific face of the cube to rotate the slice.
3. **Start/Stop Stopwatch**: Click the "Start Stopwatch" button to start or stop the stopwatch.
4. **Reset the Cube**: Click the "Reset" button to reset the cube and reload the page.

## File Structure

```bash
.
├── public/
│   └── vite.svg       # Vite icon
├── scripts/
│   ├── controls.js    # Controls for dragging and rotating the cube
│   ├── cubes.js       # Cube creation and color setup
│   └── threeScene.js  # Scene setup, lighting, camera
├── styles/
│   └── main.css       # Styling for the buttons and layout
├── .gitignore         # Files ignored by Git
├── index.html         # The main HTML file
├── main.js            # Entry point for Three.js, controls, and stopwatch logic
├── package.json       # Project metadata and dependencies
└── README.md          # Project documentation
```

## Demo

Here’s a screenshot of the project:

![Rubik's Cube Screenshot](https://i.ibb.co.com/G7B2n2y/Screenshot-2024-10-06-192617.png)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Three.js** for the 3D rendering library.
- **Node.js** and **Vite** for building and serving the project.

## Contributing

Feel free to fork this project and submit pull requests. All contributions are welcome!
