import { setupScene } from "./scripts/threeScene";
import { setupControls, doRotation } from "./scripts/controls";
import { createCubes } from "./scripts/cubes";
import * as THREE from "three";

const { scene, camera, renderer, controls } = setupScene();

const pivot = new THREE.Object3D();
scene.add(pivot);

const cubes = createCubes(scene, pivot);

const { draggable, pan } = setupControls(scene, camera, cubes, pivot, controls);

// New Scramble logic
document.getElementById("scramble").addEventListener("click", async () => {
  let axes = ["x", "y", "z"];
  for (let i = 0; i < 20; i++) {
    // Pick a random axis for rotation
    let axis = axes[Math.floor(Math.random() * axes.length)];

    // Pick a random cube to determine which slice to rotate
    let randomCube = cubes[Math.floor(Math.random() * cubes.length)];

    // Randomize rotation direction (1 for clockwise, -1 for counterclockwise)
    let direction = Math.random() > 0.5 ? 1 : -1;

    // Rotate the chosen slice of cubes
    await rotateSlice(axis, direction, randomCube);

    // Add delay between moves to simulate a smooth scramble
    await new Promise((r) => setTimeout(r, 500));
  }
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

async function rotateSlice(axis, direction, cube) {
  return new Promise((resolve) => {
    doRotation(axis, direction, cube, cubes, pivot, scene);
    setTimeout(resolve, 500); // Allow time for rotation to complete
  });
}
