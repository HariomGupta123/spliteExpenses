import Model from '@/app/componets/Model/Model'
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
interface ChooseSpliteOptionProps {
    register: UseFormRegister<FieldValues>
    onClose: () => void
    isSpliteOption: Boolean,
    style?: string,
    errors: FieldErrors;
    userName: (string | null)[]
}
const ChooseSpliteOption: React.FC<ChooseSpliteOptionProps> = ({ onClose, isSpliteOption, style, errors, userName }) => {
    return (
        <Model heading='Choose Splite Option ' isOpen={isSpliteOption} onClose={onClose} style={style} >
            <div className='mt-8'>
                <div className=' gap-3'>
                    <div className=' border-red-400 border-2 rounded-2xl  px-16 bg-slate-200 w-full text-sm mt-2 cursor-pointer hover:bg-slate-300 active:bg-slate-300'>Splite the Expenses</div>
                    <div className=' border-red-400 border-2 rounded-2xl  px-16 bg-slate-200 w-full text-sm mt-2 cursor-pointer hover:bg-slate-300 active:bg-slate-300'>Splite the Expenses</div>
                    <div className=' border-red-400 border-2 rounded-2xl  px-16 bg-slate-200 w-full text-sm mt-2 cursor-pointer hover:bg-slate-300 active:bg-slate-300'>Splite the Expenses</div>



                </div>
                <div className='  mt-2 w-full border-b-[1px] border-lime-700' />
                <div className="border-red-400 border-2 rounded-sm mt-2 flex ">
                    <div className='border-red-400 border-r-2 w-10 text-center'> =</div>
                    <div className='border-red-400 border-r-2 w-10 text-center'> 1.23</div>
                    <div className='border-red-400 border-r-2 w-10 text-center'> %</div>
                    <div className='border-red-400 border-r-2 w-10 text-center'> +/-</div>
                    <div className='border-red-400 border-r-2 w-10 text-center'> =</div>
                    <div className='border-red-400 border-r-2 w-10 text-center'> =</div>
                    <div className='border-red-400  w-10 text-center '> =</div>

                </div>

                <div className='mt-2'>
                    <span className='font-semibold text-lg'>Split by exact amounts</span>

                </div>
            </div>

        </Model>
    )
}

export default ChooseSpliteOption
