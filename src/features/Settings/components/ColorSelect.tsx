import SelectDropdown from '../../../components/ui/SelectDropdown';
import { categoryColors } from '../utils/colors.data';

interface ColorSelectProps {
  value: string;
  onChange: (color: string) => void;
  error?: string;
}


export default function ColorSelect({ value, onChange, error }: ColorSelectProps) {
  return (
    <SelectDropdown
      label="Color"
      options={categoryColors}
      value={value}
      onChange={onChange}
      error={error}
      renderOption={(color) => (
        <>
          <div
            className='w-4 h-4 rounded border border-slate-300'
            style={{ backgroundColor: color.value }}
          />
          <span>{color.label}</span>
        </>
      )}
    />
  );
}
