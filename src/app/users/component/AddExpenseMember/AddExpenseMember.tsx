import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface AddExpenseMemberProp {
    register: UseFormRegister<FieldValues>;
    errors?: FieldErrors;
    id: string;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
}

const AddExpenseMember: React.FC<AddExpenseMemberProp> = ({
    errors,
    id,
    type,
    register,
    disabled,
    placeholder,
}) => {
    return (
        <div>
            <input
                {...register(id, { required: true })}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                className={`block w-full h-8 text-gray-400 text-2xl font-extrabold rounded-md pt-2 mt-2 text-center bg-white sm:text-sm placeholder:font-semibold outline-none focus:outline-none ${errors ? "ring-red-500" : "ring-transparent"
                    }`}
                style={{ border: "none" }}
            />
        </div>
    );
};

export default AddExpenseMember;
