import React from "react";

const Algorithm = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  return (
    <>
      <div className="flex w-full bg-green-400 h-[400px]">
        <div className="bg-black p-5 w-1/2"></div>
        <div className="bg-red-400 p-5 w-1/2"></div>
      </div>
    </>
  );
};

export default Algorithm;
