"use client";

import React from "react";
import { motion } from "framer-motion";
import { useDataStore } from "@/store/useDataStore";
import { cn } from "@/lib/utils";

interface PrimsAnimationProps {
  currentStep: number;
}

interface Edge {
  from: number;
  to: number;
  weight: number;
}

export default function PrimsAnimation({ currentStep }: PrimsAnimationProps) {
  const data = useDataStore((state) => state.data);

  if (!Array.isArray(data)) return null;
  const edges = data as Edge[];

  // Get number of vertices from edges
  const vertexSet = new Set<number>();
  edges.forEach((e) => {
    vertexSet.add(e.from);
    vertexSet.add(e.to);
  });
  const vertexCount = vertexSet.size;

  const steps: {
    visited: number[];
    selectedEdges: Edge[];
    currentEdge?: Edge;
    message: string;
  }[] = [];

  const prim = (edges: Edge[], vertexCount: number) => {
    const visited: boolean[] = Array(vertexCount).fill(false);
    const result: Edge[] = [];
    visited[0] = true;

    steps.push({
      visited: [0],
      selectedEdges: [],
      message: `Start from vertex 0`,
    });

    for (let step = 1; step < vertexCount; step++) {
      let minEdge: Edge | null = null;
      for (const edge of edges) {
        if (
          (visited[edge.from] && !visited[edge.to]) ||
          (visited[edge.to] && !visited[edge.from])
        ) {
          if (!minEdge || edge.weight < minEdge.weight) {
            minEdge = edge;
          }
        }
      }
      if (minEdge) {
        result.push(minEdge);
        visited[minEdge.from] = true;
        visited[minEdge.to] = true;
        steps.push({
          visited: visited
            .map((v, idx) => (v ? idx : -1))
            .filter((v) => v !== -1),
          selectedEdges: [...result],
          currentEdge: minEdge,
          message: `Selected edge (${minEdge.from} - ${minEdge.to}) with weight ${minEdge.weight}`,
        });
      }
    }
  };

  prim(edges, vertexCount);

  const step = steps[Math.min(currentStep, steps.length - 1)];

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-6">
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {Array.from({ length: vertexCount }, (_, idx) => (
          <motion.div
            key={idx}
            className={cn(
              "w-12 h-12 flex items-center justify-center rounded-full text-white font-bold",
              step?.visited.includes(idx) ? "bg-green-500" : "bg-gray-300"
            )}
            layout
            transition={{ duration: 0.3 }}
          >
            {idx}
          </motion.div>
        ))}
      </div>
      <div className="flex flex-col items-center">
        {step?.selectedEdges.map((e, idx) => (
          <div key={idx} className="text-sm text-blue-600">
            Edge: {e.from} - {e.to} (Weight: {e.weight})
          </div>
        ))}
      </div>
      <div className="mt-4 text-sm text-gray-700 font-medium text-center">
        {step?.message}
      </div>
    </div>
  );
}
