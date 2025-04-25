"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDataStore } from "@/store/useDataStore";
import { mapInput } from "@/types/algorithm-context";

const StringInput = () => {
  const setData = useDataStore((state) => state.setData);
  const [string1, setString1] = useState("AGGTAB");
  const [string2, setString2] = useState("GXTXAYB");

  const handleStoreString = () => {
    const dataInput: mapInput = {
      string1,
      string2,
    };
    setData(dataInput);
  };
  return (
    <>
      <div className="bg-card p-6 rounded-lg shadow-lg my-5">
        <h2 className="text-xl font-semibold mb-4">String 1</h2>
        <div className="flex gap-4">
          <Input
            value={string1}
            onChange={(e) => setString1(e.target.value)}
            placeholder="Enter String"
            className="flex-1 text-black p-6"
          />
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg shadow-lg my-5">
        <h2 className="text-xl font-semibold mb-4">String 2</h2>
        <div className="flex gap-4">
          <Input
            value={string2}
            onChange={(e) => setString2(e.target.value)}
            placeholder="Enter String"
            className="flex-1 text-black p-6"
          />
        </div>
      </div>
      <div className="w-full flex justify-end">
        <Button onClick={handleStoreString}>Update</Button>
      </div>
    </>
  );
};

export default StringInput;
