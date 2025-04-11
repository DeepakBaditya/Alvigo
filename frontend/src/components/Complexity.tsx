import React from "react";

interface complexity {
  timeComplexity: string;
  spaceComplexity: string;
}

const Complexity: React.FC<complexity> = ({
  timeComplexity,
  spaceComplexity,
}) => {
  return (
    <div className="bg-card p-6 rounded-lg shadow-lg text-black">
      <h2 className="text-xl font-semibold mb-4">Complexity</h2>
      <div className="flex gap-4">
        <div className="w-1/2">
          <div className="text-sm font-medium text-muted-foreground">
            Time Complexity
          </div>
          <div className="p-3 rounded-xl border">{timeComplexity}</div>
        </div>
        <div className="w-1/2">
          <div className="text-sm font-medium text-muted-foreground">
            Space Complexity
          </div>
          <div className="p-3 rounded-xl border">{spaceComplexity}</div>
        </div>
      </div>
    </div>
  );
};

export default Complexity;
