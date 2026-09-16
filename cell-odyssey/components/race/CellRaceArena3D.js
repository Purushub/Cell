"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Builds realistic Three.js procedural models of each organelle.
 */
function buildOrganelleModel(stage) {
  const g = new THREE.Group();

  if (stage === 1) {
    const wallGeo = new THREE.BoxGeometry(2.4, 1.6, 0.45);
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x84cc16, roughness: 0.3, metalness: 0.1, emissive: 0x4d7c0f, emissiveIntensity: 0.4 });
    g.add(new THREE.Mesh(wallGeo, wallMat));
    g.add(new THREE.LineSegments(new THREE.EdgesGeometry(wallGeo), new THREE.LineBasicMaterial({ color: 0xbbf7d0, linewidth: 2 })));
    for (let x = -0.8; x <= 0.8; x += 0.8) {
      const groove = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.62, 0.47), new THREE.MeshBasicMaterial({ color: 0x365314 }));
      groove.position.x = x;
      g.add(groove);
    }
  } else if (stage === 2) {
    const mitoMesh = new THREE.Mesh(new THREE.CapsuleGeometry(0.75, 1.4, 16, 32), new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.25, transparent: true, opacity: 0.9, emissive: 0xc2410c, emissiveIntensity: 0.45 }));
    mitoMesh.rotation.z = Math.PI / 3;
    g.add(mitoMesh);
    for (let i = -0.5; i <= 0.5; i += 0.25) {
      const crista = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.09, 8, 20, Math.PI), new THREE.MeshStandardMaterial({ color: 0xfef08a, emissive: 0xeab308, emissiveIntensity: 0.8 }));
      crista.position.set(i, i * 0.4, 0);
      crista.rotation.x = Math.PI / 2;
      g.add(crista);
    }
  } else if (stage === 3) {
    g.add(new THREE.Mesh(new THREE.SphereGeometry(1.2, 32, 32), new THREE.MeshStandardMaterial({ color: 0x9333ea, roughness: 0.35, metalness: 0.15, emissive: 0x581c87, emissiveIntensity: 0.4 })));
    for (let i = 0; i < 14; i++) {
      const pore = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.04, 8, 12), new THREE.MeshBasicMaterial({ color: 0xfef08a }));
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      pore.position.set(1.22 * Math.sin(phi) * Math.cos(theta), 1.22 * Math.sin(phi) * Math.sin(theta), 1.22 * Math.cos(phi));
      pore.lookAt(0, 0, 0);
      g.add(pore);
    }
    const nucleolus = new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 16), new THREE.MeshStandardMaterial({ color: 0xf472b6, emissive: 0xdb2777, emissiveIntensity: 0.5 }));
    nucleolus.position.set(0.2, 0.15, 0);
    g.add(nucleolus);
  } else if (stage === 4) {
    const disc = new THREE.Mesh(new THREE.SphereGeometry(1.2, 32, 32), new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.3, metalness: 0.1, emissive: 0x166534, emissiveIntensity: 0.35 }));
    disc.scale.set(1.5, 0.55, 1.0);
    g.add(disc);
    for (let i = -0.6; i <= 0.6; i += 0.35) {
      const granum = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.08, 16), new THREE.MeshStandardMaterial({ color: 0xbbf7d0, emissive: 0x86efac, emissiveIntensity: 0.6 }));
      granum.position.set(i, 0, i * 0.3);
      g.add(granum);
    }
  } else if (stage === 5) {
    g.add(new THREE.Mesh(new THREE.SphereGeometry(1.4, 32, 32), new THREE.MeshStandardMaterial({ color: 0x7dd3fc, roughness: 0.1, metalness: 0.2, transparent: true, opacity: 0.65, emissive: 0x38bdf8, emissiveIntensity: 0.3 })));
    g.add(new THREE.Mesh(new THREE.SphereGeometry(1.15, 24, 24), new THREE.MeshStandardMaterial({ color: 0xbae6fd, roughness: 0.2, transparent: true, opacity: 0.35, emissive: 0x0ea5e9, emissiveIntensity: 0.3 })));
  } else if (stage === 6) {
    g.add(new THREE.Mesh(new THREE.SphereGeometry(1.2, 24, 24), new THREE.MeshStandardMaterial({ color: 0xfef9c3, roughness: 0.5, transparent: true, opacity: 0.5, emissive: 0xfde68a, emissiveIntensity: 0.35 })));
    for (let r = 0; r < 28; r++) {
      const ribo = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), new THREE.MeshBasicMaterial({ color: 0xfef08a }));
      ribo.position.set((Math.random() - 0.5) * 1.6, (Math.random() - 0.5) * 1.6, (Math.random() - 0.5) * 1.6);
      g.add(ribo);
    }
  }
  return g;
}

/**
 * Builds a cute, stylized 3D kid racer seated inside the kart cockpit.
 */
function buildChildRacer(team = "blue") {
  const racer = new THREE.Group();
  const isBlue = team === "blue";

  const torsoMat = new THREE.MeshStandardMaterial({ color: isBlue ? 0x1d4ed8 : 0xb91c1c, roughness: 0.3, metalness: 0.1 });
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.44, 0.7, 16), torsoMat);
  torso.position.set(0, 0.65, 0.1);
  racer.add(torso);

  const badge = new THREE.Mesh(new THREE.CircleGeometry(0.14, 16), new THREE.MeshBasicMaterial({ color: isBlue ? 0x86efac : 0xfda4af }));
  badge.position.set(0, 0.7, 0.32);
  racer.add(badge);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.36, 24, 24), new THREE.MeshStandardMaterial({ color: 0xfbd38d, roughness: 0.5 }));
  head.position.set(0, 1.25, 0.1);
  racer.add(head);

  if (isBlue) {
    const hair = new THREE.Mesh(new THREE.SphereGeometry(0.38, 16, 16, 0, Math.PI * 2, 0, Math.PI / 1.7), new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.7 }));
    hair.position.set(0, 1.28, 0.1);
    racer.add(hair);
    const visor = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.06, 8, 20, Math.PI), new THREE.MeshStandardMaterial({ color: 0x00f0ff, emissive: 0x00f0ff, emissiveIntensity: 0.6 }));
    visor.rotation.x = Math.PI / 1.8;
    visor.position.set(0, 1.35, 0.05);
    racer.add(visor);
  } else {
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x5c2b16, roughness: 0.7 });
    const hair = new THREE.Mesh(new THREE.SphereGeometry(0.38, 16, 16, 0, Math.PI * 2, 0, Math.PI / 1.8), hairMat);
    hair.position.set(0, 1.28, 0.1);
    racer.add(hair);
    const pony = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.5, 12), hairMat);
    pony.rotation.x = -Math.PI / 2.2;
    pony.position.set(0, 1.35, 0.5);
    racer.add(pony);
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.04, 8, 16), new THREE.MeshBasicMaterial({ color: 0xff2a6d }));
    band.position.set(0, 1.38, 0.38);
    racer.add(band);
  }

  const armL = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.45, 12), torsoMat);
  armL.rotation.x = Math.PI / 2.6; armL.rotation.z = Math.PI / 6; armL.position.set(-0.35, 0.65, -0.2);
  racer.add(armL);
  const armR = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.45, 12), torsoMat);
  armR.rotation.x = Math.PI / 2.6; armR.rotation.z = -Math.PI / 6; armR.position.set(0.35, 0.65, -0.2);
  racer.add(armR);

  const wheelGroup = new THREE.Group();
  wheelGroup.position.set(0, 0.75, -0.45);
  wheelGroup.rotation.x = -Math.PI / 4;
  wheelGroup.add(new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.04, 8, 24), new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.5 })));
  const wc = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.04, 12), new THREE.MeshBasicMaterial({ color: isBlue ? 0x00f0ff : 0xff2a6d }));
  wc.rotation.x = Math.PI / 2;
  wheelGroup.add(wc);
  racer.add(wheelGroup);

  return { racerGroup: racer, head, wheelGroup };
}

// ─── Constants ───────────────────────────────────────────────
const BLUE_HOME = new THREE.Vector3(-3.2, 1.3, 0);
const RED_HOME  = new THREE.Vector3( 3.2, 1.3, 0);
const TRACK_HALF_W = 6.0;
const TRACK_Z_MIN = -28;
const TRACK_Z_MAX = 6;
const KEY_SPEED = 4.5; // units/sec

export default function CellRaceArena3D({
  currentStage = 1,
  blueProgress = 0,
  redProgress = 0,
  winnerTeam = null,
  blueLocked = false,
  redLocked = false,
}) {
  const mountRef = useRef(null);
  const animFrameRef = useRef(null);
  const blueCellRef = useRef(null);
  const redCellRef = useRef(null);
  const blueChildRef = useRef(null);
  const redChildRef = useRef(null);
  const targetOrganelleRef = useRef(null);
  const pedestalRef = useRef(null);
  const shockwaveRef = useRef(null);
  const clockRef = useRef(null);
  const keysRef = useRef(new Set());

  const slowMoStateRef = useRef({ active: false, winner: null, startTime: 0, duration: 3.5 });
  const returnAnimRef = useRef({ active: false });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xbae6fd, 0.012);
    const camera = new THREE.PerspectiveCamera(52, width / height, 0.1, 1000);
    camera.position.set(0, 5.5, 13.5);
    camera.lookAt(0, 1.8, -6);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 1.5));
    const sun = new THREE.DirectionalLight(0xfffbeb, 2.4); sun.position.set(8, 20, 10); scene.add(sun);
    const sky = new THREE.DirectionalLight(0x38bdf8, 1.2); sky.position.set(-8, 14, 6); scene.add(sky);
    const spot = new THREE.PointLight(0x00f0ff, 3.5, 20); spot.position.set(0, 5, -12); scene.add(spot);

    // Track
    const trackW = 14, trackL = 120;
    const track = new THREE.Mesh(new THREE.PlaneGeometry(trackW, trackL, 24, 60), new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.35, metalness: 0.3 }));
    track.rotation.x = -Math.PI / 2; track.position.set(0, 0, -30); scene.add(track);
    for (let z = 10; z > -70; z -= 5) {
      const s = new THREE.Mesh(new THREE.PlaneGeometry(0.35, 2.5), new THREE.MeshBasicMaterial({ color: 0xffffff }));
      s.rotation.x = -Math.PI / 2; s.position.set(0, 0.03, z); scene.add(s);
    }
    const curbGeo = new THREE.BoxGeometry(0.5, 0.7, trackL);
    const lc = new THREE.Mesh(curbGeo, new THREE.MeshStandardMaterial({ color: 0x0284c7, emissive: 0x00f0ff, emissiveIntensity: 0.6 }));
    lc.position.set(-trackW / 2, 0.35, -30); scene.add(lc);
    const rc = new THREE.Mesh(curbGeo, new THREE.MeshStandardMaterial({ color: 0xe11d48, emissive: 0xff2a6d, emissiveIntensity: 0.6 }));
    rc.position.set(trackW / 2, 0.35, -30); scene.add(rc);

    // Finish arch
    const archMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8 });
    const aL = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 8), archMat); aL.position.set(-6, 4, -28); scene.add(aL);
    const aR = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 8), archMat); aR.position.set(6, 4, -28); scene.add(aR);
    const aT = new THREE.Mesh(new THREE.BoxGeometry(12.6, 0.8, 0.8), archMat); aT.position.set(0, 7.8, -28); scene.add(aT);

    // Pedestal
    const pedestal = new THREE.Group(); pedestal.position.set(0, 0.05, -12);
    pedestal.add(new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.7, 0.3, 32), new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8, roughness: 0.2 })));
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.12, 16, 40), new THREE.MeshStandardMaterial({ color: 0x00f0ff, emissive: 0x00f0ff, emissiveIntensity: 1.0 }));
    ring.rotation.x = Math.PI / 2; ring.position.y = 0.18; pedestal.add(ring);
    scene.add(pedestal); pedestalRef.current = pedestal;

    // Organelle
    const orgModel = buildOrganelleModel(currentStage);
    orgModel.position.set(0, 2.5, -12); scene.add(orgModel); targetOrganelleRef.current = orgModel;

    // Shockwave
    const swMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0, side: THREE.DoubleSide });
    const sw = new THREE.Mesh(new THREE.RingGeometry(0.5, 1.4, 32), swMat);
    sw.rotation.x = -Math.PI / 2; sw.position.set(0, 0.3, -12); scene.add(sw); shockwaveRef.current = sw;

    // Blue racer
    const blueG = new THREE.Group();
    const blueBody = new THREE.Mesh(new THREE.SphereGeometry(1.3, 24, 24), new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.2, metalness: 0.5, emissive: 0x1d4ed8, emissiveIntensity: 0.3 }));
    blueBody.scale.set(1.3, 0.85, 2.0); blueG.add(blueBody);
    const bSp = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.1, 0.5), new THREE.MeshStandardMaterial({ color: 0x1e3a8a, metalness: 0.8 }));
    bSp.position.set(0, 0.85, 1.7); blueG.add(bSp);
    const boyData = buildChildRacer("blue"); boyData.racerGroup.position.set(0, 0.25, 0.2); blueG.add(boyData.racerGroup); blueChildRef.current = boyData;
    const thrGeo = new THREE.CylinderGeometry(0.22, 0.32, 1.0, 16);
    const thrMat = new THREE.MeshStandardMaterial({ color: 0x00f0ff, emissive: 0x00f0ff, emissiveIntensity: 0.8 });
    const bTL = new THREE.Mesh(thrGeo, thrMat); bTL.rotation.x = Math.PI / 2; bTL.position.set(-0.75, 0, 1.8); blueG.add(bTL);
    const bTR = new THREE.Mesh(thrGeo, thrMat); bTR.rotation.x = Math.PI / 2; bTR.position.set(0.75, 0, 1.8); blueG.add(bTR);
    blueG.position.copy(BLUE_HOME); scene.add(blueG); blueCellRef.current = blueG;

    // Red racer
    const redG = new THREE.Group();
    const redBody = new THREE.Mesh(new THREE.SphereGeometry(1.3, 24, 24), new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.2, metalness: 0.5, emissive: 0xb91c1c, emissiveIntensity: 0.3 }));
    redBody.scale.set(1.3, 0.85, 2.0); redG.add(redBody);
    const rSp = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.1, 0.5), new THREE.MeshStandardMaterial({ color: 0x881337, metalness: 0.8 }));
    rSp.position.set(0, 0.85, 1.7); redG.add(rSp);
    const girlData = buildChildRacer("red"); girlData.racerGroup.position.set(0, 0.25, 0.2); redG.add(girlData.racerGroup); redChildRef.current = girlData;
    const rThrMat = new THREE.MeshStandardMaterial({ color: 0xff2a6d, emissive: 0xff2a6d, emissiveIntensity: 0.8 });
    const rTL = new THREE.Mesh(thrGeo, rThrMat); rTL.rotation.x = Math.PI / 2; rTL.position.set(-0.75, 0, 1.8); redG.add(rTL);
    const rTR = new THREE.Mesh(thrGeo, rThrMat); rTR.rotation.x = Math.PI / 2; rTR.position.set(0.75, 0, 1.8); redG.add(rTR);
    redG.position.copy(RED_HOME); scene.add(redG); redCellRef.current = redG;

    // Keyboard
    const onKeyDown = (e) => keysRef.current.add(e.key.toLowerCase());
    const onKeyUp   = (e) => keysRef.current.delete(e.key.toLowerCase());
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    // Animation
    const clock = new THREE.Clock();
    clockRef.current = clock;
    let prevTime = 0;

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const delta = Math.min(t - prevTime, 0.05); // cap delta to avoid huge jumps
      prevTime = t;
      const keys = keysRef.current;
      const mv = KEY_SPEED * delta;

      // ── Keyboard controls (always active) ──
      if (blueCellRef.current) {
        const bp = blueCellRef.current.position;
        if (keys.has("w")) bp.z = Math.max(TRACK_Z_MIN, bp.z - mv);
        if (keys.has("s")) bp.z = Math.min(TRACK_Z_MAX, bp.z + mv);
        if (keys.has("a")) bp.x = Math.max(-TRACK_HALF_W, bp.x - mv);
        if (keys.has("d")) bp.x = Math.min(TRACK_HALF_W, bp.x + mv);
      }
      if (redCellRef.current) {
        const rp = redCellRef.current.position;
        if (keys.has("arrowup"))    rp.z = Math.max(TRACK_Z_MIN, rp.z - mv);
        if (keys.has("arrowdown"))  rp.z = Math.min(TRACK_Z_MAX, rp.z + mv);
        if (keys.has("arrowleft"))  rp.x = Math.max(-TRACK_HALF_W, rp.x - mv);
        if (keys.has("arrowright")) rp.x = Math.min(TRACK_HALF_W, rp.x + mv);
      }

      // Organelle hover
      if (targetOrganelleRef.current && !slowMoStateRef.current.active) {
        targetOrganelleRef.current.rotation.y = t * 1.2;
        targetOrganelleRef.current.position.y = 2.5 + Math.sin(t * 2.5) * 0.2;
      }

      // ── CINEMATIC SLOW-MO ──
      if (slowMoStateRef.current.active) {
        const elapsed = t - slowMoStateRef.current.startTime;
        const isBlue = slowMoStateRef.current.winner === "blue";
        const winner = isBlue ? blueCellRef.current : redCellRef.current;
        const child  = isBlue ? blueChildRef.current : redChildRef.current;
        const loser  = isBlue ? redCellRef.current : blueCellRef.current;

        // Phase 1: smooth surge (lerp, never teleport)
        const surge = Math.min(1.0, elapsed / 3.0);
        const ease = 1 - Math.pow(1 - surge, 3);

        if (winner) {
          const tgtZ = -9.5 * ease;
          const home = isBlue ? BLUE_HOME : RED_HOME;
          const tgtX = home.x + (0 - home.x) * ease * 0.6;
          winner.position.x += (tgtX - winner.position.x) * 0.06;
          winner.position.z += (tgtZ - winner.position.z) * 0.06;
          winner.position.y = home.y + Math.sin(elapsed * 4.0) * 0.06;

          if (child && child.head) {
            child.head.position.y = 1.25 + Math.sin(elapsed * 6.0) * 0.08;
            child.wheelGroup.rotation.z = Math.sin(elapsed * 4.0) * 0.3;
          }
        }
        if (loser) {
          const lz = 1.5 * ease;
          loser.position.z += (lz - loser.position.z) * 0.04;
        }

        // Phase 2: absorption
        if (targetOrganelleRef.current && elapsed > 1.5) {
          const ap = Math.min(1.0, (elapsed - 1.5) / 2.0);
          const ea = Math.pow(ap, 2);
          if (winner) {
            targetOrganelleRef.current.position.lerp(winner.position, 0.06);
            const sc = Math.max(0.01, 1.0 - ea);
            targetOrganelleRef.current.scale.set(sc, sc, sc);
            targetOrganelleRef.current.rotation.y += 0.12;
          }
          if (shockwaveRef.current && winner) {
            shockwaveRef.current.position.copy(winner.position);
            shockwaveRef.current.position.y = 0.35;
            shockwaveRef.current.scale.set(1 + ap * 4.5, 1 + ap * 4.5, 1);
            shockwaveRef.current.material.opacity = Math.max(0, (1 - ap) * 0.9);
            shockwaveRef.current.material.color.set(isBlue ? 0x00f0ff : 0xff2a6d);
          }
        }
      }
      // ── SMOOTH RETURN ──
      else if (returnAnimRef.current.active) {
        let done = true;
        if (blueCellRef.current) {
          blueCellRef.current.position.lerp(BLUE_HOME, 0.05);
          if (blueCellRef.current.position.distanceTo(BLUE_HOME) > 0.05) done = false;
        }
        if (redCellRef.current) {
          redCellRef.current.position.lerp(RED_HOME, 0.05);
          if (redCellRef.current.position.distanceTo(RED_HOME) > 0.05) done = false;
        }
        if (done) {
          returnAnimRef.current.active = false;
          if (blueCellRef.current) blueCellRef.current.position.copy(BLUE_HOME);
          if (redCellRef.current) redCellRef.current.position.copy(RED_HOME);
        }
      }
      // ── IDLE bob ──
      else {
        if (blueCellRef.current) blueCellRef.current.position.y = BLUE_HOME.y + Math.sin(t * 2.5) * 0.06;
        if (redCellRef.current) redCellRef.current.position.y = RED_HOME.y + Math.cos(t * 2.5) * 0.06;
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth, h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (renderer.domElement && container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [currentStage]);

  // Trigger slow-mo on correct answer
  useEffect(() => {
    if (winnerTeam && targetOrganelleRef.current && clockRef.current) {
      slowMoStateRef.current = {
        active: true,
        winner: winnerTeam,
        startTime: clockRef.current.getElapsedTime(), // SAME clock as animation loop!
        duration: 3.5,
      };
      returnAnimRef.current.active = false;
    } else {
      slowMoStateRef.current = { active: false, winner: null, startTime: 0, duration: 3.5 };
      returnAnimRef.current.active = true;
      if (targetOrganelleRef.current) {
        targetOrganelleRef.current.position.set(0, 2.5, -12);
        targetOrganelleRef.current.scale.set(1, 1, 1);
      }
      if (shockwaveRef.current) shockwaveRef.current.material.opacity = 0;
    }
  }, [winnerTeam]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: "260px", borderRadius: "24px", overflow: "hidden", background: "linear-gradient(180deg, #7dd3fc 0%, #38bdf8 30%, #e0f2fe 100%)", boxShadow: "inset 0 0 50px rgba(0,0,0,0.15)" }}>
      <div ref={mountRef} style={{ width: "100%", height: "100%", minHeight: "260px" }} />
      {/* Keyboard legend */}
      <div style={{ position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "24px", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", borderRadius: "12px", padding: "6px 16px", fontSize: "0.72rem", fontWeight: 700, color: "#e2e8f0", pointerEvents: "none" }}>
        <span style={{ color: "#38bdf8" }}>🔵 WASD — Blue</span>
        <span style={{ color: "#64748b" }}>|</span>
        <span style={{ color: "#fda4af" }}>🔴 ↑↓←→ — Red</span>
      </div>
    </div>
  );
}
