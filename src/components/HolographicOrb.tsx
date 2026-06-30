import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const HolographicOrb: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const devicePixelRatio = window.devicePixelRatio || 1;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Holographic AI Orb
    const geometry = new THREE.IcosahedronGeometry(1.5, 64);
    
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_color: { value: new THREE.Color(0x4F7CFF) },
        u_color2: { value: new THREE.Color(0x7C5CFF) }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float u_time;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          vec3 pos = position + normal * sin(position.y * 10.0 + u_time * 2.0) * 0.05;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float u_time;
        uniform vec3 u_color;
        uniform vec3 u_color2;
        void main() {
          float pulse = (sin(u_time * 1.5) + 1.0) / 2.0;
          vec3 color = mix(u_color, u_color2, vPosition.y * 0.5 + 0.5);
          float rim = 1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0);
          rim = pow(rim, 3.0);
          gl_FragColor = vec4(color + rim, rim * 0.5 + 0.3);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });

    const orb = new THREE.Mesh(geometry, shaderMaterial);
    scene.add(orb);

    // Add floating particles
    const particleCount = 20;
    const particles = new THREE.Group();
    const cubeGeom = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const cubeMat = new THREE.MeshBasicMaterial({ color: 0x4F7CFF, transparent: true, opacity: 0.5 });

    const particleVelocities: THREE.Vector3[] = [];

    for (let i = 0; i < particleCount; i++) {
      const cube = new THREE.Mesh(cubeGeom, cubeMat);
      cube.position.set(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5
      );
      
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01
      );
      
      particleVelocities.push(velocity);
      particles.add(cube);
    }
    scene.add(particles);

    camera.position.z = 5;

    let animationFrameId: number;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      const time = performance.now() * 0.001;
      shaderMaterial.uniforms.u_time.value = time;
      
      orb.rotation.y += 0.005;
      orb.rotation.z += 0.003;
      
      particles.children.forEach((p, idx) => {
        const vel = particleVelocities[idx];
        p.position.add(vel);
        
        if (Math.abs(p.position.x) > 2.5) vel.x *= -1;
        if (Math.abs(p.position.y) > 2.5) vel.y *= -1;
        if (Math.abs(p.position.z) > 2.5) vel.z *= -1;
        
        p.rotation.x += 0.01;
        p.rotation.y += 0.01;
      });

      renderer.render(scene, camera);
    }

    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      geometry.dispose();
      shaderMaterial.dispose();
      cubeGeom.dispose();
      cubeMat.dispose();
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
};
export default HolographicOrb;
