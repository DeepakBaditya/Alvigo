"use client";

import type React from "react";
import { useRef, useState, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RefreshCw,
  Expand,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import MinMaxAnimation from "./animations/MinMax";
import LongestCommonSubsequence from "./animations/LongestCommonSubsequence";
import QuickSort from "./animations/QuickSort";
import BubbleSort from "./animations/BubbleSort";
import LinearSearch from "./animations/LinearSearch";
import BinarySearch from "./animations/BinarySearch";
import SelectionSort from "./animations/SelectionSort";
import JumpSearch from "./animations/JumpSearch";
import Prims from "./animations/Prims";
import { useDataStore } from "@/store/useDataStore";
import type { Edge } from "@/types/algorithm-context"; // Make sure this path is correct

interface AlgorithmAnimationPlayerProps {
  algoName: string;
}

const AlgorithmAnimationPlayer: React.FC<AlgorithmAnimationPlayerProps> = ({
  algoName,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);
  const [maxSteps, setMaxSteps] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const data = useDataStore((state) => state.data);
  const playerRef = useRef<HTMLDivElement>(null);

  const InputComponents: Record<string, React.FC<{ currentStep: number }>> = {
    "Min And Max": MinMaxAnimation,
    "Longest Common Subsequence": LongestCommonSubsequence,
    Prims: Prims,
    "Quick Sort": QuickSort,
    "Bubble Sort": BubbleSort,
    "Selection Sort": SelectionSort,
    "Linear Search": LinearSearch,
    "Binary Search": BinarySearch,
    "Jump Search": JumpSearch,
  };

  function countQuickSortSteps(arr: number[]): number {
    let steps = 0;

    function recordStep() {
      steps++;
    }

    function quicksort(a: number[], l: number, r: number) {
      if (l < r) {
        const pi = partition(a, l, r);
        quicksort(a, l, pi - 1);
        quicksort(a, pi + 1, r);
      } else if (l === r) {
        recordStep(); // base case "sorted"
      }
    }

    function partition(a: number[], l: number, r: number): number {
      recordStep(); // pivot
      const pivot = a[r];
      let i = l;

      for (let j = l; j < r; j++) {
        recordStep(); // compare
        if (a[j] < pivot) {
          if (i !== j) recordStep(); // swap
          [a[i], a[j]] = [a[j], a[i]];
          i++;
        }
      }

      if (i !== r) recordStep(); // pivot swap
      [a[i], a[r]] = [a[r], a[i]];

      recordStep(); // pivot sorted
      return i;
    }

    const copy = [...arr];
    quicksort(copy, 0, copy.length - 1);

    return steps;
  }

  useEffect(() => {
    setCurrentStep(0);
    setIsPlaying(false);
    if (algoName === "Min And Max") {
      const array = Array.isArray(data) ? (data as number[]) : [];
      if (array.length === 0) {
        setMaxSteps(0);
        return;
      }
      const n = array.length;
      const divisionSteps = Math.ceil(Math.log2(n));
      const baseSteps = 1;
      const mergeSteps = n - 1;
      const totalSteps = n === 1 ? 1 : divisionSteps + baseSteps + mergeSteps;
      setMaxSteps(totalSteps);
    } else if (algoName === "Longest Common Subsequence") {
      if (
        typeof data === "object" &&
        data !== null &&
        "string1" in data &&
        "string2" in data
      ) {
        const m = (data as { string1: string }).string1.length;
        const n = (data as { string2: string }).string2.length;
        const fillSteps = m * n;
        const backtrackSteps = m + n;
        setMaxSteps(fillSteps + backtrackSteps - 2);
      }
    } else if (algoName === "Prims") {
      if (Array.isArray(data)) {
        const edges = data as Edge[];
        const numberOfSteps = edges.length;
        setMaxSteps(50);
      } else {
        setMaxSteps(0);
      }
    } else if (algoName === "Quick Sort") {
      const array = Array.isArray(data) ? [...(data as number[])] : [];
      if (array.length === 0) {
        setMaxSteps(0);
        return;
      }

      const totalSteps = countQuickSortSteps(array);
      setMaxSteps(totalSteps);
    } else if (algoName == "Bubble Sort") {
      setMaxSteps(50);
    } else if (algoName == "Selection Sort") {
      const array = Array.isArray(data) ? [...(data as number[])] : [];
      const n = array.length;
      setMaxSteps(n * n - 1);
    } else if (algoName == "Linear Search") {
      if (
        typeof data === "object" &&
        data !== null &&
        "array" in data &&
        "target" in data
      ) {
        const n = data.array.length;
        setMaxSteps(n);
      }
    } else if (algoName == "Binary Search") {
      if (
        typeof data === "object" &&
        data !== null &&
        "array" in data &&
        "target" in data
      ) {
        const n = data.array.length;
        setMaxSteps(50);
      }
    } else if (algoName == "Jump Search") {
      if (
        typeof data === "object" &&
        data !== null &&
        "array" in data &&
        "target" in data
      ) {
        const n = data.array.length;
        setMaxSteps(50);
      }
    }
  }, [algoName, data]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isPlaying && currentStep < maxSteps) {
      timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 1000 / speed);
    } else if (currentStep >= maxSteps) {
      setIsPlaying(false);
    }

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, maxSteps, speed]);

  const handlePlay = () => setIsPlaying(!isPlaying);
  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };
  const handleStepForward = () => {
    if (currentStep < maxSteps) setCurrentStep((prev) => prev + 1);
  };
  const handleStepBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handlePreview = () => {
    const el = playerRef.current;
    if (!el) return;

    if (!document.fullscreenElement) {
      el.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  useEffect(() => {
    const onFullscreenChange = () =>
      setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, []);

  const AnimationComponent = InputComponents[algoName];

  return (
    <div
      ref={playerRef}
      className={`bg-card p-6 rounded-lg shadow-lg flex flex-col gap-4 transition-all ${
        isFullscreen ? "w-full h-screen rounded-none !p-4" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Animation</h2>
        <Button variant="outline" size="sm" onClick={handlePreview}>
          <Expand className="h-4 w-4 mr-2 " />
          {isFullscreen ? "Exit Preview" : "Preview"}
        </Button>
      </div>

      {/* Animation Display */}
      <div className="relative bg-gray-50 overflow-scroll grow rounded-md">
        {AnimationComponent && <AnimationComponent currentStep={currentStep} />}
      </div>

      {/* Controls */}
      <div className="p-4 border-t bg-white rounded-md">
        {/* Progress Bar */}
        <div className="my-6">
          <Slider
            value={[currentStep]}
            min={0}
            max={maxSteps}
            step={1}
            onValueChange={([val]) => {
              setCurrentStep(val);
              setIsPlaying(false);
            }}
            className="w-full"
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleStepBack}
              disabled={currentStep === 0}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handlePlay}>
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleStepForward}
              disabled={currentStep >= maxSteps}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleReset}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-sm text-gray-500">
            Step {currentStep}/{maxSteps}
          </div>
        </div>

        {/* Speed Control */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Speed:</span>
          <Slider
            value={[speed]}
            min={0.5}
            max={3}
            step={0.5}
            onValueChange={([val]) => setSpeed(val)}
            className="w-32"
          />
          <span className="text-sm text-gray-500">{speed}x</span>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmAnimationPlayer;
