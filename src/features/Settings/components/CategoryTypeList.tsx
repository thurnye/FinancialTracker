import React from 'react';
import { Edit2, Trash2, Check } from 'lucide-react';
import { Category } from '../types/settings.types';

interface ICategoryTypeList {
  data: Category[];
  type: string
}

export default function CategoryTypeList({ data, type }: ICategoryTypeList) {
  return (
      <div className='bg-white rounded-lg mb-4 p-4 shadow-sm border border-slate-200'>
        <h3 className='text-base font-bold text-slate-800 mb-3'>
          {type}
        </h3>
        <div className='space-y-2'>
          {data.map((category) => (
            <div
              key={category.id}
              className='flex items-center justify-between p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors'
            >
              <div className='flex items-center gap-2'>
                <div
                  className='w-8 h-8 rounded-full flex items-center justify-center'
                  style={{ backgroundColor: category.color }}
                >
                  <span className='text-white font-bold text-xs'>
                    {category.name.charAt(0)}
                  </span>
                </div>
                <span className='text-xs font-medium text-slate-800'>
                  {category.name}
                </span>
              </div>
              <div className='flex items-center gap-1'>
                <button className='p-1.5 hover:bg-emerald-100 rounded-lg transition-colors'>
                  <Check size={14} className='text-emerald-600' />
                </button>
                <button className='p-1.5 hover:bg-blue-100 rounded-lg transition-colors'>
                  <Edit2 size={14} className='text-blue-600' />
                </button>
                <button className='p-1.5 hover:bg-red-100 rounded-lg transition-colors'>
                  <Trash2 size={14} className='text-red-600' />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}
