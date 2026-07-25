"use client";

import React, { useEffect, useState, useRef } from "react";

type SkillItem = {
  name: string;
  level: number;
  color: string;
  textColor: string;
};

interface SkillsCarouselProps {
  items: SkillItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
}

const SkillsCarousel = ({
  items,
  direction = "left",
  speed = "normal",
}: SkillsCarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards");
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse");
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]`}
    >
      <ul
        ref={scrollerRef}
        className={`flex min-w-full shrink-0 gap-6 py-4 w-max flex-nowrap ${
          start ? "animate-scroll" : ""
        }`}
      >
        {items.map((item, idx) => (
          <li
            className={`h-[72px] sm:h-[96px] md:h-[120px] w-[160px] sm:w-[210px] md:w-[280px] max-w-full relative rounded-[3rem] border-4 border-transparent flex-shrink-0 px-2 sm:px-6 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ${item.color} ${item.textColor}`}
            key={item.name + idx}
          >
            <div className="flex flex-col items-center justify-center text-center gap-2 h-full">
              <span className="text-lg sm:text-2xl md:text-3xl font-black tracking-tight leading-tight">{item.name}</span>
            </div>
          </li>
        ))}
      </ul>
      <style dangerouslySetInnerHTML={{__html: `
        .animate-scroll {
          animation: scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite;
        }
        @keyframes scroll {
          to {
            transform: translate(calc(-50% - 0.75rem));
          }
        }
      `}} />
    </div>
  );
};

export default SkillsCarousel;