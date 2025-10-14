import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface StringArrayInputProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  maxWords?: number;
  error?: string;
}

export default function StringArrayInput({
  label,
  values,
  onChange,
  placeholder = 'Enter text...',
  maxWords = 50,
  error,
}: StringArrayInputProps) {
  const [currentInput, setCurrentInput] = useState('');
  const [inputError, setInputError] = useState('');

  const countWords = (text: string): number => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const handleAdd = () => {
    const trimmedInput = currentInput.trim();

    if (!trimmedInput) {
      setInputError('Please enter some text');
      return;
    }

    const wordCount = countWords(trimmedInput);
    if (wordCount > maxWords) {
      setInputError(`Maximum ${maxWords} words allowed. Current: ${wordCount} words`);
      return;
    }

    onChange([...values, trimmedInput]);
    setCurrentInput('');
    setInputError('');
  };

  const handleRemove = (index: number) => {
    const newValues = values.filter((_, i) => i !== index);
    onChange(newValues);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      handleAdd();
    }
  };

  const currentWordCount = countWords(currentInput);

  return (
    <div>
      <label className='block text-sm font-medium text-slate-700 mb-2'>
        {label}
      </label>

      {/* Current Items List */}
      {values.length > 0 && (
        <div className='mb-3 space-y-2'>
          {values.map((value, index) => (
            <div
              key={index}
              className='flex items-start gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg'
            >
              <span className='flex-1 text-sm text-slate-700'>{value}</span>
              <button
                type='button'
                onClick={() => handleRemove(index)}
                className='text-red-500 hover:text-red-700 transition-colors flex-shrink-0'
                title='Remove'
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className='space-y-2'>
        <div className='relative'>
          <textarea
            value={currentInput}
            onChange={(e) => {
              setCurrentInput(e.target.value);
              setInputError('');
            }}
            onKeyPress={handleKeyPress}
            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
              inputError || error
                ? 'border-red-500 focus:ring-red-500'
                : 'border-slate-300 focus:ring-emerald-500'
            }`}
            placeholder={`${placeholder} (Max ${maxWords} words)`}
            rows={2}
          />
          <div className='absolute bottom-2 right-2 text-xs text-slate-400'>
            {currentWordCount}/{maxWords} words
          </div>
        </div>

        <div className='flex justify-between items-center'>
          <p className='text-xs text-slate-500'>
            Press Ctrl+Enter or click Add to add item
          </p>
          <button
            type='button'
            onClick={handleAdd}
            className='px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium flex items-center gap-1'
          >
            <Plus size={14} />
            Add
          </button>
        </div>

        {inputError && (
          <p className='text-xs text-red-600'>{inputError}</p>
        )}
        {error && (
          <p className='text-xs text-red-600'>{error}</p>
        )}
      </div>
    </div>
  );
}
