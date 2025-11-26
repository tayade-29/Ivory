// src/components/StyleSection.js
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "../styles/StyleSection.css";

import bag1 from "../assets/bag1.png";
import bag2 from "../assets/bag2.png";
import bag3 from "../assets/bag3.png";
import bag4 from "../assets/bag4.png";
import bag5 from "../assets/bag5.png";

const bags = [
  { img: bag1, title: "If you want to try some crazy stuff" },
  { img: bag2, title: "Everday fashion!" },
  { img: bag3, title: "For your girls day out" },
  { img: bag4, title: "For your office fit" },
  { img: bag5, title: "If you like elegant style" },
];

const StyleSection = () => {
  const circleRef = useRef(null);
  const boxRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);


useEffect(() => {
  const updatePositions = () => {
    const total = bags.length;
    const angleStep = 360 / total;

    // ⭐ RESPONSIVE RADIUS BASED ON SCREEN SIZE
    const screenWidth = window.innerWidth;

    let radius = 0;
    if (screenWidth > 1200) radius = 260;        // Large screens
    else if (screenWidth > 900) radius = 220;    // Laptops / Tablets landscape
    else if (screenWidth > 600) radius = 180;    // Tablets portrait
    else if (screenWidth > 420) radius = 140;    // Mobile phones
    else radius = 110;                            // Very small phones

    // Position bags around circle
    boxRefs.current.forEach((box, i) => {
      const angle = i * angleStep - 90;

      gsap.set(box, {
        x: radius * Math.cos((angle * Math.PI) / 180),
        y: radius * Math.sin((angle * Math.PI) / 180),
        scale: i === activeIndex ? 1.5 : 1
      });
    });
  };

  updatePositions(); // initial call

  // Recalculate on resize
  window.addEventListener("resize", updatePositions);

  // Auto-rotate active bag every 3 sec
  const interval = setInterval(() => {
    const nextIndex = (activeIndex + 1) % bags.length;
    setActiveIndex(nextIndex);

    boxRefs.current.forEach((box, idx) => {
      gsap.to(box, {
        scale: idx === nextIndex ? 1.6 : 1,
        duration: 0.8,
        ease: "power2.out"
      });
    });
  }, 3000);

  return () => {
    window.removeEventListener("resize", updatePositions);
    clearInterval(interval);
  };
}, [activeIndex]);


  return (
    <section className="style-section">
      <div className="circle-wrapper" ref={circleRef}>
        {bags.map((bag, idx) => (
          <div
            key={idx}
            className="bag-box"
            ref={(el) => (boxRefs.current[idx] = el)}
          >
            <img src={bag.img} alt={bag.title} draggable="false" />
          </div>
        ))}

        {/* Center headline */}
        <h2 className="style-title">{bags[activeIndex].title}</h2>
      </div>
    </section>
  );
};

export default StyleSection;
