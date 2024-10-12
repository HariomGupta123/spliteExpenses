import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

interface InputProps {
    register: UseFormRegister<FieldValues>
    type?: string,
    id: string,
    label?: string |undefined |null,
    required?: boolean,
    errors: FieldErrors;
    disabled?: boolean;
    placeholder?:string
    rupees?:string


}
const Input: React.FC<InputProps> = ({ register, type,rupees, id, label, required, errors, disabled,placeholder }) => {
    return (
        <div>
            <label className="block  font-medium leading-6 text-gray-900 "> {label}</label>
            <div className="mt-0
                            rounded-md
                             text-gray-900 
                              shadow-lg
                            border-2
                            flex  focus:ring-2 focus:ring-inset border-gray-950  ">
                {rupees ? <>
                    <span className=" w-12 text-center font-semibold pt-2 ">{rupees}</span>
                <input
                    type={type}
                    required={required}
                    {...register(id, { required })}
                    id={id}
                    autoComplete={id}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={
                        clsx(`form-input 
                             w-full
                             rounded-l-none
                             rounded-md
                               border-l-2
                               border-zinc-950
                             
                                text-gray-900  
                                text-3xl
                               focus:shadow-blue-500 focus:shadow-md focus:ring-2  focus:outline-none transition duration-300 ease-in-out
                                 placeholder::text-gray-400 
                                  sm:text-sm
                                   sm:leading-6 `, errors[id] && "focus:ring-rose-500", disabled && 'opacity-50 cursor-not-allowed')}
                /></> : (<input
                    type={type}
                    required={required}
                    {...register(id, { required })}
                    id={id}
                    autoComplete={id}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={
                        clsx(`form-input block
                             w-full
                              rounded-md
                               border-0
                                py-1.5
                                font-semibold
                                text-gray-900  shadow-lg
                                 ring-1
                                  ring-inset
                                    ring-gray-900
                                   placeholder::text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-900 
                                  sm:text-sm
                                   sm:leading-6 `, errors[id] && "focus:ring-rose-500", disabled && 'opacity-50 cursor-default')}
                />)}
                
            </div>

        </div>
    )
}

export default Input
