"use client";

import { motion } from "framer-motion";
import React from "react";
import { useDataStore } from "../../store/useDataStore";

type StepType = "compare" | "swap" | "sorted";

interface Step {
  type: StepType;
  indices: number[];
  array: number[];
  message: string;
}

interface BubbleSortAnimationProps {
  currentStep: number;
}

export default function BubbleSortAnimation({
  currentStep,
}: BubbleSortAnimationProps) {
  const data = useDataStore((state) => state.data);
  if (!Array.isArray(data)) return null;

  const originalArray = data as number[];
  const steps: Step[] = [];

  const recordStep = (
    type: StepType,
    indices: number[],
    array: number[],
    message: string
  ) => {
    steps.push({
      type,
      indices: [...indices],
      array: [...array],
      message,
    });
  };

  // Bubble Sort Step Recorder
  const bubbleSort = (arr: number[]) => {
    const n = arr.length;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        recordStep(
          "compare",
          [j, j + 1],
          arr,
          `Comparing index ${j} and ${j + 1}.`
        );
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          recordStep("swap", [j, j + 1], arr, `Swapping ${j} and ${j + 1}.`);
        }
      }
      recordStep(
        "sorted",
        [n - i - 1],
        arr,
        `Element at index ${n - i - 1} is sorted.`
      );
    }
  };

  // Generate steps only once
  if (steps.length === 0) {
    const workingArr = [...originalArray];
    bubbleSort(workingArr);
  }

  const step = steps[Math.min(currentStep, steps.length - 1)];
  const displayArray = step?.array || originalArray;

  const getColor = (index: number): string => {
    if (!step) return "bg-gray-200";
    if (step.indices.includes(index)) {
      switch (step.type) {
        case "compare":
          return "bg-yellow-300";
        case "swap":
          return "bg-blue-400";
        case "sorted":
          return "bg-green-500";
      }
    }
    return "bg-gray-200";
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4">
      <div className="flex gap-2 items-end h-64 w-full max-w-3xl justify-center">
        {displayArray.map((val, idx) => (
          <motion.div
            key={idx}
            className={`w-8 text-xs text-center text-white rounded-t-md ${getColor(
              idx
            )}`}
            style={{ height: `${val * 20}px` }}
            layout
            transition={{ duration: 0.3 }}
          >
            {val}
          </motion.div>
        ))}
      </div>
      <div className="mt-4 text-sm text-gray-700 font-medium text-center">
        {step?.message}
      </div>
    </div>
  );
}
