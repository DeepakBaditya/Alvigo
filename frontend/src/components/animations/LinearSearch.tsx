"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useDataStore } from "@/store/useDataStore";

interface Step {
  type: "highlight" | "found" | "not-found";
  index: number;
  array: number[];
  message: string;
}

interface LinearSearchAnimationProps {
  currentStep: number;
  setMaxSteps?: (steps: number) => void;
}

export default function LinearSearchAnimation({
  currentStep,
  setMaxSteps,
}: LinearSearchAnimationProps) {
  const data = useDataStore((state) => state.data);
  if (
    !data ||
    typeof data !== "object" ||
    !("array" in data) ||
    !("target" in data)
  )
    return null;

  const { array, target } = data as { array: number[]; target: number };

  const steps = useMemo(() => {
    const stepList: Step[] = [];
    let found = false;

    for (let i = 0; i < array.length; i++) {
      stepList.push({
        type: "highlight",
        index: i,
        array: [...array],
        message: `Checking element at index ${i}`,
      });

      if (array[i] === target) {
        stepList.push({
          type: "found",
          index: i,
          array: [...array],
          message: `Element ${target} found at index ${i}`,
        });
        found = true;
        break;
      }
    }

    if (!found) {
      stepList.push({
        type: "not-found",
        index: -1,
        array: [...array],
        message: `Element ${target} not found in the array`,
      });
    }

    if (setMaxSteps) setMaxSteps(stepList.length);
    return stepList;
  }, [array, target, setMaxSteps]);

  const step = steps[Math.min(currentStep, steps.length - 1)];

  const getColor = (index: number): string => {
    if (!step) return "bg-gray-300";
    if (step.index === index) {
      switch (step.type) {
        case "highlight":
          return "bg-yellow-400";
        case "found":
          return "bg-green-500";
      }
    }
    return "bg-gray-300";
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-6">
      <div className="flex gap-2 items-end h-64 w-full max-w-3xl justify-center">
        {step.array.map((val, idx) => (
          <motion.div
            key={idx}
            className={`w-10 h-10 rounded-md flex items-center justify-center font-bold text-white text-sm ${getColor(
              idx
            )}`}
            layout
            transition={{ duration: 0.3 }}
          >
            {val}
          </motion.div>
        ))}
      </div>
      <div className="mt-4 text-base text-gray-800 text-center">
        {step.message}
      </div>
    </div>
  );
}
