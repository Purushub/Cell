"use client";

import React, { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

const ORGANELLE_DATA = [
  { id: "nucleus", name: "Nucleus", color: 0x9333ea, emissive: 0x581c87, pos: [0, 0, 0], radius: 1.1, both: true },
  { id: "mitochondria", name: "Mitochondria", color: 0xf97316, emissive: 0xc2410c, pos: [2.5, 0.3, 1.2], radius: 0.6, both: true },
  { id: "ribosome", name: "Ribosomes", color: 0xfef08a, emissive: 0xeab308, pos: [-1.8, -0.5, 2.0], radius: 0.3, both: true },
  { id: "er", name: "Endoplasmic Reticulum", color: 0xf472b6, emissive: 0xdb2777, pos: [1.5, -0.8, -1.5], radius: 0.7, both: true },
  { id: "golgi", name: "Golgi Apparatus", color: 0xfbbf24, emissive: 0xd97706, pos: [-2.2, 0.5, -0.8], radius: 0.6, both: true },
  { id: "cellMembrane", name: "Cell Membrane", color: 0x38bdf8, emissive: 0x0284c7, pos: [0, 0, 0], radius: 4.2, both: true },
  // Plant only
  { id: "cellWall", name: "Cell Wall", color: 0x84cc16, emissive: 0x4d7c0f, pos: [0, 0, 0], radius: 4.5, plant: true },
  { id: "chloroplast", name: "Chloroplast", color: 0x15803d, emissive: 0x166534, pos: [-1.5, 1.2, 1.8], radius: 0.7, plant: true },
  { id: "vacuole", name: "Large Central Vacuole", color: 0x7dd3fc, emissive: 0x0ea5e9, pos: [0.5, -0.3, 0.5], radius: 1.8, plant: true },
  // Animal only
  { id: "lysosome", name: "Lysosome", color: 0xef4444, emissive: 0xb91c1c, pos: [2.0, 1.0, -1.0], radius: 0.45, animal: true },
  { id: "centriole", name: "Centriole", color: 0x6366f1, emissive: 0x4338ca, pos: [-2.5, 1.0, 0.5], radius: 0.35, animal: true },
];

function getOrganellesForType(cellType) {
  return ORGANELLE_DATA.filter((o) => {
    if (o.both) return true;
    if (cellType === "plant" && o.plant) return true;
    if (cellType === "animal" && o.animal) return true;
    return false;
  });
}

export default function CellExplorer3D({ cellType = "plant", onSelectOrganelle, selectedOrganelleId }) {
  const mountRef = useRef(null);
  const animRef = useRef(null);
  const sceneDataRef = useRef(null);
  const selectedIdRef = useRef(selectedOrganelleId);

  // Keep ref in sync
  useEffect(() => {
    selectedIdRef.current = selectedOrganelleId;
    // Update highlight
    if (sceneDataRef.current) {
      const { meshMap } = sceneDataRef.current;
      meshMap.forEach((data, id) => {
        if (id === selectedOrganelleId) {
          data.mesh.material.emissiveIntensity = 1.2;
          if (data.outline) data.outline.visible = true;
        } else {
          data.mesh.material.emissiveIntensity = data.baseEmissive;
          if (data.outline) data.outline.visible = false;
        }
      });
    }
  }, [selectedOrganelleId]);

  const buildScene = useCallback(() => {
    const container = mountRef.current;
    if (!container) return;
    // Clear previous
    while (container.firstChild) container.removeChild(container.firstChild);
    if (animRef.current) cancelAnimationFrame(animRef.current);

    const w = container.clientWidth || 600;
    const h = container.clientHeight || 500;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a1628);

    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 200);
    camera.position.set(0, 3, 10);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const dl = new THREE.DirectionalLight(0xffffff, 1.6);
    dl.position.set(5, 10, 8);
    scene.add(dl);
    const pl = new THREE.PointLight(0x38bdf8, 2, 30);
    pl.position.set(-5, 5, 5);
    scene.add(pl);

    // Build cell model
    const cellGroup = new THREE.Group();
    const organelles = getOrganellesForType(cellType);
    const meshMap = new Map();

    organelles.forEach((org) => {
      let mesh;
      const mat = new THREE.MeshStandardMaterial({
        color: org.color,
        emissive: org.emissive,
        emissiveIntensity: 0.4,
        roughness: 0.3,
        metalness: 0.1,
        transparent: org.id === "cellMembrane" || org.id === "cellWall" || org.id === "vacuole",
        opacity: org.id === "cellMembrane" ? 0.2 : org.id === "cellWall" ? 0.15 : org.id === "vacuole" ? 0.35 : 1.0,
        side: (org.id === "cellMembrane" || org.id === "cellWall") ? THREE.DoubleSide : THREE.FrontSide,
      });

      if (org.id === "nucleus") {
        mesh = new THREE.Mesh(new THREE.SphereGeometry(org.radius, 32, 32), mat);
      } else if (org.id === "mitochondria") {
        mesh = new THREE.Mesh(new THREE.CapsuleGeometry(org.radius * 0.6, org.radius, 12, 24), mat);
        mesh.rotation.z = Math.PI / 4;
      } else if (org.id === "ribosome") {
        const rg = new THREE.Group();
        for (let i = 0; i < 8; i++) {
          const dot = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), mat);
          dot.position.set((Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 0.8);
          rg.add(dot);
        }
        rg.position.set(...org.pos);
        cellGroup.add(rg);
        meshMap.set(org.id, { mesh: rg.children[0], baseEmissive: 0.4, outline: null });
        return;
      } else if (org.id === "er") {
        mesh = new THREE.Mesh(new THREE.TorusGeometry(org.radius, 0.15, 8, 24), mat);
        mesh.rotation.x = Math.PI / 3;
      } else if (org.id === "golgi") {
        const gg = new THREE.Group();
        for (let i = -2; i <= 2; i++) {
          const arc = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.06, 8, 20, Math.PI), mat.clone());
          arc.position.y = i * 0.15;
          arc.rotation.x = Math.PI / 2;
          gg.add(arc);
        }
        gg.position.set(...org.pos);
        cellGroup.add(gg);
        meshMap.set(org.id, { mesh: gg.children[2], baseEmissive: 0.4, outline: null });
        return;
      } else if (org.id === "cellMembrane" || org.id === "cellWall") {
        mesh = new THREE.Mesh(new THREE.SphereGeometry(org.radius, 48, 48), mat);
      } else if (org.id === "chloroplast") {
        mesh = new THREE.Mesh(new THREE.SphereGeometry(org.radius, 24, 24), mat);
        mesh.scale.set(1.5, 0.5, 1.0);
      } else if (org.id === "vacuole") {
        mesh = new THREE.Mesh(new THREE.SphereGeometry(org.radius, 32, 32), mat);
      } else if (org.id === "lysosome" || org.id === "centriole") {
        mesh = new THREE.Mesh(new THREE.SphereGeometry(org.radius, 16, 16), mat);
      } else {
        mesh = new THREE.Mesh(new THREE.SphereGeometry(org.radius, 24, 24), mat);
      }

      mesh.position.set(...org.pos);
      mesh.userData.organelleId = org.id;

      // Selection outline
      let outline = null;
      if (org.id !== "cellMembrane" && org.id !== "cellWall") {
        const outMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.5, side: THREE.BackSide });
        outline = new THREE.Mesh(mesh.geometry.clone(), outMat);
        outline.scale.setScalar(1.2);
        outline.position.copy(mesh.position);
        outline.rotation.copy(mesh.rotation);
        outline.visible = org.id === selectedIdRef.current;
        cellGroup.add(outline);
      }

      cellGroup.add(mesh);
      meshMap.set(org.id, { mesh, baseEmissive: 0.4, outline });
    });

    scene.add(cellGroup);
    sceneDataRef.current = { scene, camera, renderer, cellGroup, meshMap };

    // Raycaster for clicking organelles
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onClick = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cellGroup.children, true);
      for (const hit of intersects) {
        let obj = hit.object;
        while (obj && !obj.userData.organelleId) obj = obj.parent;
        if (obj && obj.userData.organelleId && obj.userData.organelleId !== "cellMembrane" && obj.userData.organelleId !== "cellWall") {
          onSelectOrganelle?.(obj.userData.organelleId);
          return;
        }
      }
    };
    renderer.domElement.addEventListener("click", onClick);

    // Orbit-like drag rotation
    let isDragging = false;
    let prevX = 0, prevY = 0;

    const onDown = (e) => { isDragging = true; prevX = e.clientX; prevY = e.clientY; };
    const onMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      cellGroup.rotation.y += dx * 0.008;
      cellGroup.rotation.x += dy * 0.005;
      cellGroup.rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, cellGroup.rotation.x));
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onUp = () => { isDragging = false; };

    renderer.domElement.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    // Scroll to zoom
    const onWheel = (e) => {
      camera.position.z = Math.max(5, Math.min(18, camera.position.z + e.deltaY * 0.01));
    };
    renderer.domElement.addEventListener("wheel", onWheel, { passive: true });

    // Animate
    const clock = new THREE.Clock();
    const animate = () => {
      animRef.current = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Slow idle rotation
      if (!isDragging) {
        cellGroup.rotation.y += 0.003;
      }

      // Gentle floating for nucleus
      const nucData = meshMap.get("nucleus");
      if (nucData && nucData.mesh) {
        nucData.mesh.position.y = Math.sin(t * 1.5) * 0.1;
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      renderer.domElement.removeEventListener("click", onClick);
      renderer.domElement.removeEventListener("mousedown", onDown);
      renderer.domElement.removeEventListener("wheel", onWheel);
      if (animRef.current) cancelAnimationFrame(animRef.current);
      if (renderer.domElement && container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      renderer.dispose();
      sceneDataRef.current = null;
    };
  }, [cellType, onSelectOrganelle]);

  useEffect(() => {
    const cleanup = buildScene();
    return cleanup;
  }, [buildScene]);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "420px",
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "grab",
        background: "radial-gradient(ellipse at center, #0f2027 0%, #0a1628 100%)",
      }}
    />
  );
}
