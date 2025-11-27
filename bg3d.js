// bg3d.js — вставь этот файл рядом с index.html и script.js

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.168.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.168.0/examples/jsm/controls/OrbitControls.js';

const canvas = document.getElementById('bg');
if (!canvas) return;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 6;

const clock = new THREE.Clock();

// Частицы — звёздное небо математики
const particlesGeometry = new THREE.BufferGeometry();
const count = 12000;
const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i += 3) {
  const r = 20 * Math.cbrt(Math.random());
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);

  positions[i]     = r * Math.sin(phi) * Math.cos(theta);
  positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
  positions[i + 2] = r * Math.cos(phi);

  const hue = 0.45 + Math.random() * 0.2;
  const color = new THREE.Color().setHSL(hue, 1, 0.7);
  colors[i]     = color.r;
  colors[i + 1] = color.g;
  colors[i + 2] = color.b;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.04,
  vertexColors: true,
  blending: THREE.AdditiveBlending,
  transparent: true,
  depthWrite: false
});
scene.add(new THREE.Points(particlesGeometry, particlesMaterial));

// Золотая спираль
const phi = (1 + Math.sqrt(5)) / 2;
const spiralPoints = [];
for (let i = 0; i < 300; i++) {
  const t = i * 0.1;
  const scale = Math.pow(phi, t / Math.PI) * 0.03;
  spiralPoints.push(new THREE.Vector3(
    scale * Math.cos(t),
    scale * Math.sin(t),
    t * 0.03 - 4
  ));
}
const spiral = new THREE.Line(
  new THREE.BufferGeometry().setFromPoints(spiralPoints),
  new THREE.LineBasicMaterial({ color: 0xff006e, transparent: true, opacity: 0.9 })
);
scene.add(spiral);

// Формулы в 3D (MathJax → canvas → текстура)
const formulas = [
  "e^{i\\pi} + 1 = 0",
  "\\sum n = -\\dfrac{1}{12}",
  "\\phi = \\dfrac{1+\\sqrt{5}}{2}",
  "z_{n+1} = z_n^2 + c",
  "a^2 + b^2 = c^2",
  "P = NP?",
  "\\sqrt{2} \\notin \\mathbb{Q}"
];

formulas.forEach((tex, i) => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(0,0,0,0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = 'bold 56px Arial';
  ctx.fillStyle = '#00ff9d';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('$$' + tex + '$$', canvas.width / 2, canvas.height / 2);

  MathJax.typesetPromise().then(() => {
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(4, 2), material);
    mesh.position.set(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 15
    );
    mesh.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );
    scene.add(mesh);

    // Анимация
    const animate = () => {
      mesh.rotation.y += 0.003;
      mesh.position.y += Math.sin(clock.getElapsedTime() + i) * 0.001;
      requestAnimationFrame(animate);
    };
    animate();
  }).catch(() => {});
});

// Анимация сцены
function animate() {
  const t = clock.getElapsedTime();
  spiral.rotation.z = t * 0.1;
  camera.position.z = 6 + Math.sin(t * 0.4) * 0.6;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

// Адаптация под размер экрана
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});