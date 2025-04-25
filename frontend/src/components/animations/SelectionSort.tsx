"use client";

import React from "react";
import { motion } from "framer-motion";
import { useDataStore } from "@/store/useDataStore";

type Step = {
  array: number[];
  currentIndex: number;
  comparingIndex: number;
  minIndex: number;
  message: string;
};

export default function SelectionSortAnimation({
  currentStep,
}: {
  currentStep: number;
}) {
  const data = useDataStore((state) => state.data);
  if (!Array.isArray(data)) return null;

  const originalArray = [...data] as number[];
  const steps: Step[] = [];

  const recordStep = (
    array: number[],
    currentIndex: number,
    comparingIndex: number,
    minIndex: number,
    message: string
  ) => {
    steps.push({
      array: [...array],
      currentIndex,
      comparingIndex,
      minIndex,
      message,
    });
  };

  const selectionSort = (arr: number[]) => {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      recordStep(arr, i, i, minIdx, `Start selecting min from index ${i}`);
      for (let j = i + 1; j < n; j++) {
        recordStep(
          arr,
          i,
          j,
          minIdx,
          `Comparing index ${j} with current min index ${minIdx}`
        );
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
          recordStep(arr, i, j, minIdx, `New min found at index ${j}`);
        }
      }
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      recordStep(
        arr,
        i,
        minIdx,
        minIdx,
        `Swapped index ${i} with min index ${minIdx}`
      );
    }
    recordStep(arr, -1, -1, -1, "Sorting Complete");
  };

  if (steps.length === 0) {
    const working = [...originalArray];
    selectionSort(working);
  }

  const step = steps[Math.min(currentStep, steps.length - 1)];
  const displayArray = step?.array || originalArray;

  const getColor = (index: number): string => {
    if (index === step.currentIndex) return "bg-blue-400";
    if (index === step.comparingIndex) return "bg-yellow-400";
    if (index === step.minIndex) return "bg-green-500";
    return "bg-gray-300";
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="flex items-end gap-2 h-64 mb-4">
        {displayArray.map((val, idx) => (
          <motion.div
            key={idx}
            className={`w-10 rounded-t text-white text-center ${getColor(idx)}`}
            style={{ height: `${val * 15}px` }}
            layout
            transition={{ duration: 0.3 }}
          >
            {val}
          </motion.div>
        ))}
      </div>
      <p className="text-center text-sm text-muted-foreground">
        {step?.message}
      </p>
    </div>
  );
}
