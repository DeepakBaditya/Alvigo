"use client";
import React from "react";
import { motion } from "framer-motion";
import { useDataStore } from "@/store/useDataStore";

interface Step {
  low: number;
  high: number;
  mid: number;
  array: number[];
  found: boolean;
  message: string;
}

export default function BinarySearchAnimation({
  currentStep,
}: {
  currentStep: number;
}) {
  const data = useDataStore((state) => state.data);
  const target = useDataStore((state: any) => state.target);

  if (
    !data ||
    !Array.isArray(data) ||
    typeof target !== "number" ||
    data.length === 0
  )
    return (
      <div className="text-center text-red-500">Invalid input or target</div>
    );

  const originalArray = [...(data as number[])].sort((a, b) => a - b);

  const steps: Step[] = [];

  const recordStep = (
    low: number,
    high: number,
    mid: number,
    array: number[],
    found: boolean,
    message: string
  ) => {
    steps.push({ low, high, mid, array: [...array], found, message });
  };

  const binarySearch = (arr: number[], target: number) => {
    let low = 0;
    let high = arr.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (arr[mid] === target) {
        recordStep(low, high, mid, arr, true, `Target found at index ${mid}`);
        break;
      } else if (arr[mid] < target) {
        recordStep(low, high, mid, arr, false, `Searching right half`);
        low = mid + 1;
      } else {
        recordStep(low, high, mid, arr, false, `Searching left half`);
        high = mid - 1;
      }
    }

    if (
      steps.length === 0 ||
      steps[steps.length - 1].array[steps[steps.length - 1].mid] !== target
    ) {
      recordStep(-1, -1, -1, arr, false, "Target not found");
    }
  };

  binarySearch(originalArray, target);
  const step = steps[Math.min(currentStep, steps.length - 1)];

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4">
      <div className="flex gap-2 items-end h-64 w-full max-w-3xl justify-center relative">
        {step.array.map((val, idx) => {
          let bg = "bg-gray-300";
          if (idx === step.mid) bg = "bg-yellow-400";
          if (idx === step.low) bg = "bg-blue-400";
          if (idx === step.high) bg = "bg-red-400";
          if (step.found && idx === step.mid) bg = "bg-green-500";

          return (
            <motion.div
              key={idx}
              className={`w-10 text-xs text-center text-white rounded-t-md ${bg}`}
              style={{ height: `${val * 20}px` }}
              layout
              transition={{ duration: 0.3 }}
            >
              {val}
            </motion.div>
          );
        })}
      </div>
      <div className="mt-4 text-sm text-gray-700 font-medium text-center">
        {step.message}
      </div>
    </div>
  );
}
