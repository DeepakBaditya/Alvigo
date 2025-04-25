"use client";

import { motion } from "framer-motion";
import React from "react";
import { useDataStore } from "../../store/useDataStore";

type StepType = "pivot" | "compare" | "swap" | "sorted" | "partition-done";

interface Step {
  type: StepType;
  indices: number[];
  array: number[];
  message: string;
}

interface QuickSortAnimationProps {
  currentStep: number;
}

export default function QuickSortAnimation({
  currentStep,
}: QuickSortAnimationProps) {
  const data = useDataStore((state) => state.data);

  // Filter only number values safely
  const originalArray =
    Array.isArray(data) && data.every((item) => typeof item === "number")
      ? (data as number[])
      : [];

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

  const quickSort = (arr: number[], low: number, high: number) => {
    if (low < high) {
      const pi = partition(arr, low, high);
      quickSort(arr, low, pi - 1);
      quickSort(arr, pi + 1, high);
    } else if (low === high) {
      recordStep(
        "sorted",
        [low],
        arr,
        `Element at index ${low} is now sorted.`
      );
    }
  };

  const partition = (arr: number[], low: number, high: number): number => {
    const pivot = arr[high];
    recordStep(
      "pivot",
      [high],
      arr,
      `Choosing pivot at index ${high} (value: ${pivot}).`
    );
    let i = low - 1;

    for (let j = low; j < high; j++) {
      recordStep(
        "compare",
        [j, high],
        arr,
        `Comparing index ${j} with pivot ${high}.`
      );

      if (arr[j] <= pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        recordStep(
          "swap",
          [i, j],
          arr,
          `Swapping values at index ${i} and ${j}.`
        );
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    recordStep("swap", [i + 1, high], arr, `Moving pivot to index ${i + 1}.`);
    recordStep(
      "partition-done",
      [i + 1],
      arr,
      `Partition complete. Pivot at index ${i + 1} is sorted.`
    );
    return i + 1;
  };

  // Only generate steps once
  if (steps.length === 0) {
    const workingArr = [...originalArray];
    quickSort(workingArr, 0, workingArr.length - 1);
  }

  const step = steps[Math.min(currentStep, steps.length - 1)];
  const displayArray = step?.array || originalArray;

  const getColor = (index: number): string => {
    if (!step) return "bg-gray-200";
    if (step.indices.includes(index)) {
      switch (step.type) {
        case "pivot":
          return "bg-orange-400";
        case "compare":
          return "bg-yellow-300";
        case "swap":
          return "bg-blue-400";
        case "sorted":
          return "bg-green-500";
        case "partition-done":
          return "bg-purple-500";
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
