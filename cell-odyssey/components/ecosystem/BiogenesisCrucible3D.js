"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * BiogenesisCrucible3D:
 * A 3D microscopic incubator / Petri dish crucible where both cells
 * synthesize in real time.
 * - NO yellow boxes rising like rain! (Clean, clear nutrient liquid)
 * - On right answer: dramatic biogenesis laser beam descends,
 *   materializing the new organelle with shockwave bio-energy ripples!
 */
export default function BiogenesisCrucible3D({
  blueScore = 0,
  redScore = 0,
  winnerTeam = null, // 'blue' | 'red' | null
}) {
  const mountRef = useRef(null);
  const animFrameRef = useRef(null);
  const plantCellRef = useRef(null);
  const animalCellRef = useRef(null);
  const synthBeamRef = useRef(null);
  const synthOrganelleRef = useRef(null);
  const shockwaveRef = useRef(null);

  const synthAnimStateRef = useRef({
    active: false,
    winner: null,
    startTime: 0,
    duration: 3.5, // 3.5s smooth, visible synthesis animation
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0f172a, 0.015);

    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 1000);
    camera.position.set(0, 7.2, 11);
    camera.lookAt(0, 1.2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Microscope Stage Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.0);
    mainLight.position.set(5, 15, 8);
    scene.add(mainLight);

    const blueSubLight = new THREE.PointLight(0x06b6d4, 3.0, 16);
    blueSubLight.position.set(-3.5, 3.5, 0);
    scene.add(blueSubLight);

    const redSubLight = new THREE.PointLight(0xf43f5e, 3.0, 16);
    redSubLight.position.set(3.5, 3.5, 0);
    scene.add(redSubLight);

    // 3. Glass Incubator Petri Dish (Clean, smooth, transparent liquid base)
    const dishGeo = new THREE.CylinderGeometry(8.2, 8.2, 0.4, 48);
    const dishMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.25,
      roughness: 0.1,
      transmission: 0.9,
      ior: 1.45,
    });
    const dish = new THREE.Mesh(dishGeo, dishMat);
    dish.position.y = -0.2;
    scene.add(dish);

    // Glowing incubator rim
    const rimGeo = new THREE.TorusGeometry(8.2, 0.15, 16, 48);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.8,
    });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.rotation.x = Math.PI / 2;
    scene.add(rim);

    // Smooth circular nutrient liquid surface inside dish (NO BOXES, NO RAIN)
    const fluidGeo = new THREE.CircleGeometry(8.0, 48);
    const fluidMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.35,
      roughness: 0.1,
      metalness: 0.1,
    });
    const fluidMesh = new THREE.Mesh(fluidGeo, fluidMat);
    fluidMesh.rotation.x = -Math.PI / 2;
    fluidMesh.position.y = 0.02;
    scene.add(fluidMesh);

    // 4. Plant Cell (Boxy green cell evolving on left)
    const plantGroup = new THREE.Group();
    const plantWallGeo = new THREE.BoxGeometry(3.2, 2.6, 2.6);
    const plantWall = new THREE.Mesh(
      plantWallGeo,
      new THREE.MeshStandardMaterial({
        color: 0x15803d,
        wireframe: true,
        roughness: 0.3,
      })
    );
    plantGroup.add(plantWall);

    const plantCoreGeo = new THREE.BoxGeometry(2.8, 2.2, 2.2);
    const plantCore = new THREE.Mesh(
      plantCoreGeo,
      new THREE.MeshPhysicalMaterial({
        color: 0x22c55e,
        transparent: true,
        opacity: 0.5,
        roughness: 0.2,
        emissive: 0x166534,
        emissiveIntensity: 0.3,
      })
    );
    plantGroup.add(plantCore);

    // Nucleus inside plant cell
    const plantNuc = new THREE.Mesh(
      new THREE.SphereGeometry(0.65, 20, 20),
      new THREE.MeshStandardMaterial({ color: 0x9333ea, emissive: 0x581c87, emissiveIntensity: 0.4 })
    );
    plantNuc.position.set(-0.3, 0.2, 0.2);
    plantGroup.add(plantNuc);

    // Large Vacuole
    const plantVac = new THREE.Mesh(
      new THREE.SphereGeometry(0.85, 20, 20),
      new THREE.MeshPhysicalMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.7,
        roughness: 0.1,
      })
    );
    plantVac.position.set(0.4, -0.1, -0.2);
    plantGroup.add(plantVac);

    // Chloroplasts
    const chloroPositions = [[-0.8, 0.6, -0.5], [0.7, 0.7, 0.4], [-0.5, -0.6, 0.6]];
    chloroPositions.forEach(([x, y, z]) => {
      const cMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 12, 12),
        new THREE.MeshStandardMaterial({ color: 0x4ade80, emissive: 0x15803d, emissiveIntensity: 0.5 })
      );
      cMesh.scale.set(1.4, 0.6, 1.0);
      cMesh.position.set(x, y, z);
      plantGroup.add(cMesh);
    });

    plantGroup.position.set(-3.5, 1.8, 0);
    scene.add(plantGroup);
    plantCellRef.current = plantGroup;

    // 5. Animal Cell (Rounded organic cell evolving on right)
    const animalGroup = new THREE.Group();
    const animalGeo = new THREE.SphereGeometry(1.6, 28, 28);
    animalGeo.scale(1.1, 0.95, 1.1);
    const animalMem = new THREE.Mesh(
      animalGeo,
      new THREE.MeshPhysicalMaterial({
        color: 0xf43f5e,
        transparent: true,
        opacity: 0.45,
        roughness: 0.2,
        emissive: 0x9f1239,
        emissiveIntensity: 0.3,
      })
    );
    animalGroup.add(animalMem);

    // Nucleus inside animal cell
    const animalNuc = new THREE.Mesh(
      new THREE.SphereGeometry(0.7, 20, 20),
      new THREE.MeshStandardMaterial({ color: 0x7c3aed, emissive: 0x4c1d95, emissiveIntensity: 0.4 })
    );
    animalNuc.position.set(0, 0.1, 0);
    animalGroup.add(animalNuc);

    // Centrioles
    const centriole1 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 0.45, 8),
      new THREE.MeshBasicMaterial({ color: 0xfacc15 })
    );
    centriole1.position.set(0.6, 0.6, 0.3);
    animalGroup.add(centriole1);

    const centriole2 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 0.45, 8),
      new THREE.MeshBasicMaterial({ color: 0xfacc15 })
    );
    centriole2.position.set(0.6, 0.6, 0.3);
    centriole2.rotation.x = Math.PI / 2;
    animalGroup.add(centriole2);

    // Mitochondria in animal cell
    const mitoPositions = [[-0.6, 0.5, 0.4], [0.4, -0.5, -0.5], [-0.5, -0.4, -0.4]];
    mitoPositions.forEach(([x, y, z]) => {
      const mMesh = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.18, 0.4, 8, 16),
        new THREE.MeshStandardMaterial({ color: 0xf97316, emissive: 0xc2410c, emissiveIntensity: 0.5 })
      );
      mMesh.position.set(x, y, z);
      mMesh.rotation.z = Math.PI / 4;
      animalGroup.add(mMesh);
    });

    animalGroup.position.set(3.5, 1.8, 0);
    scene.add(animalGroup);
    animalCellRef.current = animalGroup;

    // 6. Laser Biogenesis Beam Cylinder (Fires from above on correct answer)
    const beamGeo = new THREE.CylinderGeometry(0.35, 0.35, 9, 24);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    const synthBeam = new THREE.Mesh(beamGeo, beamMat);
    synthBeam.position.set(0, 6, 0);
    scene.add(synthBeam);
    synthBeamRef.current = synthBeam;

    // Materializing 3D Organelle on Beam
    const organelleMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.7, 24, 24),
      new THREE.MeshStandardMaterial({
        color: 0xfacc15,
        emissive: 0xeab308,
        emissiveIntensity: 0.8,
      })
    );
    organelleMesh.position.set(0, 10, 0);
    scene.add(organelleMesh);
    synthOrganelleRef.current = organelleMesh;

    // Glowing Shockwave Ripple on dish floor
    const shockwaveGeo = new THREE.RingGeometry(0.4, 1.2, 32);
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

    // 7. Animation Loop with Visibly Exciting Biogenesis Synthesis
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Idle cell rotations
      if (plantCellRef.current) {
        plantCellRef.current.rotation.y = t * 0.35;
        plantCellRef.current.position.y = 1.8 + Math.sin(t * 2.0) * 0.08;
      }
      if (animalCellRef.current) {
        animalCellRef.current.rotation.y = -t * 0.35;
        animalCellRef.current.position.y = 1.8 + Math.cos(t * 2.0) * 0.08;
      }

      // DRAMATIC BIOGENESIS EVENT ON RIGHT ANSWER
      if (synthAnimStateRef.current.active) {
        const elapsed = clock.getElapsedTime() - synthAnimStateRef.current.startTime;
        const duration = synthAnimStateRef.current.duration;
        const progress = Math.min(1.0, elapsed / duration);

        const isBlue = synthAnimStateRef.current.winner === "blue";
        const targetX = isBlue ? -3.5 : 3.5;
        const beamColor = isBlue ? 0x22c55e : 0xff2a6d;

        // 1. Biogenesis Laser Beam drops down into the cell
        if (synthBeamRef.current) {
          synthBeamRef.current.position.x = targetX;
          synthBeamRef.current.material.color.set(beamColor);
          if (progress < 0.25) {
            synthBeamRef.current.material.opacity = progress * 4 * 0.85;
          } else if (progress > 0.75) {
            synthBeamRef.current.material.opacity = (1 - (progress - 0.75) * 4) * 0.85;
          } else {
            synthBeamRef.current.material.opacity = 0.85;
          }
        }

        // 2. Synthesized 3D Organelle descends on the beam into the cell
        if (synthOrganelleRef.current) {
          synthOrganelleRef.current.position.x = targetX;
          synthOrganelleRef.current.rotation.y += 0.08;

          if (progress < 0.7) {
            const descent = progress / 0.7; // 0 to 1
            synthOrganelleRef.current.position.y = 7 - descent * 5.2; // 7 down to 1.8
            synthOrganelleRef.current.scale.set(1, 1, 1);
          } else {
            // Absorbed and incorporated into cell!
            const absorb = (progress - 0.7) / 0.3;
            synthOrganelleRef.current.position.y = 1.8;
            synthOrganelleRef.current.scale.set(1 - absorb, 1 - absorb, 1 - absorb);
          }
        }

        // 3. Cell Swells and Pulsates with Bio-Energy
        const activeCell = isBlue ? plantCellRef.current : animalCellRef.current;
        if (activeCell) {
          const pulse = 1.0 + Math.sin(progress * Math.PI) * 0.25;
          activeCell.scale.set(pulse, pulse, pulse);
        }

        // 4. Expanding Shockwave Ring on dish
        if (shockwaveRef.current) {
          shockwaveRef.current.position.x = targetX;
          shockwaveRef.current.material.color.set(beamColor);
          const ringProgress = Math.min(1.0, (progress - 0.3) / 0.7);
          if (ringProgress > 0) {
            shockwaveRef.current.scale.set(1 + ringProgress * 4.0, 1 + ringProgress * 4.0, 1);
            shockwaveRef.current.material.opacity = Math.max(0, (1 - ringProgress) * 0.9);
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

  // Trigger Biogenesis Animation when a team gets the right answer
  useEffect(() => {
    if (winnerTeam) {
      synthAnimStateRef.current = {
        active: true,
        winner: winnerTeam,
        startTime: performance.now() * 0.001,
        duration: 3.5, // 3.5s smooth, clear biogenesis synthesis
      };
    } else {
      synthAnimStateRef.current = { active: false, winner: null, startTime: 0, duration: 3.5 };
      if (synthBeamRef.current) synthBeamRef.current.material.opacity = 0;
      if (synthOrganelleRef.current) synthOrganelleRef.current.position.set(0, 10, 0);
      if (shockwaveRef.current) shockwaveRef.current.material.opacity = 0;
      if (plantCellRef.current) plantCellRef.current.scale.set(1, 1, 1);
      if (animalCellRef.current) animalCellRef.current.scale.set(1, 1, 1);
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
        background: "radial-gradient(circle at 50% 40%, #1e293b 0%, #030712 100%)",
      }}
    >
      <div ref={mountRef} style={{ width: "100%", height: "100%", minHeight: "580px" }} />
    </div>
  );
}
