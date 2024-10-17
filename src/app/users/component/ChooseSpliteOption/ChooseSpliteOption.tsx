import Model from '@/app/componets/Model/Model'
import React, { useState } from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import ChooseSpliteOptionCom from './ChooseSpliteOptionCom';

interface ChooseSpliteOptionProps {
    register: UseFormRegister<FieldValues>;
    onClose: () => void;
    isSpliteOption: Boolean;
    style?: string;
    errors: FieldErrors;
    userName: (string | null)[];
}

const ChooseSpliteOption: React.FC<ChooseSpliteOptionProps> = ({ onClose, isSpliteOption, style, errors, userName, register }) => {
    const [activeOptionButton, setActiveOptionButton] = useState(1);

    const handleClick = (buttonIndex: any) => {
        setActiveOptionButton(buttonIndex);
    };

    return (
        <Model heading='Choose Splite Option ' isOpen={isSpliteOption} onClose={onClose} style={style}>
            <div className='mt-8'>
                {/* Option Buttons */}
                <div className=' gap-3'>
                    <div className={`border-red-400 border-2 rounded-2xl px-16 bg-slate-200 w-full text-sm mt-2 cursor-pointer hover:bg-slate-300 active:bg-slate-300 ${activeOptionButton === 1 ? 'bg-slate-400' : ''}`} onClick={() => handleClick(1)}>
                        Splite the Expenses (Option 1)
                    </div>
                    <div className={`border-red-400 border-2 rounded-2xl px-16 bg-slate-200 w-full text-sm mt-2 cursor-pointer hover:bg-slate-300 active:bg-slate-300 ${activeOptionButton === 2 ? 'bg-slate-400' : ''}`} onClick={() => handleClick(2)}>
                        you owe md Rs. 500
                    </div>
                    <div className={`border-red-400 border-2 rounded-2xl px-16 bg-slate-200 w-full text-sm mt-2 cursor-pointer hover:bg-slate-300 active:bg-slate-300 ${activeOptionButton === 3 ? 'bg-slate-400' : ''}`} onClick={() => handleClick(3)}>
                       Md owes you Rs. 500
                    </div>
                </div>

                <div className='mt-2 w-full border-b-[1px] border-lime-700' />

                {/* Option Switcher */}
                <div className="border-red-400 border-2 rounded-sm mt-2 flex ">
                    <div className={`border-red-400 border-r-2 w-full text-center font-semibold text-lg bg-slate-100 hover:bg-slate-300 cursor-pointer ${activeOptionButton === 1 ? 'bg-slate-400' : ''}`} onClick={() => handleClick(1)}>
                        =
                    </div>
                    <div className={`border-red-400 border-r-2 w-full text-center font-semibold text-lg bg-slate-100 hover:bg-slate-300 cursor-pointer ${activeOptionButton === 2 ? 'bg-slate-400' : ''}`} onClick={() => handleClick(2)}>
                        1.23
                    </div>
                    <div className={`border-red-400 border-r-2 w-full text-center font-semibold text-lg bg-slate-100 hover:bg-slate-300 cursor-pointer ${activeOptionButton === 3 ? 'bg-slate-400' : ''}`} onClick={() => handleClick(3)}>
                        %
                    </div>
                    <div className={`border-red-400 border-r-2 w-full text-center font-semibold text-lg bg-slate-100 hover:bg-slate-300 cursor-pointer ${activeOptionButton === 4 ? 'bg-slate-400' : ''}`} onClick={() => handleClick(4)}>
                      share
                    </div>
                    <div className={`w-full text-center font-semibold text-lg bg-slate-100 hover:bg-slate-200 cursor-pointer ${activeOptionButton === 5 ? 'bg-slate-400' : ''}`} onClick={() => handleClick(5)}>
                        +/-
                    </div>
                </div>

                {/* Choose Splite Option Component */}
                <div className='mt-2'>
                    <ChooseSpliteOptionCom userName={userName} activeOptionButton={activeOptionButton} register={register} errors={errors} />
                </div>
            </div>
        </Model>
    );
};

export default ChooseSpliteOption;
