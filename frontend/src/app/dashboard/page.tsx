import React from 'react';
import { Card } from '@/components/Card';

const dashboard = () => {
  return (
    <>
      <div className='px-8 py-5'>Home &gt;</div>
      <div className='grid grid-cols-3 gap-10 p-8'>
        <Card title="Dynamic Programming Approach" algoCount={1} route="/dashboard/dynamic-programming" />
        <Card title="Greedy Approach" algoCount={1} route="/dashboard/greedy-approach" />
        <Card title="Divide and Conquer Approach" algoCount={1} route="/dashboard/divide-and-conquer" />
      </div>
    </>
  );
};

export default dashboard;
