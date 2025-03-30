"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ComplexityGraph } from "@/components/ComplexityGraph";
import { CodeBlock } from "@/components/CodeBlock";
import { Brain, Component } from "lucide-react";
import { algorithm, Edge, mapInput } from "@/types/algorithm-context";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import LongestCommonSubsequenceInput from "@/components/inputs/LongestCommonSubsequenceInput";
import MinMaxInput from "@/components/inputs/MinMaxInput";
import Complexity from "@/components/Complexity";
import { getFileContent } from "@/lib/getFileContent";
import { useDataStore } from "@/store/useDataStore";
import PrimsInput from "@/components/inputs/PrimsInput";
import AlgorithmAnimation from "@/components/Animation";

const InputComponents: Record<string, React.FC<{}>> = {
  "Min And Max": () => <MinMaxInput />,
  "Longest Common Subsequence": () => <LongestCommonSubsequenceInput />,
  Prims: () => <PrimsInput onGraphChange={() => {}} />,
};

const getAlgorithmById = async (id: string): Promise<algorithm | null> => {
  try {
    const docRef = doc(db, "algorithm", id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists()
      ? ({ id: docSnap.id, ...docSnap.data() } as algorithm)
      : null;
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
};

const AlgorithmPage = () => {
  const { id } = useParams();
  const [algorithm, setAlgorithm] = useState<algorithm | null>(null);
  const [codeContent, setCodeContent] = useState<null>(null);
  const [loading, setLoading] = useState(true);
  const data = useDataStore((state) => state.data);
  const setData = useDataStore((state) => state.setData);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!id || typeof id !== "string") return;
        const algorithmData = await getAlgorithmById(id);
        if (algorithmData) {
          if (algorithmData.name == "Min And Max") {
            setData([3, 5, 1, 9, 2, 8, 7, 6]);
          } else if (algorithmData.name == "Longest Common Subsequence") {
            const dataInput: mapInput = {
              string1: "AGGTAB",
              string2: "GXTXAYB",
            };
            setData(dataInput);
          } else if (algorithmData.name == "Prims") {
            const primsInput: Edge[] = [
              { from: 0, to: 1, weight: 2 },
              { from: 0, to: 3, weight: 6 },
              { from: 1, to: 2, weight: 3 },
              { from: 1, to: 3, weight: 8 },
              { from: 1, to: 4, weight: 5 },
              { from: 2, to: 4, weight: 7 },
              { from: 3, to: 4, weight: 9 },
            ];
            setData(primsInput);
          }
          const code = await getFileContent(algorithmData.codePath);
          setCodeContent(code);
          setAlgorithm(algorithmData);
        } else {
          console.error("Algorithm not found");
        }
      } catch (error) {
        console.error("Error fetching algorithm:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="text-center text-blue-500">Loading...</div>;
  }

  if (!algorithm) {
    return <div className="text-center text-red-500">Algorithm not found</div>;
  }
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Brain className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold text-primary">
              Algorithm Complexity Visualizer
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Visualize and understand algorithm time and space complexity
          </p>
        </div>

        {/* Inputs */}
        <div>
          {(() => {
            const elements = [];
            const Component = InputComponents[algorithm.name];
            elements.push(
              <div key={algorithm.name}>
                <Component />
              </div>
            );
            return <>{elements}</>;
          })()}
        </div>

        {/* Complexity Information */}
        <Complexity
          timeComplexity={algorithm.properties.timeComplexity}
          spaceComplexity={algorithm.properties.spaceComplexity}
        />

        {/* Graphs */}
        <div className="grid md:grid-cols-2 gap-8">
          <ComplexityGraph
            title="Time Complexity"
            complexity={algorithm.properties.timeComplexity}
            className="bg-card"
          />
          <ComplexityGraph
            title="Space Complexity"
            complexity={algorithm.properties.spaceComplexity}
            className="bg-card"
          />
        </div>

        {/* Code Block */}
        <div className="grid md:grid-cols-2 gap-8">
          {codeContent && (
            <CodeBlock code={codeContent} input={data} algo={algorithm.name} />
          )}
          <AlgorithmAnimation />
        </div>
      </div>
    </main>
  );
};

export default AlgorithmPage;
