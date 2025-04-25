"use client";

import { Network, LineChart, Code, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Timeline = () => {
  const [fillHeight, setFillHeight] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const timelineRect = timelineRef.current.getBoundingClientRect();
      const timelineStart = timelineRect.top + window.scrollY;
      const timelineEnd = timelineStart + timelineRect.height;
      const timelineHeight = timelineEnd - timelineStart;

      // Calculate how far down the timeline we've scrolled
      const scrollPosition = window.scrollY + window.innerHeight * 0.3; // Using 30% of viewport as trigger point
      const scrollProgress = Math.min(
        Math.max((scrollPosition - timelineStart) / timelineHeight, 0),
        1
      );

      setFillHeight(scrollProgress * 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const steps = [
    {
      icon: <Network className="w-4 h-4 text-white" />,
      title: "1. Choose Your Algorithm",
      description: "Browse through our collection of algorithms categorized by type."
    },
    {
      icon: <LineChart className="w-4 h-4 text-white" />,
      title: "2. Understand Complexity",
      description: "Visualize the algorithm's time and space complexity through interactive graphs."
    },
    {
      icon: <Code className="w-4 h-4 text-white" />,
      title: "3. Review Implementation",
      description: "Study the algorithm's implementation in multiple programming languages."
    },
    {
      icon: <Play className="w-4 h-4 text-white" />,
      title: "4. Watch It in Action",
      description: "Control the algorithm's execution with our interactive animation player."
    }
  ];

  return (
    <div id="visu" className="max-w-3xl mx-auto relative py-16" ref={timelineRef}>
      {/* Timeline line with fill effect */}
      <div className="absolute left-8 top-0 h-full w-1 bg-gray-300">
        <div 
          className="absolute top-0 left-0 w-full bg-black transition-all duration-300"
          style={{ height: `${fillHeight}%` }}
        />
      </div>

      <div className="space-y-16 pl-16">
        {steps.map((step, index) => {
          // Calculate the position where the dot should activate (at its center point)
          const dotActivationPoint = (index / steps.length) * 100;
          const isActive = fillHeight >= dotActivationPoint;

          return (
            <div 
              key={index}
              ref={(el) => (stepRefs.current[index] = el)}
              className="relative"
            >
              {/* Timeline dot - will turn black immediately when fill reaches it */}
              <div className={`absolute -left-11 top-1 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                isActive ? 'bg-black border-black scale-110' : 'bg-white border-gray-300'
              } transition-all duration-300`}>
                {isActive && (
                  <div className="scale-75">
                    {step.icon}
                  </div>
                )}
              </div>

              {/* Content card - will still animate when scrolled into view */}
              <div className={`p-6 rounded-lg shadow-lg border ${
                isActive ? 'bg-black text-white border-black' : 'bg-white border-gray-200'
              } transition-all duration-300`}>
                <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;


