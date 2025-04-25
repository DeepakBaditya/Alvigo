"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDataStore } from "@/store/useDataStore";

const ArrayInput = () => {
  const [input, setInput] = useState("3, 5, 1, 9, 2, 8, 7, 6"); // To hold input field value
  const setData = useDataStore((state) => state.setData);

  const handleStoreArray = () => {
    // Convert comma-separated values to an array of numbers
    const numberArray = input
      .split(",")
      .map((num) => parseFloat(num.trim()))
      .filter((num) => !isNaN(num)); // Remove invalid numbers

    setData(numberArray); // Store in Zustand
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Input Array</h2>
      <div className="flex gap-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter numbers separated by commas"
          className="flex-1 text-black"
        />
        <Button onClick={handleStoreArray}>Update</Button>
      </div>
      <p className="text-sm text-muted-foreground mt-2">
        Example: 64,34,25,12,22,11,90
      </p>
    </div>
  );
};

export default ArrayInput;
