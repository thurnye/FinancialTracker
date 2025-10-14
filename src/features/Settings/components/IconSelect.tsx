import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { categoryIcons } from '../utils/icons.data';

interface IconSelectProps {
  value: string;
  onChange: (icon: string) => void;
  error?: string;
}

// Fallback icon list
const fallbackIcons = categoryIcons.map((icon) => icon.value);

export default function IconSelect({
  value,
  onChange,
  error,
}: IconSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Get all Lucide icon names (excluding internal React components)
  const allIconNames = useMemo(() => {
    try {
      const iconNames = Object.keys(LucideIcons)
        .filter((key) => {
          // Filter out known non-icon exports
          const excludedKeys = [
            'createLucideIcon',
            'icons',
            'default',
            'Icon',
            'createElement',
            'Fragment',
          ];

          if (excludedKeys.includes(key)) {
            return false;
          }

          // Icon names should start with uppercase
          if (key[0] !== key[0].toUpperCase()) {
            return false;
          }

          // Try to get the component
          const component = LucideIcons[key as keyof typeof LucideIcons];

          // Check if it's a valid React component (should be a function/object)
          return (
            component &&
            (typeof component === 'function' || typeof component === 'object')
          );
        })
        .sort();

      // console.log('Loaded icons:', iconNames.length); // Debug log

      // If no icons were loaded, use fallback
      if (iconNames.length === 0) {
        console.warn('No icons loaded dynamically, using fallback list');
        return fallbackIcons;
      }

      return iconNames;
    } catch (error) {
      console.error('Error loading Lucide icons:', error);
      console.warn('Using fallback icon list');
      return fallbackIcons;
    }
  }, []);

  // Filter icons based on search query
  const filteredIcons = useMemo(() => {
    if (!allIconNames || allIconNames.length === 0) {
      // console.log('No icon names available'); // Debug
      return [];
    }

    if (!searchQuery.trim()) {
      const defaultIcons = allIconNames.slice(0, 50);
      // console.log('Showing default icons:', defaultIcons.length); // Debug
      return defaultIcons;
    }

    const filtered = allIconNames.filter((iconName) =>
      iconName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // console.log('Filtered icons:', filtered.length); // Debug
    return filtered;
  }, [searchQuery, allIconNames]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (iconName: string) => {
    onChange(iconName);
    setIsOpen(false);
    setSearchQuery('');
  };

  const IconComponent = value
    ? (LucideIcons[value as keyof typeof LucideIcons] as React.ElementType)
    : null;

  // Convert camelCase to Title Case for display
  const formatIconName = (iconName: string) => {
    return iconName.replace(/([A-Z])/g, ' $1').trim();
  };

  return (
    <div className='relative' ref={dropdownRef}>
      <label className='block text-xs font-medium text-slate-700 mb-1'>
        Icon
      </label>
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
          {IconComponent ? (
            <>
              <IconComponent size={16} className='text-slate-600' />
              <span>{formatIconName(value)}</span>
            </>
          ) : (
            <span className='text-slate-400'>Select an icon...</span>
          )}
        </div>
        <Search size={14} className='text-slate-400' />
      </button>

      {isOpen && (
        <div className='absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg'>
          {/* Search Input */}
          <div className='p-2 border-b border-slate-200'>
            <div className='relative'>
              <Search
                size={14}
                className='absolute left-2 top-1/2 -translate-y-1/2 text-slate-400'
              />
              <input
                ref={searchInputRef}
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search icons...'
                className='w-full pl-7 pr-7 py-1.5 border border-slate-200 rounded text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500'
              />
              {searchQuery && (
                <button
                  type='button'
                  onClick={() => setSearchQuery('')}
                  className='absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600'
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Icons Grid */}
          <div className='max-h-60 overflow-y-auto p-2'>
            {filteredIcons && filteredIcons.length > 0 ? (
              <div className='grid grid-cols-4 gap-1'>
                {filteredIcons.map((iconName) => {
                  const Icon = LucideIcons[
                    iconName as keyof typeof LucideIcons
                  ] as React.ElementType;
                  if (!Icon) return null;
                  return (
                    <button
                      key={iconName}
                      type='button'
                      onClick={() => handleSelect(iconName)}
                      className={`p-2 rounded hover:bg-slate-50 transition-colors flex items-center justify-center ${
                        value === iconName
                          ? 'bg-emerald-50 ring-1 ring-emerald-500'
                          : ''
                      }`}
                      title={formatIconName(iconName)}
                    >
                      <Icon size={20} className='text-slate-600' />
                    </button>
                  );
                })}
              </div>
            ) : searchQuery ? (
              <div className='text-center py-4 text-xs text-slate-500'>
                No icons found for "{searchQuery}"
              </div>
            ) : (
              <div className='text-center py-4 text-xs text-slate-500'>
                Loading icons...
              </div>
            )}
          </div>

          {/* Footer info */}
          <div className='p-2 border-t border-slate-200 text-[10px] text-slate-500 text-center'>
            {filteredIcons?.length || 0} of {allIconNames?.length || 0} icons
            {!searchQuery &&
              filteredIcons &&
              filteredIcons.length > 0 &&
              ' (showing first 50)'}
          </div>
        </div>
      )}

      {error && <p className='text-xs text-red-600 mt-1'>{error}</p>}
    </div>
  );
}
