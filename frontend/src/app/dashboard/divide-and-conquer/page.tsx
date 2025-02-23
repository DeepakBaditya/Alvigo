import React from 'react';
import Link from 'next/link';

const DivideAndConquer = () => {
  return (
    <div>
      <h1>Divide and Conquer Approach</h1>
      <ul>
        <li><Link href="/dashboard/divide-and-conquer/algo1">Algorithm 1</Link></li>
        {/* Add more algorithms as needed */}
      </ul>
    </div>
  );
};

export default DivideAndConquer;
