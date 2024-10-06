import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const setupScene = () => {
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

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enabled = false;

  const ambient = new THREE.AmbientLight(0xffffff, 0.69);
  const front = new THREE.DirectionalLight(0xffffff, 0.36);
  const back = new THREE.DirectionalLight(0xffffff, 0);

  front.position.set(1.5, 5, 3);
  back.position.set(-1.5, -5, -3);

  scene.add(ambient, front, back);

  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };
  animate();

  return { scene, camera, renderer, controls };
};
