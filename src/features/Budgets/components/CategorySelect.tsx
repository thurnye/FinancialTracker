import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/stores/stores'; 
import { useAppSelector } from '../../../app/hooks/app.hooks';
import { fetchCategories } from '../../Settings/redux/settings.asyncThunkService';
import SelectDropdown from '../../../components/ui/SelectDropdown';
import { Category } from '../../Settings/types/settings.types';
import { IconStyle } from '../../../components';

interface CategorySelectProps {
  value: string;
  onChange: (categoryId: string) => void;
  error?: string;
}

export default function CategorySelect({
  value,
  onChange,
  error,
}: CategorySelectProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading } = useAppSelector((state) => state.settings);

  useEffect(() => {
    // Fetch categories only if not already loaded
    if (!categories || categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  useEffect(() => {
    console.log('CategorySelect received value:', value);
    console.log('Available categories:', categories);
  }, [value, categories]);

  // Map API categories into SelectDropdown format
  const categoryOptions =
    categories?.map((cat: Category) => ({
      label: cat.name,
      value: cat.id,
      color: cat.color,
      icon: cat.icon as keyof typeof import('lucide-react'),
    })) || [];

  return (
    <SelectDropdown
      label='Category'
      options={categoryOptions}
      value={value}
      onChange={onChange}
      error={error}
      placeholder={loading ? 'Loading categories...' : 'Select category'}
      renderOption={(option) => (
        <>
          {option.color && (
            <div
              className='w-8 h-8 rounded-full flex items-center justify-center mb-2'
              style={{ backgroundColor: `${option.color}20` }}
            >
              <IconStyle
                backgroundColor={`${option.color}20`}
                iconName={
                  (option.icon as keyof typeof import('lucide-react')) || 'Tag'
                }
                size={18}
                color={option.color}
              />
            </div>
          )}
          <span>{option.label}</span>
        </>
      )}
    />
  );
}
