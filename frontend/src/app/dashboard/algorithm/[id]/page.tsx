"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ComplexityGraph } from "@/components/ComplexityGraph";
import { CodeBlock } from "@/components/CodeBlock";
import { Brain } from "lucide-react";
import { algorithm } from "@/types/algorithm-context";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import StringInput from "@/components/StringInput";
import ArrayInput from "@/components/ArrayInput";
import Complexity from "@/components/Complexity";
import { getFileContent } from "@/lib/getFileContent";

const InputComponents: Record<string, React.FC<{ name: string }>> = {
  array: ({ name }) => <ArrayInput />,
  string: ({ name }) => <StringInput />,
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
  const [inputs, setInputs] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!id || typeof id !== "string") return;
        const algorithmData = await getAlgorithmById(id);
        setInputs(algorithmData?.input || {});
        if (algorithmData) {
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

            for (const [type, count] of Object.entries(inputs ?? {}) as [
              string,
              number
            ][]) {
              if (!InputComponents[type]) {
                console.error(`Missing input component for type: ${type}`);
                continue; // Skip if component is missing
              }

              for (let index = 0; index < count; index++) {
                const name = `${type}_${index}`;
                const Component = InputComponents[type]; // Get the correct component

                elements.push(
                  <div key={name}>
                    <Component name={name} />
                  </div>
                );
              }
            }

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
          {codeContent && <CodeBlock code={codeContent} input={"1,2,3,4"} />}
        </div>
      </div>
    </main>
  );
};

export default AlgorithmPage;
