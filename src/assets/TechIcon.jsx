import React, { useState, useEffect } from 'react';
// Import from tech-stack-icons package
import StackIcon from "tech-stack-icons";

const TechIcon = ({ name, color, size = 50, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timeout);
  }, []);
  
  // Normalize tech name to match package's expected format
  const getNormalizedTechName = (name) => {
    const techMap = {
      // Programming Languages
      'java': 'java',
      'python': 'python',
      'c#': 'csharp',
      'c++': 'c++',
      'php': 'php',
      'javascript': 'js',
      'typescript': 'typescript',
      
      // Libraries & Frameworks
      'spring': 'spring',
      'spring boot': 'springboot',
      'flask': 'flask',
      '.net': 'dotnet',
      'react' : 'reactjs',
      'react native': 'reactnative',
      'laravel': 'laravel',
      'kafka': 'kafka',
      
      // Databases
      'postgres': 'postgresql',
      'firebase': 'firebase',
      'mysql': 'mysql',
      'mongodb': 'mongodb',
      'elasticsearch': 'elastic',
      'oracle': 'oracle',
      'oracle db': 'oracle',

      // DevOps & Cloud Services
      'git' : 'git',
      'aws': 'aws',
      'docker': 'docker',
      'kubernetes': 'kubernetes',
      'terraform': 'terraform',
      'jenkins': 'jenkins',
      'gitlab ci': 'gitlabci',
      'azure': 'azure',
      'google cloud': 'googlecloud',
      'nginx': 'nginx',
      'apache': 'apache',
      'tomcat': 'tomcat',
      'github actions': 'githubactions',
      'graphql': 'graphql',
      
    };
    
    return techMap[name.toLowerCase()] || name.toLowerCase();
  };

  return (
    <div 
      className={`tech-icon flex flex-col items-center justify-center ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`
          relative flex items-center justify-center rounded-full overflow-hidden 
          transition-all duration-300 ease-in-out
          ${isHovered ? 'scale-110 shadow-lg' : 'scale-100'}
          ${isLoaded ? 'animate-fadeIn' : 'opacity-0'}
        `}
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <StackIcon 
          name={getNormalizedTechName(name)}
          style={{ 
            width: `${size * 0.7}px`, 
            height: `${size * 0.7}px`,
            transition: 'all 0.3s ease-in-out',
            filter: isHovered ? 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))' : 'none',
            animation: isHovered ? 'pulse-wave 2s ease-in-out infinite' : 'none',
          }}
        />
      </div>
      <span 
        className={`
          mt-2 text-sm font-medium opacity-70 transition-all duration-300
          ${isHovered ? 'opacity-100' : 'opacity-70'}
        `}
        style={{ color: color }}
      >
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </span>
    </div>
  );
};

export default TechIcon; 