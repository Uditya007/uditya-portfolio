import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas({ isDark = false }) {
  const mountRef = useRef(null);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [coreColor, setCoreColor] = useState('#ff611a'); // midlife orange

  // Mutable refs for animation loop
  const sceneState = useRef({
    wireframe: false,
    speed: 1,
    color: '#ff611a',
    scrollProgress: 0,
    targetScroll: 0,
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
  });

  useEffect(() => {
    sceneState.current.wireframe = wireframeMode;
    sceneState.current.speed = speedMultiplier;
    sceneState.current.color = coreColor;
  }, [wireframeMode, speedMultiplier, coreColor]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // ROOT OBJECT GROUP
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. CENTRAL KINETIC CORE (Icosahedron + Wireframe shell)
    const coreGeometry = new THREE.IcosahedronGeometry(1.6, 1);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: isDark ? 0x202020 : 0xd8d8d8,
      roughness: 0.25,
      metalness: 0.85,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    mainGroup.add(coreMesh);

    // Wireframe overlay
    const wireframeGeo = new THREE.WireframeGeometry(coreGeometry);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(sceneState.current.color),
      linewidth: 1.5,
      transparent: true,
      opacity: 0.8,
    });
    const wireframeLines = new THREE.LineSegments(wireframeGeo, wireframeMat);
    coreMesh.add(wireframeLines);

    // 2. ORBITAL GYRO RINGS
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xff611a,
      roughness: 0.4,
      metalness: 0.9,
      wireframe: true,
    });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.3, 0.02, 16, 64), ringMat);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.7, 0.02, 16, 64), ringMat);
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(3.1, 0.015, 16, 64), ringMat);

    ring1.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 4;
    ring3.rotation.z = Math.PI / 6;

    mainGroup.add(ring1);
    mainGroup.add(ring2);
    mainGroup.add(ring3);

    // 3. FLOATING DATA NODES / SATELLITE CUBES (representing Chatbots, WhatsApp, SAP, 3D Web)
    const nodeGroup = new THREE.Group();
    const cubeGeo = new THREE.BoxGeometry(0.18, 0.18, 0.18);
    const cubeMat = new THREE.MeshStandardMaterial({
      color: 0x121212,
      roughness: 0.2,
      metalness: 0.95,
    });

    const nodes = [];
    const nodeCount = 14;
    for (let i = 0; i < nodeCount; i++) {
      const cube = new THREE.Mesh(cubeGeo, cubeMat.clone());
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 2.4 + (i % 3) * 0.4;
      cube.position.set(
        Math.cos(angle) * radius,
        (Math.sin(angle * 2) * 0.8),
        Math.sin(angle) * radius
      );
      // add small orange dot inside
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xff611a })
      );
      cube.add(dot);
      nodeGroup.add(cube);
      nodes.push({ mesh: cube, angle, radius, speed: 0.008 + (i % 4) * 0.003 });
    }
    mainGroup.add(nodeGroup);

    // 4. PARTICLE CLOUD (Quantum AI Data Field)
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 14;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      particleScales[i] = Math.random() * 2 + 1;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: isDark ? 0xffffff : 0x222222,
      size: 0.045,
      transparent: true,
      opacity: isDark ? 0.6 : 0.45,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 1.2 : 2.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const orangeLight = new THREE.PointLight(0xff611a, 4, 15);
    orangeLight.position.set(0, 0, 3);
    scene.add(orangeLight);

    const rimLight = new THREE.DirectionalLight(0xff611a, 1.8);
    rimLight.position.set(-5, -5, -4);
    scene.add(rimLight);

    // MOUSE LISTENER FOR PARALLAX
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      sceneState.current.targetMouseX = (clientX / window.innerWidth - 0.5) * 1.5;
      sceneState.current.targetMouseY = (clientY / window.innerHeight - 0.5) * 1.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // SCROLL LISTENER FOR DYNAMIC TRANSFORMATION
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      sceneState.current.targetScroll = progress;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // ANIMATION LOOP
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth lerp mouse and scroll
      sceneState.current.mouseX += (sceneState.current.targetMouseX - sceneState.current.mouseX) * 0.05;
      sceneState.current.mouseY += (sceneState.current.targetMouseY - sceneState.current.mouseY) * 0.05;
      sceneState.current.scrollProgress += (sceneState.current.targetScroll - sceneState.current.scrollProgress) * 0.08;

      const p = sceneState.current.scrollProgress;
      const spd = sceneState.current.speed;

      // Update color and wireframe dynamically
      wireframeMat.color.set(sceneState.current.color);
      coreMaterial.wireframe = sceneState.current.wireframe;

      // SCROLL-DRIVEN STAGE MORPHING:
      // Hero (p=0..0.15): Centered, gentle roll
      // AI & Chatbots (p=0.15..0.35): Shifts slightly right, rings align horizontally, tilt
      // WhatsApp Automation (p=0.35..0.55): Shifts left, rings rotate fast like satellite antenna
      // SAP SD Matrix (p=0.55..0.75): Moves back, core scales down, nodes expand into orderly matrix
      // 3D Web Lab (p=0.75..0.90): Dynamic tilt, rapid orbital rotation
      // Contact & Telemetry (p=0.90..1.0): Returns to center with high-elevation angle

      // Camera & Group Position based on Scroll
      const targetX = Math.sin(p * Math.PI * 2.5) * 1.4 + sceneState.current.mouseX * 0.6;
      const targetY = -Math.cos(p * Math.PI * 2) * 0.6 - sceneState.current.mouseY * 0.6;
      const targetZ = -p * 2.5;

      mainGroup.position.x += (targetX - mainGroup.position.x) * 0.05;
      mainGroup.position.y += (targetY - mainGroup.position.y) * 0.05;
      mainGroup.position.z += (targetZ - mainGroup.position.z) * 0.05;

      // Dynamic Rotations
      coreMesh.rotation.y += 0.005 * spd + p * 0.01;
      coreMesh.rotation.x += 0.003 * spd;

      ring1.rotation.x += 0.012 * spd + p * 0.02;
      ring1.rotation.y += 0.008 * spd;

      ring2.rotation.y += 0.015 * spd;
      ring2.rotation.z += 0.009 * spd;

      ring3.rotation.x -= 0.007 * spd;
      ring3.rotation.z += 0.018 * spd;

      // Pulse core scale gently with scroll modulation
      const pulse = 1 + Math.sin(elapsedTime * 2) * 0.03 + (Math.sin(p * Math.PI * 4) * 0.12);
      coreMesh.scale.set(pulse, pulse, pulse);

      // Orbiting Data Nodes
      nodes.forEach((node, i) => {
        node.angle += node.speed * spd;
        // Expand radius when scrolled to SAP/Data section
        const currentRadius = node.radius + (p > 0.4 && p < 0.75 ? 0.8 : 0);
        node.mesh.position.x = Math.cos(node.angle) * currentRadius;
        node.mesh.position.z = Math.sin(node.angle) * currentRadius;
        node.mesh.position.y = Math.sin(node.angle * 2 + elapsedTime) * (0.6 + p * 0.5);
        node.mesh.rotation.x += 0.02;
        node.mesh.rotation.y += 0.02;
      });

      // Particle Drift
      particles.rotation.y = elapsedTime * 0.02 + p * 0.5;
      particles.rotation.x = elapsedTime * 0.01;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isDark]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Three.js canvas container */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Floating 3D Telemetry HUD Controls (Interactive) */}
      <div className="absolute bottom-6 right-6 pointer-events-auto z-10 flex flex-col gap-2 bg-[#ebebeb]/85 dark:bg-[#121212]/85 backdrop-blur-md border border-[#262626] dark:border-[#303030] p-3 text-[11px] font-mono shadow-lg max-w-[240px]">
        <div className="flex items-center justify-between border-b border-[#262626]/20 dark:border-white/10 pb-1.5 mb-1 text-[#ff611a]">
          <span className="flex items-center gap-1.5 font-bold">
            <span className="w-2 h-2 rounded-full bg-[#ff611a] led-blink"></span>
            3D CORE ENGINE
          </span>
          <span className="text-[9px] text-[#888]">WEBGL 2.0</span>
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={() => setWireframeMode(!wireframeMode)}
            className={`px-2 py-1 border transition-all text-center ${
              wireframeMode
                ? 'bg-[#ff611a] text-white border-[#ff611a]'
                : 'border-[#262626]/30 dark:border-white/20 hover:border-[#ff611a]'
            }`}
          >
            {wireframeMode ? 'MESH: WIRE' : 'MESH: SOLID'}
          </button>

          <button
            onClick={() => setSpeedMultiplier(speedMultiplier === 1 ? 2.5 : speedMultiplier === 2.5 ? 0 : 1)}
            className="px-2 py-1 border border-[#262626]/30 dark:border-white/20 hover:border-[#ff611a] transition-all text-center"
          >
            SPEED: {speedMultiplier === 0 ? 'PAUSED' : `${speedMultiplier}X`}
          </button>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-[#262626]/10 dark:border-white/10 text-[10px] text-gray-500">
          <span>ORBITAL AXIS</span>
          <span className="text-[#ff611a] font-bold">SCROLL-LINKED</span>
        </div>
      </div>
    </div>
  );
}
