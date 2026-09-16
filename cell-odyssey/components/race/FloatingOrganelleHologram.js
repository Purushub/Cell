"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * FloatingOrganelleHologram:
 * Real-time 3D Three.js holographic preview of the active stage organelle.
 * Renders with vibrant glowing materials and floats gently with rotation.
 */
export default function FloatingOrganelleHologram({ stage = 1 }) {
  const mountRef = useRef(null);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 260;

    // Scene, Camera, Renderer with transparent alpha
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 4.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambient);

    const pointLight = new THREE.PointLight(0x38bdf8, 3, 10);
    pointLight.position.set(2, 3, 3);
    scene.add(pointLight);

    const fillLight = new THREE.PointLight(0xa855f7, 2, 10);
    fillLight.position.set(-2, -1, 2);
    scene.add(fillLight);

    // Group for organelle
    const organelleGroup = new THREE.Group();
    scene.add(organelleGroup);

    // Build 3D model based on active stage
    if (stage === 1) {
      // Stage 1: Cellulose Cell Wall (Green 3D Brick Slab with Neon Energy Glow)
      const brickGeo = new THREE.BoxGeometry(1.8, 1.2, 0.35);
      const brickMat = new THREE.MeshStandardMaterial({
        color: 0x84cc16,
        roughness: 0.3,
        metalness: 0.1,
        emissive: 0x4d7c0f,
        emissiveIntensity: 0.35,
      });
      const wallMesh = new THREE.Mesh(brickGeo, brickMat);
      organelleGroup.add(wallMesh);

      // Neon grid lines
      const edgeGeo = new THREE.EdgesGeometry(brickGeo);
      const edgeMat = new THREE.LineBasicMaterial({ color: 0xbbf7d0, linewidth: 2 });
      const edgeLines = new THREE.LineSegments(edgeGeo, edgeMat);
      organelleGroup.add(edgeLines);

      // Mortar grooves
      for (let x = -0.6; x <= 0.6; x += 0.6) {
        const groove = new THREE.Mesh(
          new THREE.BoxGeometry(0.04, 1.22, 0.37),
          new THREE.MeshBasicMaterial({ color: 0x365314 })
        );
        groove.position.x = x;
        organelleGroup.add(groove);
      }
    } else if (stage === 2) {
      // Stage 2: Mitochondria (Orange bean with folded glowing cristae)
      const mitoGeo = new THREE.CapsuleGeometry(0.65, 1.2, 16, 32);
      const mitoMat = new THREE.MeshStandardMaterial({
        color: 0xf97316,
        roughness: 0.25,
        transparent: true,
        opacity: 0.85,
        emissive: 0xc2410c,
        emissiveIntensity: 0.4,
      });
      const mitoMesh = new THREE.Mesh(mitoGeo, mitoMat);
      mitoMesh.rotation.z = Math.PI / 3;
      organelleGroup.add(mitoMesh);

      // Inner glowing cristae ripples
      for (let i = -0.4; i <= 0.4; i += 0.2) {
        const fold = new THREE.Mesh(
          new THREE.TorusGeometry(0.4, 0.08, 8, 24, Math.PI),
          new THREE.MeshStandardMaterial({
            color: 0xfef08a,
            emissive: 0xeab308,
            emissiveIntensity: 0.8,
          })
        );
        fold.position.set(i, i * 0.5, 0);
        fold.rotation.x = Math.PI / 2;
        organelleGroup.add(fold);
      }
    } else if (stage === 3) {
      // Stage 3: Nucleus (Purple textured sphere with nucleolus core)
      const nucGeo = new THREE.SphereGeometry(1.0, 32, 32);
      const nucMat = new THREE.MeshStandardMaterial({
        color: 0x9333ea,
        roughness: 0.35,
        metalness: 0.15,
        emissive: 0x581c87,
        emissiveIntensity: 0.4,
      });
      const nucMesh = new THREE.Mesh(nucGeo, nucMat);
      organelleGroup.add(nucMesh);

      // Glowing core nucleolus
      const coreGeo = new THREE.SphereGeometry(0.38, 24, 24);
      const coreMat = new THREE.MeshBasicMaterial({ color: 0xf3e8ff });
      const core = new THREE.Mesh(coreGeo, coreMat);
      core.position.set(0.3, 0.2, 0.2);
      organelleGroup.add(core);

      // Surface pores
      for (let p = 0; p < 18; p++) {
        const pore = new THREE.Mesh(
          new THREE.SphereGeometry(0.07, 8, 8),
          new THREE.MeshBasicMaterial({ color: 0x3b0764 })
        );
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = 1.01;
        pore.position.x = r * Math.sin(phi) * Math.cos(theta);
        pore.position.y = r * Math.sin(phi) * Math.sin(theta);
        pore.position.z = r * Math.cos(phi);
        organelleGroup.add(pore);
      }
    } else if (stage === 4) {
      // Stage 4: Chloroplast (Green lens with thylakoid stacks)
      const chloroGeo = new THREE.SphereGeometry(1.05, 32, 32);
      chloroGeo.scale(1.4, 0.55, 1.0);
      const chloroMat = new THREE.MeshStandardMaterial({
        color: 0x22c55e,
        roughness: 0.2,
        transparent: true,
        opacity: 0.85,
        emissive: 0x15803d,
        emissiveIntensity: 0.5,
      });
      const chloroMesh = new THREE.Mesh(chloroGeo, chloroMat);
      organelleGroup.add(chloroMesh);

      // Stacked grana discs
      const positions = [[-0.5, 0, -0.2], [0.4, 0, -0.3], [-0.1, 0, 0.3], [0.5, 0, 0.2]];
      positions.forEach(([gx, gy, gz]) => {
        for (let d = -2; d <= 2; d++) {
          const disc = new THREE.Mesh(
            new THREE.CylinderGeometry(0.2, 0.2, 0.04, 16),
            new THREE.MeshStandardMaterial({ color: 0x86efac, emissive: 0x4ade80, emissiveIntensity: 0.6 })
          );
          disc.position.set(gx, gy + d * 0.06, gz);
          organelleGroup.add(disc);
        }
      });
    } else if (stage === 5) {
      // Stage 5: Large Central Vacuole (Cyan water orb)
      const vacGeo = new THREE.SphereGeometry(1.15, 32, 32);
      const vacMat = new THREE.MeshPhysicalMaterial({
        color: 0x38bdf8,
        transmission: 0.85,
        opacity: 0.8,
        transparent: true,
        roughness: 0.08,
        ior: 1.33,
        emissive: 0x0284c7,
        emissiveIntensity: 0.3,
      });
      const vacMesh = new THREE.Mesh(vacGeo, vacMat);
      organelleGroup.add(vacMesh);

      // Internal sparkling bubble
      const innerBubble = new THREE.Mesh(
        new THREE.SphereGeometry(0.45, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 })
      );
      innerBubble.position.set(-0.25, 0.25, 0.25);
      organelleGroup.add(innerBubble);
    } else {
      // Stage 6: Cytoplasm & Ribosomes
      const cytoGeo = new THREE.SphereGeometry(1.1, 32, 32);
      const cytoMat = new THREE.MeshPhysicalMaterial({
        color: 0x22d3ee,
        transmission: 0.9,
        transparent: true,
        opacity: 0.75,
        roughness: 0.15,
        emissive: 0x0891b2,
        emissiveIntensity: 0.3,
      });
      const cytoMesh = new THREE.Mesh(cytoGeo, cytoMat);
      organelleGroup.add(cytoMesh);

      // Floating ribosomes speckles
      for (let r = 0; r < 24; r++) {
        const ribo = new THREE.Mesh(
          new THREE.SphereGeometry(0.06, 8, 8),
          new THREE.MeshBasicMaterial({ color: 0xfef08a })
        );
        ribo.position.set(
          (Math.random() - 0.5) * 1.5,
          (Math.random() - 0.5) * 1.5,
          (Math.random() - 0.5) * 1.5
        );
        organelleGroup.add(ribo);
      }
    }

    // Gentle floating and rotation animation
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      organelleGroup.rotation.y = t * 0.8;
      organelleGroup.rotation.x = Math.sin(t * 0.6) * 0.15;
      organelleGroup.position.y = Math.sin(t * 2.0) * 0.12;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [stage]);

  return <div ref={mountRef} style={{ width: "100%", height: "100%", position: "relative" }} />;
}
