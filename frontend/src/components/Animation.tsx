"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function NumberAnimation() {
  const numbers: number[] = [1, 2, 3, 4, 5]; // Example array

  // Divide the array into two parts
  const midIndex = Math.ceil(numbers.length / 2); // Midpoint for odd-sized arrays
  const firstHalf = numbers.slice(0, midIndex); // Left part
  const secondHalf = numbers.slice(midIndex); // Right part

  // Calculate the total width of the array container
  const elementWidth = 64; // w-16 = 64px
  const gap = 16; // gap-4 = 16px
  const totalWidth = numbers.length * elementWidth + (numbers.length - 1) * gap;
  const totalHeight = 100; // h-16 = 64px

  // Calculate the midpoint for drawing lines
  const divisionPointX =
    midIndex * elementWidth + (midIndex - 1) * gap - elementWidth / 2;

  // Container variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  // Individual number variants
  const numberVariants = {
    hidden: {
      y: 20,
      opacity: 0,
      scale: 0.8,
    },
    show: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
  };

  // Line animation variants
  const draw = {
    hidden: { pathLength: 0 },
    visible: (i: number) => {
      const delay = i;
      return {
        pathLength: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        },
      };
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-4">
      <h1 className="text-3xl font-bold text-white mb-8">
        Animated Number Array
      </h1>

      {/* Container for the array */}
      <motion.div
        className="flex justify-center gap-4 w-full overflow-x-auto"
        variants={containerVariants}
        initial="hidden"
        animate={numbers.length > 0 ? "show" : "hidden"}
      >
        {/* First Half of the Array */}
        {firstHalf.map((number, index) => (
          <motion.div
            key={index}
            className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg shadow-lg text-white font-bold text-2xl"
            variants={numberVariants}
          >
            {number}
          </motion.div>
        ))}

        {/* Second Half of the Array */}
        {secondHalf.map((number, index) => (
          <motion.div
            key={index + firstHalf.length} // Ensure unique keys
            className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg shadow-lg text-white font-bold text-2xl"
            variants={numberVariants}
          >
            {number}
          </motion.div>
        ))}
      </motion.div>

      {/* SVG Lines */}
      <motion.svg
        width={totalWidth}
        height={totalHeight}
        viewBox={`0 0 ${totalWidth} ${totalHeight}`}
        initial="hidden"
        animate={numbers.length > 0 ? "visible" : "hidden"}
      >
        {/* Line 1: From division point to bottom-right */}
        <motion.line
          x1={divisionPointX}
          y1="0"
          x2={totalWidth}
          y2={totalHeight}
          stroke="black"
          strokeWidth="5"
          variants={draw}
          custom={1.5} // Delay the line animation after the array
        />
        {/* Line 2: From division point to bottom-left */}
        <motion.line
          x1={divisionPointX}
          y1="0"
          x2="0"
          y2={totalHeight}
          stroke="black"
          strokeWidth="5"
          variants={draw}
          custom={1.8} // Delay the line animation after the array
        />
      </motion.svg>
    </div>
  );
}
