import React from 'react'
import { Card } from '@/components/Card';
const dashboard = () => {
  return (
    <>
    <div className='px-8 py-5'>Home &gt;</div>
    <div className='grid grid-cols-4 gap-10 p-8'>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />

    </div>
    </>
  )
}

export default dashboard;
