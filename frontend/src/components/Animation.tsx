"use client";

import { motion } from "framer-motion";

const convertStringToNumberArray = (input: string): number[] => {
  // Split the string by commas to get an array of strings
  const stringArray = input.split(",");

  // Map over the array and convert each string to a number
  const numberArray = stringArray.map((str) => {
    const num = parseInt(str.trim(), 10); // Trim whitespace and convert to integer
    if (isNaN(num)) {
      throw new Error(`Invalid number encountered: ${str}`);
    }
    return num;
  });

  return numberArray;
};

export default function NumberAnimation() {
  // Function to convert a string of numbers separated by commas into an array of numbers

  const numbers: number[] = [5, 2, 7, 9, 3, 4, 5]; // Example array

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

  // FirstHalf
  const FirstmidIndex = Math.ceil(firstHalf.length / 2);
  const totalFirstWidth =
    firstHalf.length * elementWidth + (numbers.length - 1) * gap;
  console.log(FirstmidIndex);
  const thirdHalf = firstHalf.slice(0, FirstmidIndex); // Left part
  const FourthHalf = firstHalf.slice(FirstmidIndex); // Right part

  const FirstDivisionPointX =
    FirstmidIndex * elementWidth + (midIndex - 1) * gap - elementWidth / 2;

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
    <div className="flex flex-col w-full items-center justify-center min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-4">
      <h1 className="text-3xl font-bold text-white mb-8">MIN-MAX ALGORITHM</h1>

      {/* Container for the array */}
      <div className="w-full h-fit flex flex-col justify-center items-center relative">
        <motion.div
          className="flex justify-center gap-4 w-full overflow-x-auto"
          variants={containerVariants}
          initial="hidden"
          animate={numbers.length > 0 ? "show" : "hidden"}
        >
          {/* First Half of the Array */}
          {numbers.map((number, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-center w-16 h-16  bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full shadow-lg text-white font-bold text-2xl"
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
            stroke="white"
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
            stroke="white"
            strokeWidth="5"
            variants={draw}
            custom={1.8} // Delay the line animation after the array
          />
        </motion.svg>
        <div className="w-full relative ">
          <motion.div
            className="flex gap-4 absolute left-[600px] w-fit"
            variants={containerVariants}
            initial="hidden"
            animate={numbers.length > 0 ? "show" : "hidden"}
          >
            {firstHalf.map((number, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg shadow-lg text-white font-bold text-2xl"
                variants={numberVariants}
                custom={1.5}
              >
                {number}
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="flex gap-4 absolute left-[1100px] w-fit"
            variants={containerVariants}
            initial="hidden"
            animate={numbers.length > 0 ? "show" : "hidden"}
          >
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
        </div>

        {/* SVG Lines */}
        <motion.svg
          width={totalFirstWidth}
          height={totalHeight}
          viewBox={`0 0 ${totalWidth} ${totalHeight}`}
          initial="hidden"
          className=" absolute top-[215px] left-[620px]"
          animate={numbers.length > 0 ? "visible" : "hidden"}
        >
          {/* Line 1: From division point to bottom-right */}
          <motion.line
            x1={FirstDivisionPointX}
            y1="0"
            x2="0"
            y2={totalHeight}
            stroke="white"
            strokeWidth="5"
            variants={draw}
            custom={3} // Delay the line animation after the array
          />
          {/* Line 2: From division point to bottom-left */}
          <motion.line
            x1={FirstDivisionPointX}
            y1="0"
            x2="300"
            y2={totalHeight}
            stroke="white"
            strokeWidth="5"
            variants={draw}
            custom={3} // Delay the line animation after the array
          />
        </motion.svg>

        <div className="w-full relative h-[200px]">
          <motion.div
            className="flex gap-4 absolute left-[500px] bottom-0 w-fit"
            variants={containerVariants}
            initial="hidden"
            animate={numbers.length > 0 ? "show" : "hidden"}
          >
            {thirdHalf.map((number, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg shadow-lg text-white font-bold text-2xl"
                variants={numberVariants}
                custom={1.5}
              >
                {number}
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="flex gap-4 absolute left-[800px] bottom-0 top w-fit"
            variants={containerVariants}
            initial="hidden"
            animate={numbers.length > 0 ? "show" : "hidden"}
            custom={3}
          >
            {FourthHalf.map((number, index) => (
              <motion.div
                key={index + firstHalf.length} // Ensure unique keys
                className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg shadow-lg text-white font-bold text-2xl"
                variants={numberVariants}
              >
                {number}
              </motion.div>
            ))}
          </motion.div>
        </div>
        {/* mera code */}
        <motion.svg
          width={totalFirstWidth}
          height={totalHeight}
          viewBox={`0 0 ${totalWidth} ${totalHeight}`}
          initial="hidden"
          className=" absolute top-[215px] left-[620px]"
          animate={numbers.length > 0 ? "visible" : "hidden"}
        >
          {/* Line 1: From division point to bottom-right */}
          <motion.line
            x1={FirstDivisionPointX}
            y1="0"
            x2="0"
            y2={totalHeight}
            stroke="white"
            strokeWidth="5"
            variants={draw}
            custom={3} // Delay the line animation after the array
          />
          {/* Line 2: From division point to bottom-left */}
          <motion.line
            x1={FirstDivisionPointX}
            y1="0"
            x2="300"
            y2={totalHeight}
            stroke="white"
            strokeWidth="5"
            variants={draw}
            custom={3} // Delay the line animation after the array
          />
        </motion.svg>
      </div>
    </div>
  );
}
