import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

interface InputProps {
    register: UseFormRegister<FieldValues> 
    type?: string,
    id: string 
    label?: string | undefined | null,
    required?: boolean,
    errors: FieldErrors;
    disabled?: boolean;
    autocomplete?:boolean
    placeholder?: string
    rupees?: string
    style?: string
    defaultValue?: number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Correct onChange type


}
const Input: React.FC<InputProps> = ({ register, type, rupees, style, id, label, required,onChange, errors, disabled, placeholder,defaultValue,autocomplete }) => {
  return (
    <div>
      <label className="block  font-medium leading-6 text-gray-900 "> {label}</label>
      <div className="mt-0
                            rounded-md
                          text-gray-900 
                            shadow-lg
                            border-2
                            flex  
                            focus:ring-2 
                            focus:ring-inset
                          border-gray-950  ">
        {rupees ? (
          <>
            <span className=" w-full text-center font-normal text-sm px-2 ">{rupees}</span>
            <input
              type={type}
              required={required}
              {...register(id, { required })}
              id={id}
              onChange={onChange}
              defaultValue={defaultValue} // Ensure defaultValue is passed
              disabled={disabled}
              autoComplete=""
              placeholder={placeholder}
              className={clsx(`form-input rounded-l-none rounded-md border-l-2 border-zinc-950 text-gray-900 focus:ring-2 focus:outline-none transition duration-300 ease-in-out sm:text-sm sm:leading-6`, errors[id] && "focus:ring-rose-500", disabled && 'opacity-50 cursor-not-allowed', style ? style : "w-full")} />
          </>
        ) : (
          <input
            type={type}
            required={required}
            {...register(id, { required })}
            id={id}
            onChange={onChange}
            defaultValue={defaultValue} // Ensure defaultValue is passed
            disabled={disabled}
            autoComplete={id}
            placeholder={placeholder}
            className={clsx(`form-input block w-full border-0 py-1.5 font-semibold text-gray-900 shadow-lg ring-1 ring-inset ring-gray-900 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`, errors[id] && "focus:ring-rose-500", disabled && 'opacity-50 cursor-default')} />
        )}
      </div>
    </div>
  )
}

export default Input
