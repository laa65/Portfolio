import React, { useState, useEffect } from 'react';

export default function Portfolio() {
  // State to track which section is currently active in the viewport
  const [activeSection, setActiveSection] = useState('home');
  // State to track mouse trail dots
  const [trail, setTrail] = useState([]);
  // Typing effect for the hero heading
  const [typedText, setTypedText] = useState('');
  const fullText = "HEY, I'M LANA!";
  // Floating particles for the hero background
  const [particles] = useState(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 3 + Math.random() * 5,
      duration: 6 + Math.random() * 6,
      delay: Math.random() * 6,
    }))
  );

  // Function to smoothly scroll to a specific section when navigation button is clicked
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Track which section is in view to highlight the active nav button
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'education', 'experience', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse trail effect - adds a dot at the cursor position and fades it out
  useEffect(() => {
    let idCounter = 0;

    const handleMouseMove = (e) => {
      const newDot = {
        id: idCounter++,
        x: e.clientX,
        y: e.clientY + window.scrollY,
      };

      setTrail((prev) => [...prev, newDot]);

      // Remove this dot after a short delay so the trail fades
      setTimeout(() => {
        setTrail((prev) => prev.filter((dot) => dot.id !== newDot.id));
      }, 600);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Typing effect - types out the hero heading letter by letter on page load (and on replay)
  const [typingKey, setTypingKey] = useState(0);

  useEffect(() => {
    let i = 0;
    setTypedText('');
    const typingInterval = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 90);
    return () => clearInterval(typingInterval);
  }, [typingKey]);

  const replayTyping = () => {
    setTypingKey((prev) => prev + 1);
  };

  return (
    <>
      {/* Import Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&family=Space+Mono:wght@400;700&display=swap');

        /* Gradient */
        body {
          background: linear-gradient(45deg, rgba(0, 0, 0, 1) 0%, rgba(78, 0, 138, 1) 55%, rgba(199, 150, 255, 1) 100%);
          background-attachment: fixed;
        }

        /* Mouse trail dot animation */
        @keyframes trailFade {
          0% {
            opacity: 0.8;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0.3);
          }
        }

        .trail-dot {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(199, 150, 255, 0.9);
          box-shadow: 0 0 8px rgba(199, 150, 255, 0.8);
          pointer-events: none;
          animation: trailFade 0.6s ease-out forwards;
          z-index: 9999;
        }

        /* Hover effect for card boxes */
        .hover-card {
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-card:hover {
          border-color: rgb(216, 180, 254);
          box-shadow: 0 0 30px rgba(216, 180, 254, 0.7) !important;
        }

        /* Hover effect for skill/tool pills */
        .skill-pill {
          transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
        }
        .skill-pill:hover {
          background-color: rgb(168, 85, 247);
          border-color: rgb(216, 180, 254);
          color: white;
        }

        /* Project card - left accent style with enhanced hover */
        .project-card {
          position: relative;
          overflow: hidden;
          border-left: 4px solid #a855f7;
          box-shadow: 0 0 16px rgba(168, 85, 247, 0.25);
          transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease, padding-left 0.3s ease;
        }
        .project-card:hover {
          border-left-color: #e9d5ff;
          border-left-width: 8px;
          background: #1f1b2e;
          transform: translateX(10px) scale(1.015);
          box-shadow: 0 0 35px rgba(216, 180, 254, 0.8);
          padding-left: 34px;
        }
        .project-num {
          position: absolute;
          top: 18px;
          right: 24px;
          font-family: 'VT323', monospace;
          font-size: 40px;
          color: rgba(168, 85, 247, 0.3);
          transition: color 0.3s ease, transform 0.3s ease;
        }
        .project-card:hover .project-num {
          color: rgba(216, 180, 254, 0.9);
          transform: scale(1.15);
        }

        /* Typing effect cursor */
        .typed-cursor {
          border-right: 4px solid #e9d5ff;
          animation: blinkCursor 0.7s step-end infinite;
          padding-right: 4px;
        }
        @keyframes blinkCursor {
          50% { border-color: transparent; }
        }

        /* Floating particles in hero section */
        .hero-particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(216, 180, 254, 0.6);
          box-shadow: 0 0 10px rgba(216, 180, 254, 0.8);
          bottom: -20px;
          animation-name: floatUpHero;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          pointer-events: none;
        }
        @keyframes floatUpHero {
          from { transform: translateY(0); opacity: 0.8; }
          to { transform: translateY(-100vh); opacity: 0; }
        }

        /* Fade-in for hero subtext */
        .hero-fade-in {
          opacity: 0;
          animation: heroFadeUp 1s ease forwards;
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Replay button for the typing animation */
        .replay-btn {
          transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .replay-btn:hover {
          background-color: rgb(168, 85, 247);
          border-color: rgb(216, 180, 254);
          box-shadow: 0 0 15px rgba(216, 180, 254, 0.6);
        }
      `}</style>

      {/* Mouse trail dots - rendered at the top level so they float over everything */}
      {trail.map((dot) => (
        <span
          key={dot.id}
          className="trail-dot"
          style={{ left: dot.x - 4, top: dot.y - 4 }}
        />
      ))}

    <div className="min-h-screen text-white" style={{ fontFamily: "'Space Mono', monospace" }}>
      {/* Navigation bar - fixed at top */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex flex-wrap justify-end gap-2 p-2 md:p-4 bg-black bg-opacity-50">
        {/* Navigation buttons */}
        <button
          onClick={() => scrollToSection('home')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition bg-zinc-900 text-white border-2 ${
            activeSection === 'home' ? 'border-purple-400' : 'border-purple-500 hover:border-purple-400'
          }`}
          style={{ boxShadow: activeSection === 'home' ? '0 0 15px rgba(168, 85, 247, 0.6)' : '0 0 10px rgba(168, 85, 247, 0.3)' }}
        >
          Main Page
        </button>
        <button
          onClick={() => scrollToSection('about')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition bg-zinc-900 text-white border-2 ${
            activeSection === 'about' ? 'border-purple-400' : 'border-purple-500 hover:border-purple-400'
          }`}
          style={{ boxShadow: activeSection === 'about' ? '0 0 15px rgba(168, 85, 247, 0.6)' : '0 0 10px rgba(168, 85, 247, 0.3)' }}
        >
          About Me
        </button>
        <button
          onClick={() => scrollToSection('education')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition bg-zinc-900 text-white border-2 ${
            activeSection === 'education' ? 'border-purple-400' : 'border-purple-500 hover:border-purple-400'
          }`}
          style={{ boxShadow: activeSection === 'education' ? '0 0 15px rgba(168, 85, 247, 0.6)' : '0 0 10px rgba(168, 85, 247, 0.3)' }}
        >
          Education
        </button>
        <button
          onClick={() => scrollToSection('experience')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition bg-zinc-900 text-white border-2 ${
            activeSection === 'experience' ? 'border-purple-400' : 'border-purple-500 hover:border-purple-400'
          }`}
          style={{ boxShadow: activeSection === 'experience' ? '0 0 15px rgba(168, 85, 247, 0.6)' : '0 0 10px rgba(168, 85, 247, 0.3)' }}
        >
          Experience
        </button>
        <button
          onClick={() => scrollToSection('projects')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition bg-zinc-900 text-white border-2 ${
            activeSection === 'projects' ? 'border-purple-400' : 'border-purple-500 hover:border-purple-400'
          }`}
          style={{ boxShadow: activeSection === 'projects' ? '0 0 15px rgba(168, 85, 247, 0.6)' : '0 0 10px rgba(168, 85, 247, 0.3)' }}
        >
          Projects
        </button>
        <button
          onClick={() => scrollToSection('skills')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition bg-zinc-900 text-white border-2 ${
            activeSection === 'skills' ? 'border-purple-400' : 'border-purple-500 hover:border-purple-400'
          }`}
          style={{ boxShadow: activeSection === 'skills' ? '0 0 15px rgba(168, 85, 247, 0.6)' : '0 0 10px rgba(168, 85, 247, 0.3)' }}
        >
          Skills
        </button>
        <button
          onClick={() => scrollToSection('contact')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition bg-zinc-900 text-white border-2 ${
            activeSection === 'contact' ? 'border-purple-400' : 'border-purple-500 hover:border-purple-400'
          }`}
          style={{ boxShadow: activeSection === 'contact' ? '0 0 15px rgba(168, 85, 247, 0.6)' : '0 0 10px rgba(168, 85, 247, 0.3)' }}
        >
          Contact
        </button>
      </nav>

      {/* HOME SECTION */}
      <section id="home" className="min-h-screen flex flex-col justify-center items-start px-6 md:px-16 pt-20 relative overflow-hidden">
        {/* Floating particles background */}
        {particles.map((p) => (
          <span
            key={p.id}
            className="hero-particle"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}

        <h1
          className="font-bold tracking-wider mb-4 relative z-10"
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: 'clamp(2.8rem, 9vw, 8rem)',
            lineHeight: 1,
          }}
        >
          <span className={typedText.length < fullText.length ? 'typed-cursor' : ''}>
            {typedText}
          </span>
        </h1>
        <p
          key={`sub1-${typingKey}`}
          className="hero-fade-in text-white mt-4 relative z-10"
          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', animationDelay: '1.6s' }}
        >
          I build things and make data make sense.
        </p>
        <p
          key={`sub2-${typingKey}`}
          className="hero-fade-in text-purple-200 mt-2 relative z-10"
          style={{ fontSize: 'clamp(0.75rem, 1.8vw, 1rem)', animationDelay: '2s' }}
        >
          Cybersecurity • Data Analytics • Web Development • AI • UX/UI
        </p>

        {/* Replay button for the typing animation */}
        <button
          onClick={replayTyping}
          className="replay-btn relative z-10 mt-6 px-4 py-2 rounded-full text-sm font-medium bg-zinc-900 text-white border-2 border-purple-500"
          style={{ boxShadow: '0 0 10px rgba(168, 85, 247, 0.3)' }}
        >
          Replay
        </button>
      </section>

      {/* ABOUT ME SECTION */}
      <section id="about" className="min-h-screen flex flex-col justify-center items-start px-6 md:px-16 py-10 md:py-20">
        <h2 className="text-4xl md:text-6xl font-bold mb-8" style={{ fontFamily: "'VT323', monospace" }}>ABOUT ME</h2>
        <div className="hover-card bg-zinc-900 text-white rounded-3xl p-8 w-full max-w-5xl border-2 border-purple-500" style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}>
          <p className="text-lg leading-relaxed mb-4">
            I'm a computing science student with an AI concentration and a minor in statistics, primarily interested in data science. I enjoy working with data, finding patterns, and explaining insights in a way that makes information easy to understand and actionable.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            I also learn UX/UI on the side because I love the creative and visual side of building intuitive experiences, and I'm fascinated by how AI technology continues to evolve and shape the future.
          </p>
          <p className="text-lg leading-relaxed">
            I enjoy solving problems, simplifying complex ideas, and creating solutions that make sense both technically and visually. I'm currently seeking internships in data science, software development, or UX roles.
          </p>
        </div>
      </section>

      {/* EDUCATION SECTION */}
      <section id="education" className="min-h-screen flex flex-col justify-center items-start px-6 md:px-16 py-10 md:py-20">
        <h2 className="text-6xl font-bold mb-8" style={{ fontFamily: "'VT323', monospace" }}>EDUCATION</h2>
        
        {/* Simon Fraser University */}
        <div className="project-card bg-zinc-900 text-white rounded-2xl p-6 md:p-8 w-full max-w-5xl mb-5">
          <span className="project-num">01</span>
          <h3 className="text-3xl font-bold mb-2">SIMON FRASER UNIVERSITY</h3>
          <p className="text-lg font-semibold">Bachelor of Science in Computer Science, AI Concentration, & Minor in Statistics</p>
          <p className="text-base">January 2023 - Present (expected completion: April 2027)</p>
        </div>

        {/* Vancouver Community College */}
        <div className="project-card bg-zinc-900 text-white rounded-2xl p-6 md:p-8 w-full max-w-5xl mb-5">
          <span className="project-num">02</span>
          <h3 className="text-3xl font-bold mb-2">VANCOUVER COMMUNITY COLLEGE</h3>
          <p className="text-lg font-semibold">UT Science Certificate</p>
          <p className="text-base">January 2022 - December 2022</p>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="min-h-screen flex flex-col justify-center items-start px-6 md:px-16 py-10 md:py-20">
        <h2 className="text-6xl font-bold mb-8" style={{ fontFamily: "'VT323', monospace" }}>EXPERIENCE</h2>
        
        {/* Digital Risk & Resilience Analyst Co-op */}
        <div className="project-card bg-zinc-900 text-white rounded-2xl p-6 md:p-8 w-full max-w-5xl mb-5">
          <span className="project-num">01</span>
          <h3 className="text-2xl font-bold mb-2">Digital Risk & Resilience Analyst Co-op</h3>
          <p className="text-sm font-semibold mb-1 text-purple-300">Digital Risk & Cyber Security</p>
          <p className="text-sm font-semibold mb-3 text-purple-300">Teck Resources – Vancouver, BC | February 2026 – August 2026</p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Created and launched Cyber Pulse, a monthly cybersecurity awareness campaign delivering threat trends, security topics, and interactive activities to employees.</li>
            <li>Built an end-to-end Power BI dashboard giving leadership real-time visibility into phishing results, SAT metrics, and cybersecurity KPIs.</li>
            <li>Contributed to Business Impact Analysis (BIA) and enterprise resilience planning, assessing critical functions and recovery priorities</li>
            <li>Analyzed phishing results to identify behavioral patterns and recommended targeted security awareness training and advisories</li>
          </ul>
        </div>

        {/* UX/UI & Website Development */}
        <div className="project-card bg-zinc-900 text-white rounded-2xl p-6 md:p-8 w-full max-w-5xl mb-5">
          <span className="project-num">02</span>
          <h3 className="text-2xl font-bold mb-2">UX/UI & Website Development</h3>
          <p className="text-sm font-semibold mb-1 text-purple-300"><a href="https://www.mealvue.online" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline hover:text-purple-200">MeAIvue</a> - Riipen</p>
          <p className="text-sm font-semibold mb-3 text-purple-300">January 2026 – March 2026</p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Conducted UX/UI audit using Nielsen's heuristics, identifying usability gaps and system behavior issues</li>
            <li>Designed a complete UI overhaul in Figma, improving usability and visual consistency</li>
            <li>Redesigned the website to align with app branding, enhancing user experience and visual cohesion</li>
          </ul>
        </div>

        {/* Computing Science Peer Tutor */}
        <div className="project-card bg-zinc-900 text-white rounded-2xl p-6 md:p-8 w-full max-w-5xl mb-5">
          <span className="project-num">03</span>
          <h3 className="text-2xl font-bold mb-2">Computing Science Peer Tutor (Educator)</h3>
          <p className="text-sm font-semibold mb-3 text-purple-300">School of Computing Science - Simon Fraser University | Curent</p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Assisted with debugging C++ and Python programs</li>
            <li>Explained data structures, algorithms, and discrete math concepts clearly to CS students</li>
            <li>Strengthened communication and technical problem-solving skills</li>
          </ul>
        </div>

        {/* Stuffies Pastries */}
        <div className="project-card bg-zinc-900 text-white rounded-2xl p-6 md:p-8 w-full max-w-5xl mb-5">
          <span className="project-num">04</span>
          <h3 className="text-2xl font-bold mb-2">Stuffies Pastries</h3>
          <p className="text-sm font-semibold mb-3 text-purple-300">METROPOLIS AT METROTOWN | MAY 2023 - JULY 2024</p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Provided front-line customer service in a fast-paced environment.</li>
            <li>Worked efficiently under pressure while multitasking.</li>
            <li>Supported daily opening and closing duties.</li>
            <li>Consistently met or exceeded daily sales goals.</li>
            <li>Handled cash transactions and operated the POS system efficiently.</li>
            <li>Prepared and served specialty drinks, pastries, and ice cream.</li>
          </ul>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="min-h-screen flex flex-col justify-center items-start px-6 md:px-16 py-10 md:py-20">
        <h2 className="text-6xl font-bold mb-8" style={{ fontFamily: "'VT323', monospace" }}>PROJECTS</h2>

        {/* Flowrk Project */}
        <div className="project-card bg-zinc-900 text-white rounded-2xl p-6 md:p-8 w-full max-w-5xl mb-5">
          <span className="project-num">01</span>
          <h3 className="text-2xl font-bold mb-2">Flowrk — Team Task & Workload Management App</h3>
          <p className="text-sm font-semibold mb-3 text-purple-300">React, AI Integration | Present</p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Built Flowrk, a React app solving team workload visibility and check-in inefficiency, replacing shared Excel sheets with a real-time kanban board, per-person capacity tracker, and structured meeting mode</li>
            <li>Implemented AI features including natural language task creation, automated meeting summaries, and capacity overload alerts</li>
            <li>Led end-to-end product development — from problem identification and product proposal to brand identity, UI design, and a working prototype currently being validated with real users</li>
          </ul>
        </div>

        {/* Gender Traits Project */}
        <div className="project-card bg-zinc-900 text-white rounded-2xl p-6 md:p-8 w-full max-w-5xl mb-5">
          <span className="project-num">02</span>
          <h3 className="text-2xl font-bold mb-2">Gender Traits in Psychological Data</h3>
          <p className="text-sm font-semibold mb-3 text-purple-300">Python, Pandas, Scikit-learn, Seaborn, Matplotlib | April - August 2024 | <a href="https://github.com/laa65/Gender-Traits-Data-Science-Project-" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline hover:text-purple-200">GitHub</a></p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Built a Python data pipeline to clean and preprocess 316,000+ records, improving reliability and analysis readiness.</li>
            <li>Implemented Random Forest and KMeans models using scikit-learn; achieved 83% accuracy</li>
            <li>Optimized feature selection by reducing 44 traits to 2 composite scores.</li>
            <li>Wrote reusable analysis scripts and visualizations using Pandas, Matplotlib, and Seaborn.</li>
          </ul>
        </div>

        {/* PenguinSteps Project */}
        <div className="project-card bg-zinc-900 text-white rounded-2xl p-6 md:p-8 w-full max-w-5xl mb-5">
          <span className="project-num">03</span>
          <h3 className="text-2xl font-bold mb-2">PenguinSteps - Senior-Friendly Tech Support Website</h3>
          <p className="text-sm font-semibold mb-3 text-purple-300">React, CSS, Figma | May 2024 | <a href="https://penguinsteps.netlify.app" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline hover:text-purple-200">Website</a></p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Built a responsive React front-end with reusable components and accessibility-focused UI.</li>
            <li>Implemented client-side state management and component-based architecture.</li>
            <li>Researched seniors' tech challenges to inform layout, text size, and color choices</li>
            <li>Won the "Most Accessible" Award for creating an inclusive tech-assistance platform for older adults</li>
          </ul>
        </div>

        {/* SFU Admissions Management System */}
        <div className="project-card bg-zinc-900 text-white rounded-2xl p-6 md:p-8 w-full max-w-5xl mb-5">
          <span className="project-num">04</span>
          <h3 className="text-2xl font-bold mb-2">SFU Admissions Management System</h3>
          <p className="text-sm font-semibold mb-3 text-purple-300">Figma | January – April 2025 | <a href="https://www.figma.com/proto/gGJpbNZjNer95vUhTDrdaa/376W-Project?node-id=29-18" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline hover:text-purple-200">Mockup 1</a> / <a href="https://www.figma.com/proto/gGJpbNZjNer95vUhTDrdaa/376W-Project?node-id=72-102&t=yBBBMD2HZ0bfhfVh-1" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline hover:text-purple-200">Mockup 2</a> / <a href="https://www.figma.com/proto/gGJpbNZjNer95vUhTDrdaa/376W-Project?node-id=90-3&t=7RkIgNM3ow8cMYn4-1" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline hover:text-purple-200">Mockup 3</a></p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Led system design for a role-based admissions management platform supporting 3 stakeholder types.</li>
            <li>Translated functional requirements into wireflows and system logic</li>
            <li>Coordinated deliverables across team members using Agile practices </li>
            <li>Conducted benchmarking research and co-authored key report sections</li>
          </ul>
        </div>

        {/* Discover Jordan Landing Page */}
        <div className="project-card bg-zinc-900 text-white rounded-2xl p-6 md:p-8 w-full max-w-5xl mb-5">
          <span className="project-num">05</span>
          <h3 className="text-2xl font-bold mb-2">Discover Jordan Landing Page Design</h3>
          <p className="text-sm font-semibold mb-3 text-purple-300">Figma | 2024 | <a href="https://www.figma.com/proto/n6LMKDsyIATLOvSGjpGapw/Jordan?node-id=1-2&t=AfYJwd2qZdeQYQup-1" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline hover:text-purple-200">Mockup</a></p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Created a user-friendly landing page for tourists exploring Jordan</li>
            <li>Included culture, top destinations, tips, and traditions. Highlighted unique attractions and reasons to visit Jordan</li>
            <li>Designed to guide visitors with intuitive navigation and compelling visuals</li>
            <li>Showcased Jordanian cuisine, art, and culture to inspire travel interest</li>
          </ul>
        </div>

        {/* Margot - AI Color Stylist */}
        <div className="project-card bg-zinc-900 text-white rounded-2xl p-6 md:p-8 w-full max-w-5xl mb-5">
          <span className="project-num">06</span>
          <h3 className="text-2xl font-bold mb-2">Margot - AI Color Stylist</h3>
          <p className="text-sm font-semibold mb-3 text-purple-300">Canva | July 2024 | <a href="https://appadvice.com/app/margot-ai-color-stylist/6505045671.amp" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline hover:text-purple-200">Website</a></p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Created multiple logo designs with a colorful background and the letter "M" using Canva</li>
            <li>Collaborated with developers to refine and align designs with the app's brand</li>
            <li>Explored various color schemes and typography to match the app's aesthetic</li>
            <li>Managed project timelines to meet the app's development schedule</li>
            <li>Adapted the logo design for different screen sizes and devices</li>
          </ul>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="min-h-screen flex flex-col justify-center items-start px-6 md:px-16 py-10 md:py-20">
        <h2 className="text-6xl font-bold mb-8" style={{ fontFamily: "'VT323', monospace" }}>SKILLS</h2>
        
        <div className="flex flex-col gap-6 w-full max-w-5xl">
          {/* Languages */}
          <div className="hover-card bg-zinc-900 text-white rounded-3xl p-6 border-2 border-purple-500" style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}>
            <h3 className="text-2xl font-bold mb-4">Languages</h3>
            <div className="flex flex-wrap gap-3">
              <span className="skill-pill bg-zinc-800 text-white px-5 py-2 rounded-full text-sm border border-purple-500">Python</span>
              <span className="skill-pill bg-zinc-800 text-white px-5 py-2 rounded-full text-sm border border-purple-500">C</span>
              <span className="skill-pill bg-zinc-800 text-white px-5 py-2 rounded-full text-sm border border-purple-500">C++</span>
              <span className="skill-pill bg-zinc-800 text-white px-5 py-2 rounded-full text-sm border border-purple-500">R</span>
              <span className="skill-pill bg-zinc-800 text-white px-5 py-2 rounded-full text-sm border border-purple-500">HTML</span>
              <span className="skill-pill bg-zinc-800 text-white px-5 py-2 rounded-full text-sm border border-purple-500">CSS</span>
              <span className="skill-pill bg-zinc-800 text-white px-5 py-2 rounded-full text-sm border border-purple-500">SQL</span>
              <span className="skill-pill bg-zinc-800 text-white px-5 py-2 rounded-full text-sm border border-purple-500">TypeScript (TSX)</span>
            </div>
          </div>

          {/* Tools & Systems */}
          <div className="hover-card bg-zinc-900 text-white rounded-3xl p-6 border-2 border-purple-500" style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}>
            <h3 className="text-2xl font-bold mb-4">Tools & Systems</h3>
            <div className="flex flex-wrap gap-3">
              <span className="skill-pill bg-zinc-800 text-white px-5 py-2 rounded-full text-sm border border-purple-500">Git</span>
              <span className="skill-pill bg-zinc-800 text-white px-5 py-2 rounded-full text-sm border border-purple-500">GitHub</span>
              <span className="skill-pill bg-zinc-800 text-white px-5 py-2 rounded-full text-sm border border-purple-500">VSCode</span>
              <span className="skill-pill bg-zinc-800 text-white px-5 py-2 rounded-full text-sm border border-purple-500">RStudio</span>
              <span className="skill-pill bg-zinc-800 text-white px-5 py-2 rounded-full text-sm border border-purple-500">Docker</span>
              <span className="skill-pill bg-zinc-800 text-white px-5 py-2 rounded-full text-sm border border-purple-500">Jupyter</span>
              <span className="skill-pill bg-zinc-800 text-white px-5 py-2 rounded-full text-sm border border-purple-500">Figma</span>
              <span className="skill-pill bg-zinc-800 text-white px-5 py-2 rounded-full text-sm border border-purple-500">MATLAB</span>
              <span className="skill-pill bg-zinc-800 text-white px-5 py-2 rounded-full text-sm border border-purple-500">Power BI</span>
            </div>
          </div>

          {/* Data & ML */}
          <div className="hover-card bg-zinc-900 text-white rounded-3xl p-6 border-2 border-purple-500" style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}>
            <h3 className="text-2xl font-bold mb-4">Data & ML</h3>
            <div className="flex flex-wrap gap-3">
              <span className="skill-pill bg-zinc-800 text-white px-5 py-2 rounded-full text-sm border border-purple-500">Numpy</span>
              <span className="skill-pill bg-zinc-800 text-white px-5 py-2 rounded-full text-sm border border-purple-500">Pandas</span>
              <span className="skill-pill bg-zinc-800 text-white px-5 py-2 rounded-full text-sm border border-purple-500">Scikit-learn</span>
              <span className="skill-pill bg-zinc-800 text-white px-5 py-2 rounded-full text-sm border border-purple-500">StatsModel</span>
              <span className="skill-pill bg-zinc-800 text-white px-5 py-2 rounded-full text-sm border border-purple-500">Matplotlib</span>
              <span className="skill-pill bg-zinc-800 text-white px-5 py-2 rounded-full text-sm border border-purple-500">Seaborn</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="min-h-screen flex flex-col justify-center items-start px-6 md:px-16 py-10 md:py-20">
        <h2 className="text-6xl font-bold mb-8" style={{ fontFamily: "'VT323', monospace" }}>CONTACT</h2>
        <div className="hover-card bg-zinc-900 text-white rounded-3xl p-8 w-full max-w-5xl border-2 border-purple-500" style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}>
          <p className="text-lg mb-4">Get in touch with me!</p>
          <p className="text-base mb-2"><span className="text-purple-400 font-semibold">Email:</span> <a href="mailto:alsheikhlana@hotmail.com" className="text-purple-400 hover:text-purple-300">alsheikhlana@hotmail.com</a></p>
          <p className="text-base mb-2"><span className="text-purple-400 font-semibold">LinkedIn:</span> <a href="https://www.linkedin.com/in/lanaalsheikh" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">linkedin.com/in/lanaalsheikh</a></p>
          <p className="text-base"><span className="text-purple-400 font-semibold">GitHub:</span> <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">github.com</a></p>

          {/* Resume Download Button */}
          <a 
            href="/Lana Alsheik-Fall 2026 copy.pdf" 
            download="Lana Alsheikh Resume.pdf"
            className="inline-block bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-6 rounded-full transition border-2 border-purple-400 mt-4 -ml-2"
            style={{ boxShadow: '0 0 15px rgba(168, 85, 247, 0.5)' }}
          >
            Download Resume (PDF)
          </a>
        </div>
      </section>
    </div>
    </>
  );
}