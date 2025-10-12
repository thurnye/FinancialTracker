import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { categoryColors, ColorOption } from '../utils/colors.data';

interface ColorSelectProps {
  value: string;
  onChange: (color: string) => void;
  error?: string;
}

export default function ColorSelect({ value, onChange, error }: ColorSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedColor = categoryColors.find((c) => c.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (color: ColorOption) => {
    onChange(color.value);
    setIsOpen(false);
  };

  return (
    <div className='relative' ref={dropdownRef}>
      <label className='block text-xs font-medium text-slate-700 mb-1'>Color</label>
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3 py-1.5 border rounded-lg text-xs focus:outline-none focus:ring-2 flex items-center justify-between ${
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-slate-200 focus:ring-emerald-500'
        }`}
      >
        <div className='flex items-center gap-2'>
          <div
            className='w-4 h-4 rounded border border-slate-300'
            style={{ backgroundColor: selectedColor?.value }}
          ></div>
          <span>{selectedColor?.label}</span>
        </div>
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className='absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto'>
          {categoryColors.map((color) => (
            <button
              key={color.value}
              type='button'
              onClick={() => handleSelect(color)}
              className={`w-full px-3 py-2 text-xs flex items-center gap-2 hover:bg-slate-50 transition-colors ${
                value === color.value ? 'bg-emerald-50' : ''
              }`}
            >
              <div
                className='w-4 h-4 rounded border border-slate-300 flex-shrink-0'
                style={{ backgroundColor: color.value }}
              ></div>
              <span>{color.label}</span>
            </button>
          ))}
        </div>
      )}

      {error && <p className='text-xs text-red-600 mt-1'>{error}</p>}
    </div>
  );
}
