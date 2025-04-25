"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDataStore } from "@/store/useDataStore";

interface Step {
  index: number;
  blockStart: number;
  blockEnd: number;
  found: boolean;
  array: number[];
  message: string;
  jumpIndex?: number;
}

const JumpSearchAnimation = ({ currentStep }: { currentStep: number }) => {
  const data = useDataStore((state) => state.data);
  const [steps, setSteps] = useState<Step[]>([]);
  const [isSorted, setIsSorted] = useState(true);

  if (
    typeof data !== "object" ||
    data === null ||
    !("array" in data) ||
    !("target" in data)
  )
    return null;

  const { array: originalArray, target } = data as {
    array: number[];
    target: number;
  };
  const array = [...originalArray].sort((a, b) => a - b); // Create sorted copy

  // Check if array is sorted
  useEffect(() => {
    for (let i = 1; i < array.length; i++) {
      if (array[i] < array[i - 1]) {
        setIsSorted(false);
        return;
      }
    }
    setIsSorted(true);
  }, [array]);

  const recordStep = (
    index: number,
    blockStart: number,
    blockEnd: number,
    found: boolean,
    message: string,
    jumpIndex?: number
  ) => {
    setSteps((prevSteps) => [
      ...prevSteps,
      {
        index,
        blockStart,
        blockEnd,
        found,
        array: [...array],
        message,
        jumpIndex,
      },
    ]);
  };

  const jumpSearch = (arr: number[], target: number) => {
    const n = arr.length;
    if (n === 0) {
      recordStep(-1, 0, 0, false, "Array is empty");
      return;
    }

    if (!isSorted) {
      recordStep(-1, 0, 0, false, "Array must be sorted for jump search");
      return;
    }

    const stepSize = Math.floor(Math.sqrt(n));
    let prev = 0;
    let next = stepSize;

    // Initial state before any jumps
    recordStep(-1, 0, stepSize, false, "Starting jump search", -1);

    // Jump steps
    while (next < n && arr[Math.min(next, n - 1)] < target) {
      recordStep(
        -1,
        prev,
        next,
        false,
        `Jumping over block [${prev}, ${Math.min(next, n)})`,
        next - 1
      );
      prev = next;
      next += stepSize;
    }

    // Record the final block to search
    recordStep(
      -1,
      prev,
      Math.min(next, n),
      false,
      `Found potential block [${prev}, ${Math.min(next, n)})`,
      -1
    );

    // Linear search within the block
    for (let i = prev; i < Math.min(next, n); i++) {
      const isTargetFound = arr[i] === target;
      recordStep(
        i,
        prev,
        Math.min(next, n),
        isTargetFound,
        `Checking index ${i} (value: ${arr[i]})`
      );
      if (isTargetFound) {
        recordStep(
          i,
          prev,
          Math.min(next, n),
          true,
          `Found target ${target} at index ${i}`
        );
        return;
      }
    }

    // Record final step if target not found
    recordStep(
      -1,
      prev,
      next,
      false,
      `Target ${target} not found in the array`
    );
  };

  useEffect(() => {
    if (steps.length === 0) {
      jumpSearch(array, target);
    }
  }, [steps, array, target, isSorted]);

  const step = steps[Math.min(currentStep, steps.length - 1)];

  const getColor = (index: number): string => {
    if (!step) return "bg-gray-200";

    // Found element
    if (step.found && index === step.index) return "bg-green-500";

    // Currently checking this element
    if (index === step.index) return "bg-blue-500";

    // Jump position highlight
    if (step.jumpIndex === index) return "bg-purple-400";

    // Current search block
    if (index >= step.blockStart && index < step.blockEnd)
      return "bg-yellow-300";

    // Previously searched blocks
    for (let i = 0; i < Math.min(currentStep, steps.length); i++) {
      const pastStep = steps[i];
      if (
        pastStep &&
        index >= pastStep.blockStart &&
        index < pastStep.blockEnd
      ) {
        return "bg-gray-400";
      }
    }

    // Default (not searched yet)
    return "bg-gray-200";
  };

  if (!isSorted) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full p-4">
        <div className="text-red-500 font-bold text-lg mb-2">
          Error: Array Not Sorted
        </div>
        <div className="text-gray-700">
          Jump search requires the input array to be sorted.
        </div>
        <div className="mt-4 text-sm">Your array: [{array.join(", ")}]</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4">
      <div className="mb-4 text-lg font-semibold">
        Jump Search Visualization
      </div>

      <div className="flex gap-1 items-end h-64 w-full max-w-3xl justify-center">
        {step?.array.map((val, idx) => (
          <motion.div
            key={idx}
            className={`w-8 flex flex-col items-center justify-end text-xs text-center text-white rounded-t-md ${getColor(
              idx
            )}`}
            style={{ height: `${val * 20}px` }}
            layout
            transition={{ duration: 0.3 }}
          >
            <div className="font-bold">{val}</div>
            <div className="text-xs">{idx}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-md w-full max-w-3xl">
        <div className="text-sm text-gray-700 font-medium text-center">
          {step?.message || "Initializing search..."}
        </div>
        {step && (
          <div className="mt-2 text-xs text-gray-500 text-center">
            Current Block: [{step.blockStart}, {step.blockEnd})
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
          <span>Current Check</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-purple-400 rounded-sm"></div>
          <span>Jump Position</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-yellow-300 rounded-sm"></div>
          <span>Current Block</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
          <span>Found</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-gray-400 rounded-sm"></div>
          <span>Searched</span>
        </div>
      </div>
    </div>
  );
};

export default JumpSearchAnimation;
