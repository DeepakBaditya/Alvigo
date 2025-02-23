import React from 'react';
import Link from 'next/link';

const DynamicProgramming = () => {
  return (
    <div>
      <h1>Dynamic Programming Approach</h1>
      <ul>
        <li><Link href="/dashboard/dynamic-programming/algo1">Algorithm 1</Link></li>
        {/* Add more algorithms as needed */}
      </ul>
    </div>
  );
};

export default DynamicProgramming;
