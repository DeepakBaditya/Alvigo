"use client";
import { categoryAlgorithm } from "@/types/algorithm-context";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

interface CategoryCardProps {
  name: string;
  algorithms: categoryAlgorithm[];
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, algorithms }) => {
  const router = useRouter();
  const handleONCardClick = (algorithms: categoryAlgorithm[]) => {
    console.log("algorithms = ", algorithms);
    localStorage.setItem("algorithms", JSON.stringify(algorithms));
    router.push(`/dashboard/category/${name}`);
  };
  return (
    <div onClick={() => handleONCardClick(algorithms)}>
      <div className="w-[250px] h-[320px] rounded-lg bg-gray-600">
        <div className="h-[200px] rounded-t-lg relative overflow-hidden">
          <Image
            src={"/algorithm_img.jpeg"}
            alt="algorithm image"
            fill
            className="object-cover rounded-t-lg"
          />
          <div className="w-[100px] p-1 bg-green-400 absolute right-0 rounded-bl-lg text-center">
            Category
          </div>
        </div>
        <div className="font-bold h-fit text-[25px] break-words text-wrap w-full m-2">
          {name}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
