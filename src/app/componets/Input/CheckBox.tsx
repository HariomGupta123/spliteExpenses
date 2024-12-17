import clsx from 'clsx';
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface CheckboxProps {
  register: UseFormRegister<FieldValues>;
  type?: string;
  id: string;
  label?: string;
  required?: boolean;
  errors: FieldErrors;
  disabled?: boolean;
  placeholder?: string;
  onChange: () => void;
  defaultChecked?: boolean; // add this property to support default checked state
}

const Checkbox: React.FC<CheckboxProps> = ({
  register,
  type = 'checkbox', // default type set to checkbox
  id,
  label,
  required,
  onChange,
  errors,
  disabled,
  placeholder,
  defaultChecked // setting defaultChecked to true
}) => {
  return (
    <div className='flex gap-2 items-center'>
      <input
        type={type}
        required={required}
        {...register(id, { required })}
        id={id}
        onChange={onChange}
        autoComplete={id}
        disabled={disabled}
        placeholder={placeholder}
        defaultChecked={defaultChecked} // use the defaultChecked prop
        className={clsx(`
          form-input 
          rounded-md
          border-0
          py-1.5
          text-gray-900
          shadow-lg
          ring-gray-900
        `)}
      />
      {label && (
        <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
      )}
    </div>
  )
}

export default Checkbox;
