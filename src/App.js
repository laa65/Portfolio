import React, { useState, useEffect } from 'react';

export default function Portfolio() {
  // State to track which section is currently active in the viewport
  const [activeSection, setActiveSection] = useState('home');

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
      const sections = ['home', 'about', 'education', 'projects', 'experience', 'skills', 'contact'];
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
      `}</style>
      
    <div className="min-h-screen text-white" style={{ fontFamily: "'Space Mono', monospace" }}>
      {/* Navigation bar - fixed at top */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-end gap-2 p-4 bg-black bg-opacity-50">
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
          onClick={() => scrollToSection('projects')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition bg-zinc-900 text-white border-2 ${
            activeSection === 'projects' ? 'border-purple-400' : 'border-purple-500 hover:border-purple-400'
          }`}
          style={{ boxShadow: activeSection === 'projects' ? '0 0 15px rgba(168, 85, 247, 0.6)' : '0 0 10px rgba(168, 85, 247, 0.3)' }}
        >
          Projects
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
          onClick={() => scrollToSection('skills')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition bg-zinc-900 text-white border-2 ${
            activeSection === 'skills' ? 'border-purple-400' : 'border-purple-500 hover:border-purple-400'
          }`}
          style={{ boxShadow: activeSection === 'skills' ? '0 0 15px rgba(168, 85, 247, 0.6)' : '0 0 10px rgba(168, 85, 247, 0.3)' }}
        >
          Skills
        </button>
        <button
          onClick={() => scrollToSection('courses')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition bg-zinc-900 text-white border-2 ${
            activeSection === 'contact' ? 'border-purple-400' : 'border-purple-500 hover:border-purple-400'
          }`}
          style={{ boxShadow: activeSection === 'contact' ? '0 0 15px rgba(168, 85, 247, 0.6)' : '0 0 10px rgba(168, 85, 247, 0.3)' }}
        >
          Courses
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
      <section id="home" className="min-h-screen flex flex-col justify-center items-start px-16 pt-20">
        <h1 className="text-9xl font-bold tracking-wider mb-4" style={{ fontFamily: "'VT323', monospace" }}>
          HEY, I'M LANA!
        </h1>
        <p className="text-xl text-white mt-4">I build things and make data make sense.</p>
        <p className="text-sm text-purple-200 mt-2">CS student building at the intersection of software engineering, data science, UX/UI, and AI.</p>
      </section>

      {/* ABOUT ME SECTION */}
      <section id="about" className="min-h-screen flex flex-col justify-center items-start px-16">
        <h2 className="text-6xl font-bold mb-8" style={{ fontFamily: "'VT323', monospace" }}>ABOUT ME</h2>
        <div className="bg-zinc-900 text-white rounded-3xl p-8 w-full max-w-5xl border-2 border-purple-500" style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}>
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
      <section id="education" className="min-h-screen flex flex-col justify-center items-start px-16">
        <h2 className="text-6xl font-bold mb-8" style={{ fontFamily: "'VT323', monospace" }}>EDUCATION</h2>
        
        {/* Simon Fraser University */}
        <div className="bg-zinc-900 text-white rounded-3xl p-8 w-full max-w-5xl mb-6 border-2 border-purple-500" style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}>
          <h3 className="text-3xl font-bold mb-2">SIMON FRASER UNIVERSITY</h3>
          <p className="text-lg font-semibold">Bachelor of Science in Computer Science, AI Concentration, & Minor in Statistics</p>
          <p className="text-base">January 2023 - Present (expected completion: April 2027)</p>
        </div>

        {/* Vancouver Community College */}
        <div className="bg-zinc-900 text-white rounded-3xl p-8 w-full max-w-5xl border-2 border-purple-500" style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}>
          <h3 className="text-3xl font-bold mb-2">VANCOUVER COMMUNITY COLLEGE</h3>
          <p className="text-lg font-semibold">UT Science Certificate</p>
          <p className="text-base">January 2022 - December 2022</p>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="min-h-screen flex flex-col justify-center items-start px-16">
        <h2 className="text-6xl font-bold mb-8" style={{ fontFamily: "'VT323', monospace" }}>PROJECTS</h2>
          {/* Gender Traits Project */}
          <div className="bg-zinc-900 text-white rounded-3xl p-8 w-full max-w-5xl mb-6 border-2 border-purple-500" style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}>
            <h3 className="text-2xl font-bold mb-2">Gender Traits in Psychological Data</h3>
            <p className="text-sm font-semibold mb-3">Python, Pandas, Scikit-learn, Seaborn, Matplotlib | April - August 2024 | <a href="https://github.com/laa65/Gender-Traits-Data-Science-Project-" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline hover:text-purple-300">GitHub</a></p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Built a Python data pipeline to clean and preprocess 316,000+ records, improving reliability and analysis readiness.</li>
              <li>Implemented Random Forest and KMeans models using scikit-learn; achieved 83% accuracy</li>
              <li>Optimized feature selection by reducing 44 traits to 2 composite scores.</li>
              <li>Wrote reusable analysis scripts and visualizations using Pandas, Matplotlib, and Seaborn.</li>
            </ul>
          </div>

          {/* PenguinSteps Project */}
          <div className="bg-zinc-900 text-white rounded-3xl p-8 w-full max-w-5xl mb-6 border-2 border-purple-500" style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}>
            <h3 className="text-2xl font-bold mb-2">PenguinSteps - Senior-Friendly Tech Support Website</h3>
            <p className="text-sm font-semibold mb-3">React, CSS, Figma | May 2024 | <a href="https://penguinsteps.netlify.app" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline hover:text-purple-300">Website</a></p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Built a responsive React front-end with reusable components and accessibility-focused UI.</li>
              <li>Implemented client-side state management and component-based architecture.</li>
              <li>Researched seniors' tech challenges to inform layout, text size, and color choices</li>
              <li>Won the "Most Accessible" Award for creating an inclusive tech-assistance platform for older adults</li>
            </ul>
          </div>

          {/* SFU Admissions Management System */}
          <div className="bg-zinc-900 text-white rounded-3xl p-8 w-full max-w-5xl mb-6 border-2 border-purple-500" style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}>
            <h3 className="text-2xl font-bold mb-2">SFU Admissions Management System</h3>
            <p className="text-sm font-semibold mb-3">Figma | January – April 2025 | <a href="https://www.figma.com/proto/gGJpbNZjNer95vUhTDrdaa/376W-Project?node-id=29-18" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline hover:text-purple-300">Mockup 1</a> / <a href="https://www.figma.com/proto/gGJpbNZjNer95vUhTDrdaa/376W-Project?node-id=72-102&t=yBBBMD2HZ0bfhfVh-1" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline hover:text-purple-300">Mockup 2</a> / <a href="https://www.figma.com/proto/gGJpbNZjNer95vUhTDrdaa/376W-Project?node-id=90-3&t=7RkIgNM3ow8cMYn4-1" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline hover:text-purple-300">Mockup 3</a></p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Led system design for a role-based admissions management platform supporting 3 stakeholder types.</li>
              <li>Translated functional requirements into wireflows and system logic</li>
              <li>Coordinated deliverables across team members using Agile practices </li>
              <li>Conducted benchmarking research and co-authored key report sections</li>
            </ul>
          </div>

          {/* Discover Jordan Landing Page */}
          <div className="bg-zinc-900 text-white rounded-3xl p-8 w-full max-w-5xl mb-6 border-2 border-purple-500" style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}>
            <h3 className="text-2xl font-bold mb-2">Discover Jordan Landing Page Design</h3>
            <p className="text-sm font-semibold mb-3">Figma | 2024 | <a href="Yhttps://www.figma.com/proto/n6LMKDsyIATLOvSGjpGapw/Jordan?node-id=1-2&t=AfYJwd2qZdeQYQup-1" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline hover:text-purple-300">Mockup</a></p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Created a user-friendly landing page for tourists exploring Jordan</li>
              <li>Included culture, top destinations, tips, and traditions. Highlighted unique attractions and reasons to visit Jordan</li>
              <li>Designed to guide visitors with intuitive navigation and compelling visuals</li>
              <li>Showcased Jordanian cuisine, art, and culture to inspire travel interest</li>
            </ul>
          </div>

          {/* Margot - AI Color Stylist */}
          <div className="bg-zinc-900 text-white rounded-3xl p-8 w-full max-w-5xl mb-6 border-2 border-purple-500" style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}>
            <h3 className="text-2xl font-bold mb-2">Margot - AI Color Stylist</h3>
            <p className="text-sm font-semibold mb-3">Canva | July 2024 | <a href="https://appadvice.com/app/margot-ai-color-stylist/6505045671.amp" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline hover:text-purple-300">Website</a></p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Created multiple logo designs with a colorful background and the letter "M" using Canva</li>
              <li>Collaborated with developers to refine and align designs with the app's brand</li>
              <li>Explored various color schemes and typography to match the app's aesthetic</li>
              <li>Managed project timelines to meet the app's development schedule</li>
              <li>Adapted the logo design for different screen sizes and devices</li>
            </ul>
          </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="min-h-screen flex flex-col justify-center items-start px-16">
        <h2 className="text-6xl font-bold mb-8" style={{ fontFamily: "'VT323', monospace" }}>EXPERIENCE</h2>
        
        {/* Computing Science Peer Tutor */}
        <div className="bg-zinc-900 text-white rounded-3xl p-8 w-full max-w-5xl mb-6 border-2 border-purple-500" style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}>
          <h3 className="text-2xl font-bold mb-2">Computing Science Peer Tutor (Educator)</h3>
          <p className="text-sm font-semibold mb-3">School of Computing Science - Simon Fraser University | Curent</p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Assisted with debugging C++ and Python programs</li>
            <li>Explained data structures, algorithms, and discrete math concepts clearly to CS students</li>
            <li>Strengthened communication and technical problem-solving skills</li>
          </ul>
        </div>

        {/* Stuffies Pastries */}
        <div className="bg-zinc-900 text-white rounded-3xl p-8 w-full max-w-5xl mb-6 border-2 border-purple-500" style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}>
          <h3 className="text-2xl font-bold mb-2">Stuffies Pastries</h3>
          <p className="text-sm font-semibold mb-3">METROPOLIS AT METROTOWN | MAY 2023 - JULY 2024</p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Provided front-line customer service in a fast-paced environment.</li>
            <li>Worked efficiently under pressure while multitasking.</li>
            <li>Supported daily opening and closing duties.</li>
            <li>Consistently met or exceeded daily sales goals.</li>
            <li>Handled cash transactions and operated the POS system efficiently.</li>
            <li>Prepared and served specialty drinks, pastries, and ice cream.</li>
          </ul>
        </div>

        {/* CVS Data Entry Operator */}
        <div className="bg-zinc-900 text-white rounded-3xl p-8 w-full max-w-5xl border-2 border-purple-500" style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}>
          <h3 className="text-2xl font-bold mb-2">CVS Data Entry Operator</h3>
          <p className="text-sm font-semibold mb-3">JULY 2022 - AUGUST 2022</p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Worked efficiently under pressure while multitasking.</li>
            <li>Entered and maintained accurate records using Microsoft Excel.</li>
            <li>Managed and organized applicant data with strong attention to detail.</li>
            <li>Verified information accuracy and met strict deadlines.</li>
            <li>Typing speed and accuracy, Attention to detail, and Organization skills.</li>
          </ul>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="min-h-screen flex flex-col justify-center items-start px-16">
        <h2 className="text-6xl font-bold mb-8" style={{ fontFamily: "'VT323', monospace" }}>SKILLS</h2>
        
        <div className="grid grid-cols-2 gap-6 w-full max-w-5xl">
          {/* Languages */}
          <div className="bg-zinc-900 text-white rounded-3xl p-6 border-2 border-purple-500" style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}>
            <h3 className="text-2xl font-bold mb-4">Languages</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Python</li>
                <li>C</li>
                <li>C++</li>
                <li>R</li>
              </ul>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>HTML</li>
                <li>CSS</li>
                <li>SQL</li>
              </ul>
            </div>
          </div>

          {/* Development Tools */}
          <div className="bg-zinc-900 text-white rounded-3xl p-6 border-2 border-purple-500" style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}>
            <h3 className="text-2xl font-bold mb-4">Tools & Systems</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Git</li>
                <li>GitHub</li>
                <li>VSCode</li>
                <li>RStudio</li>
              </ul>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Docker</li>
                <li>Jupyter</li>
                <li>Figma</li>
                <li>MATLAB</li>
              </ul>
            </div>
          </div>

          {/* Libraries */}
          <div className="bg-zinc-900 text-white rounded-3xl p-6 border-2 border-purple-500" style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}>
            <h3 className="text-2xl font-bold mb-4">Data & ML</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Numpy</li>
                <li>Pandas</li>
                <li>Scikit-learn</li>
                <li>StatsModel</li>
              </ul>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Matplotlib</li>
                <li>Seaborn</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* COURSES SECTION */}
      <section id="courses" className="min-h-screen flex flex-col justify-center items-start px-16">
        <h2 className="text-6xl font-bold mb-8" style={{ fontFamily: "'VT323', monospace" }}>RELEVANT COURSES</h2>
        
        <div className="grid grid-cols-3 gap-6 w-full">
          {/* Computer Science */}
          <div className="bg-zinc-900 text-white rounded-3xl p-6 border-2 border-purple-500" style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}>
            <h3 className="text-2xl font-bold mb-4">Computer Science</h3>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Data Structures and Algorithms (CMPT 307)</li>
              <li>Computation Data Science (CMPT 353)</li>
              <li>Quantum Algorithms (CMPT 476)</li>
              <li>Biomedical Image Computing (CMPT 419)</li>
              <li>Machine Learning (CMPT 410)</li>
            </ul>
          </div>

          {/* Statistics */}
          <div className="bg-zinc-900 text-white rounded-3xl p-6 border-2 border-purple-500" style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}>
            <h3 className="text-2xl font-bold mb-4">Statistics</h3>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Applied Multivariate Analysis (STAT 445)</li>
              <li>Analysis of Experimental & Observational Data (STAT 302)</li>
              <li>R Language</li>
            </ul>
          </div>

          {/* Mathematics */}
          <div className="bg-zinc-900 text-white rounded-3xl p-6 border-2 border-purple-500" style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}>
            <h3 className="text-2xl font-bold mb-4">Mathematics</h3>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Calculus I & II</li>
              <li>Discrete Mathematics I, II, & III</li>
              <li>Calculus I & II</li>
              <li>Applied linear Algebra</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="min-h-screen flex flex-col justify-center items-start px-16">
        <h2 className="text-6xl font-bold mb-8" style={{ fontFamily: "'VT323', monospace" }}>CONTACT</h2>
        <div className="bg-zinc-900 text-white rounded-3xl p-8 w-full max-w-5xl border-2 border-purple-500" style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}>
          <p className="text-lg mb-4">Get in touch with me!</p>
          <p className="text-base mb-2"><span className="text-purple-400 font-semibold">Email:</span> <a href="mailto:alsheikhlana@hotmail.com" className="text-purple-400 hover:text-purple-300">alsheikhlana@hotmail.com</a></p>
          <p className="text-base mb-2"><span className="text-purple-400 font-semibold">LinkedIn:</span> <a href="https://www.linkedin.com/in/lanaalsheikh" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">linkedin.com/in/lanaalsheikh</a></p>
          <p className="text-base"><span className="text-purple-400 font-semibold">GitHub:</span> <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">github.com</a></p>
          
          {/* Resume Download Button */}
          <a 
            href="/Lana-Alsheikh-'26.pdf" 
            download="Lana_Alsheikh_Resume.pdf"
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