"use client";

import { useEffect, useState } from "react";
import { useDataStore } from "@/store/useDataStore";
import { Edge } from "@/types/algorithm-context";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

// Helper function to get neighbors of a node
const getNeighbors = (node: number, graph: Record<number, Edge[]>) => {
  return graph[node] || [];
};

// Helper function to find the minimum edge that connects to the MST
const findMinEdge = (
  graph: Record<number, Edge[]>,
  visited: Set<number>,
  minHeap: Edge[]
): Edge | null => {
  let minEdge: Edge | null = null;
  minHeap.forEach((edge) => {
    if (
      (visited.has(edge.from) && !visited.has(edge.to)) ||
      (!visited.has(edge.from) && visited.has(edge.to))
    ) {
      if (!minEdge || edge.weight < minEdge.weight) {
        minEdge = edge;
      }
    }
  });
  return minEdge;
};

const PrimsAlgorithmVisualization = () => {
  const data = useDataStore((state) => state.data); // Get graph data from store
  const [steps, setSteps] = useState<Set<Edge>[]>([]); // Store steps for animation (MST edges)
  const [currentStep, setCurrentStep] = useState(0); // Current step in the algorithm
  const [graph, setGraph] = useState<Record<number, Edge[]>>({}); // Store the graph
  const [error, setError] = useState<string>("");

  // Ensure data is an array of Edge objects and not a number
  const isValidData =
    Array.isArray(data) &&
    data.every((item) => {
      return (
        (item as Edge).from !== undefined &&
        (item as Edge).to !== undefined &&
        (item as Edge).weight !== undefined
      );
    });

  useEffect(() => {
    if (!isValidData) {
      setError("Invalid data for Prim's algorithm.");
      return;
    }
    setError("");
    if (data.length > 0) {
      initializeGraph(data as Edge[]);
      runPrimsAlgorithm(data as Edge[]);
    }
  }, [data]);

  const initializeGraph = (edges: Edge[]) => {
    const graphStructure: Record<number, Edge[]> = {};

    // Build graph
    edges.forEach((edge) => {
      if (!graphStructure[edge.from]) graphStructure[edge.from] = [];
      if (!graphStructure[edge.to]) graphStructure[edge.to] = [];
      graphStructure[edge.from].push(edge);
      graphStructure[edge.to].push(edge);
    });

    setGraph(graphStructure);
  };

  const runPrimsAlgorithm = (edges: Edge[]) => {
    const visited = new Set<number>();
    const mst: Set<Edge> = new Set(); // Minimum spanning tree (MST)
    const minHeap = [...edges]; // Initialize edges in a simple list (you can improve this with a priority queue)
    const startNode = edges[0]?.from; // Start from the first node

    if (startNode === undefined) return;

    visited.add(startNode);

    const processStep = () => {
      const minEdge = findMinEdge(graph, visited, minHeap);
      if (minEdge) {
        mst.add(minEdge);
        visited.add(minEdge.from);
        visited.add(minEdge.to);
        setSteps((prevSteps) => [...prevSteps, new Set(mst)]);

        // Expand neighbors for future consideration
        getNeighbors(minEdge.from, graph).forEach((neighborEdge) => {
          if (!visited.has(neighborEdge.to)) {
            minHeap.push(neighborEdge);
          }
        });
        getNeighbors(minEdge.to, graph).forEach((neighborEdge) => {
          if (!visited.has(neighborEdge.from)) {
            minHeap.push(neighborEdge);
          }
        });
      }
    };

    // Simulate the algorithm step by step
    const interval = setInterval(() => {
      processStep();
      if (
        steps.length > 0 &&
        steps[steps.length - 1].size === visited.size - 1
      ) {
        clearInterval(interval);
      }
    }, 1000);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold mb-4">
        Prim's Algorithm Visualization
      </h2>
      {error && <p>{error}</p>}

      {/* Graph visualization */}
      <div className="graph-container">
        {Object.keys(graph).map((node) => {
          return (
            <div
              key={node}
              className="node"
              style={{
                left: `${Math.random() * 400}px`,
                top: `${Math.random() * 400}px`,
              }}
            >
              <motion.div
                key={node}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="node-circle"
              >
                {node}
              </motion.div>

              {/* Animate edges */}
              {steps.length > 0 &&
                Array.from(steps[currentStep]).map((edge, index) => (
                  <motion.line
                    key={index}
                    x1={Math.random() * 400} // Placeholder for actual node x position
                    y1={Math.random() * 400} // Placeholder for actual node y position
                    x2={Math.random() * 400} // Placeholder for actual node x position
                    y2={Math.random() * 400} // Placeholder for actual node y position
                    stroke="#3498db"
                    strokeWidth="2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  />
                ))}
            </div>
          );
        })}
      </div>

      {/* Step Controls */}
      <div>
        <Button onClick={prevStep} disabled={currentStep === 0}>
          Previous Step
        </Button>
        <Button onClick={nextStep} disabled={currentStep === steps.length - 1}>
          Next Step
        </Button>
      </div>
    </Card>
  );
};

export default PrimsAlgorithmVisualization;
