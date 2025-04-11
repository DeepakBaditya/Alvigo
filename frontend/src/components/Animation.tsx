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
import { useDataStore } from "@/store/useDataStore";

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
  };

  useEffect(() => {
    setCurrentStep(0);
    setIsPlaying(false);
    console.log("data:", data);
    if (algoName === "Min And Max") {
      const array = Array.isArray(data) ? data : [];
      if (array.length === 0) {
        setMaxSteps(0);
        return;
      }

      const n = array.length;

      // Calculate steps based on actual animation phases:
      // 1. Division steps: Each split operation (log2(n) levels)
      // 2. Base case steps: All leaves processed in 1 step
      // 3. Merge steps: Each comparison operation (n-1 steps)

      // For visualization purposes, we need:
      // - 1 step per division level (showing all splits at that level)
      // - 1 step for all base cases
      // - 1 step per merge operation

      const divisionSteps = Math.ceil(Math.log2(n));
      const baseSteps = 1;
      const mergeSteps = n - 1;

      // Special case for n=1 (no divisions or merges needed)
      const totalSteps = n === 1 ? 1 : divisionSteps + baseSteps + mergeSteps;

      setMaxSteps(totalSteps);
    } else if (algoName === "Longest Common Subsequence") {
      if (
        typeof data === "object" &&
        data !== null &&
        "string1" in data &&
        "string2" in data
      ) {
        const m = data.string1.length;
        const n = data.string2.length;

        // Fill table steps = m * n
        // Backtracking steps = up to min(m, n) in worst case (conservative estimate)
        const fillSteps = m * n;

        // Backtracking steps (at most m + n)
        const backtrackSteps = m + n;

        setMaxSteps(fillSteps + backtrackSteps - 2);
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
              setIsPlaying(false); // pause on seek
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
