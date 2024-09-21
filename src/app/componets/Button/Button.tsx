"use client"
import { clsx } from 'clsx'
import React from 'react'
interface ButtonProps {
    type?: 'button' | 'submit' | 'reset' | undefined,
    children?: React.ReactNode 
    onClick?:()=>void,
    disabled?: boolean
    fullWidth?: boolean
    secondary?: boolean
    danger?: boolean

}
const Button: React.FC<ButtonProps> = ({ type, children,onClick,disabled ,fullWidth,secondary,danger}) => {
    return (
        <div>
            <button type={type} onClick={onClick} disabled={disabled} className={clsx(`flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`,
                disabled && 'opacity-50 cursor-default ',
                fullWidth && "w-full",
                secondary ? 'text-gray-900' : 'text-white',
                danger && "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
                !secondary && !danger && "bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600"
            )} >
                {children}

            </button>

        </div>
    )
}

export default Button
