import clsx from 'clsx';
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
interface CheckboxProps {
  register: UseFormRegister<FieldValues>
  type?: string,
  id: string,
  label?: string,
  required?: boolean,
  errors: FieldErrors;
  disabled?: boolean;
  placeholder?: string
  onChange:()=>void


}
const Checkbox:React.FC<CheckboxProps> = ({register,type,id,label,required,onChange,errors,disabled,placeholder}) => {
  return (
    <div className='flex gap-2'>
      <input type={type}
        required={required}
        {...register(id, { required })}
        id={id}
        onChange={onChange}
        autoComplete={id}
        disabled={disabled}
        placeholder={placeholder} 
        className={clsx(`
          form-input 
          rounded-md                         
          border-0                            
          py-1.5        
          text-gray-900 
          shadow-lg                                  
         
        ring-gray-900 `)} />
      <label className="block text-sm font-medium leading-6 text-gray-900 "> {label}</label>

    </div>
  )
}

export default Checkbox
