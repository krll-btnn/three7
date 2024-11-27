import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Сцена
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

// Камера
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 100);

// Отрисовщик
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 0;
controls.maxDistance = 200;
controls.minPolarAngle = 0;
controls.maxPolarAngle = 5;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 0, 0);
controls.update();

// Освещение
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Мягкий общий свет
scene.add(ambientLight);

// Кубы
const geometry = new THREE.BoxGeometry();
const colors = [0xff0000, 0x00ff00, 0x0000ff];

for (let i = 0; i < 300; i++) {
  const color = colors[Math.floor(Math.random() * colors.length)];
  const material = new THREE.MeshLambertMaterial({ color });

  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(
    Math.random() * 100 - 50,
    Math.random() * 100 - 50,
    Math.random() * 100 - 50
  );
  cube.rotation.set(
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    Math.random() * Math.PI
  );
  cube.scale.set(1.5, 1.5, 1.5);

  scene.add(cube);
}

// Анимация
function animate() {
  requestAnimationFrame(animate);

  controls.update(); // Обновляем контроллеры для плавности
  renderer.render(scene, camera);
}

animate();