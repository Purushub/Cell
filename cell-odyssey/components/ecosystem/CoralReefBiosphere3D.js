"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Waves, Sparkles, Fish } from "lucide-react";

/**
 * CoralReefBiosphere3D:
 * 3D Deep Ocean & Bioluminescent Coral Reef Biosphere for Speed Blitz.
 * - Blue: Phytoplankton & Photosynthetic Coral Polyps (Producers).
 * - Red: Zooplankton & Marine Apex Fauna (Consumers).
 * - On right answer: dramatic marine bioluminescence pulse & jellyfish surge!
 * - NO square boxy point particles!
 */
export default function CoralReefBiosphere3D({
  blueScore = 0,
  redScore = 0,
  winnerTeam = null, // 'blue' | 'red' | null
  streak = 0,
}) {
  const mountRef = useRef(null);
  const animFrameRef = useRef(null);
  const coralsRef = useRef(null);
  const jellyfishRef = useRef(null);
  const heroJellyRef = useRef(null);
  const shockwaveRef = useRef(null);

  const reefAnimStateRef = useRef({
    active: false,
    winner: null,
    startTime: 0,
    duration: 3.5, // 3.5s smooth, clear marine event
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x042f2e, 0.02);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 5, 11);
    camera.lookAt(0, 1.4, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Deep Ocean Caustics Lighting
    const ambientLight = new THREE.AmbientLight(0x0d9488, 1.0);
    scene.add(ambientLight);

    const causticLight = new THREE.DirectionalLight(0x5eead4, 2.0);
    causticLight.position.set(2, 14, 5);
    scene.add(causticLight);

    const blueCoralLight = new THREE.PointLight(0x06b6d4, 3.0, 16);
    blueCoralLight.position.set(-3.5, 2.5, 0);
    scene.add(blueCoralLight);

    const redFaunaLight = new THREE.PointLight(0xf43f5e, 3.0, 16);
    redFaunaLight.position.set(3.5, 2.5, 0);
    scene.add(redFaunaLight);

    // 3. Ocean Floor Reef Sand
    const seabedGeo = new THREE.PlaneGeometry(26, 22, 24, 24);
    const seabedMat = new THREE.MeshStandardMaterial({
      color: 0x134e4a,
      roughness: 0.9,
    });
    const seabed = new THREE.Mesh(seabedGeo, seabedMat);
    seabed.rotation.x = -Math.PI / 2;
    seabed.position.y = 0;
    scene.add(seabed);

    // 4. Branching Cyan Coral Polyps (Blue Team Territory on Left)
    const coralsGroup = new THREE.Group();
    for (let i = 0; i < 7; i++) {
      const coral = new THREE.Group();

      const mainStem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.35, 2.6, 8),
        new THREE.MeshStandardMaterial({
          color: 0x0891b2,
          roughness: 0.4,
          emissive: 0x06b6d4,
          emissiveIntensity: 0.45,
        })
      );
      mainStem.position.y = 1.3;
      coral.add(mainStem);

      // Branching arms
      for (let b = 0; b < 4; b++) {
        const branch = new THREE.Mesh(
          new THREE.CylinderGeometry(0.12, 0.16, 1.4, 8),
          new THREE.MeshStandardMaterial({
            color: 0x22d3ee,
            roughness: 0.3,
            emissive: 0x0891b2,
            emissiveIntensity: 0.5,
          })
        );
        const ang = (b * Math.PI) / 2;
        branch.position.set(Math.cos(ang) * 0.45, 1.6 + b * 0.25, Math.sin(ang) * 0.45);
        branch.rotation.z = Math.cos(ang) * 0.65;
        branch.rotation.x = Math.sin(ang) * 0.65;
        coral.add(branch);
      }

      const x = -1.8 - Math.random() * 3.8;
      const z = (Math.random() - 0.5) * 6;
      coral.position.set(x, 0, z);
      coral.scale.setScalar(0.75 + Math.random() * 0.45);
      coralsGroup.add(coral);
    }
    scene.add(coralsGroup);
    coralsRef.current = coralsGroup;

    // 5. Translucent Bioluminescent Jellyfish (Red Team Territory on Right)
    const jelliesGroup = new THREE.Group();
    for (let j = 0; j < 3; j++) {
      const jelly = new THREE.Group();

      const cap = new THREE.Mesh(
        new THREE.SphereGeometry(0.85, 20, 20, 0, Math.PI * 2, 0, Math.PI / 1.7),
        new THREE.MeshPhysicalMaterial({
          color: 0xf43f5e,
          transparent: true,
          opacity: 0.75,
          transmission: 0.8,
          roughness: 0.1,
          emissive: 0xe11d48,
          emissiveIntensity: 0.4,
        })
      );
      jelly.add(cap);

      // Tentacles
      for (let t = 0; t < 6; t++) {
        const ang = (t * Math.PI * 2) / 6;
        const tent = new THREE.Mesh(
          new THREE.CylinderGeometry(0.04, 0.02, 1.6, 6),
          new THREE.MeshBasicMaterial({ color: 0xfda4af, transparent: true, opacity: 0.7 })
        );
        tent.position.set(Math.cos(ang) * 0.45, -0.8, Math.sin(ang) * 0.45);
        jelly.add(tent);
      }

      const x = 2.0 + Math.random() * 3.5;
      const z = (Math.random() - 0.5) * 6;
      jelly.position.set(x, 1.8 + Math.random() * 1.5, z);
      jelly.scale.setScalar(0.75 + Math.random() * 0.35);
      jelliesGroup.add(jelly);
    }
    scene.add(jelliesGroup);
    jellyfishRef.current = jelliesGroup;

    // 6. Hero Giant Jellyfish (Surges on Red Victory)
    const heroJelly = new THREE.Group();
    const heroCap = new THREE.Mesh(
      new THREE.SphereGeometry(1.4, 24, 24, 0, Math.PI * 2, 0, Math.PI / 1.7),
      new THREE.MeshPhysicalMaterial({
        color: 0xff2a6d,
        emissive: 0xff2a6d,
        emissiveIntensity: 0.7,
        transparent: true,
        opacity: 0.85,
        transmission: 0.85,
      })
    );
    heroJelly.add(heroCap);
    for (let t = 0; t < 8; t++) {
      const ang = (t * Math.PI * 2) / 8;
      const tent = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.03, 2.6, 8),
        new THREE.MeshBasicMaterial({ color: 0xfda4af })
      );
      tent.position.set(Math.cos(ang) * 0.8, -1.3, Math.sin(ang) * 0.8);
      heroJelly.add(tent);
    }
    heroJelly.position.set(3.5, -6, 0); // Hidden until trigger
    scene.add(heroJelly);
    heroJellyRef.current = heroJelly;

    // Shockwave Ring on Seabed
    const shockwaveGeo = new THREE.RingGeometry(0.5, 1.6, 32);
    const shockwaveMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    const shockwave = new THREE.Mesh(shockwaveGeo, shockwaveMat);
    shockwave.rotation.x = -Math.PI / 2;
    shockwave.position.y = 0.05;
    scene.add(shockwave);
    shockwaveRef.current = shockwave;

    // 7. Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Coral gentle sway
      if (coralsRef.current) {
        coralsRef.current.children.forEach((c, idx) => {
          c.rotation.z = Math.sin(t * 1.5 + idx) * 0.04;
        });
      }

      // Jellyfish undulating swim
      if (jellyfishRef.current) {
        jellyfishRef.current.children.forEach((j, idx) => {
          j.position.y = 2.0 + Math.sin(t * 2.0 + idx) * 0.35;
          j.scale.y = 1 + Math.sin(t * 4.0 + idx) * 0.12;
        });
      }

      // DRAMATIC MARINE EVENT ON RIGHT ANSWER
      if (reefAnimStateRef.current.active) {
        const elapsed = clock.getElapsedTime() - reefAnimStateRef.current.startTime;
        const duration = reefAnimStateRef.current.duration;
        const progress = Math.min(1.0, elapsed / duration);
        const isBlue = reefAnimStateRef.current.winner === "blue";

        if (isBlue) {
          // Blue Phytoplankton Event: Coral polyps pulse with radiant cyan energy!
          if (coralsRef.current) {
            const pulse = 1.0 + Math.sin(progress * Math.PI) * 0.35;
            coralsRef.current.scale.set(pulse, pulse, pulse);
          }
          if (shockwaveRef.current) {
            shockwaveRef.current.position.set(-3.5, 0.08, 0);
            shockwaveRef.current.material.color.set(0x00f0ff);
            shockwaveRef.current.scale.set(1 + progress * 4.5, 1 + progress * 4.5, 1);
            shockwaveRef.current.material.opacity = Math.max(0, (1 - progress) * 0.9);
          }
        } else {
          // Red Zooplankton Event: Hero giant luminous jellyfish surges upwards!
          if (heroJellyRef.current) {
            const surgeProgress = Math.min(1.0, elapsed / 2.5);
            heroJellyRef.current.position.y = -1.0 + surgeProgress * 4.5;
            heroJellyRef.current.position.x = 3.5 - Math.sin(surgeProgress * Math.PI) * 2.0;
            heroJellyRef.current.scale.y = 1 + Math.sin(surgeProgress * Math.PI * 4) * 0.2;
          }
          if (shockwaveRef.current) {
            shockwaveRef.current.position.set(3.5, 0.08, 0);
            shockwaveRef.current.material.color.set(0xff2a6d);
            shockwaveRef.current.scale.set(1 + progress * 4.5, 1 + progress * 4.5, 1);
            shockwaveRef.current.material.opacity = Math.max(0, (1 - progress) * 0.9);
          }
        }
      }

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
  }, []);

  // Trigger Marine Celebration on correct answer
  useEffect(() => {
    if (winnerTeam) {
      reefAnimStateRef.current = {
        active: true,
        winner: winnerTeam,
        startTime: performance.now() * 0.001,
        duration: 3.5,
      };
    } else {
      reefAnimStateRef.current = { active: false, winner: null, startTime: 0, duration: 3.5 };
      if (heroJellyRef.current) heroJellyRef.current.position.set(3.5, -6, 0);
      if (shockwaveRef.current) shockwaveRef.current.material.opacity = 0;
      if (coralsRef.current) coralsRef.current.scale.set(1, 1, 1);
    }
  }, [winnerTeam]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: "580px",
        borderRadius: "24px",
        overflow: "hidden",
        background: "radial-gradient(circle at 50% 30%, #042f2e 0%, #021a19 100%)",
      }}
    >
      <div ref={mountRef} style={{ width: "100%", height: "100%", minHeight: "580px" }} />
    </div>
  );
}
