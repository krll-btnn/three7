import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Сцена
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0); // Светлый фон

// Камера
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 100); // Камера смотрит на сцену с расстояния

// Рендерер
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Освещение
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Мягкий общий свет
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 20, 30); // Точечный свет, как солнце
scene.add(pointLight);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Плавность вращения

// Геометрия кубов
const geometry = new THREE.BoxGeometry();
const colors = [0xff0000, 0x00ff00, 0x0000ff];

// Создание случайных кубов
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