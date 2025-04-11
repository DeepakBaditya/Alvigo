"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useDataStore } from "@/store/useDataStore";
import { Edge } from "@/types/algorithm-context";

interface GraphInputProps {
  maxNodes?: number;
  maxEdges?: number;
  onGraphChange: (nodes: number, edges: Edge[]) => void;
}

const GraphInput = ({
  maxNodes = 10,
  maxEdges = 45,
  onGraphChange,
}: GraphInputProps) => {
  const setData = useDataStore((state) => state.setData);
  const [nodes, setNodes] = useState<number>(5);
  const [edges, setEdges] = useState<Edge[]>([
    { from: 0, to: 1, weight: 2 },
    { from: 0, to: 3, weight: 6 },
    { from: 1, to: 2, weight: 3 },
    { from: 1, to: 3, weight: 8 },
    { from: 1, to: 4, weight: 5 },
    { from: 2, to: 4, weight: 7 },
    { from: 3, to: 4, weight: 9 },
  ]);
  const [error, setError] = useState<string>("");
  const [newEdge, setNewEdge] = useState<Edge>({ from: 0, to: 0, weight: 0 });

  // Sync edges with the store whenever edges change
  useEffect(() => {
    setData(edges);
  }, [edges, setData]);

  const validateEdge = (edge: Edge): string | null => {
    if (edge.from >= nodes || edge.to >= nodes) {
      return `Node values must be between 0 and ${nodes - 1}`;
    }
    if (edge.from === edge.to) {
      return "Self-loops are not allowed";
    }
    if (edge.weight <= 0) {
      return "Weight must be positive";
    }
    if (
      edges.some(
        (e) =>
          (e.from === edge.from && e.to === edge.to) ||
          (e.from === edge.to && e.to === edge.from)
      )
    ) {
      return "Edge already exists";
    }
    return null;
  };

  const addEdge = () => {
    const validationError = validateEdge(newEdge);
    if (validationError) {
      setError(validationError);
      return;
    }
    if (edges.length >= maxEdges) {
      setError(`Maximum ${maxEdges} edges allowed`);
      return;
    }

    setEdges((prevEdges) => [...prevEdges, newEdge]);
    setNewEdge({ from: 0, to: 0, weight: 0 });
    setError("");
  };

  const removeEdge = (index: number) => {
    const newEdges = edges.filter((_, i) => i !== index);
    setEdges(newEdges);
    setData(edges);
    onGraphChange(nodes, newEdges);
  };

  const handleNodesChange = (value: number) => {
    const newNodes = Math.min(Math.max(1, value), maxNodes);
    setNodes(newNodes);
    // Remove edges that are no longer valid
    const validEdges = edges.filter(
      (edge) => edge.from < newNodes && edge.to < newNodes
    );
    setEdges(validEdges);
    onGraphChange(newNodes, validEdges);
  };

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Graph Input</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Enter the number of nodes and edges for Prim's algorithm. Nodes are
          numbered from 0 to n-1.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="nodes">Number of Nodes (Max: {maxNodes})</Label>
          <Input
            id="nodes"
            type="number"
            min={1}
            max={maxNodes}
            value={nodes}
            onChange={(e) => handleNodesChange(parseInt(e.target.value) || 1)}
            className="mt-1"
          />
        </div>

        <div className="border rounded-md p-4">
          <Label>Add New Edge</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <div>
              <Label htmlFor="from">From Node</Label>
              <Input
                id="from"
                type="number"
                min={0}
                max={nodes - 1}
                value={newEdge.from}
                onChange={(e) =>
                  setNewEdge({
                    ...newEdge,
                    from: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="to">To Node</Label>
              <Input
                id="to"
                type="number"
                min={0}
                max={nodes - 1}
                value={newEdge.to}
                onChange={(e) =>
                  setNewEdge({ ...newEdge, to: parseInt(e.target.value) || 0 })
                }
              />
            </div>
            <div>
              <Label htmlFor="weight">Weight</Label>
              <Input
                id="weight"
                type="number"
                min={1}
                value={newEdge.weight}
                onChange={(e) =>
                  setNewEdge({
                    ...newEdge,
                    weight: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
          </div>
          <Button onClick={addEdge} className="mt-2">
            Add Edge
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <span className="ml-2">{error}</span>
          </Alert>
        )}

        <div>
          <Label>Current Edges</Label>
          <div className="mt-2 space-y-2">
            {edges.map((edge, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-muted p-2 rounded-md"
              >
                <span className="font-mono">
                  {edge.from} → {edge.to} (weight: {edge.weight})
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEdge(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GraphInput;
