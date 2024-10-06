import { setupScene } from "./scripts/threeScene";
import { setupControls, doRotation } from "./scripts/controls";
import { createCubes } from "./scripts/cubes";
import * as THREE from "three";

const { scene, camera, renderer, controls } = setupScene();

const pivot = new THREE.Object3D();
scene.add(pivot);

const cubes = createCubes(scene, pivot);

const { draggable, pan } = setupControls(scene, camera, cubes, pivot, controls);

// Stopwatch logic
let stopwatchInterval = null;
let stopwatchRunning = false;
let elapsedTime = 0;

function startStopwatch() {
  if (!stopwatchRunning) {
    const startTime = Date.now() - elapsedTime;

    stopwatchInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      document.getElementById("stopwatch").innerText = formatTime(elapsedTime);
    }, 1000);

    stopwatchRunning = true;
    document.getElementById("startStopwatch").innerText = "Stop Stopwatch";
  } else {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    document.getElementById("startStopwatch").innerText = "Start Stopwatch";
  }
}

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
}

document.getElementById("shuffle").addEventListener("click", async () => {
  let axes = ["x", "y", "z"];
  for (let i = 0; i < 20; i++) {
    let axis = axes[Math.floor(Math.random() * axes.length)];
    let randomCube = cubes[Math.floor(Math.random() * cubes.length)];
    let direction = Math.random() > 0.5 ? 1 : -1;
    await rotateSlice(axis, direction, randomCube);
    await new Promise((r) => setTimeout(r, 500));
  }
});

document.getElementById("reset").addEventListener("click", () => {
  window.location.reload();
});

document.getElementById("startStopwatch").addEventListener("click", () => {
  startStopwatch();
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
