export const MYSTERY_SAMPLES = [
  {
    id: "sample-1",
    codeName: "Specimen Alpha-7",
    visualIcon: "🔬",
    fieldObservation: "Rigid polygonal cells with prominent central vacuole and emerald-green discoid organelles displaying cytoplasmic streaming.",
    microscopeFeatures: [
      "Rigid outer cellulose boundary present",
      "Stacks of thylakoid grana observed",
      "Large fluid-filled reservoir occupying 80% volume",
      "Centrioles completely absent"
    ],
    correctType: "Plant Cell (Eukaryotic)",
    options: ["Plant Cell (Eukaryotic)", "Animal Cell (Eukaryotic)", "Bacterial Cell (Prokaryotic)", "Fungal Cell (Eukaryotic)"],
    rationale: "Cellulose cell wall, chloroplasts with grana, and large central vacuole confirm this is a photosynthetic plant cell.",
  },
  {
    id: "sample-2",
    codeName: "Specimen Beta-9",
    visualIcon: "🩸",
    fieldObservation: "Flexible amorphous shape capable of pseudopodia extension; packed with mitochondria and lysosomes, lacking any wall.",
    microscopeFeatures: [
      "No cell wall; surrounded only by plasma membrane",
      "Prominent pair of orthogonal centrioles near nucleus",
      "Numerous acidic lysosomes with hydrolytic enzymes",
      "Small temporary pinocytic vacuoles"
    ],
    correctType: "Animal Cell (Eukaryotic)",
    options: ["Plant Cell (Eukaryotic)", "Animal Cell (Eukaryotic)", "Bacterial Cell (Prokaryotic)", "Fungal Cell (Eukaryotic)"],
    rationale: "Absence of a cell wall or chloroplasts paired with centrioles and lysosomes distinguishes animal cells.",
  },
  {
    id: "sample-3",
    codeName: "Specimen Gamma-3",
    visualIcon: "🦠",
    fieldObservation: "Ultra-small rod-shaped cell (1.5 µm); lacks a nuclear envelope. Contains naked circular DNA and small 70S ribosomes.",
    microscopeFeatures: [
      "No membrane-bound nucleus (naked nucleoid region)",
      "Ribosome sedimentation coefficient is 70S",
      "Peptidoglycan cell wall surrounded by a capsule",
      "Plasmids with antibiotic resistance genes present"
    ],
    correctType: "Bacterial Cell (Prokaryotic)",
    options: ["Plant Cell (Eukaryotic)", "Animal Cell (Eukaryotic)", "Bacterial Cell (Prokaryotic)", "Fungal Cell (Eukaryotic)"],
    rationale: "Prokaryotes lack compartmentalized membrane-bound organelles, possessing 70S ribosomes, peptidoglycan walls, and nucleoid DNA.",
  },
  {
    id: "sample-4",
    codeName: "Specimen Delta-5",
    visualIcon: "🍄",
    fieldObservation: "Filamentous hyphae structure with a robust cell wall made of chitin microfibrils; contains mitochondria and vacuole, but NO chloroplasts.",
    microscopeFeatures: [
      "Cell wall composed of chitin polymer (not cellulose)",
      "Heterotrophic nutrition (no thylakoids or chloroplasts)",
      "Contains true membrane-bound nucleus and mitochondria",
      "Stores carbohydrate as glycogen granules"
    ],
    correctType: "Fungal Cell (Eukaryotic)",
    options: ["Plant Cell (Eukaryotic)", "Animal Cell (Eukaryotic)", "Bacterial Cell (Prokaryotic)", "Fungal Cell (Eukaryotic)"],
    rationale: "Fungal cells possess a chitin cell wall, lack photosynthetic chloroplasts, and store energy as glycogen.",
  }
];

export const FUNCTION_PAIRS = [
  {
    id: "f1",
    functionName: "Synthesize ATP via aerobic cellular respiration",
    organelleId: "mitochondria",
    organelleName: "Mitochondria",
    symbol: "⚡",
  },
  {
    id: "f2",
    functionName: "Convert solar photons and CO2 into glucose sugars",
    organelleId: "chloroplast",
    organelleName: "Chloroplast",
    symbol: "🍃",
  },
  {
    id: "f3",
    functionName: "House genomic DNA and coordinate transcriptional control",
    organelleId: "nucleus",
    organelleName: "Nucleus",
    symbol: "🧬",
  },
  {
    id: "f4",
    functionName: "Fold and modify nascent proteins with ribosome assist",
    organelleId: "rough-er",
    organelleName: "Rough Endoplasmic Reticulum",
    symbol: "🏗️",
  },
  {
    id: "f5",
    functionName: "Receive, chemically tag, and dispatch secretory vesicles",
    organelleId: "golgi",
    organelleName: "Golgi Apparatus",
    symbol: "📦",
  },
  {
    id: "f6",
    functionName: "Maintain turgor hydrostatic pressure against the cell wall",
    organelleId: "vacuole-central",
    organelleName: "Large Central Vacuole",
    symbol: "💧",
  },
  {
    id: "f7",
    functionName: "Degrade cellular debris using acidic hydrolytic enzymes",
    organelleId: "lysosome",
    organelleName: "Lysosome",
    symbol: "♻️",
  },
  {
    id: "f8",
    functionName: "Provide rigid tensile resistance against osmotic lysis",
    organelleId: "cell-wall",
    organelleName: "Cellulose Cell Wall",
    symbol: "🧱",
  },
];
