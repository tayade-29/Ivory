// src/components/Hero.js
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "../styles/Hero.css";

import centerImg from "../assets/center.png";   
import rightImg1 from "../assets/right-1.png"; 
import rightImg2 from "../assets/right-2.png";

const Hero = () => {
  const textRef = useRef(null);
  const lettersRef = useRef([]); // 2D array [word][letter]
  const rightImgsRef = useRef([]);
  const centerImgRef = useRef(null);

  /*  
      Helper function:
      - Splits the headline into WORDS
      - Each word → new line
      - Each letter → animated span
  */
  const renderTextSpans = (text) =>
    text.split(" ").map((word, wIndex) => (
      <span className="word" key={wIndex}>
        {word.split("").map((ch, i) => {
          return (
            <span
              className="letter"
              key={i}
              ref={(el) => {
                if (!lettersRef.current[wIndex]) lettersRef.current[wIndex] = [];
                lettersRef.current[wIndex][i] = el;
              }}
            >
              {ch}
            </span>
          );
        })}
      </span>
    ));

  useEffect(() => {
    // Convert nested 2D array into a flat array of letter elements
    const allLetters = lettersRef.current.flat();

    // Set initial GSAP states
    gsap.set(allLetters, { y: 30, opacity: 0 });
    gsap.set(rightImgsRef.current, { x: -80, opacity: 0, rotation: -4 });
    gsap.set(centerImgRef.current, { scale: 0.98, opacity: 0.9 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Letter-by-letter animation
    tl.to(allLetters, {
      y: 0,
      opacity: 1,
      stagger: 0.03,
      duration: 0.6,
      ease: "power4.out",
    });

    // Small bounce after text reveal
    tl.to(textRef.current, { y: -6, duration: 0.4 }, "+=0.05");
    tl.to(textRef.current, {
      y: 0,
      duration: 0.4,
      ease: "elastic.out(1, 0.6)",
    });

    // Center image reveal
    tl.to(
      centerImgRef.current,
      { scale: 1, opacity: 1, duration: 0.8 },
      "-=0.4"
    );

    // Right images slide in from left
    tl.to(
      rightImgsRef.current,
      {
        x: 0,
        opacity: 1,
        rotation: 0,
        duration: 0.7,
        stagger: 0.12,
      },
      "-=0.15"
    );

    // Floating animation (infinite)
    gsap.to(centerImgRef.current, {
      y: -8,
      duration: 6,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      delay: 0.5,
    });

    return () => {
      tl.kill();
      gsap.killTweensOf([
        allLetters,
        rightImgsRef.current,
        centerImgRef.current,
      ]);
    };
  }, []);

  const headline = "Elevate your everyday style — with Ivory Grove.";

  return (
    <section className="hero-section">
      <div className="hero-inner">

        {/* Left Text */}
        <div className="hero-left">
          <h1 className="hero-headline" ref={textRef} aria-label={headline}>
            {renderTextSpans(headline)}
          </h1>
        </div>

        {/* Center Image */}
        <div className="hero-center">
          <img
            ref={centerImgRef}
            src={centerImg}
            alt="Featured"
            className="center-image"
            draggable="false"
          />
        </div>

        {/* Right Images */}
        <div className="hero-right">
          <img
            ref={(el) => (rightImgsRef.current[0] = el)}
            src={rightImg1}
            alt="Variant 1"
            className="right-image img-1"
            draggable="false"
          />
          <img
            ref={(el) => (rightImgsRef.current[1] = el)}
            src={rightImg2}
            alt="Variant 2"
            className="right-image img-2"
            draggable="false"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
