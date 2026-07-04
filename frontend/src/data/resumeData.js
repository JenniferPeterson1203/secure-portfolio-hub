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
      id: 1,
      title: "Roots and Recipes",
      tech: ["JavaScript", "Tailwind CSS", "SQL", "Firebase", "OpenAI API", "PostgreSQL"],
      description: "A full-stack recipe-sharing application using voice and image inputs to maximize accessibility, utilizing Firebase Auth and OpenAI API integrations."
    },
    {
      id: 2,
      title: "React Pokédex Platform",
      tech: ["React", "Vite", "REST APIs", "Tailwind CSS", "State Management"],
      description: "A dynamic client-side application utilizing external REST APIs, state management, and responsive layouts to showcase client-side optimizations."
    }
  ]
};