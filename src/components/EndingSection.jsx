import React, { useEffect, useRef } from "react";
import "../styles/EndingSection.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function EndingSection() {
  const sectionRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",   // when section is 80% visible
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      line1Ref.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );

    tl.fromTo(
      line2Ref.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
      "-=0.6"
    );
  }, []);

  return (
    <div className="ending-section" ref={sectionRef}>
      <div className="ending-text-wrapper">
        <h2 ref={line1Ref} className="ending-line">
          We have all categories for all your types.
        </h2>

        <h2 ref={line2Ref} className="ending-line">
          Shop with us at <span className="brand">IvoryGrove</span>.
        </h2>
      </div>
    </div>
  );
}

export default EndingSection;
