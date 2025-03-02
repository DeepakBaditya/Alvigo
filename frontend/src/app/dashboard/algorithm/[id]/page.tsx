import React from "react";
import InputForm from "@/components/InputForm";
import CodeBlock from "@/components/CodeBlock";
import path from "path";
import { promises as fs } from "fs";
import { Algorithm } from "@/types/algorithm-context";
import AnimationController from "@/components/AnimationController";
import Animation from "@/components/Animation";

type ApiResponse = {
  algorithm: Algorithm;
};

const fetchAlgorithm = async (id: string) => {
  const response = await fetch("http://localhost:3000/api/algorithm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    console.error("Failed to fetch algorithm:", response.statusText);
    return null;
  }

  const data: ApiResponse = await response.json();
  return data.algorithm;
};

async function getFileContent(codePath: string) {
  const filePath = path.join(process.cwd(), "src/algorithmCode", codePath);
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch (error) {
    console.error("Error reading file:", error);
    return "Error: File not found";
  }
}

const AlgorithmPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const algorithm = await fetchAlgorithm(id);

  if (!algorithm || !algorithm.codePath) {
    return <div>Error: Algorithm or code path not found</div>;
  }

  console.log({ algorithm });

  const fileContent = await getFileContent(algorithm.codePath);

  return (
    <div className="flex flex-col">
      <div className="flex w-full h-screen">
        <div className="p-5 w-1/2">
          <InputForm />
        </div>
        <div className="p-10 w-1/2">
          <CodeBlock fileContent={fileContent} fileType="python" />
        </div>
      </div>
      <AnimationController />
      <Animation />
    </div>
  );
};

export default AlgorithmPage;
