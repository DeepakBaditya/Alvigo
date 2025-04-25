"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDataStore } from "@/store/useDataStore";
import { lineraSearchInput } from "@/types/algorithm-context";

interface LinearSearchInputProps {
  algoName: string;
}

const LinearSearchInput: React.FC<LinearSearchInputProps> = ({ algoName }) => {
  const [arrayInput, setArrayInput] = useState("3, 5, 1, 9, 2, 8, 7, 6");
  const [targetInput, setTargetInput] = useState("5");
  const setData = useDataStore((state) => state.setData);

  const handleStoreData = () => {
    const numberArray = arrayInput
      .split(",")
      .map((num) => parseFloat(num.trim()))
      .filter((num) => !isNaN(num));

    const target = parseFloat(targetInput);

    if (!isNaN(target)) {
      const inputMap: lineraSearchInput = {
        array: numberArray,
        target: target,
      };
      setData(inputMap);
    }
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">{algoName} Input</h2>
      <div className="flex flex-col gap-4">
        <Input
          value={arrayInput}
          onChange={(e) => setArrayInput(e.target.value)}
          placeholder="Enter array (comma separated)"
          className="text-black"
        />
        <Input
          value={targetInput}
          onChange={(e) => setTargetInput(e.target.value)}
          placeholder="Enter target number"
          className="text-black"
        />
        <Button onClick={handleStoreData}>Update</Button>
      </div>
      <p className="text-sm text-muted-foreground mt-2">
        Example Array: {arrayInput} <br />
        Target: {targetInput}
      </p>
    </div>
  );
};

export default LinearSearchInput;
