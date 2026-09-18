import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { audio } from './AudioEngine';
import { Rotate3d, Sparkles, Layers, ShieldCheck, MapPin } from 'lucide-react';

export default function ThreeDPhotoCard() {
  const mountRef = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mode, setMode] = useState('holo'); // 'holo', 'wire', 'solid'
  const stateRef = useRef({
    targetRotX: 0,
    targetRotY: 0,
    currentRotX: 0,
    currentRotY: 0,
    isHovered: false,
    flipProgress: 0,
    targetFlip: 0,
  });

  useEffect(() => {
    stateRef.current.targetFlip = isFlipped ? Math.PI : 0;
  }, [isFlipped]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 4.8;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Root Group
    const cardGroup = new THREE.Group();
    scene.add(cardGroup);

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();
    const photoTexture = textureLoader.load('/uditya.jpg');
    photoTexture.generateMipmaps = true;
    photoTexture.minFilter = THREE.LinearMipmapLinearFilter;

    // 1. FRONT CARD MESH (Photo Plane with rounded bevel frame)
    const cardWidth = 2.1;
    const cardHeight = 2.7;
    const cardDepth = 0.08;

    const boxGeo = new THREE.BoxGeometry(cardWidth, cardHeight, cardDepth);
    
    // Front face has photo, sides and back have industrial carbon
    const frontMat = new THREE.MeshStandardMaterial({
      map: photoTexture,
      roughness: 0.35,
      metalness: 0.1,
    });

    const edgeMat = new THREE.MeshStandardMaterial({
      color: 0x181818,
      roughness: 0.3,
      metalness: 0.9,
    });

    const backMat = new THREE.MeshStandardMaterial({
      color: 0x121212,
      roughness: 0.4,
      metalness: 0.8,
    });

    // Box materials array: [+x, -x, +y, -y, +z (front), -z (back)]
    const materials = [
      edgeMat,
      edgeMat,
      edgeMat,
      edgeMat,
      frontMat,
      backMat,
    ];

    const cardMesh = new THREE.Mesh(boxGeo, materials);
    cardGroup.add(cardMesh);

    // 2. ORANGE NEON ACCENT BEVEL AROUND CARD
    const wireframeGeo = new THREE.WireframeGeometry(
      new THREE.BoxGeometry(cardWidth + 0.04, cardHeight + 0.04, cardDepth + 0.02)
    );
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0xff611a,
      linewidth: 1.5,
      transparent: true,
      opacity: 0.65,
    });
    const wireframeLines = new THREE.LineSegments(wireframeGeo, wireframeMat);
    cardGroup.add(wireframeLines);

    // 3. 3D FLOATING ORBITAL GYROSCOPE RINGS
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xff611a,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const orbitRing1 = new THREE.Mesh(new THREE.TorusGeometry(2.0, 0.012, 8, 48), ringMat);
    const orbitRing2 = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.008, 8, 48), ringMat);
    orbitRing1.rotation.x = Math.PI / 3.5;
    orbitRing2.rotation.y = Math.PI / 4;
    cardGroup.add(orbitRing1);
    cardGroup.add(orbitRing2);

    // 4. FLOATING SATELLITE TECH NODES (Orbiting cubes)
    const nodeGeo = new THREE.BoxGeometry(0.12, 0.12, 0.12);
    const nodeMat = new THREE.MeshStandardMaterial({ color: 0xff611a });
    const nodes = [];
    for (let i = 0; i < 4; i++) {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      cardGroup.add(node);
      nodes.push({ mesh: node, angle: (i * Math.PI) / 2, dist: 1.7 });
    }

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(3, 4, 5);
    scene.add(dirLight);

    const orangePointLight = new THREE.PointLight(0xff611a, 3.5, 8);
    orangePointLight.position.set(0, -1.2, 2.2);
    scene.add(orangePointLight);

    // MOUSE TRACKING
    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      stateRef.current.targetRotY = x * 0.9;
      stateRef.current.targetRotX = -y * 0.9;
    };

    const handlePointerEnter = () => {
      stateRef.current.isHovered = true;
    };

    const handlePointerLeave = () => {
      stateRef.current.isHovered = false;
      stateRef.current.targetRotX = 0;
      stateRef.current.targetRotY = 0;
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mouseenter', handlePointerEnter);
    container.addEventListener('mouseleave', handlePointerLeave);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // ANIMATION LOOP
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth interpolation for mouse tilt
      const st = stateRef.current;
      st.currentRotX += (st.targetRotX - st.currentRotX) * 0.08;
      st.currentRotY += (st.targetRotY - st.currentRotY) * 0.08;
      st.flipProgress += (st.targetFlip - st.flipProgress) * 0.1;

      // Ambient floating motion
      const floatY = Math.sin(elapsed * 1.8) * 0.08;
      const floatRotZ = Math.sin(elapsed * 1.2) * 0.02;

      cardGroup.position.y = floatY;
      cardGroup.rotation.x = st.currentRotX;
      cardGroup.rotation.y = st.currentRotY + st.flipProgress;
      cardGroup.rotation.z = floatRotZ;

      // Rotate orbital rings
      orbitRing1.rotation.z += 0.008;
      orbitRing2.rotation.x += 0.006;

      // Animate orbiting nodes
      nodes.forEach((n, i) => {
        const curAngle = n.angle + elapsed * 0.6;
        n.mesh.position.x = Math.cos(curAngle) * n.dist;
        n.mesh.position.y = Math.sin(curAngle) * 1.3;
        n.mesh.position.z = Math.sin(curAngle * 2) * 0.5;
        n.mesh.rotation.x += 0.02;
        n.mesh.rotation.y += 0.02;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mouseenter', handlePointerEnter);
      container.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-[320px] h-[400px] sm:w-[380px] sm:h-[460px] cursor-grab active:cursor-grabbing relative"
        title="Interactive 3D Portrait - Move your mouse or click 3D inspect to rotate!"
      />

      {/* Floating 3D Interaction Badge Strip */}
      <div className="flex items-center gap-2 mt-2 font-mono text-[11px]">
        <button
          onClick={() => {
            audio.playClick(1400);
            setIsFlipped(!isFlipped);
          }}
          className="px-3 py-1.5 bg-[#ebebeb] dark:bg-[#181818] border border-[#262626]/40 dark:border-white/20 hover:border-[#ff611a] text-[#121212] dark:text-white flex items-center gap-1.5 shadow-sm transition-all cursor-pointer font-bold"
        >
          <Rotate3d className="w-3.5 h-3.5 text-[#ff611a]" />
          <span>{isFlipped ? 'FLIP FRONT' : '3D FLIP CARD'}</span>
        </button>

        <div className="px-3 py-1.5 bg-[#ebebeb] dark:bg-[#181818] border border-[#262626]/40 dark:border-white/20 text-[#666] dark:text-[#aaa] flex items-center gap-1 text-[10px]">
          <span className="w-2 h-2 rounded-full bg-[#ff611a] led-blink"></span>
          <span>MOUSE GYRO ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
