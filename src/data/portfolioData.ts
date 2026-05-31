export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const skillCategories = [
  {
    title: "Languages",
    icon: "Code2",
    skills: ["JavaScript", "TypeScript", "Java", "Python"],
  },
  {
    title: "Frontend",
    icon: "Layout",
    skills: ["React.js", "HTML", "CSS", "Tailwind CSS"],
  },
  { title: "Backend", icon: "Server", skills: ["Node.js", "Express.js"] },
  { title: "Database", icon: "Database", skills: ["MongoDB"] },
  {
    title: "Tools",
    icon: "Wrench",
    skills: ["Git", "GitHub", "VS Code", "Docker"],
  },
  {
    title: "Security Awareness",
    icon: "ShieldCheck",
    skills: ["JWT", "bcrypt", "OTP Verification", "Role-Based Access Control"],
  },
];

export const projects = [
  {
    title: "The Setu",
    subtitle: "AI Powered Career Development Platform",
    type: "MERN Stack",
    description:
      "An AI-powered career development platform that helps students identify skill gaps, generate personalized learning roadmaps, and get career guidance based on their goals.",
    highlights: [
      "Built a responsive MERN stack web application end-to-end.",
      "Developed skill gap analysis and personalized career roadmap features.",
      "Integrated Google Gemini & Grok LLM for AI-powered guidance and chatbot.",
      "Secure auth with JWT, bcryptjs, OTP verification & role-based access control.",
      "Job matching, mentor booking, gamification, and real-time career insights.",
    ],
    tech: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "bcryptjs",
      "OTP",
      "Gemini AI",
      "Grok LLM",
    ],
    // → REPLACE with your actual GitHub repo URL
    github:
      "https://github.com/harshXrathore/The-Setu-Student-Skill-Progression-Website",
    // → REPLACE with your deployed project URL
    liveDemo: "https://the-setu-student-skill-progression.onrender.com/",
    // → Add your screenshot: /public/project-preview.png
    previewImage: "assets/project-preview.png",
  },
];

export const experience = [
  {
    role: "Cybersecurity Intern",
    company: "Hacktify Cyber Security",
    period: "Feb 2025 – Mar 2025",
    description:
      "Worked on web application security testing, vulnerability analysis, and secure coding practices. This experience sharpened my understanding of authentication flows, application security, and how to architect safer full-stack applications.",
  },
];

export const education = [
  {
    degree: "Bachelor of Technology in Computer Science",
    institution: "Parul Institute of Engineering and Technology",
    period: "2023 – 2027",
    location: "Vadodara, Gujarat",
  },
];

export const contact = {
  // → REPLACE with your actual email
  email: "krishnasinghhaji26@gmail.com",
  // → REPLACE with your LinkedIn URL
  linkedin: "https://www.linkedin.com/in/krishna-deo-292771319/",
  // → REPLACE with your GitHub URL
  github: "https://github.com/krishna-deo",
  location: "Vadodara, Gujarat, India",
};
