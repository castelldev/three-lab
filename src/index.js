import * as THREE from 'three'
import 'three-orbitcontrols'
import * as TWEEN from '@tweenjs/tween.js'

let canvas = document.getElementById('canvas'); // Canvas
// Scene
let scene = new THREE.Scene();
// Camera
let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.lookAt(0, 0, 0);
camera.position.z = 8;
// Renderer
let renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight)
// Enable Shadows
renderer.shadowMapEnabled = true;
renderer.shadowMapType = THREE.PCFSoftShadowMap;
// renderer.compile(scene,camera)

// Orbit Controls
let controls = new THREE.OrbitControls(camera, canvas);
controls.update();

// Geometries
const planeGeometry = new THREE.PlaneGeometry(15, 15, 32);
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

// Lights and Shadows
let dlight = new THREE.DirectionalLight(0xffffff, 1.5);
dlight.position.set(0, 0, 6);
let sLight = new THREE.SpotLight(0xffffff, 1.5);
sLight.position.set(0, 0, 1);
sLight.position.set(2, 8, 15);
sLight.target.position.set(-2, 0, -2);
sLight.castShadow = true;
sLight.shadowCameraNear = 1;
sLight.shadowCameraFar = 200;
sLight.shadowCameraFov = 45;
sLight.shadowDarkness = 0.5;
sLight.shadowMapWidth = 4000;
sLight.shadowMapHeight = 4000;

//Textures
const cubeTexture = new THREE.TextureLoader().load('../assets/textures/abstract.jpg');
const planeTexture = new THREE.TextureLoader().load('../assets/textures/plane.jpg');
// Materials
const cubeMaterial = new THREE.MeshPhongMaterial({ map: cubeTexture });
const planeMaterial = new THREE.MeshPhongMaterial({ map: planeTexture, side: THREE.DoubleSide })

let plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.castShadow = false;
plane.receiveShadow = true;
plane.rotation.x = 5;
let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.castShadow = true;
cube.receiveShadow = false;
cube.rotation.x = 5;
cube.position.y = 2;
cube.position.z = 0;

// Add to scene
scene.add(cube, plane, sLight);

// Tweens
let posTween = new TWEEN.Tween(cube.position)
    .to({ y: .52 }, 2500)
    .delay(1000)
    .easing(TWEEN.Easing.Bounce.Out)
    .start();
let rotTween = new TWEEN.Tween(cube.rotation)
    .to({ z:2*Math.PI }, 2500)
    .delay(1000)
    .easing(TWEEN.Easing.Cubic.Out)
    .start();

// Animate
; (function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    TWEEN.update();
})();