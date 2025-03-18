import React from "react";
import { twMerge } from "tailwind-merge";

interface NavbarProps {
  search?: boolean; // Optional boolean prop
}

export const Navbar: React.FC<NavbarProps> = ({ search = true }) => {
  return (
    <div className="w-full h-20 px-10 flex items-center justify-between">
      <div className="text-white font-semibold text-4xl">Alvigo</div>
      {/* Conditional rendering for search bar */}
      <div
        className={twMerge(
          search ? "block" : "hidden",
          "w-[50%] h-10 bg-white rounded-2xl"
        )}
      ></div>
      <div className="w-10 h-10 bg-white rounded-full"></div>
    </div>
  );
};
