// inputfield.tsx
import React, { ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InputFieldProps {
  value: string;
  label?: string;
  name: string;
  placeholder?: string;
  type: string;
  onChange: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ value, label, name, placeholder, type, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="form-group">
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input
        type={type}
        value={value} // Use the value from props
        name={name}
        className="w-full mt-3 input input-bordered"
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputField;
