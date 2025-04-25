import React from 'react';

interface SelectOption<T extends string> {
  value: T;
  label: string;
}

interface SelectProps<T extends string> {
  label: string;
  value: T;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  className?: string;
}

const Select = <T extends string>({
  label,
  options,
  value,
  onChange,
  className = '',
}: SelectProps<T>) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select
        className={`w-full px-3 py-2 border border-[var(--card-border)] rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-[var(--bg)] ${className}`}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
