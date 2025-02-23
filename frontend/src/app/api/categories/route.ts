import { ALGORITHMS } from "@/constants/algorithms";
import { Category, Algorithm } from "@/types/algorithm-context";

import { NextResponse } from "next/server";

export async function GET() {
  const data = categorizeAlgorithms(ALGORITHMS);
  return NextResponse.json(data);
}

const categorizeAlgorithms = (algorithms: Algorithm[]): Category[] => {
  const categoryMap = new Map<string, Category>();

  algorithms.forEach(({ _id, title, category }) => {
    if (!categoryMap.has(category)) {
      categoryMap.set(category, {
        name: category,
        numberOfAlgorithms: 0,
        algorithms: [],
      });
    }
    const categoryData = categoryMap.get(category)!;
    categoryData.numberOfAlgorithms += 1;
    if (categoryData.algorithms.length < 10) {
      categoryData.algorithms.push({ _id, title });
    }
  });

  return Array.from(categoryMap.values());
};
