"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Brain,
  Clock,
  Database,
  ChevronRight,
  LayoutDashboard,
} from "lucide-react";
import { categoryAlgorithm, CategoryWithId } from "@/types/algorithm-context";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useDataStore } from "@/store/useDataStore";

async function getAllCategories(): Promise<CategoryWithId[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "category"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as CategoryWithId[];
  } catch (error) {
    console.error("Error getting documents:", error);
    return [];
  }
}

const DashboardPage = () => {
  const [categories, setCategories] = useState<CategoryWithId[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [algorithms, setAlgorithms] = useState<categoryAlgorithm[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { setMeta } = useDataStore();

  const router = useRouter();

  const setAllAlgothim = (categoriesArray: CategoryWithId[]) => {
    setSelectedCategory("All Algorithms");
    const allAlgorithms = categoriesArray.flatMap(
      (category) => category.algorithms
    );
    setAlgorithms(allAlgorithms);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getAllCategories();
      setCategories(fetchedCategories);
      setAllAlgothim(fetchedCategories);
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r text-black">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-6">
            <Brain className="w-6 h-6 text-primary" />
            <h1 className="text-lg font-semibold">Algorithm Categories</h1>
          </div>
          <div className="space-y-1">
            <Button
              variant={selectedCategory === null ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setAllAlgothim(categories)}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              All Algorithms
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.name ? "secondary" : "ghost"
                }
                className="w-full justify-start"
                onClick={() => {
                  setSelectedCategory(category.name);
                  setAlgorithms(category.algorithms || []);
                }}
              >
                <ChevronRight className="mr-2 h-4 w-4" />
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <h2 className="text-3xl font-bold">
              {selectedCategory || "All Algorithms"}
            </h2>
            <input
              type="text"
              placeholder="Search algorithms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-input bg-background text-sm rounded-md px-4 py-2 w-full md:w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {algorithms
              .filter(
                (algorithm) =>
                  algorithm.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  algorithm.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
              )
              .map((algorithm) => (
                <Card
                  key={algorithm.name}
                  className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => {
                    setMeta({
                      description: algorithm.description,
                      properties: algorithm.properties,
                    });
                    router.push(`/dashboard/algorithm/${algorithm.id}`);
                  }}
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {algorithm.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {algorithm.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{algorithm.properties.timeComplexity}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Database className="w-4 h-4" />
                      <span>{algorithm.properties.spaceComplexity}</span>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
