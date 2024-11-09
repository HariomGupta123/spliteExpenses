import React, { useState } from 'react'
import UserAvatar from '../Avatar'
import Input from '@/app/componets/Input/Input'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import Checkbox from '@/app/componets/Input/CheckBox'
import clsx from 'clsx'
import { SimplifiedUser } from '../AddExpense'
import Adjustment from './Adjustment'
import Shares from './Shares'
import ExactAmount from './ExactAmount'
import Percentage from './Percentage'
import Equally from './Equally'
import { User } from '@prisma/client'
interface ChooseSpliteOptionComProps {
    selectedMembers: number
    userName: SimplifiedUser[]
    activeOptionButton: number | any |null
    register: UseFormRegister<FieldValues>
    errors: FieldErrors;
    equalSplitAmount: number | string 
    ChooseSpliteOptionFunction: (user: { userId: string; userName: string; PaidAmount: number, paidOwn?: string } | any) => void;
    onePayer: any
    multiplePayerPeople: any
    handleRetriveSpliteType:any|[]
    currentUser:User

}
const ChooseSpliteOptionCom: React.FC<ChooseSpliteOptionComProps> = ({ currentUser,onePayer, selectedMembers, multiplePayerPeople, userName, ChooseSpliteOptionFunction, handleRetriveSpliteType, activeOptionButton, register, errors,equalSplitAmount }) => {
    const [isChecked, setIsChecked] = useState(false)

    return (
        <>
            {/* Split by exact amounts */}
            {activeOptionButton === "=" && <Equally onePayer={onePayer} multiplePayerPeople={multiplePayerPeople} equalSplitAmount={equalSplitAmount} userName={userName} setIsChecked={()=>setIsChecked(true)} register={register} errors={errors} isChecked={isChecked}/>}

            {/* //Split by exact amounts */}
            {activeOptionButton === "1.23" && <ExactAmount currentUser={currentUser} handleRetriveSpliteType={handleRetriveSpliteType} equalSplitAmount={equalSplitAmount} selectedMembers={selectedMembers} onePayer={onePayer} multiplePayerPeople={multiplePayerPeople} userName={userName} register={register} errors={errors} />}

            {/* Split by percentages */}
            {activeOptionButton === "%" && <Percentage currentUser={currentUser} equalSplitAmount={equalSplitAmount} handleRetriveSpliteType={handleRetriveSpliteType} selectedMembers={selectedMembers} onePayer={onePayer} multiplePayerPeople={multiplePayerPeople} userName={userName} register={register} errors={errors}/>}
            {/* Split by shares */}
            {activeOptionButton === "share" && <Shares currentUser={currentUser} equalSplitAmount={equalSplitAmount} handleRetriveSpliteType={handleRetriveSpliteType}  selectedMembers={selectedMembers} onePayer={onePayer} multiplePayerPeople={multiplePayerPeople} userName={userName} register={register} errors={errors}/> }
            {/* Split by adjustment */}
            {activeOptionButton === "+/-" && <Adjustment equalSplitAmount={equalSplitAmount} selectedMembers={selectedMembers} onePayer={onePayer} multiplePayerPeople={multiplePayerPeople} userName={userName} register={register} errors={errors}/>}

        </>
    )
}

export default ChooseSpliteOptionCom
