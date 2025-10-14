import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Goals() {

  return (
    <div className='space-y-4 pb-6'>
     <Outlet/>
    </div>
  );
}
