import React from 'react';
import Link from 'next/link';

const GreedyApproach = () => {
  return (
    <div>
      <h1>Greedy Approach</h1>
      <ul>
        <li><Link href="/dashboard/greedy-approach/algo1">Algorithm 1</Link></li>
        {/* Add more algorithms as needed */}
      </ul>
    </div>
  );
};

export default GreedyApproach;
