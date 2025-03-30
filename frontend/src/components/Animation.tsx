"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, RefreshCw } from "lucide-react";

interface AlgorithmAnimationProps {}

const AlgorithmAnimation = ({}: AlgorithmAnimationProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const reset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return (
    <Card className="bg-card p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Algorithm Visualization</h2>
      <div className="space-y-6"></div>

      <div className="text-center text-muted-foreground"></div>

      <div className="space-y-4">
        <Slider
          value={[currentStep]}
          max={3}
          step={1}
          onValueChange={(value) => goToStep(value[0])}
        />

        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="icon" onClick={reset}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToStep(Math.max(0, currentStep + 1))}
            disabled={currentStep === 3}
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AlgorithmAnimation;
