import React from 'react';

type InputType = 'text' | 'password' | 'email' | 'number'; // 필요한 input 타입 추가

interface InputProps<T extends string> {
  label?: string;
  type?: InputType;
  placeholder?: string;
  value: T;
  onChange: (value: T) => void;
  className: string;
}

const Input = <T extends string>({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  className = '',
}: InputProps<T>) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      className={className}
    />
  );
};

export default Input;
