"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { useDataStore } from "@/store/useDataStore";

interface Coordinates {
  x: number;
  y: number;
}

interface ArrayNode {
  array: number[];
  depth: number;
  position: "left" | "right" | "main";
  parentCoords: Coordinates | null;
  coords: Coordinates;
  id: string;
  min?: number;
  max?: number;
  mid?: number;
  leftArray?: number[];
  rightArray?: number[];
  isActive: boolean;
  isProcessed: boolean;
}

interface MinMaxAnimationProps {
  currentStep: number;
}

const NODE_WIDTH = 120;
const NODE_HEIGHT = 120;

export default function MinMaxAnimation({ currentStep }: MinMaxAnimationProps) {
  const [nodes, setNodes] = useState<ArrayNode[]>([]);
  const [steps, setSteps] = useState<ArrayNode[][]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        setContainerWidth(width);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const array = useDataStore((state) => state.data) as number[];

  useEffect(() => {
    if (array.length === 0 || containerWidth === 0) return;

    const rootX = containerWidth / 2;
    const rootY = 60;

    const allSteps: ArrayNode[][] = [];

    const initialNode: ArrayNode = {
      array,
      depth: 0,
      position: "main",
      parentCoords: null,
      coords: { x: rootX, y: rootY },
      id: "root",
      isActive: true,
      isProcessed: false,
    };

    allSteps.push([initialNode]);

    const generateSteps = (currentNodes: ArrayNode[]) => {
      const newNodes = [...currentNodes];
      const activeNodeIndex = newNodes.findIndex(
        (node) => node.isActive && !node.isProcessed
      );

      if (activeNodeIndex !== -1) {
        const node = newNodes[activeNodeIndex];

        if (node.array.length === 1) {
          node.min = node.array[0];
          node.max = node.array[0];
          node.isProcessed = true;
        } else if (node.array.length === 2) {
          const [a, b] = node.array;
          node.min = Math.min(a, b);
          node.max = Math.max(a, b);
          node.isProcessed = true;
        } else {
          const mid = Math.floor(node.array.length / 2);
          node.mid = mid;
          node.leftArray = node.array.slice(0, mid);
          node.rightArray = node.array.slice(mid);

          const offsetX = 200 / (node.depth + 1);
          const offsetY = 200;

          const leftNode: ArrayNode = {
            array: node.leftArray,
            depth: node.depth + 1,
            position: "left",
            parentCoords: node.coords,
            coords: {
              x: node.coords.x - offsetX,
              y: node.coords.y + offsetY,
            },
            id: `${node.id}-left`,
            isActive: true,
            isProcessed: false,
          };

          const rightNode: ArrayNode = {
            array: node.rightArray,
            depth: node.depth + 1,
            position: "right",
            parentCoords: node.coords,
            coords: {
              x: node.coords.x + offsetX,
              y: node.coords.y + offsetY,
            },
            id: `${node.id}-right`,
            isActive: true,
            isProcessed: false,
          };

          node.isProcessed = true;

          newNodes.push(leftNode, rightNode);
        }

        allSteps.push([...newNodes]);
        generateSteps(newNodes);
      }
    };


    generateSteps(allSteps[0]);
    setSteps(allSteps);
  }, [array, containerWidth]); // << important: re-run when width updates

  useEffect(() => {
    if (steps.length === 0) return;
  
    const lastStep = steps[steps.length - 1];
    const maxDepth = Math.max(...lastStep.map((node) => node.depth));
    const deepest = lastStep.filter((n) => n.depth === maxDepth);
  
    if (deepest.length <= 1) return;
  
    const mergedSteps: ArrayNode[][] = [];
  
    const recursivelyMerge = (nodes: ArrayNode[], depth: number): void => {
      if (nodes.length <= 1) return;
  
      const mergedLevel: ArrayNode[] = [];
  
      for (let i = 0; i < nodes.length; i += 2) {
        const left = nodes[i];
        const right = nodes[i + 1];
  
        if (!right) continue;
  
        const mergedArray = [...left.array, ...right.array];
        const min = Math.min(...mergedArray);
        const max = Math.max(...mergedArray);
        const midX = (left.coords.x + right.coords.x) / 2;
        const newY = Math.max(left.coords.y, right.coords.y) + 160;
  
        const merged: ArrayNode = {
          array: mergedArray,
          depth,
          id: `${left.id}_${right.id}_merged`,
          coords: { x: midX, y: newY },
          parentCoords: null,
          position: "main",
          isActive: true,
          isProcessed: true,
          leftArray: left.array,
          rightArray: right.array,
          min,
          max,
        };
  
        // // Clone left and right with parentCoords to draw lines
        // const leftClone: ArrayNode = {
        //   ...left,
        //   id: `${left.id}_clone_${merged.id}`,
        //   parentCoords: merged.coords,
        // };
        // const rightClone: ArrayNode = {
        //   ...right,
        //   id: `${right.id}_clone_${merged.id}`,
        //   parentCoords: merged.coords,
        // };
  
        mergedLevel.push(merged);
      }
  
      if (mergedLevel.length) {
        mergedSteps.push(mergedLevel);
        recursivelyMerge(
          mergedLevel.filter((n) => !n.id.includes("clone")),
          depth + 1
        );
      }
    };
  
    recursivelyMerge(deepest, maxDepth + 1);
  
    // Add only new steps without duplicating old ones
    mergedSteps.forEach((step) => {
      setSteps((prev) => {
        const last = prev[prev.length - 1] ?? [];
        const lastIds = new Set(last.map((n) => n.id));
        const newNodes = step.filter((n) => !lastIds.has(n.id));
        return newNodes.length ? [...prev, [...last, ...newNodes]] : prev;
      });
    });
  }, [steps]);
  
  
  
  
  
  
  useEffect(() => {
    if (steps.length === 0 || currentStep >= steps.length) return;
  
    const seen = new Map<string, ArrayNode>();
  
    for (let i = 0; i <= currentStep && i < steps.length; i++) {
      const step = steps[i];
      if (!Array.isArray(step)) continue; // <- Fix for undefined/non-array
      for (const node of step) {
        if (!seen.has(node.id)) {
          seen.set(node.id, node);
        }
      }
    }
  
    setNodes(Array.from(seen.values()));
  }, [currentStep, steps]);
  
  
  

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden">
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: node.coords.x,
            y: node.coords.y,
          }}
          transition={{ duration: 0.5 }}
          className={`absolute p-3 rounded-lg shadow-md transform -translate-x-1/2 -translate-y-1/2 ${
            node.isActive ? "bg-white border-2 border-blue-500" : "bg-gray-100"
          }`}
          style={{ width: `${NODE_WIDTH}px`, height: `${NODE_HEIGHT}px` }}
        >
          <div className="text-center font-mono text-sm">
            <div className="text-xs text-gray-500 mb-1">
              {node.position.toUpperCase()}
            </div>
            <div className="flex justify-center space-x-1 mb-2">
              {node.array.map((num, idx) => (
                <span
                  key={idx}
                  className="inline-block w-6 h-6 text-xs bg-gray-100 rounded flex items-center justify-center border"
                >
                  {num}
                </span>
              ))}
            </div>
            {node.min !== undefined && node.max !== undefined && (
              <div className="text-xs font-semibold mt-1">
                <span className="text-blue-600">Min: {node.min}</span> |{" "}
                <span className="text-red-600">Max: {node.max}</span>
              </div>
            )}
          </div>
        </motion.div>
      ))}

      <svg className="absolute flex justify-center top-0 left-0 w-full h-full pointer-events-none">
        {nodes.map((node) =>
          node.parentCoords ? (
            <motion.line
              key={`line-${node.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              x1={node.parentCoords.x + NODE_WIDTH / 2}
              y1={node.id.includes("_merged")?node.parentCoords.y: node.parentCoords.y + NODE_HEIGHT}
              x2={node.coords.x + NODE_WIDTH / 2}
              y2={node.id.includes("_merged")?node.coords.y + NODE_HEIGHT:node.coords.y}
              stroke={node.position === "left" ? "#3b82f6" : "#10b981"}
              strokeWidth="2"
            />
          ) : null
        )}
      </svg>
    </div>
  );
}
