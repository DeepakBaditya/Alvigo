"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

interface CardProps {
  title: string;
  algoCount: number;
  route: string;
}

export const Card: React.FC<CardProps> = ({ title, algoCount, route }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(route);
  };

  return (
    <div
      className='w-[300px] h-[300px] bg-black rounded-2xl p-5 flex flex-col justify-around cursor-pointer'
      onClick={handleClick}
    >
      <div className='text-4xl font-bold text-white'>{title}</div>
      <div className='text-white'>Algo: {algoCount}</div>
    </div>
  );
};
