import Model from '@/app/componets/Model/Model'
import React, { useState } from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import ChooseSpliteOptionCom from './ChooseSpliteOptionCom';
// import { SimplifiedUser } from '../AddExpense';
import { ExpenseDetail, User } from '@/app/type/type';

interface ChooseSpliteOptionProps {
    register: UseFormRegister<FieldValues>;
    selectedMembers:number | string |any
    equalSplitAmount: number | string // Ensure it's a number
    onClose: () => void;
    onePayer:any
    multiplePayerPeople?:any
    isSpliteOption: boolean;
    style?: string;
    currentUser:User
    setIsEqual: (boolean: boolean) => void
    whoOwns:(owns:string | number)=>void
    errors: FieldErrors;
    userName: any
    ChooseSpliteOptionFunction: (user: { userId: string; userName: string; PaidAmount: number, paidOwn?: string } | any) => void;
    handleRetriveSpliteType:(ExpenseDetial:ExpenseDetail)=>void
}
const shareType = ["=", "1.23","%", "share", "+/-"]

const ChooseSpliteOption: React.FC<ChooseSpliteOptionProps> = ({ onClose,handleRetriveSpliteType,ChooseSpliteOptionFunction,currentUser, equalSplitAmount,isSpliteOption, style, errors, whoOwns,userName, register, setIsEqual,selectedMembers,onePayer,multiplePayerPeople }) => {
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
    const amount = typeof equalSplitAmount === 'string' ? parseFloat(equalSplitAmount) : equalSplitAmount;
    const otherOne = (selectedMembers <= 2)? userName.find((user:User) =>user.name !==currentUser.name)?.name :"you"
        // console.log(otherOne)
    const chooseOwn = [ `you owe md Rs.${amount * selectedMembers}`, `${otherOne} owes you Rs. ${amount * selectedMembers}`]
    return (
        <Model heading='Choose Splite Option ' isOpen={isSpliteOption} onClose={onClose} style={style}>
            <div className='mt-8'>
                {/* Option Buttons */}
               {selectedMembers <= 2 ? <div className=' gap-3'>
                    <div  className={`border-red-400
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
                        onClick={() => {
                            whoOwns("Splite the Expenses")
                            handleClick("=")
                        }}>
                        Splite the Expenses 
                    </div>
                    {chooseOwn.map((owns,index)=>{
                        return (<div key={index} className={`border-red-400
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
                       ${ activeOptionButton === "=" ? 'bg-slate-400' : ''}`}
                            onClick={() => {
                                whoOwns(owns)
                                handleClick(1)}}>
                          {owns}
                        </div>)
                    })}  
                    <div className='mt-2 w-full border-b-[1px] border-lime-700' /> 
                </div> : ""}

               

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
                    selectedMembers={selectedMembers}
                    userName={userName}
                    equalSplitAmount={equalSplitAmount}
                    errors={errors}
                    register={register}
                    activeOptionButton={activeOptionButton}
                    ChooseSpliteOptionFunction={ChooseSpliteOptionFunction}
                    onePayer={onePayer}
                    multiplePayerPeople={multiplePayerPeople}
                    handleRetriveSpliteType={handleRetriveSpliteType}
                    currentUser={currentUser}
                    />
                </div>
            </div>
        </Model>
    );
};

export default ChooseSpliteOption;
