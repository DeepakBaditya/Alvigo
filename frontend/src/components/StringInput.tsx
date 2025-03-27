"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDataStore } from "@/store/useDataStore";

const StringInput = () => {
  const [input, setInput] = useState("");
  const setData = useDataStore((state) => state.setData);

  const handleStoreString = () => {
    setData(input);
  };
  return (
    <div className="bg-card p-6 rounded-lg shadow-lg my-5">
      <h2 className="text-xl font-semibold mb-4">Input Array</h2>
      <div className="flex gap-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter String"
          className="flex-1 text-black p-6"
        />
        <Button onClick={handleStoreString}>Update</Button>
      </div>
    </div>
  );
};

export default StringInput;
