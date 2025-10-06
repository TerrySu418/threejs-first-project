import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/Addons.js";

/**
 * Base
 */
// Debug
// const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#456882') // Sky blue

const fontLoader = new FontLoader();

fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  {
    const textGeometry1 = new TextGeometry("I'm Terry,", {
      font: font,
      size: 0.5,
      depth: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5,
    });
    // Second line
    const textGeometry2 = new TextGeometry("a Digital Artist", {
      font: font,
      size: 0.5,
      depth: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5,
    });
    const material = new THREE.MeshMatcapMaterial({
      matcap: matcapTexture,
    });

    // textMaterial.wireframe = true;
    textGeometry1.computeBoundingBox();
    textGeometry2.computeBoundingBox();
    textGeometry1.center();
    textGeometry2.center();
    const text1 = new THREE.Mesh(textGeometry1, material);
    const text2 = new THREE.Mesh(textGeometry2, material);
    const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
    text2.position.y = -1; // Move down

    for (let i = 0; i < 3000; i++) {
      const donut = new THREE.Mesh(donutGeometry, material);
      donut.position.x = (Math.random() - 0.5) * 180;
      donut.position.y = (Math.random() - 0.5) * 180;
      donut.position.z = (Math.random() - 0.5) * 180;

      donut.rotation.x = Math.random() * Math.PI;
      donut.rotation.y = Math.random() * Math.PI;

      const scale = Math.random();
      donut.scale.set(scale, scale, scale);

      scene.add(donut);
    }
    scene.add(text1, text2);
  }
});

// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/textures/matcaps/7.png");
matcapTexture.colorSpace = THREE.SRGBColorSpace;

/**
 * Object
 */
// const cube = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial()
// );

// scene.add(cube);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 100;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

controls.minDistance = 0; // Can't zoom closer than 5 units
controls.maxDistance = 100; // Can't zoom farther than 20 units

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
