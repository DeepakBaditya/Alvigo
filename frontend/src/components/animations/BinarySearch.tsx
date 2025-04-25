"use client";

import React from "react";
import { motion } from "framer-motion";
import { useDataStore } from "@/store/useDataStore";

interface Step {
  type: "compare" | "found" | "search";
  low: number;
  mid: number;
  high: number;
  array: number[];
  message: string;
}

interface BinarySearchAnimationProps {
  currentStep: number;
}

export default function BinarySearchAnimation({
  currentStep,
}: BinarySearchAnimationProps) {
  const data = useDataStore((state) => state.data);

  if (
    typeof data !== "object" ||
    data === null ||
    !("array" in data) ||
    !("target" in data)
  )
    return <div className="text-red-500">Invalid input</div>;

  const array = [...(data as { array: number[] }).array].sort((a, b) => a - b);
  const target = (data as { target: number }).target;

  const steps: Step[] = [];

  const recordStep = (
    type: Step["type"],
    low: number,
    mid: number,
    high: number,
    array: number[],
    message: string
  ) => {
    steps.push({
      type,
      low,
      mid,
      high,
      array: [...array],
      message,
    });
  };

  const generateSteps = () => {
    let low = 0;
    let high = array.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      recordStep(
        "compare",
        low,
        mid,
        high,
        array,
        `Comparing mid index ${mid}`
      );
      if (array[mid] === target) {
        recordStep(
          "found",
          low,
          mid,
          high,
          array,
          `Found target at index ${mid}`
        );
        return;
      } else if (array[mid] < target) {
        recordStep(
          "search",
          low,
          mid,
          high,
          array,
          `Target greater than ${array[mid]}`
        );
        low = mid + 1;
      } else {
        recordStep(
          "search",
          low,
          mid,
          high,
          array,
          `Target less than ${array[mid]}`
        );
        high = mid - 1;
      }
    }

    recordStep("search", -1, -1, -1, array, `Target not found`);
  };

  generateSteps();
  const step = steps[Math.min(currentStep, steps.length - 1)];

  const getColor = (index: number): string => {
    if (step.type === "found" && index === step.mid) return "bg-green-500";
    if (index === step.mid) return "bg-yellow-400";
    if (index >= step.low && index <= step.high) return "bg-blue-300";
    return "bg-gray-300";
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-6">
      <div className="flex gap-2 items-end justify-center">
        {step.array.map((val, idx) => (
          <motion.div
            key={idx}
            className={`w-10 h-16 rounded-md text-white flex items-center justify-center ${getColor(
              idx
            )}`}
            layout
            transition={{ duration: 0.3 }}
          >
            {val}
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center gap-4 text-xs text-muted-foreground">
        {step.low >= 0 && <div>Low: {step.low}</div>}
        {step.mid >= 0 && <div>Mid: {step.mid}</div>}
        {step.high >= 0 && <div>High: {step.high}</div>}
      </div>

      <div className="text-sm font-medium text-center text-gray-800">
        {step.message}
      </div>
    </div>
  );
}
