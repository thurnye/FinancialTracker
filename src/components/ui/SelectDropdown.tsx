import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

export interface Option<T = string> {
  label: string;
  value: T;
  icon?: ReactNode;      // optional — e.g., <Home />, <User />, etc.
  color?: string;        // optional — e.g., "#10b981"
}

interface SelectDropdownProps<T = string> {
  label?: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  error?: string;
  renderOption?: (option: Option<T>) => ReactNode; // custom renderer (optional)
  placeholder?: string;
}

export default function SelectDropdown<T>({
  label,
  options,
  value,
  onChange,
  error,
  renderOption,
  placeholder = 'Select...',
}: SelectDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected = options.find((opt) => opt.value === value);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: Option<T>) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className='relative' ref={dropdownRef}>
      {label && <label className='block text-xs font-medium text-slate-700 mb-1'>{label}</label>}

      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3 py-1.5 border rounded-lg text-xs focus:outline-none focus:ring-2 flex items-center justify-between ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-emerald-500'
        }`}
      >
        <div className='flex items-center gap-2'>
          {selected ? (
            renderOption ? (
              renderOption(selected)
            ) : (
              <>
                {selected.color && (
                  <div
                    className='w-4 h-4 rounded border border-slate-300'
                    style={{ backgroundColor: selected.color }}
                  />
                )}
                {selected.icon && <span className='text-slate-600'>{selected.icon}</span>}
                <span>{selected.label}</span>
              </>
            )
          ) : (
            <span className='text-slate-400'>{placeholder}</span>
          )}
        </div>
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className='absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto'>
          {options.map((option) => (
            <button
              key={String(option.value)}
              type='button'
              onClick={() => handleSelect(option)}
              className={`w-full px-3 py-2 text-xs flex items-center gap-2 hover:bg-slate-50 transition-colors ${
                value === option.value ? 'bg-emerald-50' : ''
              }`}
            >
              {renderOption ? (
                renderOption(option)
              ) : (
                <>
                  {option.color && (
                    <div
                      className='w-4 h-4 rounded border border-slate-300 flex-shrink-0'
                      style={{ backgroundColor: option.color }}
                    />
                  )}
                  {option.icon && <span className='text-slate-600'>{option.icon}</span>}
                  <span>{option.label}</span>
                </>
              )}
            </button>
          ))}
        </div>
      )}

      {error && <p className='text-xs text-red-600 mt-1'>{error}</p>}
    </div>
  );
}
