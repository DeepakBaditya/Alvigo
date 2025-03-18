"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // ✅ Use useParams() instead of props
import CategoryCard from "@/components/CategoryCard";
import { categoryAlgorithm } from "@/types/algorithm-context";
import { Card } from "@/components/Card";

const CategoryPage = () => {
  const params = useParams(); // ✅ Unwrap params correctly
  const categoryName = decodeURIComponent(params.category as string);

  const [algorithms, setAlgorithms] = useState<categoryAlgorithm[]>([]);

  useEffect(() => {
    try {
      const storedAlgorithms = localStorage.getItem("algorithms");
      if (storedAlgorithms) {
        setAlgorithms(JSON.parse(storedAlgorithms));
      }
    } catch (error) {
      console.error("Error parsing algorithms from localStorage:", error);
    }
  }, []);

  return (
    <div className="m-8">
      <h1 className="text-2xl font-bold">{categoryName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {algorithms.length > 0 ? (
          algorithms.map((algo) => (
            <Card
              title={algo.name}
              key={algo.id}
              href={`/dashboard/algorithm/${algo.id}`}
            />
          ))
        ) : (
          <p>No algorithms found.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
