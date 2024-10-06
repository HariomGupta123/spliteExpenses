import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

interface InputProps {
    register: UseFormRegister<FieldValues>
    type?: string,
    id: string,
    label?: string,
    required?: boolean,
    errors: FieldErrors;
    disabled?: boolean;
    placeholder?:string


}
const Input: React.FC<InputProps> = ({ register, type, id, label, required, errors, disabled,placeholder }) => {
    return (
        <div>
            <label className="block text-sm font-medium leading-6 text-gray-900 "> {label}</label>
            <div className="mt-2">
                <input
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
                                 text-gray-900 
                                 shadow-lg 
                                 ring-1
                                  ring-inset
                                    ring-gray-900
                                   placeholder::text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-900 
                                  sm:text-sm
                                   sm:leading-6 `, errors[id] && "focus:ring-rose-500", disabled && 'opacity-50 cursor-default')}
                />
            </div>

        </div>
    )
}

export default Input
