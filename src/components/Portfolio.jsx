import { motion } from "framer-motion";
import React, { useContext, useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BlurText from "../assets/BlurText";
import CountUp from "../assets/CountUp";
import RotatingText from "../assets/RotatingText";
import TechIcon from "../assets/TechIcon";
import { DarkModeContext } from "./DarkModeProvider";
import Loader from "./Loader";
import ToggleButton from "./ToggleButton";
export default function Portfolio() {
  const { darkMode } = useContext(DarkModeContext);
  const grainCanvasRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const stats = [
    {
      number: "",
      text: "",
    },
    {
      number: "",
      text: "",
    },
    {
      number: "",
      text: "",
    },
    {
      number: "",
      text: "",
    },
  ];

  const ProjectsOverView = [
    {
      image: "",
      title: "",
      description: "",
      technologies: [""],
    },
    {
      image: "",
      title: "",
      description: "",
      technologies: [""],
    },
    {
      image: "",
      title: "",
      description: "",
      technologies: [""],
    },
    {
      image: "",
      title: "",
      description: "",
      technologies: [""],
    },
    {
      image: "",
      title: "",
      description: "",
      technologies: [""],
    },
    {
      image: "",
      title: "",
      description: "",
      technologies: [""],
    },
    {
      image: "",
      title: "",
      description: "",
      technologies: [""],
    },
    {
      image: "",
      title: "",
      description: "",
      technologies: [""],
    },
  ];

  const experiences = [
    {
      title: "",
      company: "",
      location: "",
      period: "",
      responsibilities: [""],
    },
    {
      title: "",
      company: "",
      location: "",
      period: "",
      responsibilities: [""],
    },
  ];

  const certifications = [
    {
      title: "UI/UX design ",
      issuer: "Orange Morocco",
      image: "tech-stack/OIP.jpg",
    },
    {
      title: "Project Completion Certificate",
      issuer:
        "School of Management, Telecommunications and Computer Science — Sup MTI",
      image: "tech-stack/SUPMTI.png",
    },
    {
      title: "Emotional Intelligence Certificate",
      issuer:
        "School of Management, Telecommunications and Computer Science — Sup MTI",
      image: "tech-stack/SUPMTI.png",
    },
    {
      title: "Cisco Certified Network Security ",
      issuer: "Cisco",
      image: "tech-stack/cisco.jpg",
    },
  ];

  const ProjectImage = ({ src, alt }) => (
    <div className="relative w-full mb-5 sm:mb-6">
      <div
        className="
                relative w-full
                h-[180px]
                sm:h-[220px]
                md:h-[260px]
                lg:h-[300px]
                rounded-xl
                overflow-hidden
            "
      >
        <img
          src={src}
          alt={alt}
          className="
                absolute inset-0
                w-full h-full
                object-cover
                transition-transform duration-500
                md:group-hover:scale-105
                "
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
      </div>
    </div>
  );

  const menuPreviousSectionRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1800);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      window.menuScrollY = window.scrollY;
      menuPreviousSectionRef.current = activeSection;

      document.body.classList.add("menu-open");
      document.body.style.top = `-${window.menuScrollY}px`;
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.height = "100vh";
      document.body.style.overflow = "hidden";

      const menuOverlay = document.querySelector(".mobile-menu-overlay");
      if (menuOverlay) {
        menuOverlay.classList.add("open");
        menuOverlay.style.opacity = "1";
        menuOverlay.style.visibility = "visible";
      }
    } else {
      const sectionToRestore = menuPreviousSectionRef.current;

      document.body.classList.remove("menu-open");
      document.body.style.top = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
      document.body.style.overflow = "";

      const menuOverlay = document.querySelector(".mobile-menu-overlay");
      if (menuOverlay) {
        menuOverlay.classList.remove("open");
        menuOverlay.style.opacity = "0";
        menuOverlay.style.visibility = "hidden";
      }

      if (window.menuScrollY !== undefined && sectionToRestore) {
        userClickedNavigationRef.current = true;

        window.lastClickedSection = sectionToRestore;

        window.scrollTo({
          top: window.menuScrollY,
          behavior: "auto",
        });

        setActiveSection(sectionToRestore);

        if (clickTimeoutIdRef.current) {
          clearTimeout(clickTimeoutIdRef.current);
        }

        clickTimeoutIdRef.current = setTimeout(() => {
          userClickedNavigationRef.current = false;
        }, 2000);

        window.menuScrollY = undefined;
      }
    }
  }, [menuOpen, activeSection]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStatIndex((prev) => (prev + 1) % stats.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setActiveSection("hero");
  }, []);

  const userClickedNavigationRef = useRef(false);
  const clickTimeoutIdRef = useRef(null);

  const handleNavClick = (section, event) => {
    if (event) event.preventDefault();

    userClickedNavigationRef.current = true;

    if (clickTimeoutIdRef.current) clearTimeout(clickTimeoutIdRef.current);

    setActiveSection(section);

    window.lastClickedSection = section;

    if (menuOpen) {
      setMenuOpen(false);
    }

    setTimeout(
      () => {
        const targetElement = document.getElementById(section);
        if (targetElement) {
          const headerOffset = 100;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });

          clickTimeoutIdRef.current = setTimeout(() => {
            userClickedNavigationRef.current = false;
          }, 2500);
        }
      },
      menuOpen ? 300 : 10,
    );
  };

  useEffect(() => {
    const heroSection = document.getElementById("hero");
    const projectsSection = document.getElementById("projects");
    const aboutSection = document.getElementById("about");
    const skillsSection = document.getElementById("skills");
    const contactSection = document.getElementById("contact");

    const handleScroll = () => {
      if (userClickedNavigationRef.current) return;

      const scrollPosition = window.scrollY + 100;

      let newSection = null;

      if (contactSection && scrollPosition >= contactSection.offsetTop - 200) {
        newSection = "contact";
      } else if (
        skillsSection &&
        scrollPosition >= skillsSection.offsetTop - 200
      ) {
        newSection = "skills";
      } else if (
        aboutSection &&
        scrollPosition >= aboutSection.offsetTop - 200
      ) {
        newSection = "about";
      } else if (
        projectsSection &&
        scrollPosition >= projectsSection.offsetTop - 200
      ) {
        newSection = "projects";
      } else if (scrollPosition < 300) {
        newSection = "hero";
      }

      if (
        newSection &&
        newSection !== activeSection &&
        !userClickedNavigationRef.current
      ) {
        if (window.lastClickedSection) {
          const clickedSectionElement = document.getElementById(
            window.lastClickedSection,
          );
          if (clickedSectionElement) {
            const clickedSectionTop = clickedSectionElement.offsetTop;
            const clickedSectionBottom =
              clickedSectionTop + clickedSectionElement.offsetHeight;

            if (
              Math.abs(scrollPosition - clickedSectionTop) < 200 ||
              (scrollPosition >= clickedSectionTop - 200 &&
                scrollPosition <= clickedSectionBottom + 200)
            ) {
              newSection = window.lastClickedSection;
            } else {
              window.lastClickedSection = null;
            }
          }
        }

        setActiveSection(newSection);
      }
    };

    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener);

    if (!userClickedNavigationRef.current) {
      setTimeout(handleScroll, 500);
    }

    return () => {
      window.removeEventListener("scroll", scrollListener);
      if (clickTimeoutIdRef.current) clearTimeout(clickTimeoutIdRef.current);
    };
  }, [activeSection]);

  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]');

    const handleClick = (e) => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute("href");

      if (!href || href === "#") return;

      const targetElement = document.getElementById(href.substring(1));

      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        if (menuOpen) {
          setMenuOpen(false);
        }
      }
    };

    links.forEach((link) => {
      link.addEventListener("click", handleClick);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleClick);
      });
    };
  }, [menuOpen]);

  const skillsRef = useRef(null);
  const skillItemsRef = useRef([]);
  const videoRefs = useRef({
    web: null,
    interface: null,
    creative: null,
    solid: null,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("skill-animated");

              const skillName = entry.target.getAttribute("data-skill");
              if (skillName && videoRefs.current[skillName]) {
                try {
                  const videoElement = videoRefs.current[skillName];
                  if (videoElement) {
                    videoElement.muted = true;
                    videoElement.play().catch(() => {});
                  }
                } catch (err) {}
              }

              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 },
      );

      const skillItems = document.querySelectorAll(".skill-item");
      skillItems.forEach((item) => {
        skillItemsRef.current.push(item);
        observer.observe(item);
      });

      return () => {
        skillItems.forEach((item) => {
          observer.unobserve(item);
        });
      };
    }
  }, []);

  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const aboutRef = useRef(null);
  const experiencesRef = useRef(null);
  const certificationsRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const sectionRefs = [
      heroRef,
      projectsRef,
      skillsRef,
      aboutRef,
      experiencesRef,
      certificationsRef,
      contactRef,
    ];

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-animated");
            sectionObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "-50px 0px" },
    );

    sectionRefs.forEach((ref) => {
      if (ref.current) {
        sectionObserver.observe(ref.current);
      }
    });

    return () => {
      sectionRefs.forEach((ref) => {
        if (ref.current) {
          sectionObserver.unobserve(ref.current);
        }
      });
    };
  }, [
    heroRef,
    projectsRef,
    skillsRef,
    aboutRef,
    experiencesRef,
    certificationsRef,
    contactRef,
  ]);

  return (
    <>
      {isLoading && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{
            backgroundColor: darkMode ? "#121212" : "#ffffff",
          }}
        >
          <Loader />
        </div>
      )}

      <div
        className={`min-h-screen w-full`}
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          letterSpacing: "-0.02em",
        }}
      >
        <header className="header-main w-full fixed z-[99]">
          <div
            className="top-line w-full h-[10px] fixed top-0 left-0"
            style={{
              backgroundColor: darkMode ? "#000" : "white",
              transition: "background-color 0.3s ease",
            }}
          ></div>

          <div className="header-container flex items-start w-full m-auto max-w-[1800px] z-[20]">
            <div
              className="header-logo-box flex items-center justify-between w-auto pr-[1em] h-[80px] rounded-b-[30px] mr-[11px] relative z-[0] group"
              style={{
                backgroundColor: darkMode ? "#000" : "white",
                transition: "background-color 0.3s ease",
              }}
            >
              <svg
                className="svg-corner corner-logo-box-two absolute top-0 -right-7.5 z-[99]"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_310_2)">
                  <path
                    d="M30 0H0V30C0 13.431 13.431 0 30 0Z"
                    fill={darkMode ? "#000" : "white"}
                    style={{ transition: "fill 0.3s ease" }}
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_310_2">
                    <rect width="30" height="30" fill="white"></rect>
                  </clipPath>
                  <linearGradient
                    id="gradient-fill"
                    x1="0"
                    y1="0"
                    x2="30"
                    y2="30"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#6c72cb" />
                    <stop offset="100%" stopColor="#cb69c1" />
                  </linearGradient>
                </defs>
              </svg>

              <svg
                className="svg-corner corner-logo-box-two absolute bottom-0 -rotate-90 z-[99]"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_310_2)">
                  <path
                    d="M30 0H0V30C0 13.431 13.431 0 30 0Z"
                    fill={darkMode ? "#000" : "white"}
                    style={{ transition: "fill 0.3s ease" }}
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_310_2">
                    <rect width="30" height="30" fill="white"></rect>
                  </clipPath>
                  <linearGradient
                    id="gradient-fill"
                    x1="0"
                    y1="0"
                    x2="30"
                    y2="30"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#6c72cb" />
                    <stop offset="100%" stopColor="#cb69c1" />
                  </linearGradient>
                </defs>
              </svg>
              <svg
                className="svg-corner corner-logo-box-two absolute ml-[2em] -bottom-7 rotate-0 z-[99]"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_310_2)">
                  <path
                    d="M30 0H0V30C0 13.431 13.431 0 30 0Z"
                    fill={darkMode ? "#000" : "white"}
                    style={{ transition: "fill 0.3s ease" }}
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_310_2">
                    <rect width="30" height="30" fill=""></rect>
                  </clipPath>
                  <linearGradient
                    id="gradient-fill"
                    x1="0"
                    y1="0"
                    x2="30"
                    y2="30"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#6c72cb" />
                    <stop offset="100%" stopColor="#cb69c1" />
                  </linearGradient>
                </defs>
              </svg>
              <a
                href="#"
                className="font-medium px-2 sm:px-4 ml-[1em] sm:ml-[2em] relative"
                style={{ width: "max-content" }}
              >
                {/* CHANGE: Removed hover effects from logo decorative elements and container */}
                <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
                  <div className="absolute w-8 h-8 rounded-full bg-gradient-to-r from-[#E870A4] to-[#E7C8A0] top-1 left-1 animate-pulse"></div>
                  <div className="absolute w-6 h-6 border border-[#E870A4] rounded-sm -bottom-2 right-8 rotate-12 animate-spin-slow"></div>
                  <div className="absolute w-4 h-4 bg-[#E7C8A0] rotate-45 bottom-4 right-4 animate-bounce-slow"></div>
                </div>

                <div className="flex flex-col justify-center items-center relative">
                  <div className="flex items-center">
                    <div className="text-[1.2rem] sm:text-[1.5rem] md:text-[1.8rem] font-bold tracking-tighter relative overflow-hidden">
                      <span
                        className={`relative z-10 ${darkMode ? "text-white" : "text-black"}`}
                      >
                        <span className="bg-gradient-to-r from-[#E870A4] via-[#E7C8A0] to-[#E870A4] bg-clip-text text-transparent">
                          S
                        </span>
                        <span>oukaina</span>
                      </span>
                    </div>

                    <div className="mx-1 sm:mx-2 h-6 sm:h-8 flex items-center">
                      <div
                        className={`w-px h-full ${darkMode ? "bg-gradient-to-b from-[#E870A4] to-[#E7C8A0]" : "bg-gradient-to-b from-[#E870A4] to-[#E7C8A0]"} animate-pulse`}
                      ></div>
                    </div>

                    <div className="text-[1.2rem] sm:text-[1.5rem] md:text-[1.8rem] font-bold tracking-tighter">
                      <span
                        className={`relative z-10 ${darkMode ? "text-white" : "text-black"}`}
                      >
                        <span className="bg-gradient-to-r from-[#E7C8A0] via-[#E870A4] to-[#E7C8A0] bg-clip-text text-transparent">
                          S
                        </span>
                        <span>bai</span>
                      </span>
                    </div>
                  </div>

                  <div
                    className={`hidden sm:block text-[0.5rem] sm:text-[0.6rem] md:text-[0.7rem] tracking-[0.2em] sm:tracking-[0.3em] uppercase -mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"} flex items-center`}
                  >
                    <span className="w-4 sm:w-8 h-px bg-gradient-to-r from-transparent to-current mr-1 sm:mr-2"></span>
                    SOFTWARE ENGINEER
                    <span className="w-4 sm:w-8 h-px bg-gradient-to-r from-current to-transparent ml-1 sm:ml-2"></span>
                  </div>
                </div>
              </a>

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000 ease-in-out pointer-events-none"></div>

              <div
                className={`mobile-menu-btn flex md:hidden cursor-pointer w-[45px] h-[45px] mr-[0.6em] justify-center items-center relative z-[99] ${menuOpen ? "menu-open" : ""}`}
                onClick={toggleMenu}
              >
                <div className="hamburger-icon">
                  <span className="line line-1"></span>
                  <span className="line line-2"></span>
                  <span className="line line-3"></span>
                </div>
              </div>

              <div className={`mobile-menu-overlay ${menuOpen ? "open" : ""}`}>
                <button
                  className="mobile-menu-close"
                  onClick={closeMenu}
                  aria-label="Close menu"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <div className="mobile-menu-content">
                  <div className="mobile-menu-header">
                    <span className="mobile-menu-title">Navigation</span>
                  </div>

                  <nav className="mobile-menu-nav">
                    <a
                      href="#hero"
                      className={`mobile-nav-link ${activeSection === "hero" ? "active" : ""}`}
                      onClick={(e) => handleNavClick("hero", e)}
                    >
                      <span className="mobile-nav-number">00</span>
                      <span className="mobile-nav-text">Home</span>
                      <span className="mobile-nav-indicator"></span>
                    </a>
                    <a
                      href="#projects"
                      className={`mobile-nav-link ${activeSection === "projects" ? "active" : ""}`}
                      onClick={(e) => handleNavClick("projects", e)}
                    >
                      <span className="mobile-nav-number">01</span>
                      <span className="mobile-nav-text">Projects</span>
                      <span className="mobile-nav-indicator"></span>
                    </a>
                    <a
                      href="#about"
                      className={`mobile-nav-link ${activeSection === "about" ? "active" : ""}`}
                      onClick={(e) => handleNavClick("about", e)}
                    >
                      <span className="mobile-nav-number">02</span>
                      <span className="mobile-nav-text">About</span>
                      <span className="mobile-nav-indicator"></span>
                    </a>
                    <a
                      href="#skills"
                      className={`mobile-nav-link ${activeSection === "skills" ? "active" : ""}`}
                      onClick={(e) => handleNavClick("skills", e)}
                    >
                      <span className="mobile-nav-number">03</span>
                      <span className="mobile-nav-text">Skills</span>
                      <span className="mobile-nav-indicator"></span>
                    </a>
                    <a
                      href="#contact"
                      className={`mobile-nav-link ${activeSection === "contact" ? "active" : ""}`}
                      onClick={(e) => handleNavClick("contact", e)}
                    >
                      <span className="mobile-nav-number">04</span>
                      <span className="mobile-nav-text">Contact</span>
                      <span className="mobile-nav-indicator"></span>
                    </a>
                  </nav>

                  <div className="mobile-menu-footer">
                    <div className="mobile-theme-toggle">
                      <ToggleButton className="mobile-dark-mode-toggle" />
                    </div>

                    <div className="mobile-social-links">
                      <a
                        href="https://github.com/soukaina258"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.167 8.839 21.65C9.339 21.75 9.5 21.442 9.5 21.167C9.5 20.917 9.5 20.167 9.5 19.333C6.735 19.95 6.14 18 6.14 18C5.684 16.903 5.03 16.6 5.03 16.6C4.122 15.967 5.095 16 5.095 16C6.1 16.067 6.64 17.017 6.64 17.017C7.55 18.517 9.133 18.067 9.54 17.8C9.638 17.15 9.89 16.7 10.17 16.45C7.973 16.2 5.65 15.367 5.65 11.5C5.65 10.4 6.04 9.517 6.65 8.8C6.54 8.55 6.203 7.5 6.75 6.15C6.75 6.15 7.612 5.883 9.5 7.173C10.29 6.95 11.15 6.842 12 6.842C12.85 6.842 13.71 6.95 14.5 7.173C16.388 5.883 17.25 6.15 17.25 6.15C17.797 7.503 17.46 8.553 17.35 8.8C17.963 9.517 18.35 10.403 18.35 11.5C18.35 15.383 16.027 16.2 13.813 16.433C14.17 16.733 14.5 17.333 14.5 18.233C14.5 19.567 14.5 20.817 14.5 21.167C14.5 21.442 14.66 21.75 15.167 21.65C19.135 20.16 22 16.417 22 12C22 6.477 17.523 2 12 2Z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>
                      <a
                        href="https://www.linkedin.com/in/soukaina-sbai-6a6b1a206/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19ZM18.5 18.5V13.2C18.5 12.3354 18.1565 11.5062 17.5452 10.8948C16.9338 10.2835 16.1046 9.94 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17C14.6813 12.17 15.0374 12.3175 15.2999 12.5801C15.5625 12.8426 15.71 13.1987 15.71 13.57V18.5H18.5ZM6.88 8.56C7.32556 8.56 7.75288 8.383 8.06794 8.06794C8.383 7.75288 8.56 7.32556 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19C6.43178 5.19 6.00193 5.36805 5.68499 5.68499C5.36805 6.00193 5.19 6.43178 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56ZM8.27 18.5V10.13H5.5V18.5H8.27Z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden md:block">
                <nav className="navigation relative h-[58px] rounded-[50px] py-0 px-[0.5em] flex items-center justify-evenly backdrop-blur-[10px] saturate-[200%] bg-[#ffffff80] border border-[rgba(209,213,219,.5)] shadow-[0_3px_20px_-5px_#00000026]">
                  <a
                    href="#hero"
                    className="text-base font-medium mx-[0.85em] leading-[1.15] transition-all duration-300 select-none relative group"
                    onClick={(e) => handleNavClick("hero", e)}
                  >
                    <span className="relative z-10 text-black">Home</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#E870A4] to-[#E7C8A0] group-hover:w-full transition-all duration-300 rounded-full"></span>
                  </a>
                  <a
                    href="#projects"
                    className="text-base font-medium mx-[0.85em] leading-[1.15] transition-all duration-300 select-none relative group"
                    onClick={(e) => handleNavClick("projects", e)}
                  >
                    <span className="relative z-10 text-black">Projects</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#E870A4] to-[#E7C8A0] group-hover:w-full transition-all duration-300 rounded-full"></span>
                  </a>
                  <a
                    href="#about"
                    className="text-base font-medium mx-[0.85em] leading-[1.15] transition-all duration-300 select-none relative group"
                    onClick={(e) => handleNavClick("about", e)}
                  >
                    <span className="relative z-10 text-black">About</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#E870A4] to-[#E7C8A0] group-hover:w-full transition-all duration-300 rounded-full"></span>
                  </a>
                  <a
                    href="#skills"
                    className="text-base font-medium mx-[0.85em] leading-[1.15] transition-all duration-300 select-none relative group"
                    onClick={(e) => handleNavClick("skills", e)}
                  >
                    <span className="relative z-10 text-black">Skills</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#E870A4] to-[#E7C8A0] group-hover:w-full transition-all duration-300 rounded-full"></span>
                  </a>
                  <a
                    href="#contact"
                    className="text-base font-medium mx-[0.85em] mr-[2em] leading-[1.15] transition-all duration-300 select-none relative group"
                    onClick={(e) => handleNavClick("contact", e)}
                  >
                    <span className="relative z-10 text-black">Contact</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#E870A4] to-[#E7C8A0] group-hover:w-full transition-all duration-300 rounded-full"></span>
                  </a>

                  <ToggleButton className="relative" />
                </nav>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}

        <div className="w-full flex justify-center">
          <div className="min-h-[630px] h-[85vh] w-full max-w-[2000px] mx-8 relative rounded-[20px] overflow-hidden bg-[#0f172a] flex items-center justify-center">
            {/* Background effects */}
            <div className="absolute inset-0 z-[1]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155]"></div>
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-soft-light"></div>
              <div className="absolute bottom-0 left-0 w-[30%] h-[40%] bg-[#6c72cb]/20 mix-blend-overlay blur-xl"></div>
              <div className="absolute top-[20%] right-[10%] w-40 h-40 rounded-full bg-[#cb69c1]/10 blur-xl"></div>
            </div>

            {/* Content */}
            <div className="relative z-[5] p-10 md:p-16 flex flex-col justify-center items-center text-center w-full">
              <div className="max-w-[900px]">
                {/* Greeting */}
                <h1 className="font-medium text-[1.2rem] md:text-[1.6rem] text-white/80 mb-4 inline-flex items-center justify-center relative group">
                  <span className="opacity-70">Hello,</span>
                  <span className="ml-2">
                    I'm
                    <span className="ml-2 inline-block relative">
                      <span className="bg-gradient-to-r from-[#E870A4] via-[#E7C8A0] to-[#E870A4] bg-clip-text text-transparent font-semibold">
                        Soukaina Sbai
                      </span>
                      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#6c72cb] to-[#cb69c1] group-hover:w-full transition-all duration-700"></span>
                    </span>
                  </span>
                </h1>

                {/* Main title */}
                <div className="text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[5.5rem] font-bold leading-[0.95] text-white mb-6 text-balance">
                  Turning ideas into elegant digital experiences
                </div>

                {/* Rotating profession */}
                <div className="h-[3.5rem] sm:h-[4.5rem] md:h-[5.5rem] w-full flex justify-center">
                  <RotatingText
                    texts={[
                      "Full-Stack Developer",
                      "Software Engineer",
                      "Problem Solver",
                    ]}
                    mainClassName="text-[1.2rem] sm:text-[2rem] md:text-[3rem] font-bold leading-[0.95]"
                    textClassName="bg-gradient-to-r from-[#E870A4] via-[#E870A4] to-[#E7C8A0] inline-block text-transparent bg-clip-text"
                    splitLevelClassName="overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    rotationInterval={3000}
                  />
                </div>

                {/* Subtitle */}
                <div className="max-w-[700px] mx-auto mt-8">
                  <BlurText
                    text="I build modern, accessible, and high-performance digital interfaces with attention to smooth motion, refined visuals, and real user needs."
                    delay={100}
                    animateBy="words"
                    direction="top"
                    className="text-[1.1rem] leading-relaxed text-white/70"
                  />
                </div>

                {/* CTA Buttons */}
                <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-5 justify-center px-4 sm:px-0">
                  <a
                    href="#projects"
                    className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#0D1B2A] font-medium rounded overflow-hidden text-sm sm:text-base"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      View Projects
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 12H19M19 12L12 5M19 12L12 19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#E870A4] to-[#E7C8A0] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300"></div>
                  </a>
                  <a
                    href="#contact"
                    className="px-6 sm:px-8 py-3 sm:py-4 border border-white/30 text-white font-medium rounded hover:border-white/80 transition-colors duration-300 text-sm sm:text-base"
                  >
                    Contact Me
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Experiences */}
      {/* Experiences Section - Mobile Timeline Fix */}
      <section
        id="experiences"
        className="experiences w-full m-[4em_auto] sm:m-[8em_auto] max-w-[1400px] px-[20px] sm:px-[40px]"
        ref={experiencesRef}
      >
        <div className="section-header relative mb-16 flex flex-col items-center">
          <h2
            className="text-lg tracking-[0.3em] uppercase font-light mb-6 relative inline-block"
            style={{
              color: darkMode ? "#F9F8F6" : "#0D1B2A",
            }}
          >
            EXPERIENCE
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-[3px] bg-gradient-to-r from-[#E870A4] to-[#E7C8A0]"></div>
          </h2>
          <p
            className="text-sm opacity-60 mt-4"
            style={{
              color: darkMode ? "#F9F8F6" : "#0D1B2A",
            }}
          >
            The positions I have worked in my career so far
          </p>
        </div>

        <div className="experiences-grid relative md:min-h-[1000px]">
          {/* Timeline - hidden on mobile, shown on desktop */}
          <div className="hidden md:block absolute left-1/2 top-10 bottom-10 w-[2px] bg-gradient-to-b from-[#E870A4] via-[#E7C8A0] to-[#E870A4] transform -translate-x-1/2 z-[5]"></div>

          {/* Timeline dots - hidden on mobile, shown on desktop */}
          <motion.div
            className="hidden md:block absolute left-1/2 w-5 h-5 rounded-full bg-[#E870A4] transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-[#E870A4]/50 z-[25]"
            style={{ top: "120px" }}
            initial={{ scale: 0 }}
            whileInView={{ scale: [0, 1.3, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute inset-0 rounded-full bg-[#E870A4] animate-ping opacity-75"></div>
          </motion.div>

          <motion.div
            className="hidden md:block absolute left-1/2 w-5 h-5 rounded-full bg-[#E7C8A0] transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-[#E7C8A0]/50 z-[25]"
            style={{ top: "340px" }}
            initial={{ scale: 0 }}
            whileInView={{ scale: [0, 1.3, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="absolute inset-0 rounded-full bg-[#E7C8A0] animate-ping opacity-75"></div>
          </motion.div>

          <motion.div
            className="hidden md:block absolute left-1/2 w-5 h-5 rounded-full bg-[#E870A4] transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-[#E870A4]/50 z-[25]"
            style={{ top: "580px" }}
            initial={{ scale: 0 }}
            whileInView={{ scale: [0, 1.3, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="absolute inset-0 rounded-full bg-[#E870A4] animate-ping opacity-75"></div>
          </motion.div>

          <motion.div
            className="hidden md:block absolute left-1/2 w-5 h-5 rounded-full bg-[#E7C8A0] transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-[#E7C8A0]/50 z-[25]"
            style={{ top: "820px" }}
            initial={{ scale: 0 }}
            whileInView={{ scale: [0, 1.3, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="absolute inset-0 rounded-full bg-[#E7C8A0] animate-ping opacity-75"></div>
          </motion.div>

          {/* Job Cards - Mobile: stacked vertically, Desktop: scattered with timeline */}
          <div className="flex flex-col gap-6 md:block">
            {/* Card 1 */}
            <motion.div
              className="code-card relative md:absolute md:top-[50px] md:left-[3%] w-full md:w-[42%] md:rotate-[-2deg] z-10"
              initial={{ opacity: 0, x: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div
                className="terminal-window rounded-lg overflow-hidden shadow-2xl"
                style={{
                  backgroundColor: darkMode ? "#0D1B2A" : "#0D1B2A",
                  border: `1px solid ${darkMode ? "rgba(232, 112, 164, 0.3)" : "rgba(232, 112, 164, 0.2)"}`,
                }}
              >
                <div
                  className="window-header flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 border-b"
                  style={{
                    background: darkMode
                      ? "linear-gradient(135deg, #0D1B2A 0%, #1a2942 100%)"
                      : "linear-gradient(135deg, #0D1B2A 0%, #1a2942 100%)",
                    borderColor: "rgba(232, 112, 164, 0.2)",
                  }}
                >
                  <div className="flex gap-1.5 sm:gap-2">
                    <div
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
                      style={{ backgroundColor: "#ff5f56" }}
                    ></div>
                    <div
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
                      style={{ backgroundColor: "#ffbd2e" }}
                    ></div>
                    <div
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
                      style={{ backgroundColor: "#27c93f" }}
                    ></div>
                  </div>
                  <div className="flex gap-2 ml-2 sm:ml-4 text-[0.6rem] sm:text-xs overflow-x-auto">
                    <div
                      className="px-2 sm:px-3 py-1 rounded-t text-white whitespace-nowrap"
                      style={{ backgroundColor: "rgba(232, 112, 164, 0.2)" }}
                    >
                      job-1.js
                    </div>
                    <div className="px-2 sm:px-3 py-1 text-gray-500 whitespace-nowrap">
                      job-2.js
                    </div>
                    <div className="px-2 sm:px-3 py-1 text-gray-500 whitespace-nowrap hidden sm:block">
                      job-3.js
                    </div>
                    <div className="px-2 sm:px-3 py-1 text-gray-500 whitespace-nowrap">
                      job-4.js
                    </div>
                  </div>
                </div>
                <div className="code-content p-4 sm:p-6 font-mono text-xs sm:text-sm overflow-x-auto">
                  <div className="flex">
                    <div className="text-gray-600 mr-3 sm:mr-4 select-none text-[0.65rem] sm:text-sm">
                      1<br />2<br />3<br />4<br />5<br />6
                    </div>
                    <div className="text-[0.65rem] sm:text-sm">
                      <span style={{ color: "#E7C8A0" }}>const</span>{" "}
                      <span style={{ color: "#E870A4" }}>job</span>{" "}
                      <span className="text-white">=</span>{" "}
                      <span style={{ color: "#E7C8A0" }}>{"{"}</span>
                      <br />
                      <span
                        className="ml-2 sm:ml-4"
                        style={{ color: "#E870A4" }}
                      >
                        title
                      </span>
                      <span className="text-white">:</span>{" "}
                      <span style={{ color: "#98c1d9" }}>
                        "Software Engineer"
                      </span>
                      <span className="text-white">,</span>
                      <br />
                      <span
                        className="ml-2 sm:ml-4"
                        style={{ color: "#E870A4" }}
                      >
                        from
                      </span>
                      <span className="text-white">:</span>{" "}
                      <span style={{ color: "#98c1d9" }}>"March 2025"</span>
                      <span className="text-white">,</span>
                      <br />
                      <span
                        className="ml-2 sm:ml-4"
                        style={{ color: "#E870A4" }}
                      >
                        to
                      </span>
                      <span className="text-white">:</span>{" "}
                      <span style={{ color: "#98c1d9" }}>"Aug 2025"</span>
                      <span className="text-white">,</span>
                      <br />
                      <span
                        className="ml-2 sm:ml-4"
                        style={{ color: "#E870A4" }}
                      >
                        company
                      </span>
                      <span className="text-white">:</span>{" "}
                      <span style={{ color: "#98c1d9" }}>
                        "E-Call Services (CALL BPO WEB)"
                      </span>
                      <br />
                      <span style={{ color: "#E7C8A0" }}>{"}"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              className="code-card relative md:absolute md:top-[270px] md:right-[3%] md:left-auto w-full md:w-[42%] md:rotate-[2deg] z-10"
              initial={{ opacity: 0, x: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div
                className="terminal-window rounded-lg overflow-hidden shadow-2xl"
                style={{
                  backgroundColor: darkMode ? "#0D1B2A" : "#0D1B2A",
                  border: `1px solid ${darkMode ? "rgba(232, 112, 164, 0.3)" : "rgba(232, 112, 164, 0.2)"}`,
                }}
              >
                <div
                  className="window-header flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 border-b"
                  style={{
                    background: darkMode
                      ? "linear-gradient(135deg, #0D1B2A 0%, #1a2942 100%)"
                      : "linear-gradient(135deg, #0D1B2A 0%, #1a2942 100%)",
                    borderColor: "rgba(232, 112, 164, 0.2)",
                  }}
                >
                  <div className="flex gap-1.5 sm:gap-2">
                    <div
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
                      style={{ backgroundColor: "#ff5f56" }}
                    ></div>
                    <div
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
                      style={{ backgroundColor: "#ffbd2e" }}
                    ></div>
                    <div
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
                      style={{ backgroundColor: "#27c93f" }}
                    ></div>
                  </div>
                  <div className="flex gap-2 ml-2 sm:ml-4 text-[0.6rem] sm:text-xs overflow-x-auto">
                    <div className="px-2 sm:px-3 py-1 text-gray-500 whitespace-nowrap">
                      job-1.js
                    </div>
                    <div
                      className="px-2 sm:px-3 py-1 rounded-t text-white whitespace-nowrap"
                      style={{ backgroundColor: "rgba(232, 112, 164, 0.2)" }}
                    >
                      job-2.js
                    </div>
                    <div className="px-2 sm:px-3 py-1 text-gray-500 whitespace-nowrap hidden sm:block">
                      job-3.js
                    </div>
                    <div className="px-2 sm:px-3 py-1 text-gray-500 whitespace-nowrap">
                      job-4.js
                    </div>
                  </div>
                </div>
                <div className="code-content p-4 sm:p-6 font-mono text-xs sm:text-sm overflow-x-auto">
                  <div className="flex">
                    <div className="text-gray-600 mr-3 sm:mr-4 select-none text-[0.65rem] sm:text-sm">
                      1<br />2<br />3<br />4<br />5<br />6
                    </div>
                    <div className="text-[0.65rem] sm:text-sm">
                      <span style={{ color: "#E7C8A0" }}>const</span>{" "}
                      <span style={{ color: "#E870A4" }}>job</span>{" "}
                      <span className="text-white">=</span>{" "}
                      <span style={{ color: "#E7C8A0" }}>{"{"}</span>
                      <br />
                      <span
                        className="ml-2 sm:ml-4"
                        style={{ color: "#E870A4" }}
                      >
                        title
                      </span>
                      <span className="text-white">:</span>{" "}
                      <span style={{ color: "#98c1d9" }}>
                        "Frontend Engineer"
                      </span>
                      <span className="text-white">,</span>
                      <br />
                      <span
                        className="ml-2 sm:ml-4"
                        style={{ color: "#E870A4" }}
                      >
                        from
                      </span>
                      <span className="text-white">:</span>{" "}
                      <span style={{ color: "#98c1d9" }}>"Mars 2024"</span>
                      <span className="text-white">,</span>
                      <br />
                      <span
                        className="ml-2 sm:ml-4"
                        style={{ color: "#E870A4" }}
                      >
                        to
                      </span>
                      <span className="text-white">:</span>{" "}
                      <span style={{ color: "#98c1d9" }}>"Jul 2024"</span>
                      <span className="text-white">,</span>
                      <br />
                      <span
                        className="ml-2 sm:ml-4"
                        style={{ color: "#E870A4" }}
                      >
                        company
                      </span>
                      <span className="text-white">:</span>{" "}
                      <span style={{ color: "#98c1d9" }}>
                        "ENSET Mohammedia"
                      </span>
                      <br />
                      <span style={{ color: "#E7C8A0" }}>{"}"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              className="code-card relative md:absolute md:top-[490px] md:left-[3%] md:right-auto w-full md:w-[42%] md:rotate-[-1deg] z-10"
              initial={{ opacity: 0, x: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div
                className="terminal-window rounded-lg overflow-hidden shadow-2xl"
                style={{
                  backgroundColor: darkMode ? "#0D1B2A" : "#0D1B2A",
                  border: `1px solid ${darkMode ? "rgba(232, 112, 164, 0.3)" : "rgba(232, 112, 164, 0.2)"}`,
                }}
              >
                <div
                  className="window-header flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 border-b"
                  style={{
                    background: darkMode
                      ? "linear-gradient(135deg, #0D1B2A 0%, #1a2942 100%)"
                      : "linear-gradient(135deg, #0D1B2A 0%, #1a2942 100%)",
                    borderColor: "rgba(232, 112, 164, 0.2)",
                  }}
                >
                  <div className="flex gap-1.5 sm:gap-2">
                    <div
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
                      style={{ backgroundColor: "#ff5f56" }}
                    ></div>
                    <div
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
                      style={{ backgroundColor: "#ffbd2e" }}
                    ></div>
                    <div
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
                      style={{ backgroundColor: "#27c93f" }}
                    ></div>
                  </div>
                  <div className="flex gap-2 ml-2 sm:ml-4 text-[0.6rem] sm:text-xs overflow-x-auto">
                    <div className="px-2 sm:px-3 py-1 text-gray-500 whitespace-nowrap">
                      job-1.js
                    </div>
                    <div className="px-2 sm:px-3 py-1 text-gray-500 whitespace-nowrap">
                      job-2.js
                    </div>
                    <div
                      className="px-2 sm:px-3 py-1 rounded-t text-white whitespace-nowrap"
                      style={{ backgroundColor: "rgba(232, 112, 164, 0.2)" }}
                    >
                      job-3.js
                    </div>
                    <div className="px-2 sm:px-3 py-1 text-gray-500 whitespace-nowrap">
                      job-4.js
                    </div>
                  </div>
                </div>
                <div className="code-content p-4 sm:p-6 font-mono text-xs sm:text-sm overflow-x-auto">
                  <div className="flex">
                    <div className="text-gray-600 mr-3 sm:mr-4 select-none text-[0.65rem] sm:text-sm">
                      1<br />2<br />3<br />4<br />5<br />6
                    </div>
                    <div className="text-[0.65rem] sm:text-sm">
                      <span style={{ color: "#E7C8A0" }}>const</span>{" "}
                      <span style={{ color: "#E870A4" }}>job</span>{" "}
                      <span className="text-white">=</span>{" "}
                      <span style={{ color: "#E7C8A0" }}>{"{"}</span>
                      <br />
                      <span
                        className="ml-2 sm:ml-4"
                        style={{ color: "#E870A4" }}
                      >
                        title
                      </span>
                      <span className="text-white">:</span>{" "}
                      <span style={{ color: "#98c1d9" }}>
                        "FullStack Developer"
                      </span>
                      <span className="text-white">,</span>
                      <br />
                      <span
                        className="ml-2 sm:ml-4"
                        style={{ color: "#E870A4" }}
                      >
                        from
                      </span>
                      <span className="text-white">:</span>{" "}
                      <span style={{ color: "#98c1d9" }}>"April 2023"</span>
                      <span className="text-white">,</span>
                      <br />
                      <span
                        className="ml-2 sm:ml-4"
                        style={{ color: "#E870A4" }}
                      >
                        to
                      </span>
                      <span className="text-white">:</span>{" "}
                      <span style={{ color: "#98c1d9" }}>"July 2023"</span>
                      <span className="text-white">,</span>
                      <br />
                      <span
                        className="ml-2 sm:ml-4"
                        style={{ color: "#E870A4" }}
                      >
                        company
                      </span>
                      <span className="text-white">:</span>{" "}
                      <span style={{ color: "#98c1d9" }}>"Architeo"</span>
                      <br />
                      <span style={{ color: "#E7C8A0" }}>{"}"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 4 */}
            <motion.div
              className="code-card relative md:absolute md:top-[710px] md:right-[3%] md:left-auto w-full md:w-[42%] md:rotate-[1deg] z-10"
              initial={{ opacity: 0, x: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div
                className="terminal-window rounded-lg overflow-hidden shadow-2xl"
                style={{
                  backgroundColor: darkMode ? "#0D1B2A" : "#0D1B2A",
                  border: `1px solid ${darkMode ? "rgba(232, 112, 164, 0.3)" : "rgba(232, 112, 164, 0.2)"}`,
                }}
              >
                <div
                  className="window-header flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 border-b"
                  style={{
                    background: darkMode
                      ? "linear-gradient(135deg, #0D1B2A 0%, #1a2942 100%)"
                      : "linear-gradient(135deg, #0D1B2A 0%, #1a2942 100%)",
                    borderColor: "rgba(232, 112, 164, 0.2)",
                  }}
                >
                  <div className="flex gap-1.5 sm:gap-2">
                    <div
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
                      style={{ backgroundColor: "#ff5f56" }}
                    ></div>
                    <div
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
                      style={{ backgroundColor: "#ffbd2e" }}
                    ></div>
                    <div
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
                      style={{ backgroundColor: "#27c93f" }}
                    ></div>
                  </div>
                  <div className="flex gap-2 ml-2 sm:ml-4 text-[0.6rem] sm:text-xs overflow-x-auto">
                    <div className="px-2 sm:px-3 py-1 text-gray-500 whitespace-nowrap">
                      job-1.js
                    </div>
                    <div className="px-2 sm:px-3 py-1 text-gray-500 whitespace-nowrap">
                      job-2.js
                    </div>
                    <div className="px-2 sm:px-3 py-1 text-gray-500 whitespace-nowrap">
                      job-3.js
                    </div>
                    <div
                      className="px-2 sm:px-3 py-1 rounded-t text-white whitespace-nowrap"
                      style={{ backgroundColor: "rgba(232, 112, 164, 0.2)" }}
                    >
                      job-4.js
                    </div>
                  </div>
                </div>
                <div className="code-content p-4 sm:p-6 font-mono text-xs sm:text-sm overflow-x-auto">
                  <div className="flex">
                    <div className="text-gray-600 mr-3 sm:mr-4 select-none text-[0.65rem] sm:text-sm">
                      1<br />2<br />3<br />4<br />5<br />6
                    </div>
                    <div className="text-[0.65rem] sm:text-sm">
                      <span style={{ color: "#E7C8A0" }}>const</span>{" "}
                      <span style={{ color: "#E870A4" }}>job</span>{" "}
                      <span className="text-white">=</span>{" "}
                      <span style={{ color: "#E7C8A0" }}>{"{"}</span>
                      <br />
                      <span
                        className="ml-2 sm:ml-4"
                        style={{ color: "#E870A4" }}
                      >
                        title
                      </span>
                      <span className="text-white">:</span>{" "}
                      <span style={{ color: "#98c1d9" }}>".NET Developer"</span>
                      <span className="text-white">,</span>
                      <br />
                      <span
                        className="ml-2 sm:ml-4"
                        style={{ color: "#E870A4" }}
                      >
                        from
                      </span>
                      <span className="text-white">:</span>{" "}
                      <span style={{ color: "#98c1d9" }}>"Jan 2022"</span>
                      <span className="text-white">,</span>
                      <br />
                      <span
                        className="ml-2 sm:ml-4"
                        style={{ color: "#E870A4" }}
                      >
                        to
                      </span>
                      <span className="text-white">:</span>{" "}
                      <span style={{ color: "#98c1d9" }}>"April 2022"</span>
                      <span className="text-white">,</span>
                      <br />
                      <span
                        className="ml-2 sm:ml-4"
                        style={{ color: "#E870A4" }}
                      >
                        company
                      </span>
                      <span className="text-white">:</span>{" "}
                      <span style={{ color: "#98c1d9" }}>
                        "Ministry of Justice, Morocco"
                      </span>
                      <br />
                      <span style={{ color: "#E7C8A0" }}>{"}"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section
        id="certifications"
        className="certifications w-full m-[8em_auto] max-w-[1160px] px-[40px]"
        ref={certificationsRef}
      >
        <div className="section-header relative mb-16 flex flex-col items-center">
          <h2
            className="text-lg tracking-[0.3em] uppercase font-light mb-6 relative inline-block"
            style={{
              color: darkMode ? "#F9F8F6" : "#0D1B2A",
            }}
          >
            CERTIFICATIONS
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-[3px] bg-gradient-to-r from-[#E870A4] to-[#E7C8A0]"></div>
          </h2>
        </div>

        <div className="certifications-content grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((certification, index) => (
            <div
              key={index}
              className="certification-item p-6 rounded-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-[#E870A4] dark:hover:border-[#E870A4] hover:shadow-lg hover:shadow-[#E870A4]/10 flex items-start gap-4"
            >
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full bg-[#E870A4]/10 flex items-center justify-center">
                  <img
                    src={certification.image}
                    alt={certification.title}
                    className="w-10 h-10 object-contain rounded-full"
                  />
                </div>
              </div>
              <div>
                <h3
                  className="text-xl font-bold mb-1"
                  style={{ color: darkMode ? "#F9F8F6" : "#000" }}
                >
                  {certification.title}
                </h3>
                <p
                  className="text-sm opacity-75"
                  style={{ color: darkMode ? "#F9F8F6" : "#000" }}
                >
                  {certification.issuer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="technologies w-full m-auto max-w-[1160px] px-[40px] mb-20"
        id="technologies"
      >
        <div className="technologies-content mt-[4em] flex flex-col items-center w-full">
          <div className="section-header relative mb-16 flex flex-col items-center">
            <h2
              className="text-lg tracking-[0.3em] uppercase font-light mb-6 relative inline-block"
              style={{
                color: darkMode ? "#F9F8F6" : "#0D1B2A",
              }}
            >
              TECHNOLOGIES & TOOLS
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-[3px] bg-gradient-to-r from-[#E870A4] to-[#E7C8A0]"></div>
            </h2>
          </div>

          <div className="tech-category w-full mb-16">
            <div className="category-header mb-8 flex items-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4CAF50] to-[#8BC34A] flex items-center justify-center shadow-lg shadow-green-500/20 mr-4 rotate-3">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 3L3 8L8 13"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 3L21 8L16 13"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 8H21"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 17H21"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 21L12 13L16 21"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3
                  className="text-2xl font-bold"
                  style={{ color: darkMode ? "#F9F8F6" : "#000" }}
                >
                  Programming Languages
                </h3>
                <div className="h-[2px] w-32 bg-gradient-to-r from-[#4CAF50]/80 to-transparent mt-1"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8">
              <TechIcon
                name="JavaScript"
                color={darkMode ? "#F7DF1E" : "#F0DB4F"}
                className="transform hover:-translate-y-2 hover:scale-110 transition-all duration-300"
              />
              <TechIcon
                name="TypeScript"
                color={darkMode ? "#3178C6" : "#2F74C0"}
                className="transform hover:-translate-y-2 hover:scale-110 transition-all duration-300"
              />
              <TechIcon
                name="Python"
                color={darkMode ? "#4B8BBE" : "#306998"}
                className="transform hover:-translate-y-2 hover:scale-110 transition-all duration-300"
              />
              <TechIcon
                name="C#"
                color={darkMode ? "#9B4F96" : "#68217A"}
                className="transform hover:-translate-y-2 hover:scale-110 transition-all duration-300"
              />

              <TechIcon
                name="PHP"
                color={darkMode ? "#8993be" : "#474A8A"}
                className="transform hover:-translate-y-2 hover:scale-110 transition-all duration-300"
              />
              <TechIcon
                name="Java"
                color={darkMode ? "#f89820" : "#5382a1"}
                className="transform hover:-translate-y-2 hover:scale-110 transition-all duration-300"
              />
            </div>
          </div>

          <div className="tech-category w-full mb-16">
            <div className="category-header mb-8 flex items-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#9C27B0] to-[#673AB7] flex items-center justify-center shadow-lg shadow-purple-500/20 mr-4 -rotate-3">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 3L21 8V16L12 21L3 16V8L12 3Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.5 10.5L7.5 15.5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.5 8.5L16.5 13.5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 3V21"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3
                  className="text-2xl font-bold"
                  style={{ color: darkMode ? "#F9F8F6" : "#000" }}
                >
                  Libraries & Frameworks
                </h3>
                <div className="h-[2px] w-40 bg-gradient-to-r from-[#9C27B0]/80 to-transparent mt-1"></div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-br from-purple-500/5 to-transparent blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-purple-500/5 to-transparent blur-3xl"></div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-10 gap-x-6 relative z-10">
                <TechIcon
                  name="React"
                  color={darkMode ? "#61DAFB" : "#149ECA"}
                  className="transform hover:-translate-y-2 hover:scale-110 transition-all duration-300"
                />
                <div
                  className="tech-icon flex flex-col items-center justify-center transform hover:-translate-y-2 hover:scale-110 transition-all duration-300"
                  onMouseEnter={(e) =>
                    e.currentTarget
                      .querySelector("img")
                      .classList.add("scale-110")
                  }
                  onMouseLeave={(e) =>
                    e.currentTarget
                      .querySelector("img")
                      .classList.remove("scale-110")
                  }
                >
                  <div
                    className="relative flex items-center justify-center rounded-full overflow-hidden transition-all duration-300 ease-in-out"
                    style={{ width: "50px", height: "50px" }}
                  >
                    <img
                      src="tech-stack/react-native.svg"
                      alt="React Native"
                      className="w-[35px] h-[35px] transition-all duration-300 animate-fadeIn"
                    />
                  </div>
                  <span
                    className="mt-2 text-sm font-medium opacity-70 transition-all duration-300"
                    style={{ color: darkMode ? "#61DAFB" : "#149ECA" }}
                  >
                    React Native
                  </span>
                </div>
                <TechIcon
                  name="NextJS"
                  color={darkMode ? "#FFFFFF" : "#000000"}
                  className="transform hover:-translate-y-2 hover:scale-110 transition-all duration-300"
                  style={{ filter: darkMode ? "invert(100%)" : "invert(0%)" }}
                />
                <TechIcon
                  name="Flask"
                  className="transform hover:-translate-y-2 hover:scale-110 transition-all duration-300"
                  style={{ filter: darkMode ? "invert(100%)" : "invert(0%)" }}
                />
                <div
                  className="tech-icon flex flex-col items-center justify-center transform hover:-translate-y-2 hover:scale-110 transition-all duration-300"
                  onMouseEnter={(e) =>
                    e.currentTarget
                      .querySelector("img")
                      .classList.add("scale-110")
                  }
                  onMouseLeave={(e) =>
                    e.currentTarget
                      .querySelector("img")
                      .classList.remove("scale-110")
                  }
                >
                  <div
                    className="relative flex items-center justify-center rounded-full overflow-hidden transition-all duration-300 ease-in-out"
                    style={{ width: "50px", height: "50px" }}
                  >
                    <img
                      src="tech-stack/dotnet.svg"
                      alt=".NET"
                      className="w-[35px] h-[35px] transition-all duration-300 animate-fadeIn"
                    />
                  </div>
                  <span
                    className="mt-2 text-sm font-medium opacity-70 transition-all duration-300"
                    style={{ color: darkMode ? "#512BD4" : "#5C2D91" }}
                  >
                    .NET
                  </span>
                </div>
                <TechIcon
                  name="Laravel"
                  color={darkMode ? "#FF2D20" : "#FF2D20"}
                  className="transform hover:-translate-y-2 hover:scale-110 transition-all duration-300"
                />
                <div
                  className="tech-icon flex flex-col items-center justify-center transform hover:-translate-y-2 hover:scale-110 transition-all duration-300"
                  onMouseEnter={(e) =>
                    e.currentTarget
                      .querySelector("img")
                      .classList.add("scale-110")
                  }
                  onMouseLeave={(e) =>
                    e.currentTarget
                      .querySelector("img")
                      .classList.remove("scale-110")
                  }
                >
                  <div
                    className="relative flex items-center justify-center rounded-full overflow-hidden transition-all duration-300 ease-in-out"
                    style={{ width: "50px", height: "50px" }}
                  >
                    <img
                      src="tech-stack/tailwind.svg"
                      alt="Tailwind CSS"
                      className="w-[35px] h-[35px] transition-all duration-300 animate-fadeIn"
                      style={{ filter: darkMode ? "brightness(1.3)" : "none" }}
                    />
                  </div>
                  <span
                    className="mt-2 text-sm font-medium opacity-70 transition-all duration-300"
                    style={{ color: darkMode ? "#38BDF8" : "#06B6D4" }}
                  >
                    Tailwind CSS
                  </span>
                </div>

                <div
                  className="tech-icon flex flex-col items-center justify-center transform hover:-translate-y-2 hover:scale-110 transition-all duration-300"
                  onMouseEnter={(e) =>
                    e.currentTarget
                      .querySelector("img")
                      .classList.add("scale-110")
                  }
                  onMouseLeave={(e) =>
                    e.currentTarget
                      .querySelector("img")
                      .classList.remove("scale-110")
                  }
                >
                  <div
                    className="relative flex items-center justify-center rounded-full overflow-hidden transition-all duration-300 ease-in-out"
                    style={{ width: "50px", height: "50px" }}
                  >
                    <img
                      src="tech-stack/Nodejs.svg"
                      alt="Node.js"
                      className="w-[35px] h-[35px] transition-all duration-300 animate-fadeIn"
                    />
                  </div>
                  <span
                    className="mt-2 text-sm font-medium opacity-70 transition-all duration-300"
                    style={{ color: darkMode ? "#8CC84B" : "#5FAF3D" }}
                  >
                    Node.js
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="tech-category w-full mb-16">
            <div className="category-header mb-8 flex items-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2196F3] to-[#03A9F4] flex items-center justify-center shadow-lg shadow-blue-500/20 mr-4 rotate-2">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 5C16.4183 5 20 4.32843 20 3.5C20 2.67157 16.4183 2 12 2C7.58172 2 4 2.67157 4 3.5C4 4.32843 7.58172 5 12 5Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 3.5V20.5C20 21.3284 16.4183 22 12 22C7.58172 22 4 21.3284 4 20.5V3.5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 12C20 12.8284 16.4183 13.5 12 13.5C7.58172 13.5 4 12.8284 4 12"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3
                  className="text-2xl font-bold"
                  style={{ color: darkMode ? "#F9F8F6" : "#000" }}
                >
                  Databases
                </h3>
                <div className="h-[2px] w-28 bg-gradient-to-r from-[#2196F3]/80 to-transparent mt-1"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
              <TechIcon
                name="PostgreSQL"
                color={darkMode ? "#336791" : "#0064a5"}
                className="transform hover:-translate-y-2 hover:scale-110 transition-all duration-300"
              />
              <TechIcon
                name="MySQL"
                color={darkMode ? "#005571" : "#005571"}
                className="transform hover:-translate-y-2 hover:scale-110 transition-all duration-300"
              />
              <TechIcon
                name="MongoDB"
                color={darkMode ? "#47A248" : "#13AA52"}
                className="transform hover:-translate-y-2 hover:scale-110 transition-all duration-300"
              />
              <TechIcon
                name="Firebase"
                color={darkMode ? "#FFCA28" : "#FFA000"}
                className="transform hover:-translate-y-2 hover:scale-110 transition-all duration-300"
              />
              <div
                className="tech-icon flex flex-col items-center justify-center transform hover:-translate-y-2 hover:scale-110 transition-all duration-300"
                onMouseEnter={(e) =>
                  e.currentTarget
                    .querySelector("img")
                    .classList.add("scale-110")
                }
                onMouseLeave={(e) =>
                  e.currentTarget
                    .querySelector("img")
                    .classList.remove("scale-110")
                }
              >
                <div
                  className="relative flex items-center justify-center rounded-full overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ width: "50px", height: "50px" }}
                >
                  <img
                    src="tech-stack/sqlserver.svg"
                    alt="SQL Server"
                    className="w-[35px] h-[35px] transition-all duration-300 animate-fadeIn"
                  />
                </div>
                <span
                  className="mt-2 text-sm font-medium opacity-70 transition-all duration-300"
                  style={{ color: darkMode ? "#CC2927" : "#A80000" }}
                >
                  SQL Server
                </span>
              </div>

              <div
                className="tech-icon flex flex-col items-center justify-center transform hover:-translate-y-2 hover:scale-110 transition-all duration-300"
                onMouseEnter={(e) =>
                  e.currentTarget
                    .querySelector("img")
                    .classList.add("scale-110")
                }
                onMouseLeave={(e) =>
                  e.currentTarget
                    .querySelector("img")
                    .classList.remove("scale-110")
                }
              >
                <div
                  className="relative flex items-center justify-center rounded-full overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ width: "50px", height: "50px" }}
                >
                  <img
                    src="tech-stack/supabase.svg"
                    alt="Supabase"
                    className="w-[35px] h-[35px] transition-all duration-300 animate-fadeIn"
                  />
                </div>
                <span
                  className="mt-2 text-sm font-medium opacity-70 transition-all duration-300"
                  style={{ color: darkMode ? "#3ECF8E" : "#22C55E" }}
                >
                  Supabase
                </span>
              </div>

              <div
                className="tech-icon flex flex-col items-center justify-center transform hover:-translate-y-2 hover:scale-110 transition-all duration-300"
                onMouseEnter={(e) =>
                  e.currentTarget
                    .querySelector("img")
                    .classList.add("scale-110")
                }
                onMouseLeave={(e) =>
                  e.currentTarget
                    .querySelector("img")
                    .classList.remove("scale-110")
                }
              >
                <div
                  className="relative flex items-center justify-center rounded-full overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ width: "50px", height: "50px" }}
                >
                  <img
                    src="tech-stack/prisma.svg"
                    alt="Prisma"
                    className="w-[35px] h-[35px] transition-all duration-300 animate-fadeIn"
                  />
                </div>
                <span
                  className="mt-2 text-sm font-medium opacity-70 transition-all duration-300"
                  style={{ color: darkMode ? "#0C344B" : "#0C344B" }}
                >
                  Prisma
                </span>
              </div>
            </div>
          </div>

          {/* Updated section for Tools */}
          <div className="tech-category w-full mb-16">
            <div className="category-header mb-8 flex items-center">
              {/* CHANGE: Updated icon and category from DevOps & Cloud Services to Tools */}
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF6B6B] to-[#FFD93D] flex items-center justify-center shadow-lg shadow-orange-500/20 mr-4 -rotate-2">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3
                  className="text-2xl font-bold"
                  style={{ color: darkMode ? "#F9F8F6" : "#000" }}
                >
                  Tools
                </h3>
                <div className="h-[2px] w-16 bg-gradient-to-r from-[#FF6B6B]/80 to-transparent mt-1"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-y-8 gap-x-4">
              <TechIcon
                name="git"
                color={darkMode ? "#F05032" : "#F05032"}
                className="transform hover:scale-110 transition-all duration-300"
              />
              <TechIcon
                name="docker"
                color={darkMode ? "#4285F4" : "#4285F4"}
                className="transform hover:scale-110 transition-all duration-300"
              />

              <div
                className="tech-icon flex flex-col items-center justify-center transform hover:scale-110 transition-all duration-300"
                onMouseEnter={(e) =>
                  e.currentTarget
                    .querySelector("img")
                    .classList.add("scale-110")
                }
                onMouseLeave={(e) =>
                  e.currentTarget
                    .querySelector("img")
                    .classList.remove("scale-110")
                }
              >
                <div
                  className="relative flex items-center justify-center rounded-full overflow-hidden transition-all duration-300"
                  style={{ width: "50px", height: "50px" }}
                >
                  <img
                    src="tech-stack/jira.svg"
                    alt="Jira Scrum"
                    className="w-[35px] h-[35px] transition-all duration-300 animate-fadeIn"
                  />
                </div>
                <span
                  className="mt-2 text-sm font-medium opacity-70"
                  style={{ color: darkMode ? "#2684FF" : "#0052CC" }}
                >
                  Jira Scrum
                </span>
              </div>

              <div
                className="tech-icon flex flex-col items-center justify-center transform hover:scale-110 transition-all duration-300"
                onMouseEnter={(e) =>
                  e.currentTarget
                    .querySelector("img")
                    .classList.add("scale-110")
                }
                onMouseLeave={(e) =>
                  e.currentTarget
                    .querySelector("img")
                    .classList.remove("scale-110")
                }
              >
                <div
                  className="relative flex items-center justify-center rounded-full overflow-hidden transition-all duration-300"
                  style={{ width: "50px", height: "50px" }}
                >
                  <img
                    src="tech-stack/figma.svg"
                    alt="Figma"
                    className="w-[35px] h-[35px] transition-all duration-300 animate-fadeIn"
                  />
                </div>
                <span
                  className="mt-2 text-sm font-medium opacity-70"
                  style={{ color: darkMode ? "#A259FF" : "#A259FF" }}
                >
                  Figma
                </span>
              </div>

              <div
                className="tech-icon flex flex-col items-center justify-center transform hover:scale-110 transition-all duration-300"
                onMouseEnter={(e) =>
                  e.currentTarget
                    .querySelector("img")
                    .classList.add("scale-110")
                }
                onMouseLeave={(e) =>
                  e.currentTarget
                    .querySelector("img")
                    .classList.remove("scale-110")
                }
              >
                <div
                  className="relative flex items-center justify-center rounded-full overflow-hidden transition-all duration-300"
                  style={{ width: "50px", height: "50px" }}
                >
                  <img
                    src="tech-stack/postman.svg"
                    alt="Postman"
                    className="w-[35px] h-[35px] transition-all duration-300 animate-fadeIn"
                  />
                </div>
                <span
                  className="mt-2 text-sm font-medium opacity-70"
                  style={{ color: darkMode ? "#FF6C37" : "#F15A2C" }}
                >
                  Postman
                </span>
              </div>

              <div
                className="tech-icon flex flex-col items-center justify-center transform hover:scale-110 transition-all duration-300"
                onMouseEnter={(e) =>
                  e.currentTarget
                    .querySelector("img")
                    .classList.add("scale-110")
                }
                onMouseLeave={(e) =>
                  e.currentTarget
                    .querySelector("img")
                    .classList.remove("scale-110")
                }
              >
                <div
                  className="relative flex items-center justify-center rounded-full overflow-hidden transition-all duration-300"
                  style={{ width: "50px", height: "50px" }}
                >
                  <img
                    src="tech-stack/xampp.svg"
                    alt="XAMPP"
                    className="w-[35px] h-[35px] transition-all duration-300 animate-fadeIn"
                  />
                </div>
                <span
                  className="mt-2 text-sm font-medium opacity-70"
                  style={{ color: darkMode ? "#FB7A24" : "#F16A21" }}
                >
                  XAMPP
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="projects w-full m-auto max-w-[1160px] px-4 sm:px-6 md:px-[40px]"
        ref={projectsRef}
      >
        <div className="projects-content mt-[4em] sm:mt-[6em] flex flex-col items-center w-full">
          {/* Section Header */}
          <div className="section-header relative mb-12 sm:mb-16 flex flex-col items-center">
            <h2
              className="text-base sm:text-lg tracking-[0.3em] uppercase font-light mb-6 relative inline-block"
              style={{ color: darkMode ? "#F9F8F6" : "#0D1B2A" }}
            >
              SELECTED WORK
            </h2>

            {/* underline FIXED (was invalid inside h2) */}
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-[3px] bg-gradient-to-r from-[#E870A4] to-[#E7C8A0]"></div>
          </div>

          {/* Project Cards */}
          <div className="project-cards min-h-[400px] w-full flex flex-col space-y-8 sm:space-y-12">
            {/* PROJECT 1 */}
            <motion.div
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div
                className="card w-full rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl"
                style={{
                  backgroundColor: darkMode
                    ? "rgba(13,27,42,0.6)"
                    : "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(20px)",
                  border: `2px solid ${
                    darkMode ? "rgba(232,112,164,0.2)" : "rgba(13,27,42,0.1)"
                  }`,
                  cursor: "default",
                }}
              >
                <div className="h-1 w-full bg-gradient-to-r from-[#E7C8A0] via-[#E870A4] to-[#E7C8A0] opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="p-5 sm:p-6 md:p-8 lg:p-10">
                  <div className="space-y-3 sm:space-y-4">
                    <ProjectImage
                      src="projects/erraji.png"
                      alt="Erraji Voyage App"
                    />
                    {/* Status bar */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className="text-[0.65rem] sm:text-xs px-3 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 rounded-full font-medium border border-amber-200 dark:border-amber-800/30 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse"></div>
                        In Progress
                      </span>
                      <span
                        className="text-[0.6rem] sm:text-xs uppercase tracking-wider opacity-50"
                        style={{ color: darkMode ? "#F9F8F6" : "#0D1B2A" }}
                      >
                        Mobile • Travel Agency
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 group-hover:text-[#E7C8A0] transition-colors duration-300"
                        style={{ color: darkMode ? "#F9F8F6" : "#0D1B2A" }}
                      >
                        Erraji Voyage
                      </h3>

                      <p
                        className="text-sm sm:text-base md:text-lg leading-relaxed opacity-70"
                        style={{ color: darkMode ? "#F9F8F6" : "#0D1B2A" }}
                      >
                        Erraji Voyage is a modern travel-agency app built with
                        React Native, Expo, Supabase, and PostgreSQL. It
                        provides a clean interface for exploring travel packages
                        while giving the agency full admin control over
                        programs, flights, hotels, and destinations.
                      </p>
                    </div>

                    {/* Tech badges */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 sm:pt-2">
                      <span className="px-4 py-2 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs sm:text-sm rounded-lg border border-cyan-500/20">
                        React Native
                      </span>
                      <span className="px-4 py-2 bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs sm:text-sm rounded-lg border border-violet-500/20">
                        TypeScript
                      </span>
                      <span className="px-4 py-2 bg-pink-500/10 text-pink-600 dark:text-pink-400 text-xs sm:text-sm rounded-lg border border-pink-500/20">
                        Supabase
                      </span>
                      <span className="px-4 py-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm rounded-lg border border-emerald-500/20">
                        PostgreSQL
                      </span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div
                    className="mt-5 sm:mt-6 md:mt-8 pt-4 border-t flex items-center"
                    style={{
                      borderColor: darkMode
                        ? "rgba(249,248,246,0.1)"
                        : "rgba(13,27,42,0.1)",
                    }}
                  >
                    <div
                      className="flex items-center gap-2 text-xs sm:text-sm opacity-60"
                      style={{ color: darkMode ? "#F9F8F6" : "#0D1B2A" }}
                    >
                      <svg
                        className="w-4 h-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Currently under development...</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* PROJECT 2 */}
            <motion.div
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div
                className="card w-full rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl"
                style={{
                  backgroundColor: darkMode
                    ? "rgba(13,27,42,0.6)"
                    : "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(20px)",
                  border: `2px solid ${
                    darkMode ? "rgba(232,112,164,0.2)" : "rgba(13,27,42,0.1)"
                  }`,
                  cursor: "default",
                }}
              >
                <div className="h-1 w-full bg-gradient-to-r from-[#E7C8A0] via-[#E870A4] to-[#E7C8A0] opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="p-5 sm:p-6 md:p-8 lg:p-10">
                  <div className="space-y-3 sm:space-y-4">
                    <ProjectImage src="projects/hiring.png" alt="Hiring App" />
                    {/* Status bar */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className="text-[0.65rem] sm:text-xs px-3 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 rounded-full font-medium border border-amber-200 dark:border-amber-800/30 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse"></div>
                        In Progress
                      </span>
                      <span
                        className="text-[0.6rem] sm:text-xs uppercase tracking-wider opacity-50"
                        style={{ color: darkMode ? "#F9F8F6" : "#0D1B2A" }}
                      >
                        SaaS • Mobile Platform
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 group-hover:text-[#E7C8A0] transition-colors duration-300"
                        style={{ color: darkMode ? "#F9F8F6" : "#0D1B2A" }}
                      >
                        Hiring App
                      </h3>

                      <p
                        className="text-sm sm:text-base md:text-lg leading-relaxed opacity-70"
                        style={{ color: darkMode ? "#F9F8F6" : "#0D1B2A" }}
                      >
                        A Hiring app built with React Native, Expo, Supabase,
                        Prisma, and PostgreSQL. Clients can browse Contractors,
                        view profiles, filter services, and make bookings, while
                        the backend handles authentication, profile management,
                        listings, and secure data storage. It focuses on a
                        smooth user experience, fast search, and a clean,
                        professional interface.
                      </p>
                    </div>

                    {/* Tech badges */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 sm:pt-2">
                      <span className="px-4 py-2 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs sm:text-sm rounded-lg border border-cyan-500/20">
                        React Native
                      </span>
                      <span className="px-4 py-2 bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs sm:text-sm rounded-lg border border-violet-500/20">
                        TypeScript
                      </span>
                      <span className="px-4 py-2 bg-pink-500/10 text-pink-600 dark:text-pink-400 text-xs sm:text-sm rounded-lg border border-pink-500/20">
                        Supabase
                      </span>
                      <span className="px-4 py-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm rounded-lg border border-emerald-500/20">
                        PostgreSQL
                      </span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div
                    className="mt-5 sm:mt-6 md:mt-8 pt-4 border-t flex items-center"
                    style={{
                      borderColor: darkMode
                        ? "rgba(249,248,246,0.1)"
                        : "rgba(13,27,42,0.1)",
                    }}
                  >
                    <div
                      className="flex items-center gap-2 text-xs sm:text-sm opacity-60"
                      style={{ color: darkMode ? "#F9F8F6" : "#0D1B2A" }}
                    >
                      <svg
                        className="w-4 h-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Currently under development...</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* PROJECT 3 */}
            <motion.div
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="card w-full rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl"
                onClick={() =>
                  window.open("https://the-app-gmail.vercel.app/", "_blank")
                }
                style={{
                  backgroundColor: darkMode
                    ? "rgba(13, 27, 42, 0.6)"
                    : "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(20px)",
                  border: `2px solid ${
                    darkMode ? "rgba(232,112,164,0.2)" : "rgba(13,27,42,0.1)"
                  }`,
                }}
              >
                <div className="h-1 w-full bg-gradient-to-r from-[#E870A4] via-[#E7C8A0] to-[#E870A4] opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="p-5 sm:p-6 md:p-8 lg:p-10">
                  <div className="space-y-3 sm:space-y-4">
                    <ProjectImage
                      src="projects/gmail.png"
                      alt="Gmail AI Filtering App"
                    />
                    {/* Status + Category */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className="text-[0.65rem] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-full font-medium border border-green-200 dark:border-green-800/30 flex items-center gap-1.5">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Completed
                      </span>

                      <span
                        className="text-[0.6rem] sm:text-xs uppercase tracking-wider opacity-50"
                        style={{ color: darkMode ? "#F9F8F6" : "#0D1B2A" }}
                      >
                        AI • Gmail Filtering
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 transition-colors duration-300 group-hover:text-[#E870A4]"
                        style={{ color: darkMode ? "#F9F8F6" : "#0D1B2A" }}
                      >
                        Gmail Filtering AI
                      </h3>

                      <p
                        className="text-sm sm:text-base md:text-lg leading-relaxed opacity-70"
                        style={{ color: darkMode ? "#F9F8F6" : "#0D1B2A" }}
                      >
                        A modern email management application with AI-powered
                        categorization and automated responses.
                      </p>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 sm:pt-2">
                      <span className="px-3 py-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs sm:text-sm rounded-lg border border-blue-500/20">
                        React.js
                      </span>
                      <span className="px-3 py-1.5 bg-green-500/10 text-green-600 dark:text-green-400 text-xs sm:text-sm rounded-lg border border-green-500/20">
                        Node.js
                      </span>
                      <span className="px-3 py-1.5 bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs sm:text-sm rounded-lg border border-purple-500/20">
                        OpenAI API
                      </span>
                      <span className="px-3 py-1.5 bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs sm:text-sm rounded-lg border border-orange-500/20">
                        PostgreSQL
                      </span>
                      <span className="px-3 py-1.5 bg-orange-500/10 text-black-600 dark:text-orange-400 text-xs sm:text-sm rounded-lg border border-gray-500/20">
                        Prisma
                      </span>
                      <span className="px-3 py-1.5 bg-orange-500/10 text-blue-600 dark:text-blue-400 text-xs sm:text-sm rounded-lg border border-blue-500/20">
                        Docker
                      </span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div
                    className="mt-5 sm:mt-6 md:mt-8 pt-4 sm:pt-5 md:pt-6 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4"
                    style={{
                      borderColor: darkMode
                        ? "rgba(249,248,246,0.1)"
                        : "rgba(13,27,42,0.1)",
                    }}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                      <a
                        href="https://github.com/soukaina258/Gmail-Advanced-Filtering-AI"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-3 rounded-lg border border-[#E870A4]/20 hover:border-[#E870A4] hover:bg-[#E870A4]/10 transition-all duration-300"
                        onClick={(e) => e.stopPropagation()}
                        style={{ color: darkMode ? "#F9F8F6" : "#0D1B2A" }}
                      >
                        <svg
                          width="18"
                          height="18"
                          className="sm:w-5 sm:h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span className="text-sm font-medium">Source Code</span>
                      </a>
                    </div>

                    <div
                      className="flex items-center gap-2 text-xs sm:text-sm opacity-60 justify-end sm:justify-start transition-opacity duration-300"
                      style={{ color: darkMode ? "#F9F8F6" : "#0D1B2A" }}
                    >
                      <span>View Project</span>
                      <svg
                        width="20"
                        height="20"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* PROJECT 4 */}
            <motion.div
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="card w-full rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl"
                onClick={() =>
                  window.open(
                    "https://labcall-calls-agents.vercel.app/",
                    "_blank",
                  )
                }
                style={{
                  backgroundColor: darkMode
                    ? "rgba(13, 27, 42, 0.6)"
                    : "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(20px)",
                  border: `2px solid ${
                    darkMode ? "rgba(232,112,164,0.2)" : "rgba(13,27,42,0.1)"
                  }`,
                }}
              >
                <div className="h-1 w-full bg-gradient-to-r from-[#E870A4] via-[#E7C8A0] to-[#E870A4] opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="p-5 sm:p-6 md:p-8 lg:p-10">
                  <div className="space-y-3 sm:space-y-4">
                    <ProjectImage
                      src="projects/saas.png"
                      alt="LabCall AI Customer Support"
                    />
                    {/* Status + Category */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className="text-[0.65rem] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-full font-medium border border-green-200 dark:border-green-800/30 flex items-center gap-1.5">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Completed
                      </span>

                      <span
                        className="text-[0.6rem] sm:text-xs uppercase tracking-wider opacity-50"
                        style={{ color: darkMode ? "#F9F8F6" : "#0D1B2A" }}
                      >
                        SaaS • Voice Agents
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 transition-colors duration-300 group-hover:text-[#E870A4]"
                        style={{ color: darkMode ? "#F9F8F6" : "#0D1B2A" }}
                      >
                        SaaS Platform for AI Voice Agents
                      </h3>

                      <p
                        className="text-sm sm:text-base md:text-lg leading-relaxed opacity-70"
                        style={{ color: darkMode ? "#F9F8F6" : "#0D1B2A" }}
                      >
                        A full-stack SaaS platform that lets teams create AI
                        voice agents without coding. Developed a FastAPI backend
                        and a Next.js interface with drag-and-drop workflow
                        building, real-time STT/TTS, telecom API integration,
                        vector-store knowledge (Chroma/FAISS), and RBAC
                        security. Delivered dashboards, call logs, automation
                        logic, and async call handling for contact-center use
                        cases.
                      </p>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 sm:pt-2">
                      <span className="px-3 py-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs sm:text-sm rounded-lg border border-blue-500/20">
                        Next.js
                      </span>
                      <span className="px-3 py-1.5 bg-green-500/10 text-green-600 dark:text-green-400 text-xs sm:text-sm rounded-lg border border-green-500/20">
                        Python
                      </span>
                      <span className="px-3 py-1.5 bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs sm:text-sm rounded-lg border border-purple-500/20">
                        FastAPI
                      </span>
                      <span className="px-3 py-1.5 bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs sm:text-sm rounded-lg border border-orange-500/20">
                        TypeScript
                      </span>
                      <span className="px-3 py-1.5 bg-orange-500/10 text-black-600 dark:text-orange-400 text-xs sm:text-sm rounded-lg border border-gray-500/20">
                        Prisma
                      </span>
                      <span className="px-3 py-1.5 bg-orange-500/10 text-blue-600 dark:text-blue-400 text-xs sm:text-sm rounded-lg border border-blue-500/20">
                        PostgreSQL
                      </span>
                      <span className="px-3 py-1.5 bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs sm:text-sm rounded-lg border border-purple-500/20">
                        Twilio
                      </span>
                      <span className="px-3 py-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs sm:text-sm rounded-lg border border-blue-500/20">
                        VAPI
                      </span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div
                    className="mt-5 sm:mt-6 md:mt-8 pt-4 sm:pt-5 md:pt-6 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4"
                    style={{
                      borderColor: darkMode
                        ? "rgba(249,248,246,0.1)"
                        : "rgba(13,27,42,0.1)",
                    }}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                      <a
                        href="https://github.com/soukaina258/SaaS-Voice-Hub"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-3 rounded-lg border border-[#E870A4]/20 hover:border-[#E870A4] hover:bg-[#E870A4]/10 transition-all duration-300"
                        onClick={(e) => e.stopPropagation()}
                        style={{ color: darkMode ? "#F9F8F6" : "#0D1B2A" }}
                      >
                        <svg
                          width="18"
                          height="18"
                          className="sm:w-5 sm:h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span className="text-sm font-medium">Source Code</span>
                      </a>
                    </div>

                    <div
                      className="flex items-center gap-2 text-xs sm:text-sm opacity-60 justify-end sm:justify-start transition-opacity duration-300"
                      style={{ color: darkMode ? "#F9F8F6" : "#0D1B2A" }}
                    >
                      <span>View Project</span>
                      <svg
                        width="20"
                        height="20"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* PROJECT 5 */}
            <motion.div
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="card w-full rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl"
                onClick={() =>
                  window.open("https://iboarding-pass.vercel.app/", "_blank")
                }
                style={{
                  backgroundColor: darkMode
                    ? "rgba(13, 27, 42, 0.6)"
                    : "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(20px)",
                  border: `2px solid ${
                    darkMode ? "rgba(232,112,164,0.2)" : "rgba(13,27,42,0.1)"
                  }`,
                }}
              >
                <div className="h-1 w-full bg-gradient-to-r from-[#E870A4] via-[#E7C8A0] to-[#E870A4] opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="p-5 sm:p-6 md:p-8 lg:p-10">
                  <div className="space-y-3 sm:space-y-4">
                    <ProjectImage
                      src="projects/iboarding.png"
                      alt="Digital Boarding Pass"
                    />
                    {/* Status + Category */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className="text-[0.65rem] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-full font-medium border border-green-200 dark:border-green-800/30 flex items-center gap-1.5">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Completed
                      </span>

                      <span
                        className="text-[0.6rem] sm:text-xs uppercase tracking-wider opacity-50"
                        style={{ color: darkMode ? "#F9F8F6" : "#0D1B2A" }}
                      >
                        Web • iBoardingPass
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 transition-colors duration-300 group-hover:text-[#E870A4]"
                        style={{ color: darkMode ? "#F9F8F6" : "#0D1B2A" }}
                      >
                        Digital Boarding Pass
                      </h3>

                      <p
                        className="text-sm sm:text-base md:text-lg leading-relaxed opacity-70"
                        style={{ color: darkMode ? "#F9F8F6" : "#0D1B2A" }}
                      >
                        A modern web application that generates and manages
                        digital boarding passes with real-time data, QR codes,
                        and smooth check-in workflows. Built with React,
                        TypeScript, and Supabase for authentication, flight data
                        management, and fast server-side operations. Designed to
                        improve passenger experience and simplify airline
                        processes.
                      </p>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 sm:pt-2">
                      <span className="px-3 py-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs sm:text-sm rounded-lg border border-blue-500/20">
                        React.js
                      </span>
                      <span className="px-3 py-1.5 bg-green-500/10 text-green-600 dark:text-green-400 text-xs sm:text-sm rounded-lg border border-green-500/20">
                        Tailwind CSS
                      </span>
                      <span className="px-3 py-1.5 bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs sm:text-sm rounded-lg border border-purple-500/20">
                        TypeScript
                      </span>
                      <span className="px-3 py-1.5 bg-orange-500/10 text-black-600 dark:text-orange-400 text-xs sm:text-sm rounded-lg border border-gray-500/20">
                        REST API
                      </span>
                      <span className="px-3 py-1.5 bg-orange-500/10 text-blue-600 dark:text-blue-400 text-xs sm:text-sm rounded-lg border border-blue-500/20">
                        PostgreSQL
                      </span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div
                    className="mt-5 sm:mt-6 md:mt-8 pt-4 sm:pt-5 md:pt-6 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4"
                    style={{
                      borderColor: darkMode
                        ? "rgba(249,248,246,0.1)"
                        : "rgba(13,27,42,0.1)",
                    }}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                      <a
                        href="https://github.com/soukaina258/iBoardingPass"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-3 rounded-lg border border-[#E870A4]/20 hover:border-[#E870A4] hover:bg-[#E870A4]/10 transition-all duration-300"
                        onClick={(e) => e.stopPropagation()}
                        style={{ color: darkMode ? "#F9F8F6" : "#0D1B2A" }}
                      >
                        <svg
                          width="18"
                          height="18"
                          className="sm:w-5 sm:h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span className="text-sm font-medium">Source Code</span>
                      </a>
                    </div>

                    <div
                      className="flex items-center gap-2 text-xs sm:text-sm opacity-60 justify-end sm:justify-start transition-opacity duration-300"
                      style={{ color: darkMode ? "#F9F8F6" : "#0D1B2A" }}
                    >
                      <span>View Project</span>
                      <svg
                        width="20"
                        height="20"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Explore More */}
            <div className="w-full flex justify-center mt-8 sm:mt-12">
              <motion.a
                target="_blank"
                href="https://github.com/soukaina258?tab=repositories"
                className="px-8 py-4 rounded-full group overflow-hidden relative inline-flex items-center shadow-lg hover:shadow-xl transition-all duration-300"
                style={{
                  backgroundColor: darkMode
                    ? "rgba(232,112,164,0.1)"
                    : "rgba(232,112,164,0.05)",
                  border: `2px solid ${
                    darkMode ? "rgba(232,112,164,0.3)" : "rgba(232,112,164,0.2)"
                  }`,
                  color: darkMode ? "#F9F8F6" : "#0D1B2A",
                  backdropFilter: "blur(10px)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#E870A4] to-[#E7C8A0] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>

                <span className="relative z-10 group-hover:text-white transition-colors duration-500 font-semibold text-base sm:text-lg flex items-center gap-2">
                  Explore All Projects
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Responsive Grid */}
      <section
        id="about"
        className="about w-full m-[4em_auto] sm:m-[6em_auto] md:m-[8em_auto] max-w-[1160px] px-[20px] sm:px-[40px]"
        ref={aboutRef}
      >
        <div className="section-header relative mb-16 flex flex-col items-center">
          <h2
            className="text-lg tracking-[0.3em] uppercase font-light mb-6 relative inline-block"
            style={{
              color: darkMode ? "#F9F8F6" : "#0D1B2A",
            }}
          >
            WHO AM I
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-[3px] bg-gradient-to-r from-[#E870A4] to-[#E7C8A0]"></div>
          </h2>
        </div>

        <div className="about-content relative overflow-visible py-[2em] grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-[2em] sm:gap-[3em] lg:gap-[4em]">
          <motion.div
            className="profile-container relative w-full max-w-[400px] h-[350px] sm:h-[400px] md:h-[450px] group justify-self-center lg:justify-self-start mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/10"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <motion.img
                className="w-full h-full object-cover"
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_ngx6y7ngx6y7ngx6-ye1dcse4N8gstOMuliQfHHOxOSZdNc.png"
                alt="Profile"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#E870A4]/20 via-transparent to-[#E7C8A0]/20 mix-blend-overlay"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#E870A4]/0 to-[#E7C8A0]/0 group-hover:from-[#E870A4]/20 group-hover:to-[#E7C8A0]/20 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
            </motion.div>
          </motion.div>

          <div
            className="text w-full flex flex-col justify-between"
            style={{
              color: darkMode ? "#F9F8F6" : "#000",
            }}
          >
            <motion.p
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-[50ch] mb-[1em] font-medium leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              I'm a software engineer who enjoys turning ideas into clear,
              thoughtful digital experiences. I focus on building
              <motion.span
                className="relative mx-2 inline-block"
                whileHover={{ scale: 1.05 }}
              >
                <span className="relative z-10 text-white px-2 py-0.5 font-semibold">
                  smooth, intuitive interfaces
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#E870A4] to-[#E7C8A0] rounded-md transform -skew-x-6"></span>
              </motion.span>
              that feel good to use and easy to understand. My work blends
              <motion.span
                className="relative mx-2 inline-block"
                whileHover={{ scale: 1.05 }}
              >
                <span className="relative z-10 text-white px-2 py-0.5 font-semibold">
                  clean code, modern design
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#E7C8A0] to-[#E870A4] rounded-md transform skew-x-6"></span>
              </motion.span>
              , and a real understanding of how people use technology.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.5 }}
            >
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#E870A4] to-[#E7C8A0] text-white rounded-lg shadow-lg shadow-rose-500/20 font-medium"
                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    "0 20px 25px -5px rgba(232, 112, 164, 0.2), 0 8px 10px -6px rgba(231, 200, 160, 0.2)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                Get in touch
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section - Responsive Grid */}
      <section
        id="skills"
        className="w-full my-[6em] sm:my-[8em] md:my-[10em] px-4 sm:px-6 md:px-10 overflow-hidden"
        ref={skillsRef}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="section-header relative mb-16 flex flex-col items-center">
            <h2
              className="text-lg tracking-[0.3em] uppercase font-light mb-6 relative inline-block"
              style={{
                color: darkMode ? "#F9F8F6" : "#0D1B2A",
              }}
            >
              SERVICES
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-[3px] bg-gradient-to-r from-[#E870A4] to-[#E7C8A0]"></div>
            </h2>
            <p
              className="text-sm opacity-60 mt-4"
              style={{
                color: darkMode ? "#F9F8F6" : "#0D1B2A",
              }}
            >
              What I can do for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {/* CHANGE: Web Development (separated from Mobile) */}
            <motion.div
              className="service-card group relative overflow-hidden rounded-3xl p-8 md:p-10 border-2 transition-all duration-500 hover:shadow-2xl"
              style={{
                backgroundColor: darkMode
                  ? "rgba(13, 27, 42, 0.5)"
                  : "rgba(255, 255, 255, 0.8)",
                borderColor: darkMode
                  ? "rgba(232, 112, 164, 0.2)"
                  : "rgba(13, 27, 42, 0.1)",
                backdropFilter: "blur(10px)",
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{
                y: -8,
                borderColor: darkMode ? "#E870A4" : "rgba(232, 112, 164, 0.5)",
              }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#E870A4]/10 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E870A4] to-[#E7C8A0] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 3L3 8L8 13"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 3L21 8L16 13"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <rect
                      x="2"
                      y="3"
                      width="20"
                      height="14"
                      rx="2"
                      stroke="white"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                <h3
                  className="text-3xl font-bold mb-4 group-hover:text-[#E870A4] transition-colors duration-300"
                  style={{
                    color: darkMode ? "#F9F8F6" : "#0D1B2A",
                  }}
                >
                  Web Development
                </h3>

                <p
                  className="text-lg leading-relaxed opacity-80 mb-6"
                  style={{
                    color: darkMode ? "#F9F8F6" : "#0D1B2A",
                  }}
                >
                  Building responsive, high-performance web applications with
                  modern frameworks and best practices. From concept to
                  deployment, I create seamless digital experiences.
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#E870A4]/10 text-[#E870A4] border border-[#E870A4]/20">
                    React
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#E870A4]/10 text-[#E870A4] border border-[#E870A4]/20">
                    Next.js
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#E870A4]/10 text-[#E870A4] border border-[#E870A4]/20">
                    TypeScript
                  </span>
                </div>
              </div>
            </motion.div>

            {/* CHANGE: Mobile Development (new separate card) */}
            <motion.div
              className="service-card group relative overflow-hidden rounded-3xl p-8 md:p-10 border-2 transition-all duration-500 hover:shadow-2xl"
              style={{
                backgroundColor: darkMode
                  ? "rgba(13, 27, 42, 0.5)"
                  : "rgba(255, 255, 255, 0.8)",
                borderColor: darkMode
                  ? "rgba(232, 112, 164, 0.2)"
                  : "rgba(13, 27, 42, 0.1)",
                backdropFilter: "blur(10px)",
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{
                y: -8,
                borderColor: darkMode ? "#E7C8A0" : "rgba(231, 200, 160, 0.5)",
              }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#E7C8A0]/10 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E7C8A0] to-[#E870A4] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="7"
                      y="2"
                      width="10"
                      height="20"
                      rx="2"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <path
                      d="M10 19H14"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <h3
                  className="text-3xl font-bold mb-4 group-hover:text-[#E7C8A0] transition-colors duration-300"
                  style={{
                    color: darkMode ? "#F9F8F6" : "#0D1B2A",
                  }}
                >
                  Mobile Development
                </h3>

                <p
                  className="text-lg leading-relaxed opacity-80 mb-6"
                  style={{
                    color: darkMode ? "#F9F8F6" : "#0D1B2A",
                  }}
                >
                  Creating native and cross-platform mobile applications with
                  smooth performance and intuitive interfaces. Bringing your
                  ideas to iOS and Android.
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#E7C8A0]/10 text-[#E7C8A0] border border-[#E7C8A0]/20">
                    React Native
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#E7C8A0]/10 text-[#E7C8A0] border border-[#E7C8A0]/20">
                    Flutter
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#E7C8A0]/10 text-[#E7C8A0] border border-[#E7C8A0]/20">
                    iOS/Android
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Service Card 3 - Interface Design */}
            <motion.div
              className="service-card group relative overflow-hidden rounded-3xl p-8 md:p-10 border-2 transition-all duration-500 hover:shadow-2xl"
              style={{
                backgroundColor: darkMode
                  ? "rgba(13, 27, 42, 0.5)"
                  : "rgba(255, 255, 255, 0.8)",
                borderColor: darkMode
                  ? "rgba(232, 112, 164, 0.2)"
                  : "rgba(13, 27, 42, 0.1)",
                backdropFilter: "blur(10px)",
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{
                y: -8,
                borderColor: darkMode ? "#E870A4" : "rgba(232, 112, 164, 0.5)",
              }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#E870A4]/10 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E870A4] to-[#0D1B2A] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <path d="M3 9H21M9 3V21" stroke="white" strokeWidth="2" />
                  </svg>
                </div>

                <h3
                  className="text-3xl font-bold mb-4 group-hover:text-[#E870A4] transition-colors duration-300"
                  style={{
                    color: darkMode ? "#F9F8F6" : "#0D1B2A",
                  }}
                >
                  Interface Design
                </h3>

                <p
                  className="text-lg leading-relaxed opacity-80 mb-6"
                  style={{
                    color: darkMode ? "#F9F8F6" : "#0D1B2A",
                  }}
                >
                  Crafting intuitive and beautiful user interfaces that
                  prioritize user experience. Every pixel matters in creating
                  engaging digital products.
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#E870A4]/10 text-[#E870A4] border border-[#E870A4]/20">
                    UI/UX
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#E870A4]/10 text-[#E870A4] border border-[#E870A4]/20">
                    Figma
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#E870A4]/10 text-[#E870A4] border border-[#E870A4]/20">
                    Prototyping
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Service Card 4 - Full-Stack Solutions */}
            <motion.div
              className="service-card group relative overflow-hidden rounded-3xl p-8 md:p-10 border-2 transition-all duration-500 hover:shadow-2xl"
              style={{
                backgroundColor: darkMode
                  ? "rgba(13, 27, 42, 0.5)"
                  : "rgba(255, 255, 255, 0.8)",
                borderColor: darkMode
                  ? "rgba(232, 112, 164, 0.2)"
                  : "rgba(13, 27, 42, 0.1)",
                backdropFilter: "blur(10px)",
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{
                y: -8,
                borderColor: darkMode ? "#E7C8A0" : "rgba(231, 200, 160, 0.5)",
              }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#E7C8A0]/10 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0D1B2A] to-[#E7C8A0] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 5C16.4183 5 20 4.32843 20 3.5C20 2.67157 16.4183 2 12 2C7.58172 2 4 2.67157 4 3.5C4 4.32843 7.58172 5 12 5Z"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <path
                      d="M20 3.5V20.5C20 21.3284 16.4183 22 12 22C7.58172 22 4 21.3284 4 20.5V3.5"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <path
                      d="M20 12C20 12.8284 16.4183 13.5 12 13.5C7.58172 13.5 4 12.8284 4 12"
                      stroke="white"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                <h3
                  className="text-3xl font-bold mb-4 group-hover:text-[#E7C8A0] transition-colors duration-300"
                  style={{
                    color: darkMode ? "#F9F8F6" : "#0D1B2A",
                  }}
                >
                  Full-Stack Solutions
                </h3>

                <p
                  className="text-lg leading-relaxed opacity-80 mb-6"
                  style={{
                    color: darkMode ? "#F9F8F6" : "#0D1B2A",
                  }}
                >
                  End-to-end development from database design to frontend
                  implementation. Building scalable architectures that grow with
                  your business needs.
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#E7C8A0]/10 text-[#E7C8A0] border border-[#E7C8A0]/20">
                    Node.js
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#E7C8A0]/10 text-[#E7C8A0] border border-[#E7C8A0]/20">
                    APIs
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#E7C8A0]/10 text-[#E7C8A0] border border-[#E7C8A0]/20">
                    Databases
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section - Modern Redesign */}
      <section
        id="contact"
        className="contact-container w-full max-w-[1800px] m-[2em_auto_auto] h-auto px-[15px] sm:px-[20px] md:px-[40px]"
        ref={contactRef}
      >
        <div className="relative w-full overflow-hidden h-auto min-h-[800px] sm:min-h-[780px] md:h-[750px] rounded-[20px] sm:rounded-[30px] md:rounded-[40px] mb-[2em]">
          {/* Background with Gradient Overlay */}
          <div className="absolute inset-0 rounded-[20px] sm:rounded-[30px] md:rounded-[40px] overflow-hidden">
            <img
              src="/bg.webp"
              alt="Contact background"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0D1B2A]/95 via-[#0D1B2A]/90 to-[#1a2942]/85"></div>
            {/* Animated Gradient Orbs */}
            <motion.div
              className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-gradient-to-r from-[#E870A4]/20 to-[#E7C8A0]/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-[15%] right-[15%] w-[250px] h-[250px] bg-gradient-to-l from-[#E7C8A0]/20 to-[#E870A4]/20 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </div>

          <div className="relative h-full flex flex-col justify-between z-[2] py-[3em] sm:py-[4em] md:py-[6em] px-[2em] sm:px-[3em] md:px-[5em] lg:px-[8em]">
            {/* Main Heading with Animation */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-block px-4 py-2 rounded-full border border-[#E870A4]/30 bg-[#E870A4]/10 backdrop-blur-sm mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-[#E870A4] text-sm sm:text-base font-medium tracking-wide">
                  💼 Available for Projects
                </span>
              </motion.div>

              <h2 className="text-[2rem] xs:text-[2.8rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] xl:text-[7rem] font-bold text-white leading-[1.1] tracking-tight">
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Let's create
                </motion.span>
                <br />
                <motion.span
                  className="inline-block bg-gradient-to-r from-[#E870A4] via-[#E7C8A0] to-[#E870A4] bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  something
                </motion.span>
                <br />
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  amazing
                </motion.span>
                <br />
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  together
                </motion.span>
                <motion.span
                  className="inline-block ml-4 text-[#E870A4]"
                  animate={{
                    rotate: [0, 10, -10, 10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ✦
                </motion.span>
              </h2>

              <motion.p
                className="text-white/70 text-base sm:text-lg md:text-xl max-w-[600px] mt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                Have a project in mind? Let's discuss how we can bring your
                vision to life with elegant code and thoughtful design.
              </motion.p>
            </motion.div>

            {/* Contact CTA Section */}
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8 mt-8 sm:mt-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                {/* Email Button */}
              </div>

              {/* Social Links */}
              <div className="flex flex-col items-start sm:items-end gap-3 translate-y-[-20px] sm:translate-y-[-40px]">
                <div className="flex gap-3">
                  {/* GitHub */}
                  <motion.a
                    href="https://github.com/soukaina258"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 
                                                    border-white/20 hover:border-[#E870A4] flex items-center justify-center text-white 
                                                    hover:text-[#E870A4] backdrop-blur-sm transition-all duration-300 overflow-hidden"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span
                      className="absolute inset-0 bg-[#E870A4]/10 scale-0 group-hover:scale-100 
                                                            transition-transform duration-300 rounded-full"
                    ></span>
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 relative z-10"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.167 8.839 21.65C9.339 21.75 9.5 21.442 9.5 21.167C9.5 20.917 9.5 20.167 9.5 19.333C6.735 19.95 6.14 18 6.14 18C5.684 16.903 5.03 16.6 5.03 16.6C4.122 15.967 5.095 16 5.095 16C6.1 16.067 6.64 17.017 6.64 17.017C7.55 18.517 9.133 18.067 9.54 17.8C9.638 17.15 9.89 16.7 10.17 16.45C7.973 16.2 5.65 15.367 5.65 11.5C5.65 10.4 6.04 9.517 6.65 8.8C6.54 8.55 6.203 7.5 6.75 6.15C6.75 6.15 7.612 5.883 9.5 7.173C10.29 6.95 11.15 6.842 12 6.842C12.85 6.842 13.71 6.95 14.5 7.173C16.388 5.883 17.25 6.15 17.25 6.15C17.797 7.503 17.46 8.553 17.35 8.8C17.963 9.517 18.35 10.403 18.35 11.5C18.35 15.383 16.027 16.2 13.813 16.433C14.17 16.733 14.5 17.333 14.5 18.233C14.5 19.567 14.5 20.817 14.5 21.167C14.5 21.442 14.66 21.75 15.167 21.65C19.135 20.16 22 16.417 22 12C22 6.477 17.523 2 12 2Z" />
                    </svg>
                  </motion.a>

                  {/* LinkedIn */}
                  <motion.a
                    href="https://linkedin.com/in/soukaina-sbai-6a6b1a206"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white/20 
                                                        hover:border-[#E7C8A0] flex items-center justify-center text-white 
                                                        hover:text-[#E7C8A0] backdrop-blur-sm transition-all duration-300 overflow-hidden"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="absolute inset-0 bg-[#E7C8A0]/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></span>
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 relative z-10"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19ZM18.5 18.5V13.2C18.5 12.3354 18.1565 11.5062 17.5452 10.8948C16.9338 10.2835 16.1046 9.94 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17C14.6813 12.17 15.0374 12.3175 15.2999 12.5801C15.5625 12.8426 15.71 13.1987 15.71 13.57V18.5H18.5ZM6.88 8.56C7.32556 8.56 7.75288 8.383 8.06794 8.06794C8.383 7.75288 8.56 7.32556 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19C6.43178 5.19 6.00193 5.36805 5.68499 5.68499C5.36805 6.00193 5.19 6.43178 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56ZM8.27 18.5V10.13H5.5V18.5H8.27Z" />
                    </svg>
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              className="absolute bottom-8 left-8 w-20 h-20 border-2 border-[#E870A4]/20 rounded-full"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute top-16 right-16 w-16 h-16 border-2 border-[#E7C8A0]/20 rounded-lg rotate-12"
              animate={{
                rotate: [12, 24, 12],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </section>
      <motion.a
        href="https://wa.me/212707875976?text=Hi%20Soukaina,%20I'd%20like%20to%20discuss%20a%20project"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[100] group"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="relative">
          {/* Ping effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] animate-ping opacity-75" />

          {/* Button */}
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] shadow-2xl shadow-[#25D366]/40 flex items-center justify-center group-hover:shadow-[#25D366]/60 transition-all duration-300">
            {/* WhatsApp Icon */}
            <svg
              className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12.04 2C6.58 2 2.15 6.42 2.15 11.89c0 2.1.55 4.06 1.5 5.76L2 22l4.47-1.63a9.87 9.87 0 005.57 1.63h.01c5.46 0 9.89-4.43 9.89-9.89C21.93 6.42 17.5 2 12.04 2zm0 17.93h-.01a8.2 8.2 0 01-4.19-1.15l-.3-.18-2.65.97.86-2.58-.2-.33a8.22 8.22 0 01-1.25-4.44c0-4.56 3.71-8.27 8.28-8.27 4.56 0 8.27 3.71 8.27 8.27 0 4.56-3.71 8.27-8.27 8.27zm4.53-6.2c-.25-.12-1.47-.72-1.7-.8-.23-.08-.4-.12-.57.12-.17.25-.65.8-.8.96-.15.17-.3.19-.55.06-.25-.12-1.05-.39-2-1.25-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.52.11-.11.25-.3.37-.45.12-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.12-.57-1.37-.78-1.88-.2-.48-.4-.42-.57-.43h-.48c-.17 0-.45.06-.68.32-.23.25-.9.88-.9 2.15 0 1.27.93 2.5 1.06 2.67.13.17 1.83 2.79 4.44 3.92.62.27 1.1.43 1.47.55.62.2 1.19.17 1.63.1.5-.08 1.47-.6 1.68-1.19.21-.59.21-1.1.15-1.19-.06-.1-.23-.15-.48-.27z" />
            </svg>
          </div>

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-white dark:bg-[#0D1B2A] px-4 py-2 rounded-lg shadow-xl border border-[#25D366]/20 whitespace-nowrap">
              <span className="text-sm font-medium text-[#25D366]">
                Chat on WhatsApp
              </span>
            </div>
            <div className="w-3 h-3 bg-white dark:bg-[#0D1B2A] border-r border-b border-[#25D366]/20 transform rotate-45 absolute -bottom-1.5 right-6"></div>
          </div>
        </div>
      </motion.a>
    </>
  );
}
