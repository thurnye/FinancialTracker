import React from 'react';

interface IIcon {
  shape: React.ReactElement;
  color?: string;
  backgroundColor?: string;
}

export default function IconStyle({ shape, color, backgroundColor }: IIcon) {
  return (
    <div
      className='w-10 h-10 rounded-full flex items-center justify-center'
      style={{ backgroundColor: `${backgroundColor}20`, color }}
    >
      {shape}
    </div>
  );
}
