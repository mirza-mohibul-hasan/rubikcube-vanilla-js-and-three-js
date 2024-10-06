import { setupScene } from "./scripts/threeScene";
import { setupControls, doRotation } from "./scripts/controls";
import { createCubes } from "./scripts/cubes";
import * as THREE from "three";

const { scene, camera, renderer, controls } = setupScene();

const pivot = new THREE.Object3D();
scene.add(pivot);

const cubes = createCubes(scene, pivot);

const { draggable, pan } = setupControls(scene, camera, cubes, pivot, controls);

document.getElementById("scramble").addEventListener("click", async () => {
  let arr = ["x", "y", "z"];
  for (let i = 0; i < 15; i++) {
    let axis = arr[Math.floor(Math.random() * 3)];
    let direction = Math.round(Math.random()) * 2 - 1;
    let cube = Math.floor(Math.random() * 27);

    doRotation(axis, direction, cubes[cube], cubes, pivot, scene); // Pass cubes, pivot, and scene

    await new Promise((r) => setTimeout(r, 500));
  }
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
