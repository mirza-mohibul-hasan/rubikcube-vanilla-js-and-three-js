import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(10, 8, 10);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#canvas"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

function createCubes() {
  const geometry = new THREE.BoxGeometry(2, 2, 2);

  const cubesColors = [
    [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff],
  ];

  const cubeMaterial = cubesColors[0].map(
    (color) => new THREE.MeshBasicMaterial({ color })
  );
  const cube = new THREE.Mesh(geometry, cubeMaterial);

  cube.position.set(0, 0, 0);
  scene.add(cube);
}

createCubes();
