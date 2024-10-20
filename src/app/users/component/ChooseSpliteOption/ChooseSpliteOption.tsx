import Model from '@/app/componets/Model/Model'
import React, { useState } from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import ChooseSpliteOptionCom from './ChooseSpliteOptionCom';
import { SimplifiedUser } from '../AddExpense';

interface ChooseSpliteOptionProps {
    register: UseFormRegister<FieldValues>;
    onClose: () => void;
    isSpliteOption: Boolean;
    style?: string;
    setIsEqual: (boolean: boolean) => void
    errors: FieldErrors;
    userName: SimplifiedUser[]
    ChooseSpliteOptionFunction: (user: { userId: string; userName: string; PaidAmount: number, paidOwn?: string } | any) => void;
}
const shareType = ["=", "1.23","%", "share", "+/-"]

const ChooseSpliteOption: React.FC<ChooseSpliteOptionProps> = ({ onClose,ChooseSpliteOptionFunction, isSpliteOption, style, errors, userName, register, setIsEqual }) => {
    const [activeOptionButton, setActiveOptionButton] = useState("=");

    const handleClick = (buttonIndex: any) => {
        if (buttonIndex === "=") {
            setActiveOptionButton(buttonIndex);
            setIsEqual(false)
        } else {
            setActiveOptionButton(buttonIndex);
            setIsEqual(true)

        }

    };

    return (
        <Model heading='Choose Splite Option ' isOpen={isSpliteOption} onClose={onClose} style={style}>
            <div className='mt-8'>
                {/* Option Buttons */}
                <div className=' gap-3'>
                    <div className={`border-red-400
                         border-2 
                         rounded-2xl 
                         px-16 
                       bg-slate-200 
                         w-full 
                         text-sm 
                         mt-2 
                         cursor-pointer
                       hover:bg-slate-300 
                       active:bg-slate-300 
                       ${activeOptionButton === "=" ? 'bg-slate-400' : ''}`}
                        onClick={() => handleClick(1)}>
                        Splite the Expenses
                    </div>
                    <div className={`border-red-400
                         border-2 
                         rounded-2xl 
                         px-16 
                       bg-slate-200 
                         w-full 
                         text-sm 
                         mt-2 
                         cursor-pointer
                       hover:bg-slate-300 
                       active:bg-slate-300 
                       ${activeOptionButton === "" ? 'bg-slate-400' : ''}`}
                        onClick={() => handleClick(1)}>
                        you owe md Rs. 500
                    </div>
                    <div className={`border-red-400
                         border-2 
                         rounded-2xl 
                         px-16 
                       bg-slate-200 
                         w-full 
                         text-sm 
                         mt-2 
                         cursor-pointer
                       hover:bg-slate-300 
                       active:bg-slate-300 
                       ${activeOptionButton === "" ? 'bg-slate-400' : ''}`}
                        onClick={() => handleClick(1)}>
                        Md owes you Rs. 500
                    </div>
                </div>

                <div className='mt-2 w-full border-b-[1px] border-lime-700' />

                {/* Option Switcher */}
                <div className="border-red-400 border-2 rounded-sm mt-2 flex ">
                    {shareType.map((share, index) => (<div key={index} className={`
                        border-red-400 
                         border-r-2 w-full 
                         text-center font-semibold 
                         text-lg bg-slate-100 
                         hover:bg-slate-300 cursor-pointer 
                         ${activeOptionButton === share ? 'bg-slate-400' : ''}`}
                        onClick={() => handleClick(share)}>
                        {share}
                    </div>))}

                </div>
                <div>
                    <ChooseSpliteOptionCom
                    userName={userName}
                    errors={errors}
                    register={register}
                    activeOptionButton={activeOptionButton}
                    ChooseSpliteOptionFunction={ChooseSpliteOptionFunction}
                    
                    />
                </div>
            </div>
        </Model>
    );
};

export default ChooseSpliteOption;
