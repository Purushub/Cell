"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// =========================================================================
// PROCEDURAL 3D BUILDERS FOR FLORA (LEFT SIDE) & FAUNA (RIGHT SIDE)
// =========================================================================

/**
 * 1. PINE TREE: Sturdy trunk + 3-tiered conical evergreen canopies
 */
function buildPineTree() {
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.28, 0.45, 3.8, 10),
    new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.9 })
  );
  trunk.position.y = 1.9;
  g.add(trunk);

  const coneColors = [0x14532d, 0x166534, 0x15803d, 0x22c55e];
  for (let i = 0; i < 4; i++) {
    const cone = new THREE.Mesh(
      new THREE.ConeGeometry(1.9 - i * 0.38, 1.8, 10),
      new THREE.MeshStandardMaterial({
        color: coneColors[i],
        roughness: 0.65,
        emissive: 0x052e16,
        emissiveIntensity: 0.2,
      })
    );
    cone.position.y = 2.8 + i * 0.95;
    g.add(cone);
  }
  return g;
}

/**
 * 2. SUNFLOWER: Curved green stem, leaf blades, golden petal ring & dark seed core
 */
function buildSunflower() {
  const g = new THREE.Group();
  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.1, 2.2, 8),
    new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.7 })
  );
  stem.position.y = 1.1;
  g.add(stem);

  // Leaves
  for (let i = 0; i < 2; i++) {
    const leaf = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 8, 8),
      new THREE.MeshStandardMaterial({ color: 0x22c55e })
    );
    leaf.scale.set(1.4, 0.2, 0.6);
    leaf.position.set(i === 0 ? 0.3 : -0.3, 0.8 + i * 0.4, 0);
    leaf.rotation.z = i === 0 ? -0.4 : 0.4;
    g.add(leaf);
  }

  // Flower Head Group (tilts to face center/sun)
  const head = new THREE.Group();
  head.name = "sunflowerHead";
  head.position.set(0, 2.2, 0.1);
  head.rotation.x = 0.25;

  // Dark brown seed center
  const center = new THREE.Mesh(
    new THREE.CylinderGeometry(0.38, 0.38, 0.12, 16),
    new THREE.MeshStandardMaterial({ color: 0x3f1d08, roughness: 0.9 })
  );
  center.rotation.x = Math.PI / 2;
  head.add(center);

  // Golden petal disc
  const petalCount = 14;
  for (let i = 0; i < petalCount; i++) {
    const angle = (i / petalCount) * Math.PI * 2;
    const petal = new THREE.Mesh(
      new THREE.ConeGeometry(0.14, 0.5, 6),
      new THREE.MeshStandardMaterial({
        color: 0xfacc15,
        emissive: 0xeab308,
        emissiveIntensity: 0.3,
      })
    );
    petal.position.set(Math.cos(angle) * 0.48, Math.sin(angle) * 0.48, 0);
    petal.rotation.z = angle - Math.PI / 2;
    head.add(petal);
  }
  g.add(head);
  return g;
}

/**
 * 3. OAK TREE: Gnarly trunk + clustered lush rounded foliage canopies
 */
function buildOakTree() {
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.4, 0.65, 3.4, 10),
    new THREE.MeshStandardMaterial({ color: 0x5c2b0e, roughness: 0.9 })
  );
  trunk.position.y = 1.7;
  g.add(trunk);

  const foliageCoords = [
    [0, 3.6, 0, 1.4],
    [-0.7, 3.3, 0.3, 1.1],
    [0.7, 3.4, -0.3, 1.1],
    [0.2, 4.3, 0.1, 1.0],
    [-0.3, 3.1, -0.6, 0.9],
  ];
  foliageCoords.forEach(([x, y, z, r]) => {
    const puff = new THREE.Mesh(
      new THREE.SphereGeometry(r, 12, 12),
      new THREE.MeshStandardMaterial({
        color: 0x16a34a,
        roughness: 0.7,
        emissive: 0x14532d,
        emissiveIntensity: 0.2,
      })
    );
    puff.position.set(x, y, z);
    g.add(puff);
  });
  return g;
}

/**
 * 4. TULIP / WILD ROSE FLOWER: Vibrant red cup blossom on slender stem
 */
function buildTulipFlower() {
  const g = new THREE.Group();
  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.08, 1.6, 8),
    new THREE.MeshStandardMaterial({ color: 0x16a34a })
  );
  stem.position.y = 0.8;
  g.add(stem);

  // Cup blossom
  const flower = new THREE.Group();
  flower.name = "tulipFlower";
  flower.position.y = 1.6;

  const cup = new THREE.Mesh(
    new THREE.CylinderGeometry(0.28, 0.14, 0.45, 12, 1, true),
    new THREE.MeshStandardMaterial({
      color: 0xe11d48,
      emissive: 0xbe123c,
      emissiveIntensity: 0.4,
      side: THREE.DoubleSide,
    })
  );
  flower.add(cup);

  const stamen = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0xfef08a })
  );
  flower.add(stamen);
  g.add(flower);
  return g;
}

/**
 * 5. WILLOW TREE: Graceful trunk with cascading drooping foliage vines
 */
function buildWillowTree() {
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.35, 0.55, 3.6, 10),
    new THREE.MeshStandardMaterial({ color: 0x713f12, roughness: 0.85 })
  );
  trunk.position.y = 1.8;
  trunk.rotation.z = -0.1;
  g.add(trunk);

  const crown = new THREE.Mesh(
    new THREE.SphereGeometry(1.3, 12, 12),
    new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.7 })
  );
  crown.position.set(-0.2, 3.6, 0);
  g.add(crown);

  // Cascading willow strands
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const strand = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.03, 1.8, 6),
      new THREE.MeshStandardMaterial({ color: 0x86efac, transparent: true, opacity: 0.9 })
    );
    strand.position.set(-0.2 + Math.cos(angle) * 1.1, 2.6, Math.sin(angle) * 1.1);
    g.add(strand);
  }
  return g;
}

/**
 * 6. LAVENDER / FERN: Clustered violet spikes & arching emerald ferns
 */
function buildLavenderFern() {
  const g = new THREE.Group();
  // Fern leaves
  for (let i = 0; i < 4; i++) {
    const ang = (i / 4) * Math.PI * 2;
    const fern = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.9, 0.04),
      new THREE.MeshStandardMaterial({ color: 0x10b981 })
    );
    fern.position.set(Math.cos(ang) * 0.35, 0.45, Math.sin(ang) * 0.35);
    fern.rotation.z = Math.cos(ang) * 0.4;
    fern.rotation.x = Math.sin(ang) * 0.4;
    g.add(fern);
  }
  // 3 Lavender flower spikes
  for (let i = 0; i < 3; i++) {
    const ang = (i / 3) * Math.PI * 2 + 0.3;
    const spike = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.08, 0.6, 6, 8),
      new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        emissive: 0x7e22ce,
        emissiveIntensity: 0.3,
      })
    );
    spike.position.set(Math.cos(ang) * 0.25, 0.7, Math.sin(ang) * 0.25);
    g.add(spike);
  }
  return g;
}

/**
 * 7. REDWOOD & LOTUS: Giant ancient sequoia + glowing pink lotus blossom
 */
function buildRedwoodLotus() {
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.65, 0.95, 6.0, 12),
    new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.9 })
  );
  trunk.position.y = 3.0;
  g.add(trunk);

  const canopy = new THREE.Mesh(
    new THREE.ConeGeometry(2.0, 3.5, 10),
    new THREE.MeshStandardMaterial({ color: 0x065f46, roughness: 0.6 })
  );
  canopy.position.y = 6.2;
  g.add(canopy);

  // Lotus Flower near base
  const lotus = new THREE.Mesh(
    new THREE.TorusGeometry(0.35, 0.12, 8, 16),
    new THREE.MeshStandardMaterial({
      color: 0xf472b6,
      emissive: 0xdb2777,
      emissiveIntensity: 0.5,
    })
  );
  lotus.rotation.x = -Math.PI / 2;
  lotus.position.set(1.1, 0.15, 0.4);
  g.add(lotus);
  return g;
}

// -------------------------------------------------------------------------
// ANIMAL BUILDERS (RIGHT SIDE)
// -------------------------------------------------------------------------

/**
 * A. DOG: Friendly caramel pup with 4 legs, floppy ears & wagging tail
 */
function buildDog() {
  const g = new THREE.Group();
  g.name = "dogCreature";

  // Body
  const body = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.28, 0.55, 8, 12),
    new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.6 })
  );
  body.rotation.z = Math.PI / 2;
  body.position.y = 0.55;
  g.add(body);

  // 4 Legs
  const legPositions = [
    [-0.24, 0.25, 0.2],
    [0.24, 0.25, 0.2],
    [-0.24, 0.25, -0.2],
    [0.24, 0.25, -0.2],
  ];
  legPositions.forEach(([lx, ly, lz]) => {
    const leg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.45, 6),
      new THREE.MeshStandardMaterial({ color: 0xb45309 })
    );
    leg.position.set(lx, ly, lz);
    g.add(leg);
  });

  // Head & Snout
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 10, 10),
    new THREE.MeshStandardMaterial({ color: 0xd97706 })
  );
  head.position.set(-0.35, 0.8, 0);
  g.add(head);

  const snout = new THREE.Mesh(
    new THREE.BoxGeometry(0.18, 0.12, 0.14),
    new THREE.MeshStandardMaterial({ color: 0xfde68a })
  );
  snout.position.set(-0.5, 0.76, 0);
  g.add(snout);

  const nose = new THREE.Mesh(
    new THREE.SphereGeometry(0.04, 6, 6),
    new THREE.MeshBasicMaterial({ color: 0x0f172a })
  );
  nose.position.set(-0.6, 0.79, 0);
  g.add(nose);

  // Floppy Ears
  [-0.15, 0.15].forEach((ez) => {
    const ear = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.18, 0.05),
      new THREE.MeshStandardMaterial({ color: 0x78350f })
    );
    ear.position.set(-0.32, 0.88, ez);
    ear.rotation.x = ez > 0 ? 0.4 : -0.4;
    g.add(ear);
  });

  // Wagging Tail
  const tail = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.02, 0.35, 6),
    new THREE.MeshStandardMaterial({ color: 0xd97706 })
  );
  tail.name = "dogTail";
  tail.position.set(0.38, 0.7, 0);
  tail.rotation.z = -0.8;
  g.add(tail);

  return g;
}

/**
 * B. ELEPHANT: Sturdy grey body, 4 pillar legs, big ears, ivory tusks & swinging trunk
 */
function buildElephant() {
  const g = new THREE.Group();
  g.name = "elephantCreature";

  // Body
  const body = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.65, 0.85, 10, 16),
    new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.8 })
  );
  body.rotation.z = Math.PI / 2;
  body.position.y = 1.1;
  g.add(body);

  // 4 Pillar Legs
  const legCoords = [
    [-0.4, 0.45, 0.4],
    [0.4, 0.45, 0.4],
    [-0.4, 0.45, -0.4],
    [0.4, 0.45, -0.4],
  ];
  legCoords.forEach(([lx, ly, lz]) => {
    const leg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.16, 0.9, 8),
      new THREE.MeshStandardMaterial({ color: 0x475569 })
    );
    leg.position.set(lx, ly, lz);
    g.add(leg);
  });

  // Head
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.45, 12, 12),
    new THREE.MeshStandardMaterial({ color: 0x64748b })
  );
  head.position.set(-0.65, 1.45, 0);
  g.add(head);

  // Big Fan Ears
  [-0.42, 0.42].forEach((ez) => {
    const ear = new THREE.Mesh(
      new THREE.CylinderGeometry(0.32, 0.32, 0.05, 12),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8 })
    );
    ear.rotation.x = Math.PI / 2;
    ear.position.set(-0.65, 1.55, ez);
    g.add(ear);
  });

  // Ivory Tusks
  [-0.18, 0.18].forEach((tz) => {
    const tusk = new THREE.Mesh(
      new THREE.ConeGeometry(0.06, 0.4, 6),
      new THREE.MeshStandardMaterial({ color: 0xfffff0, roughness: 0.2 })
    );
    tusk.position.set(-0.95, 1.25, tz);
    tusk.rotation.z = Math.PI / 3;
    g.add(tusk);
  });

  // Curved Trunk
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.06, 0.9, 8),
    new THREE.MeshStandardMaterial({ color: 0x64748b })
  );
  trunk.name = "elephantTrunk";
  trunk.position.set(-0.95, 0.95, 0);
  trunk.rotation.z = 0.25;
  g.add(trunk);

  return g;
}

/**
 * C. FOX: Slender reddish-orange body, pointy triangular ears & fluffy white-tipped tail
 */
function buildFox() {
  const g = new THREE.Group();
  g.name = "foxCreature";

  // Body
  const body = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.2, 0.45, 8, 12),
    new THREE.MeshStandardMaterial({ color: 0xea580c, roughness: 0.6 })
  );
  body.rotation.z = Math.PI / 2;
  body.position.y = 0.45;
  g.add(body);

  // Legs
  [
    [-0.18, 0.2, 0.14],
    [0.18, 0.2, 0.14],
    [-0.18, 0.2, -0.14],
    [0.18, 0.2, -0.14],
  ].forEach(([lx, ly, lz]) => {
    const leg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.38, 6),
      new THREE.MeshStandardMaterial({ color: 0x431407 })
    );
    leg.position.set(lx, ly, lz);
    g.add(leg);
  });

  // Head & Snout
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.16, 8, 8),
    new THREE.MeshStandardMaterial({ color: 0xea580c })
  );
  head.position.set(-0.28, 0.65, 0);
  g.add(head);

  const snout = new THREE.Mesh(
    new THREE.ConeGeometry(0.08, 0.22, 6),
    new THREE.MeshStandardMaterial({ color: 0xffedd5 })
  );
  snout.position.set(-0.42, 0.62, 0);
  snout.rotation.z = Math.PI / 2;
  g.add(snout);

  // Pointy Ears
  [-0.1, 0.1].forEach((ez) => {
    const ear = new THREE.Mesh(
      new THREE.ConeGeometry(0.06, 0.16, 4),
      new THREE.MeshBasicMaterial({ color: 0x1e293b })
    );
    ear.position.set(-0.25, 0.8, ez);
    g.add(ear);
  });

  // Bushy Tail with white tip
  const tail = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.1, 0.35, 6, 8),
    new THREE.MeshStandardMaterial({ color: 0xea580c })
  );
  tail.name = "foxTail";
  tail.position.set(0.3, 0.55, 0);
  tail.rotation.z = -0.7;
  g.add(tail);

  const tailTip = new THREE.Mesh(
    new THREE.SphereGeometry(0.08, 6, 6),
    new THREE.MeshStandardMaterial({ color: 0xffedd5 })
  );
  tailTip.position.set(0.46, 0.68, 0);
  g.add(tailTip);

  return g;
}

/**
 * D. GIRAFFE: Patterned yellow-orange body, tall slender legs, graceful long neck & ossicones
 */
function buildGiraffe() {
  const g = new THREE.Group();
  g.name = "giraffeCreature";

  // Body
  const body = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.35, 0.6, 8, 12),
    new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.6 })
  );
  body.rotation.z = Math.PI / 2.3;
  body.position.y = 1.6;
  g.add(body);

  // Tall Legs
  [
    [-0.25, 0.75, 0.2],
    [0.25, 0.75, 0.2],
    [-0.25, 0.75, -0.2],
    [0.25, 0.75, -0.2],
  ].forEach(([lx, ly, lz]) => {
    const leg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.07, 0.05, 1.5, 6),
      new THREE.MeshStandardMaterial({ color: 0xd97706 })
    );
    leg.position.set(lx, ly, lz);
    g.add(leg);
  });

  // Neck
  const neck = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.18, 1.8, 8),
    new THREE.MeshStandardMaterial({ color: 0xf59e0b })
  );
  neck.name = "giraffeNeck";
  neck.position.set(-0.35, 2.6, 0);
  neck.rotation.z = 0.18;
  g.add(neck);

  // Head
  const head = new THREE.Mesh(
    new THREE.BoxGeometry(0.24, 0.18, 0.16),
    new THREE.MeshStandardMaterial({ color: 0xf59e0b })
  );
  head.position.set(-0.52, 3.5, 0);
  g.add(head);

  // 2 Ossicones (little horns)
  [-0.06, 0.06].forEach((hz) => {
    const horn = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 0.18, 6),
      new THREE.MeshBasicMaterial({ color: 0x78350f })
    );
    horn.position.set(-0.5, 3.65, hz);
    g.add(horn);
  });

  return g;
}

/**
 * E. RHINO: Armored pewter-grey heavy body with sharp ivory snout horns
 */
function buildRhino() {
  const g = new THREE.Group();
  g.name = "rhinoCreature";

  // Body
  const body = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.48, 0.75, 8, 14),
    new THREE.MeshStandardMaterial({ color: 0x4b5563, roughness: 0.85 })
  );
  body.rotation.z = Math.PI / 2;
  body.position.y = 0.8;
  g.add(body);

  // 4 Stocky Legs
  [
    [-0.3, 0.35, 0.3],
    [0.3, 0.35, 0.3],
    [-0.3, 0.35, -0.3],
    [0.3, 0.35, -0.3],
  ].forEach(([lx, ly, lz]) => {
    const leg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.11, 0.7, 6),
      new THREE.MeshStandardMaterial({ color: 0x374151 })
    );
    leg.position.set(lx, ly, lz);
    g.add(leg);
  });

  // Head
  const head = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 0.32, 0.28),
    new THREE.MeshStandardMaterial({ color: 0x4b5563 })
  );
  head.position.set(-0.55, 1.0, 0);
  g.add(head);

  // Sharp Horns
  const hornFront = new THREE.Mesh(
    new THREE.ConeGeometry(0.08, 0.4, 8),
    new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.3 })
  );
  hornFront.position.set(-0.8, 1.15, 0);
  hornFront.rotation.z = Math.PI / 3;
  g.add(hornFront);

  const hornBack = new THREE.Mesh(
    new THREE.ConeGeometry(0.06, 0.22, 8),
    new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.3 })
  );
  hornBack.position.set(-0.68, 1.2, 0);
  hornBack.rotation.z = Math.PI / 3.5;
  g.add(hornBack);

  return g;
}

/**
 * F. BIRDS: Colorful songbirds with flapping wings orbiting overhead
 */
function buildBirdFlock() {
  const flock = new THREE.Group();
  flock.name = "birdFlock";

  const colors = [0x0284c7, 0xef4444, 0x10b981];
  const offsets = [
    [0, 0, 0],
    [0.6, 0.25, -0.4],
    [-0.5, -0.2, 0.4],
  ];

  offsets.forEach(([ox, oy, oz], idx) => {
    const bird = new THREE.Group();
    bird.position.set(ox, oy, oz);

    // Body
    const body = new THREE.Mesh(
      new THREE.ConeGeometry(0.08, 0.28, 6),
      new THREE.MeshStandardMaterial({ color: colors[idx % colors.length] })
    );
    body.rotation.z = -Math.PI / 2;
    bird.add(body);

    // Beak
    const beak = new THREE.Mesh(
      new THREE.ConeGeometry(0.03, 0.1, 4),
      new THREE.MeshBasicMaterial({ color: 0xfacc15 })
    );
    beak.position.set(0.18, 0, 0);
    beak.rotation.z = -Math.PI / 2;
    bird.add(beak);

    // Wings
    const wingL = new THREE.Mesh(
      new THREE.BoxGeometry(0.14, 0.02, 0.25),
      new THREE.MeshStandardMaterial({ color: colors[idx % colors.length] })
    );
    wingL.name = `wingL_${idx}`;
    wingL.position.set(0, 0.04, 0.14);
    bird.add(wingL);

    const wingR = new THREE.Mesh(
      new THREE.BoxGeometry(0.14, 0.02, 0.25),
      new THREE.MeshStandardMaterial({ color: colors[idx % colors.length] })
    );
    wingR.name = `wingR_${idx}`;
    wingR.position.set(0, 0.04, -0.14);
    bird.add(wingR);

    flock.add(bird);
  });

  return flock;
}

/**
 * G. DEER / STAG: Slender forest stag with antlers
 */
function buildDeer() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.24, 0.6, 8, 12),
    new THREE.MeshStandardMaterial({ color: 0x92400e })
  );
  body.rotation.z = Math.PI / 2;
  body.position.y = 0.8;
  g.add(body);

  // 4 Legs
  [
    [-0.22, 0.38, 0.16],
    [0.22, 0.38, 0.16],
    [-0.22, 0.38, -0.16],
    [0.22, 0.38, -0.16],
  ].forEach(([lx, ly, lz]) => {
    const leg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.04, 0.75, 6),
      new THREE.MeshStandardMaterial({ color: 0x78350f })
    );
    leg.position.set(lx, ly, lz);
    g.add(leg);
  });

  // Head & Antlers
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 8, 8),
    new THREE.MeshStandardMaterial({ color: 0x92400e })
  );
  head.position.set(-0.35, 1.25, 0);
  g.add(head);

  const antlers = new THREE.Mesh(
    new THREE.TorusGeometry(0.22, 0.03, 6, 12, Math.PI),
    new THREE.MeshBasicMaterial({ color: 0xfde047 })
  );
  antlers.rotation.z = Math.PI / 2;
  antlers.position.set(-0.35, 1.5, 0);
  g.add(antlers);
  return g;
}

// =========================================================================
// MAIN 3D FOREST BIOSPHERE COMPONENT
// =========================================================================

export default function ForestBiosphere3D({
  blueScore = 0,
  redScore = 0,
  winnerTeam = null, // 'blue' | 'red' | null
  blueWins = 0,
  redWins = 0,
}) {
  const mountRef = useRef(null);
  const animFrameRef = useRef(null);
  const sceneRef = useRef(null);
  const floraGroupRef = useRef(null);
  const faunaGroupRef = useRef(null);
  const celebrationSunbeamRef = useRef(null);
  const celebrationFaunaSpotRef = useRef(null);
  const shockwaveRef = useRef(null);

  const prevBlueWinsRef = useRef(blueWins);
  const prevRedWinsRef = useRef(redWins);

  const animStateRef = useRef({
    active: false,
    winner: null,
    startTime: 0,
    duration: 3.5,
  });

  // Function to re-populate Flora (Left Side) based on blueWins
  const populateFlora = (group, wins) => {
    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }

    // BASE (0 wins): Pine Tree & Sunflower
    const pine = buildPineTree();
    pine.position.set(-3.2, 0, -1.2);
    pine.scale.setScalar(0.95);
    group.add(pine);

    const sunflower = buildSunflower();
    sunflower.position.set(-1.8, 0, 0.8);
    sunflower.scale.setScalar(0.9);
    group.add(sunflower);

    // WIN 1: + Oak Tree & Tulip Flower
    if (wins >= 1) {
      const oak = buildOakTree();
      oak.position.set(-4.2, 0, 1.6);
      oak.scale.setScalar(0.9);
      group.add(oak);

      const tulip = buildTulipFlower();
      tulip.position.set(-1.9, 0, -1.8);
      tulip.scale.setScalar(0.95);
      group.add(tulip);
    }

    // WIN 2: + Willow Tree & Lavender/Fern
    if (wins >= 2) {
      const willow = buildWillowTree();
      willow.position.set(-2.8, 0, 3.0);
      willow.scale.setScalar(0.85);
      group.add(willow);

      const lavender = buildLavenderFern();
      lavender.position.set(-3.6, 0, -0.4);
      lavender.scale.setScalar(0.9);
      group.add(lavender);
    }

    // WIN 3: + Redwood & Giant Lotus
    if (wins >= 3) {
      const redwood = buildRedwoodLotus();
      redwood.position.set(-4.8, 0, -2.2);
      redwood.scale.setScalar(0.8);
      group.add(redwood);
    }

    // WIN 4+: Additional flourishing flora
    if (wins >= 4) {
      const pine2 = buildPineTree();
      pine2.position.set(-2.2, 0, 2.4);
      pine2.scale.setScalar(0.7);
      group.add(pine2);

      const flower2 = buildSunflower();
      flower2.position.set(-3.8, 0, 3.4);
      flower2.scale.setScalar(0.75);
      group.add(flower2);
    }
  };

  // Function to re-populate Fauna (Right Side) based on redWins
  const populateFauna = (group, wins) => {
    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }

    // BASE (0 wins): Dog & Elephant
    const dog = buildDog();
    dog.position.set(2.0, 0, 0.8);
    dog.scale.setScalar(0.95);
    group.add(dog);

    const elephant = buildElephant();
    elephant.position.set(4.0, 0, -1.4);
    elephant.scale.setScalar(1.0);
    group.add(elephant);

    // WIN 1: + Fox & Giraffe
    if (wins >= 1) {
      const fox = buildFox();
      fox.position.set(2.2, 0, -1.8);
      fox.scale.setScalar(0.9);
      group.add(fox);

      const giraffe = buildGiraffe();
      giraffe.position.set(4.2, 0, 2.0);
      giraffe.scale.setScalar(0.9);
      group.add(giraffe);
    }

    // WIN 2: + Rhino & Birds
    if (wins >= 2) {
      const rhino = buildRhino();
      rhino.position.set(3.4, 0, 0.3);
      rhino.scale.setScalar(0.85);
      group.add(rhino);

      const birds = buildBirdFlock();
      birds.position.set(3.2, 3.6, 0);
      group.add(birds);
    }

    // WIN 3: + Deer / Stag
    if (wins >= 3) {
      const deer = buildDeer();
      deer.position.set(2.4, 0, 2.6);
      deer.scale.setScalar(0.85);
      group.add(deer);
    }

    // WIN 4+: Additional wildlife companions
    if (wins >= 4) {
      const dog2 = buildDog();
      dog2.position.set(4.6, 0, 0.2);
      dog2.scale.setScalar(0.7);
      group.add(dog2);
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x064e3b, 0.016);

    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 1000);
    camera.position.set(0, 6.2, 11.5);
    camera.lookAt(0, 1.8, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Sunlight & Warm Atmospheric Lights
    const ambientLight = new THREE.AmbientLight(0xdcfce7, 1.3);
    scene.add(ambientLight);

    const sun = new THREE.DirectionalLight(0xfef08a, 2.0);
    sun.position.set(4, 16, 6);
    scene.add(sun);

    const floraLight = new THREE.PointLight(0x22c55e, 2.8, 18);
    floraLight.position.set(-4, 4, 0);
    scene.add(floraLight);

    const faunaLight = new THREE.PointLight(0xf43f5e, 2.8, 18);
    faunaLight.position.set(4, 4, 0);
    scene.add(faunaLight);

    // 3. Terrain: Lush Moss Forest Floor (Left) & Savanna Glade (Right)
    const groundGeo = new THREE.PlaneGeometry(28, 22, 32, 32);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x14532d, // Lush mossy green
      roughness: 0.85,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    scene.add(ground);

    // Center Crystal River separating Flora (Left) and Fauna (Right)
    const riverGeo = new THREE.PlaneGeometry(3.0, 22);
    const riverMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transmission: 0.75,
      transparent: true,
      opacity: 0.9,
      roughness: 0.08,
      metalness: 0.2,
      ior: 1.33,
    });
    const river = new THREE.Mesh(riverGeo, riverMat);
    river.rotation.x = -Math.PI / 2;
    river.position.set(0, 0.04, 0);
    scene.add(river);

    // Riverbank Stepping Stones in the stream
    [-3, -1, 1, 3].forEach((sz) => {
      const stone = new THREE.Mesh(
        new THREE.CylinderGeometry(0.25, 0.32, 0.12, 8),
        new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.6 })
      );
      stone.position.set((Math.random() - 0.5) * 0.8, 0.08, sz);
      scene.add(stone);
    });

    // 4. Flora Group (Left Side exclusively: x < -0.8)
    const floraGroup = new THREE.Group();
    scene.add(floraGroup);
    floraGroupRef.current = floraGroup;
    populateFlora(floraGroup, blueWins);

    // 5. Fauna Group (Right Side exclusively: x > 0.8)
    const faunaGroup = new THREE.Group();
    scene.add(faunaGroup);
    faunaGroupRef.current = faunaGroup;
    populateFauna(faunaGroup, redWins);

    // 6. Celebration Sunbeam Cylinder (Fires on Flora Victory on Left)
    const beamGeo = new THREE.CylinderGeometry(1.6, 2.6, 14, 24);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0x86efac,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    const sunbeamMesh = new THREE.Mesh(beamGeo, beamMat);
    sunbeamMesh.position.set(-3.2, 7, 0);
    scene.add(sunbeamMesh);
    celebrationSunbeamRef.current = sunbeamMesh;

    // 7. Celebration Fauna Spotlight Cylinder (Fires on Fauna Victory on Right)
    const faunaSpotGeo = new THREE.CylinderGeometry(1.6, 2.6, 14, 24);
    const faunaSpotMat = new THREE.MeshBasicMaterial({
      color: 0xfda4af,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    const faunaSpotMesh = new THREE.Mesh(faunaSpotGeo, faunaSpotMat);
    faunaSpotMesh.position.set(3.2, 7, 0);
    scene.add(faunaSpotMesh);
    celebrationFaunaSpotRef.current = faunaSpotMesh;

    // 8. Shockwave Ring on Ground
    const shockwaveGeo = new THREE.RingGeometry(0.5, 1.6, 32);
    const shockwaveMat = new THREE.MeshBasicMaterial({
      color: 0x22c55e,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    const shockwave = new THREE.Mesh(shockwaveGeo, shockwaveMat);
    shockwave.rotation.x = -Math.PI / 2;
    shockwave.position.y = 0.08;
    scene.add(shockwave);
    shockwaveRef.current = shockwave;

    // 9. Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Subtle water shimmer
      river.position.y = 0.04 + Math.sin(t * 2.0) * 0.008;

      // Animate Flora (sway in wind & nodding sunflower)
      if (floraGroupRef.current) {
        floraGroupRef.current.children.forEach((plant, idx) => {
          plant.rotation.z = Math.sin(t * 1.5 + idx * 0.7) * 0.03;
          const sunflowerHead = plant.getObjectByName("sunflowerHead");
          if (sunflowerHead) {
            sunflowerHead.rotation.x = 0.25 + Math.sin(t * 2.0) * 0.06;
          }
        });
      }

      // Animate Fauna (dog tail wag, elephant trunk swing, birds flight orbit)
      if (faunaGroupRef.current) {
        faunaGroupRef.current.children.forEach((creature) => {
          // Dog tail wag
          const dogTail = creature.getObjectByName("dogTail");
          if (dogTail) {
            dogTail.rotation.y = Math.sin(t * 9.0) * 0.45;
          }
          // Elephant trunk swing
          const elephantTrunk = creature.getObjectByName("elephantTrunk");
          if (elephantTrunk) {
            elephantTrunk.rotation.x = Math.sin(t * 2.2) * 0.22;
          }
          // Fox tail swish
          const foxTail = creature.getObjectByName("foxTail");
          if (foxTail) {
            foxTail.rotation.y = Math.sin(t * 4.0) * 0.35;
          }
          // Giraffe neck sway
          const giraffeNeck = creature.getObjectByName("giraffeNeck");
          if (giraffeNeck) {
            giraffeNeck.rotation.z = 0.18 + Math.sin(t * 1.6) * 0.04;
          }
          // Birds flight orbit
          const birdFlock = creature.getObjectByName("birdFlock");
          if (birdFlock) {
            birdFlock.position.x = 3.2 + Math.cos(t * 1.4) * 1.6;
            birdFlock.position.z = Math.sin(t * 1.4) * 1.6;
            birdFlock.position.y = 3.6 + Math.sin(t * 2.8) * 0.25;
            birdFlock.rotation.y = -(t * 1.4) - Math.PI / 2;

            // Flap wings
            for (let i = 0; i < 3; i++) {
              const wingL = birdFlock.getObjectByName(`wingL_${i}`);
              const wingR = birdFlock.getObjectByName(`wingR_${i}`);
              if (wingL) wingL.rotation.z = Math.sin(t * 14) * 0.65;
              if (wingR) wingR.rotation.z = -Math.sin(t * 14) * 0.65;
            }
          }
        });
      }

      // CELEBRATION ON RIGHT ANSWER
      if (animStateRef.current.active) {
        const elapsed = clock.getElapsedTime() - animStateRef.current.startTime;
        const duration = animStateRef.current.duration;
        const progress = Math.min(1.0, elapsed / duration);
        const isBlue = animStateRef.current.winner === "blue";

        if (isBlue) {
          // Flora Event: Sunbeam pours onto left side, trees pulse & bloom
          if (celebrationSunbeamRef.current) {
            celebrationSunbeamRef.current.rotation.y += 0.025;
            celebrationSunbeamRef.current.material.opacity =
              Math.sin(progress * Math.PI) * 0.9;
          }
          if (floraGroupRef.current) {
            const bloomScale = 1.0 + Math.sin(progress * Math.PI) * 0.2;
            floraGroupRef.current.scale.set(bloomScale, bloomScale, bloomScale);
          }
          if (shockwaveRef.current) {
            shockwaveRef.current.position.set(-3.2, 0.08, 0);
            shockwaveRef.current.material.color.set(0x22c55e);
            shockwaveRef.current.scale.set(1 + progress * 4.5, 1 + progress * 4.5, 1);
            shockwaveRef.current.material.opacity = Math.max(0, (1 - progress) * 0.9);
          }
        } else {
          // Fauna Event: Crimson spotlight pours onto right side, animals jump with joy
          if (celebrationFaunaSpotRef.current) {
            celebrationFaunaSpotRef.current.rotation.y += 0.025;
            celebrationFaunaSpotRef.current.material.opacity =
              Math.sin(progress * Math.PI) * 0.9;
          }
          if (faunaGroupRef.current) {
            const hop = Math.sin(progress * Math.PI * 3) * 0.35;
            faunaGroupRef.current.position.y = Math.max(0, hop);
          }
          if (shockwaveRef.current) {
            shockwaveRef.current.position.set(3.2, 0.08, 0);
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
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Sync Flora with blueWins
  useEffect(() => {
    if (floraGroupRef.current) {
      populateFlora(floraGroupRef.current, blueWins);
    }
  }, [blueWins]);

  // Sync Fauna with redWins
  useEffect(() => {
    if (faunaGroupRef.current) {
      populateFauna(faunaGroupRef.current, redWins);
    }
  }, [redWins]);

  // Trigger celebration effect on winnerTeam change
  useEffect(() => {
    if (winnerTeam) {
      animStateRef.current = {
        active: true,
        winner: winnerTeam,
        startTime: performance.now() * 0.001,
        duration: 3.5,
      };
    } else {
      animStateRef.current = { active: false, winner: null, startTime: 0, duration: 3.5 };
      if (celebrationSunbeamRef.current) celebrationSunbeamRef.current.material.opacity = 0;
      if (celebrationFaunaSpotRef.current) celebrationFaunaSpotRef.current.material.opacity = 0;
      if (shockwaveRef.current) shockwaveRef.current.material.opacity = 0;
      if (floraGroupRef.current) floraGroupRef.current.scale.set(1, 1, 1);
      if (faunaGroupRef.current) faunaGroupRef.current.position.y = 0;
    }
  }, [winnerTeam]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: "260px",
        borderRadius: "20px",
        overflow: "hidden",
        background: "radial-gradient(circle at 50% 30%, #064e3b 0%, #022c22 100%)",
      }}
    >
      <div ref={mountRef} style={{ width: "100%", height: "100%", minHeight: "260px" }} />
      {/* Ecosystem Side Legend Indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: "18px",
          background: "rgba(0,0,0,0.65)",
          backdropFilter: "blur(8px)",
          borderRadius: "12px",
          padding: "5px 16px",
          fontSize: "0.72rem",
          fontWeight: 800,
          color: "#e2e8f0",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ color: "#86efac" }}>🌿 FLORA: Pine & Sunflowers (Wins: {blueWins})</span>
        <span style={{ color: "#64748b" }}>|</span>
        <span style={{ color: "#fda4af" }}>🐾 FAUNA: Dog & Elephant (Wins: {redWins})</span>
      </div>
    </div>
  );
}
