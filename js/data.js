/* ============================================================
   ThatSearch – Knowledge Base & Mock Data
   data.js  –  loaded on every page
   ============================================================ */

/* ── Knowledge-base (info-cards) ───────────────────────── */
const KB = {
  /* PEOPLE */
  "albert einstein": {
    type: "person",
    name: "Albert Einstein",
    subtitle: "Theoretical Physicist",
    description:
      "Albert Einstein was a German-born theoretical physicist who developed the theory of relativity, one of the two pillars of modern physics alongside quantum mechanics. He is best known for his mass–energy equivalence formula E = mc².",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/220px-Albert_Einstein_Head.jpg",
    facts: [
      ["Born",       "14 March 1879, Ulm, Germany"],
      ["Died",       "18 April 1955, Princeton, USA"],
      ["Nationality","German-American"],
      ["Fields",     "Theoretical physics"],
      ["Known for",  "Theory of Relativity, E=mc², Photoelectric effect"],
      ["Awards",     "Nobel Prize in Physics (1921)"],
    ],
    tags: ["Physics","Relativity","Nobel Prize","Scientist"],
  },

  "isaac newton": {
    type: "person",
    name: "Sir Isaac Newton",
    subtitle: "Mathematician & Physicist",
    description:
      "Sir Isaac Newton was an English mathematician, physicist, astronomer, and author who is widely recognised as one of the greatest mathematicians and physicists of all time. He formulated the laws of motion and universal gravitation.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Portrait_of_Sir_Isaac_Newton%2C_1689.jpg/220px-Portrait_of_Sir_Isaac_Newton%2C_1689.jpg",
    facts: [
      ["Born",       "4 January 1643, Lincolnshire, England"],
      ["Died",       "31 March 1727, London, England"],
      ["Fields",     "Mathematics, Physics, Astronomy"],
      ["Known for",  "Newton's Laws, Law of Gravitation, Calculus"],
      ["Awards",     "Fellow of the Royal Society (1672)"],
    ],
    tags: ["Physics","Mathematics","Gravity","Calculus","Scientist"],
  },

  "marie curie": {
    type: "person",
    name: "Marie Curie",
    subtitle: "Physicist & Chemist",
    description:
      "Marie Skłodowska Curie was a Polish-French physicist and chemist who conducted pioneering research on radioactivity. She was the first woman to win a Nobel Prize, the only person to win Nobel Prizes in two different sciences (Physics 1903, Chemistry 1911).",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Marie_Curie_c1920.jpg/220px-Marie_Curie_c1920.jpg",
    facts: [
      ["Born",       "7 November 1867, Warsaw, Poland"],
      ["Died",       "4 July 1934, Haute-Savoie, France"],
      ["Fields",     "Physics, Chemistry"],
      ["Known for",  "Radioactivity, Polonium, Radium"],
      ["Awards",     "Nobel Prize Physics (1903), Nobel Prize Chemistry (1911)"],
    ],
    tags: ["Physics","Chemistry","Nobel Prize","Radioactivity","Scientist"],
  },

  "charles darwin": {
    type: "person",
    name: "Charles Darwin",
    subtitle: "Naturalist & Biologist",
    description:
      "Charles Robert Darwin was an English naturalist, geologist, and biologist best known for his contributions to evolutionary biology. His book 'On the Origin of Species' introduced the scientific theory of evolution by natural selection.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Charles_Darwin_seated_crop.jpg/220px-Charles_Darwin_seated_crop.jpg",
    facts: [
      ["Born",       "12 February 1809, Shrewsbury, England"],
      ["Died",       "19 April 1882, Downe, England"],
      ["Fields",     "Biology, Geology, Naturalism"],
      ["Known for",  "Evolution, Natural Selection, 'On the Origin of Species'"],
      ["Published",  "On the Origin of Species (1859)"],
    ],
    tags: ["Biology","Evolution","Naturalist","Scientist"],
  },

  "nikola tesla": {
    type: "person",
    name: "Nikola Tesla",
    subtitle: "Inventor & Electrical Engineer",
    description:
      "Nikola Tesla was a Serbian-American inventor, electrical engineer, mechanical engineer, and futurist best known for his contributions to the design of the modern alternating current (AC) electricity supply system.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Tesla_circa_1890.jpeg/220px-Tesla_circa_1890.jpeg",
    facts: [
      ["Born",       "10 July 1856, Smiljan, Serbia (then Austria)"],
      ["Died",       "7 January 1943, New York, USA"],
      ["Fields",     "Electrical engineering, Physics"],
      ["Known for",  "Alternating current, Tesla coil, Radio"],
    ],
    tags: ["Electricity","AC Current","Inventor","Engineer"],
  },

  "william shakespeare": {
    type: "person",
    name: "William Shakespeare",
    subtitle: "Playwright & Poet",
    description:
      "William Shakespeare was an English playwright, poet, and actor, widely regarded as the greatest writer in the English language and the world's greatest dramatist. He wrote 37 plays, 154 sonnets, and several long narrative poems.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Shakespeare.jpg/220px-Shakespeare.jpg",
    facts: [
      ["Born",       "April 1564, Stratford-upon-Avon, England"],
      ["Died",       "23 April 1616, Stratford-upon-Avon"],
      ["Known for",  "Hamlet, Romeo & Juliet, Macbeth, Othello"],
      ["Genre",      "Tragedy, Comedy, History"],
      ["Era",        "Elizabethan"],
    ],
    tags: ["Literature","Drama","Poetry","English"],
  },

  /* CONCEPTS */
  "photosynthesis": {
    type: "concept",
    name: "Photosynthesis",
    subtitle: "Biological Process",
    description:
      "Photosynthesis is the process used by plants, algae, and some bacteria to convert light energy (usually from the sun) into chemical energy stored in glucose. The reaction uses carbon dioxide and water and releases oxygen as a by-product.",
    image: "",
    facts: [
      ["Equation",   "6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂"],
      ["Location",   "Chloroplasts (in plant cells)"],
      ["Pigment",    "Chlorophyll (absorbs sunlight)"],
      ["Stages",     "Light-dependent reactions, Calvin Cycle"],
      ["By-product", "Oxygen (O₂)"],
    ],
    tags: ["Biology","Plants","Chemistry","Energy"],
  },

  "pythagorean theorem": {
    type: "concept",
    name: "Pythagorean Theorem",
    subtitle: "Mathematical Theorem",
    description:
      "The Pythagorean theorem states that in a right-angled triangle, the square of the length of the hypotenuse (c) is equal to the sum of the squares of the other two sides (a and b): a² + b² = c².",
    image: "",
    facts: [
      ["Formula",    "a² + b² = c²"],
      ["Applies to", "Right-angled triangles"],
      ["Hypotenuse", "The side opposite the right angle (c)"],
      ["Named after","Pythagoras of Samos (~570–495 BC)"],
      ["Used in",    "Geometry, Trigonometry, Architecture"],
    ],
    tags: ["Mathematics","Geometry","Triangles","Algebra"],
  },

  "dna": {
    type: "concept",
    name: "DNA (Deoxyribonucleic Acid)",
    subtitle: "Molecule of Life",
    description:
      "DNA is a molecule that carries the genetic instructions for the development, functioning, growth, and reproduction of all known living organisms and many viruses. It consists of two polynucleotide chains forming a double helix.",
    image: "",
    facts: [
      ["Full name",  "Deoxyribonucleic Acid"],
      ["Structure",  "Double helix (two strands)"],
      ["Bases",      "Adenine (A), Thymine (T), Guanine (G), Cytosine (C)"],
      ["Location",   "Cell nucleus (and mitochondria)"],
      ["Discovered", "Watson & Crick, 1953 (using Franklin's X-ray data)"],
    ],
    tags: ["Biology","Genetics","Molecules","Cells"],
  },

  "french revolution": {
    type: "event",
    name: "The French Revolution",
    subtitle: "Historical Event · 1789–1799",
    description:
      "The French Revolution was a period of radical political and societal transformation in France that began with the Estates General of 1789 and ended with Napoleon Bonaparte's coup. It overthrew the monarchy, established a republic, and culminated in the rise of Napoleon.",
    image: "",
    facts: [
      ["Period",     "1789 – 1799"],
      ["Location",   "France"],
      ["Key event",  "Storming of the Bastille (14 July 1789)"],
      ["Outcome",    "Abolition of monarchy, First French Republic"],
      ["Slogan",     "Liberté, Égalité, Fraternité"],
      ["Followed by","Napoleonic Era"],
    ],
    tags: ["History","France","Politics","18th Century"],
  },

  "world war 2": {
    type: "event",
    name: "World War II",
    subtitle: "Global Conflict · 1939–1945",
    description:
      "World War II was a global conflict that lasted from 1939 to 1945. It involved most of the world's nations and was the deadliest conflict in human history. The Allied powers defeated Nazi Germany, Imperial Japan, and Fascist Italy.",
    image: "",
    facts: [
      ["Period",     "1 September 1939 – 2 September 1945"],
      ["Parties",    "Allied Powers vs. Axis Powers"],
      ["Deaths",     "~70–85 million (military & civilian)"],
      ["Key events", "D-Day, Holocaust, Atomic bombing of Japan"],
      ["Outcome",    "Allied victory; UN founded 1945"],
    ],
    tags: ["History","War","20th Century","Europe","Global"],
  },

  "solar system": {
    type: "concept",
    name: "The Solar System",
    subtitle: "Astronomical System",
    description:
      "The Solar System is the gravitationally bound system of the Sun and the objects that orbit it. It consists of the Sun, eight planets, their moons, dwarf planets, asteroids, comets, and other small solar system bodies.",
    image: "",
    facts: [
      ["Star",       "The Sun"],
      ["Planets",    "Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune"],
      ["Dwarf planets","Pluto, Ceres, Eris, Makemake, Haumea"],
      ["Age",        "~4.6 billion years"],
      ["Diameter",   "~287.46 billion km (to heliopause)"],
    ],
    tags: ["Astronomy","Space","Planets","Science"],
  },

  "climate change": {
    type: "concept",
    name: "Climate Change",
    subtitle: "Environmental Phenomenon",
    description:
      "Climate change refers to long-term shifts in global temperatures and weather patterns. While some climate change is natural, since the 1800s human activities—especially burning fossil fuels—have been the main driver of climate change.",
    image: "",
    facts: [
      ["Cause",      "Mainly greenhouse gas emissions (CO₂, CH₄)"],
      ["Effects",    "Rising sea levels, extreme weather, species loss"],
      ["Key accord", "Paris Agreement (2015)"],
      ["Pre-ind. rise","~1.1°C average global warming since 1850"],
    ],
    tags: ["Environment","Science","Global Warming","Geography"],
  },

  "germany": {
    type: "place",
    name: "Germany",
    subtitle: "Country in Central Europe",
    description:
      "Germany is a country in Central Europe. It is the most populous member state of the European Union. Germany's capital is Berlin. It is a federal parliamentary republic with a strong economy, the largest in Europe.",
    image: "",
    facts: [
      ["Capital",    "Berlin"],
      ["Population", "~84 million (2023)"],
      ["Area",       "357,114 km²"],
      ["Language",   "German"],
      ["Currency",   "Euro (€)"],
      ["Government", "Federal Republic"],
    ],
    tags: ["Europe","Country","Geography","EU"],
  },

  "france": {
    type: "place",
    name: "France",
    subtitle: "Country in Western Europe",
    description:
      "France is a country in Western Europe and the world's most visited country. Its capital, Paris, is home to the Eiffel Tower. France is a founding member of the EU and a permanent member of the UN Security Council.",
    image: "",
    facts: [
      ["Capital",    "Paris"],
      ["Population", "~68 million (2023)"],
      ["Area",       "640,679 km²"],
      ["Language",   "French"],
      ["Currency",   "Euro (€)"],
    ],
    tags: ["Europe","Country","Geography","EU"],
  },
};

/* ── Mock search-result templates ───────────────────────── */
const MOCK_RESULTS = {
  "albert einstein": [
    {
      title: "Albert Einstein – Life and Work",
      url: "https://encyclopedia.example.com/albert-einstein",
      snippet: "Albert Einstein, born 1879 in Ulm, Germany, was a theoretical physicist who developed the theory of relativity. His famous formula E=mc² changed our understanding of energy and mass.",
      date: "2024-01-10",
    },
    {
      title: "Einstein's Theory of Relativity Explained",
      url: "https://sciencekids.example.com/relativity",
      snippet: "The theory of relativity by Albert Einstein consists of special relativity (1905) and general relativity (1915). Special relativity introduced the idea that the speed of light is constant for all observers.",
      date: "2023-11-05",
    },
    {
      title: "Nobel Prize in Physics 1921 – Albert Einstein",
      url: "https://nobels.example.com/1921-physics",
      snippet: "The Nobel Prize in Physics 1921 was awarded to Albert Einstein for his discovery of the law of the photoelectric effect. Einstein's work on quantum theory was groundbreaking.",
      date: "2022-03-18",
    },
    {
      title: "10 Facts About Albert Einstein for Students",
      url: "https://studyguide.example.com/einstein-facts",
      snippet: "Albert Einstein was not only a genius physicist but also a peace activist. He immigrated to the United States in 1933 to escape Nazi Germany and became an American citizen in 1940.",
      date: "2024-02-20",
    },
  ],

  "photosynthesis": [
    {
      title: "Photosynthesis – How Plants Make Food",
      url: "https://biologyguide.example.com/photosynthesis",
      snippet: "Photosynthesis is the process by which green plants use sunlight, water, and carbon dioxide to produce glucose and oxygen. It takes place mainly in the chloroplasts of plant cells.",
      date: "2024-01-22",
    },
    {
      title: "The Two Stages of Photosynthesis",
      url: "https://learnscience.example.com/photosynthesis-stages",
      snippet: "Photosynthesis occurs in two stages: the light-dependent reactions (in the thylakoids) and the Calvin cycle (in the stroma). Both stages are essential for glucose production.",
      date: "2023-09-14",
    },
    {
      title: "Photosynthesis Equation Explained",
      url: "https://chemistrykids.example.com/photosynthesis",
      snippet: "The balanced equation for photosynthesis is: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. This shows that carbon dioxide and water are converted to glucose and oxygen.",
      date: "2024-03-01",
    },
  ],

  "pythagorean theorem": [
    {
      title: "Pythagorean Theorem – a² + b² = c²",
      url: "https://mathworld.example.com/pythagorean-theorem",
      snippet: "The Pythagorean theorem states that in any right triangle, the square of the hypotenuse equals the sum of the squares of the two shorter sides: a² + b² = c². It is one of the most fundamental theorems in geometry.",
      date: "2024-02-11",
    },
    {
      title: "Proof of the Pythagorean Theorem",
      url: "https://mathproofs.example.com/pythagoras",
      snippet: "There are hundreds of known proofs of the Pythagorean theorem. The simplest geometric proof uses four copies of the right triangle arranged around a square. Each proof confirms that a² + b² = c².",
      date: "2023-07-30",
    },
    {
      title: "Using the Pythagorean Theorem in Real Life",
      url: "https://appliedmath.example.com/pythagoras-realworld",
      snippet: "The Pythagorean theorem is used in architecture, navigation, and engineering. For example, builders use it to ensure walls are perfectly square by checking that a 3-4-5 triangle has a right angle.",
      date: "2023-12-05",
    },
  ],

  "french revolution": [
    {
      title: "The French Revolution – Overview",
      url: "https://worldhistory.example.com/french-revolution",
      snippet: "The French Revolution (1789–1799) was a period of radical political and social transformation. It started with the Estates General and the storming of the Bastille on 14 July 1789.",
      date: "2024-01-15",
    },
    {
      title: "Causes of the French Revolution",
      url: "https://historyexplained.example.com/fr-causes",
      snippet: "Key causes of the French Revolution included financial crisis, social inequality between the Three Estates, Enlightenment ideas, and weak leadership by King Louis XVI.",
      date: "2023-10-20",
    },
    {
      title: "The Reign of Terror 1793–1794",
      url: "https://history.example.com/reign-of-terror",
      snippet: "The Reign of Terror was a violent phase of the French Revolution led by Maximilien Robespierre and the Committee of Public Safety. Thousands were guillotined as enemies of the revolution.",
      date: "2023-08-12",
    },
  ],

  "world war 2": [
    {
      title: "World War II – A Student's Guide",
      url: "https://historyguide.example.com/ww2",
      snippet: "World War II lasted from 1939 to 1945 and involved most of the world's nations. It began when Germany invaded Poland on 1 September 1939. The war ended with Germany's surrender in May 1945 and Japan's in September 1945.",
      date: "2024-03-12",
    },
    {
      title: "Key Battles of World War II",
      url: "https://militaryhistory.example.com/ww2-battles",
      snippet: "Major battles of World War II include the Battle of Britain, Operation Barbarossa, the Battle of Stalingrad, D-Day (Normandy, 1944), and the Battle of the Bulge. Each battle was a turning point.",
      date: "2024-01-08",
    },
    {
      title: "The Holocaust – History and Memory",
      url: "https://education.example.com/holocaust",
      snippet: "The Holocaust was the systematic, state-sponsored persecution and murder of six million Jews by the Nazi regime. Understanding this history is crucial to preventing future genocides.",
      date: "2023-11-27",
    },
  ],

  "dna": [
    {
      title: "DNA Structure and Function Explained",
      url: "https://biologyonline.example.com/dna",
      snippet: "DNA (deoxyribonucleic acid) is the molecule that carries genetic instructions. It consists of two strands forming a double helix, composed of nucleotide bases: Adenine, Thymine, Guanine, and Cytosine.",
      date: "2024-02-18",
    },
    {
      title: "How DNA Replication Works",
      url: "https://cellbiology.example.com/dna-replication",
      snippet: "DNA replication is the process by which a cell copies its DNA before cell division. The double helix unwinds, and each strand serves as a template for creating a new complementary strand.",
      date: "2023-09-01",
    },
  ],

  "solar system": [
    {
      title: "Our Solar System – Facts & Overview",
      url: "https://nasa.example.com/solar-system",
      snippet: "The Solar System consists of the Sun and eight planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. It also includes dwarf planets, moons, asteroids, and comets.",
      date: "2024-01-30",
    },
    {
      title: "The Planets of the Solar System",
      url: "https://astronomy.example.com/planets",
      snippet: "Each planet in the solar system has unique characteristics. Jupiter is the largest planet; Mercury is the smallest and closest to the Sun. Earth is the only planet known to harbour life.",
      date: "2023-12-15",
    },
  ],

  "marie curie": [
    {
      title: "Marie Curie – Pioneer of Radioactivity",
      url: "https://science-women.example.com/marie-curie",
      snippet: "Marie Curie was the first woman to win a Nobel Prize and the only person to win Nobel Prizes in two different sciences: Physics (1903) and Chemistry (1911). She discovered polonium and radium.",
      date: "2024-02-04",
    },
    {
      title: "Marie Curie's Research on Radioactivity",
      url: "https://chemistry.example.com/curie-radioactivity",
      snippet: "Marie Curie's research on radioactivity was groundbreaking. She coined the term 'radioactivity', isolated radioactive isotopes, and showed that radiation came from the atom itself.",
      date: "2023-07-17",
    },
  ],

  "climate change": [
    {
      title: "Climate Change – Causes and Effects",
      url: "https://environment.example.com/climate-change",
      snippet: "Climate change is driven primarily by human activities, especially burning fossil fuels which release greenhouse gases. Effects include rising sea levels, more frequent extreme weather events, and biodiversity loss.",
      date: "2024-03-05",
    },
    {
      title: "How to Fight Climate Change – Student Guide",
      url: "https://greenschool.example.com/climate-action",
      snippet: "Students can take action against climate change by reducing energy use, eating less meat, supporting renewable energy, and participating in environmental advocacy. Small actions add up globally.",
      date: "2023-11-10",
    },
  ],
};

/* Fallback results for unknown queries */
function generateFallbackResults(query) {
  return [
    {
      title: `${query} – Encyclopedia Article`,
      url: `https://encyclopedia.example.com/${encodeURIComponent(query.toLowerCase().replace(/\s+/g, "-"))}`,
      snippet: `Learn everything about ${query}. This comprehensive article covers the history, definition, key concepts, and applications of ${query} in an easy-to-understand format for students.`,
      date: "2024-01-01",
    },
    {
      title: `${query} Explained Simply | StudyGuide`,
      url: `https://studyguide.example.com/${encodeURIComponent(query.toLowerCase().replace(/\s+/g, "-"))}`,
      snippet: `A clear and simple explanation of ${query} for students. Understand the fundamentals with diagrams, examples, and practice questions to test your knowledge.`,
      date: "2023-12-20",
    },
    {
      title: `${query} – Khan Academy`,
      url: `https://khanacademy.example.com/search?q=${encodeURIComponent(query)}`,
      snippet: `Khan Academy offers free, high-quality lessons on ${query}. Watch videos, practice exercises, and track your progress as you learn at your own pace.`,
      date: "2024-02-08",
    },
    {
      title: `History and Background of ${query}`,
      url: `https://historyarchive.example.com/${encodeURIComponent(query.toLowerCase().replace(/\s+/g, "-"))}`,
      snippet: `Explore the historical context and background of ${query}. From its origins to its modern significance, this article provides a complete overview.`,
      date: "2023-10-30",
    },
    {
      title: `${query} – Quick Facts for Students`,
      url: `https://quickfacts.example.com/${encodeURIComponent(query.toLowerCase().replace(/\s+/g, "-"))}`,
      snippet: `Five essential facts about ${query} every student should know. Perfect for exam preparation, homework help, or simply satisfying your curiosity.`,
      date: "2024-01-25",
    },
  ];
}

/* Autocomplete suggestions */
const AUTOCOMPLETE_SUGGESTIONS = [
  "albert einstein",
  "climate change",
  "charles darwin",
  "dna structure",
  "french revolution",
  "gravity",
  "isaac newton",
  "marie curie",
  "nikola tesla",
  "photosynthesis",
  "pythagorean theorem",
  "solar system",
  "the big bang",
  "water cycle",
  "world war 2",
  "world war 1",
  "william shakespeare",
];

/* Helper: look up knowledge base entry (case-insensitive) */
function lookupKB(query) {
  const key = query.toLowerCase().trim();
  if (KB[key]) return KB[key];
  // Partial match
  for (const k of Object.keys(KB)) {
    if (key.includes(k) || k.includes(key)) return KB[k];
  }
  return null;
}

/* Helper: look up mock results */
function lookupResults(query) {
  const key = query.toLowerCase().trim();
  if (MOCK_RESULTS[key]) return MOCK_RESULTS[key];
  for (const k of Object.keys(MOCK_RESULTS)) {
    if (key.includes(k) || k.includes(key)) return MOCK_RESULTS[k];
  }
  return generateFallbackResults(query);
}
