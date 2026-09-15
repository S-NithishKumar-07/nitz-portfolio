export const personalInfo = {
  name: "Nithishkumar",
  roles: [
    "MERN Stack Developer",
    "Photographer",
    "Cinematographer",
    "Full Stack Engineer",
    "Visual Storyteller",
  ],
  tagline: "Developer by code, storyteller by lens",
  location: "Tamil Nadu, India",
  email: "nithishkumarseeni@gmail.com",
  bio: "Passionate MERN stack developer with strong skills in MongoDB, Express.js, React.js, and Node.js. Also a creative photographer and cinematographer who captures cinematic visuals and tells stories through the lens.",
  about: `I'm Nithishkumar — a fresher MERN Stack Developer with a dual passion for code and creative visual arts. 
  
  Growing up in Tamil Nadu, I discovered two loves: the logical elegance of programming and the emotional power of a well-framed photograph. These two worlds collide in everything I create.
  
  As a developer, I build scalable web applications using React, Node.js, Express, and MongoDB. As a visual artist, I craft cinematic stories through photography and videography that move people.
  
  I believe the best digital experiences are both technically excellent and visually powerful — and that's exactly what I strive to build.`,
  socials: {
    github: "https://github.com/S-NithishKumar-07",
    linkedin: "https://www.linkedin.com/in/nithishkumar-s-?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    instagram: "https://www.instagram.com/wanderer__nova?igsh=M2p3ZG0xZ2RoaGpk",
  },
};

export const skills = [
  {
    category: "Frontend",
    icon: "💻",
    color: "#00D9FF",
    items: [
      { name: "React.js", level: 85 },
      { name: "Next.js", level: 80 },
      { name: "Angular.js", level: 70 },
      { name: "JavaScript", level: 88 },
      { name: "Tailwind CSS", level: 90 },
      { name: "HTML5", level: 92 },
      { name: "CSS3", level: 88 },
      { name: "TypeScript", level: 70 },
    ],
  },
  {
    category: "Backend",
    icon: "⚙️",
    color: "#8B5CF6",
    items: [
      { name: "Node.js", level: 80 },
      { name: "Express.js", level: 78 },
      { name: "REST APIs", level: 82 },
    ],
  },
  {
    category: "Database",
    icon: "🗄️",
    color: "#FFD700",
    items: [
      { name: "MongoDB", level: 78 },
      { name: "Mongoose", level: 75 },
    ],
  },
  {
    category: "Tools",
    icon: "🔧",
    color: "#FF6B6B",
    items: [
      { name: "Git & GitHub", level: 85 },
      { name: "VS Code", level: 92 },
      { name: "Figma", level: 70 },
      { name: "Postman", level: 80 },
    ],
  },
  {
    category: "Creative",
    icon: "🎨",
    color: "#FF9F43",
    items: [
      { name: "Photography", level: 90 },
      { name: "Cinematography", level: 85 },
      { name: "Video Editing", level: 80 },
      { name: "Color Grading", level: 75 },
      { name: "Drawing", level: 85 },
      { name: "3D Animation (Blender)", level: 75 },
    ],
  },
  {
    category: "Languages",
    icon: "🗣️",
    color: "#2DD4BF",
    items: [
      { name: "Tamil", level: 100 },
      { name: "English", level: 100 },
      { name: "Malayalam", level: 80 },
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-stack MERN e-commerce app with user authentication, product management, cart, and Razorpay payment integration.",
    category: "Fullstack",
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/S-NithishKumar-07",
    live: "#",
    featured: true,
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "Real-time collaborative task manager with drag-and-drop, team spaces, and deadline tracking built with React and Socket.io.",
    category: "Frontend",
    tech: ["React", "Socket.io", "Tailwind CSS", "LocalStorage"],
    github: "https://github.com/S-NithishKumar-07",
    live: "#",
    featured: true,
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 3,
    title: "Blog REST API",
    description:
      "Scalable RESTful API for a blogging platform with JWT authentication, CRUD operations, image upload, and pagination.",
    category: "Backend",
    tech: ["Node.js", "Express", "MongoDB", "JWT", "Multer"],
    github: "https://github.com/S-NithishKumar-07",
    live: "#",
    featured: false,
    gradient: "from-yellow-500/20 to-orange-500/20",
  },
  {
    id: 4,
    title: "Portfolio Website",
    description:
      "This very portfolio — built with Next.js, Tailwind CSS, and Framer Motion for a cinematic developer portfolio experience.",
    category: "Frontend",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/S-NithishKumar-07",
    live: "#",
    featured: false,
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    id: 5,
    title: "Student Result Portal",
    description:
      "Web app for managing and displaying student results with role-based access control for admins and students.",
    category: "Fullstack",
    tech: ["React", "Node.js", "MongoDB", "Express", "Bootstrap"],
    github: "https://github.com/S-NithishKumar-07",
    live: "#",
    featured: false,
    gradient: "from-red-500/20 to-rose-500/20",
  },
  {
    id: 6,
    title: "Weather Dashboard",
    description:
      "Beautiful weather forecast app using OpenWeatherMap API with 7-day forecasts, location search, and animated icons.",
    category: "Frontend",
    tech: ["React", "REST API", "CSS3", "Chart.js"],
    github: "https://github.com/S-NithishKumar-07",
    live: "#",
    featured: false,
    gradient: "from-sky-500/20 to-indigo-500/20",
  },
];

export const blogPosts = [
  {
    id: 1,
    title: "My Journey as a MERN Stack Developer",
    excerpt:
      "From writing my first HTML tag to building full-stack apps — here's how I navigated the world of web development as a fresh graduate in Tamil Nadu.",
    category: "Development",
    readTime: "5 min read",
    date: "March 15, 2024",
    gradient: "from-cyan-500/10 to-blue-500/10",
    icon: "💻",
  },
  {
    id: 2,
    title: "Photography Tips for Beginners",
    excerpt:
      "You don't need expensive gear to take stunning photos. Here are 10 composition rules and lighting techniques that transformed my photography overnight.",
    category: "Photography",
    readTime: "7 min read",
    date: "February 28, 2024",
    gradient: "from-purple-500/10 to-pink-500/10",
    icon: "📸",
  },
  {
    id: 3,
    title: "Why Every Developer Should Learn Visual Design",
    excerpt:
      "Code + creativity = unstoppable. Discover how learning photography and design made me a better developer and how you can leverage visual thinking in your work.",
    category: "Design",
    readTime: "6 min read",
    date: "January 20, 2024",
    gradient: "from-yellow-500/10 to-orange-500/10",
    icon: "🎨",
  },
];

export const creativeWorks = [
  {
    id: 1,
    type: "photo",
    title: "Golden Hour Portrait",
    category: "Photos",
    placeholder: true,
  },
  {
    id: 2,
    type: "photo",
    title: "Urban Architecture",
    category: "Photos",
    placeholder: true,
  },
  {
    id: 3,
    type: "video",
    title: "Short Film Teaser",
    category: "Videos",
    youtubeId: "dQw4w9WgXcQ",
    placeholder: true,
  },
  {
    id: 4,
    type: "photo",
    title: "Street Photography",
    category: "Photos",
    placeholder: true,
  },
  {
    id: 5,
    type: "photo",
    title: "Nature + Macro",
    category: "Photos",
    placeholder: true,
  },
  {
    id: 6,
    type: "video",
    title: "Product Reel",
    category: "Videos",
    youtubeId: "dQw4w9WgXcQ",
    placeholder: true,
  },
  {
    id: 7,
    type: "photo",
    title: "Festival Moments",
    category: "Photos",
    placeholder: true,
  },
  {
    id: 8,
    type: "photo",
    title: "Night City Lights",
    category: "Photos",
    placeholder: true,
  },
];

export const videoProjects = [
  {
    id: 1,
    title: "Cinematic Travel Reel",
    description: "A short cinematic reel capturing the beauty of South India.",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "Product Commercial",
    description: "A professional product advertisement showcasing local brands.",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 3,
    title: "Short Film — 'Echoes'",
    description: "A 5-minute narrative short film about connection and solitude.",
    youtubeId: "dQw4w9WgXcQ",
  },
];

export const education = [
  {
    degree: "B.Sc. Computer Science",
    institution: "GTN Arts College",
    year: "2022 – 2025",
    grade: "",
  },
  {
    degree: "Higher Secondary (12th)",
    institution: "DKG Model Higher Secondary School",
    year: "2020 – 2022",
    grade: "",
  },
  {
    degree: "MERN Stack Development",
    institution: "Career Lines",
    year: "Ongoing",
    grade: "Course / Training",
  },
];

export const experience = [
  {
    role: "Software Developer Intern",
    company: "Ultra GITS",
    location: "Chennai, Tamil Nadu",
    duration: "6 Months",
    type: "Internship",
    icon: "💻",
    color: "#3b82f6",
    description:
      "Worked as a Software Developer Intern at Ultra GITS, Chennai. Contributed to real-world web development projects, collaborated with senior developers, and gained hands-on experience in the software development lifecycle.",
    highlights: [
      "Developed and maintained web applications using modern tech stacks",
      "Collaborated with cross-functional teams on live client projects",
      "Learned industry-standard coding practices and version control with Git",
    ],
  },
  {
    role: "Cinematographer, Photographer & Editor",
    company: "Jai Studio",
    location: "Tamil Nadu, India",
    duration: "4 Years",
    type: "Part-Time",
    icon: "🎬",
    color: "#f59e0b",
    description:
      "Worked part-time at Jai Studio for 4 years as a Cinematographer, Photographer, and Video Editor. Handled end-to-end visual production for events, short films, and commercial shoots.",
    highlights: [
      "Cinematography and direction for short films and commercial projects",
      "Professional photography for events, portraits, and products",
      "Video editing, color grading, and post-production using industry tools",
    ],
  },
  {
    role: "Freelance Developer",
    company: "Independent",
    location: "Remote",
    duration: "Ongoing",
    type: "Freelance",
    icon: "🚀",
    color: "#0ea5e9",
    description:
      "Successfully delivered 3 freelance projects as an independent developer, working directly with clients to design, develop, and deploy custom web solutions tailored to their business needs.",
    highlights: [
      "3 projects successfully completed and delivered to clients",
      "End-to-end development from requirements gathering to deployment",
      "Built custom web solutions using MERN stack and modern UI frameworks",
    ],
  },
  {
    role: "Junior Artist",
    company: "Jigarthanda DoubleX",
    location: "Tamil Nadu",
    duration: "2023",
    type: "Film Production",
    icon: "🎥",
    color: "#6366f1",
    description:
      "Worked as a Junior Artist in the Tamil feature film Jigarthanda DoubleX. This opportunity provided incredible exposure to large-scale movie production and professional cinematography.",
    highlights: [
      "Directed by acclaimed filmmaker Karthik Subburaj",
      "Gained on-set experience in a major feature film production",
      "Observed professional cinematography, lighting, and direction up close",
    ],
  },
];

export const achievements = [
  "🏆 Hackathon Finalist — State Level Web Dev Competition",
  "📸 Best Photography Award — College Cultural Fest 2023",
  "🎬 Short Film — Selected at Regional Youth Film Fest",
  "💡 Built 10+ projects during academic tenure",
];
