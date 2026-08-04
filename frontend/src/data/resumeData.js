// frontend/src/data/resumeData.js

export const resumeData = {
  identity: {
    name: "Jennifer O. Peterson",
    title: "Cybersecurity-Focused Software Engineer",
    location: "New York, NY",
    bio: "Cybersecurity-focused Programming & Software Development student with hands-on experience in secure application development and cybersecurity operations. Experienced in threat detection, vulnerability identification, secure authentication, and Python-based automation."
  },
  credentials: [
    { id: 1, name: "Google Cloud Cybersecurity Certificate", issuer: "Coursera", year: "2026", status: "Verified" },
    { id: 2, name: "Google Cybersecurity Certificate", issuer: "Coursera", year: "2025", status: "Verified" },
    { id: 3, name: "Technical Interview Prep", issuer: "CodePath", year: "2025", status: "Completed" },
    { id: 4, name: "Intro to Programming", issuer: "Code the Dream", year: "2025", status: "Completed" },
    { id: 5, name: "AAS, Programming & Software Development", issuer: "CUNY LaGuardia Community College", year: "2025-2027", status: "In Progress" }
  ],
  experience: [
    {
      id: 1,
      role: "Software Engineering Intern",
      company: "Mentor Me Collective",
      period: "June 2026 - Present",
      type: "INTERNSHIP_DEPLOYMENT",
      bullets: [
        "Collaborating on cohort management systems and leveraging AI frameworks to automate administrative tasks.",
        "Ensuring secure software design practices and keeping up-to-date documentation on technical workflows."
      ]
    },
    {
      id: 2,
      role: "Cybersecurity Intern",
      company: "United Nations International Computing Centre (UNICC)",
      period: "Winter 2026",
      type: "INTERNSHIP_DEPLOYMENT",
      bullets: [
        "Developed and tested a Python automation to support a cybersecurity tabletop exercise, streamlining scenario inputs and outputs.",
        "Improved execution efficiency and ensured secure handling of exercise data in support of operational security objectives."
      ]
    },
    {
      id: 3,
      role: "Full Stack Software Engineer",
      company: "Pursuit Fellowship",
      period: "2022 - 2024",
      type: "FELLOWSHIP_DEPLOYMENT",
      bullets: [
        "Developed multiple full-stack web applications using JavaScript, React, and PostgreSQL through an intensive software engineering fellowship.",
        "Applied test-driven development and collaborative problem-solving practices to optimize app performance."
      ]
    }
  ],
projects: [
  {
    id: 'pokedex',
    title: "Jennifer's Pokédex",
    description: "🚧 [WORK IN PROGRESS] Pokémon-themed React application with custom API integration, dark mode toggle, and a responsive battle/comparison interface.",
    securitySpecs: [
      "Client-side Input Sanitization: Strict query formatting on PokéAPI fetch parameters to prevent unexpected payload injection.",
      "State Security: Encapsulated dark mode preferences and component-level state without local storage data leakage.",
      "Upstream Protection: Debounced search interactions to prevent excessive client API hammering and limit-exceeded errors."
    ],
    tech: ["React", "Vite", "REST API", "CSS3"],
    liveUrl: "https://example.com",
    frontendRepo: "https://github.com/JenniferPeterson1203/pokedex"
  },
  {
    id: 'roots-and-recipes',
    title: "Roots & Recipes",
    description: "🚧 [ACTIVE DEVELOPMENT] A full-stack, family-centric recipe sharing network featuring robust secure session authentication and full CRUD data management.",
    securitySpecs: [
      "Session Authentication: Integrated Auth0 OAuth 2.0 / OIDC flows for secure user login and token management.",
      "Data Access Controls: Backend authorization checks validating session tokens before allowing CRUD operations on recipe records.",
      "Database Integrity: Parameterized PostgreSQL queries preventing SQL injection vulnerabilities.",
      "Restful API Security: Express middleware validating request bodies and enforcing CORS restrictions."
    ],
    tech: ["React", "Node.js", "Express", "PostgreSQL", "Auth0"],
    frontendRepo: "https://github.com/JenniferPeterson1203/roots-and-recipes-frontend",
    backendRepo: "https://github.com/JenniferPeterson1203/roots-and-recipes-backend"
  },
  {
    id: 'audit-tool',
    title: "Secrets & Data-Handling Security Audit Tool",
    description: "⚡ [CURRENTLY BUILDING @ MENTOR ME COLLECTIVE] Standalone Python CLI tool designed to detect credential leaks using regex pattern matching and an NVIDIA NIM explanation layer.",
    securitySpecs: [
      "Internship Context: Designed and developed during Software Security Engineering Internship at Mentor Me Collective (MMC).",
      "Detection Vector: Python CLI Regex pattern engine scanning for exposed API keys, secret tokens, and high-entropy strings.",
      "AI Explanation Layer: Integrated NVIDIA NIM inference layer to explain security policy violations in real-time.",
      "Data Handling: In-memory metadata redaction ensuring raw sensitive values never persist to disk or logs.",
      "Branch Safeguards: Integrated pre-commit hooks to audit repository changes before staging commits."
    ],
    tech: ["Python", "Regex", "NVIDIA NIM", "Git Hooks", "CLI"],
    frontendRepo: "https://github.com/JenniferPeterson1203/secrets-audit-tool"
  }
]
};