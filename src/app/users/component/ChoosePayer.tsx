import Model from '@/app/componets/Model/Model'
import React, { useState } from 'react'
import UserAvatar from './Avatar'
import Checkbox from '@/app/componets/Input/CheckBox'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import Input from '@/app/componets/Input/Input'
interface ChoosePayerProps {
    register: UseFormRegister<FieldValues>
    onClose: () => void
    openPayer: Boolean,
    style?: string,
    errors: FieldErrors;
    userName: (string | null)[]

}
const ChoosePayer: React.FC<ChoosePayerProps> = ({ onClose, openPayer, style, userName, register, errors }) => {
    const [isChecked, setIsChecked] = useState(false)
    const [isMultiple, setIsMultiple] = useState(false)

    return (
        <Model isOpen={openPayer} onClose={onClose} heading='Choose payer' style={style}>

            <div className='mt-10 w-full'>
                {userName && userName.length > 0 ? (
                    userName.map((user, index) => {
                        console.log("alluser", user); // Log each user correctly
                        return (

                            <div key={index} className=' hover:bg-slate-200 cursor-pointer w-full p-1 px-10 rounded-sm shadow-md'>
                                <UserAvatar usersName={user} />
                            </div>
                        );
                    })
                ) : (
                    <div>No users available</div>
                )}

                <div className='p-4 bg-slate-100 flex-wrap w-full mt-5'>
                    <span className='font-semibold text-lg text-slate-950  w-full cursor-pointer' onClick={() => setIsMultiple(!isMultiple)}>Multiple people</span>
                    <div className='  mt-2 w-full border-b-[1px] border-lime-700' />

                   { isMultiple &&( <div>
                        <Checkbox label='Each person paid for their own share' id='checkbox' type='checkbox' onChange={() => setIsChecked(!isChecked)} register={register} errors={errors} />

                        {userName && userName.length > 0 ? (
                            userName.map((user, index) => {
                                console.log("alluser", user); // Log each user correctly
                                return (

                                    <div key={index} className=' flex  cursor-pointer w-full p-1 px-10 rounded-sm'>
                                        <Input register={register} label={user} id={`number${index}}`} type='number' errors={errors} disabled={isChecked} rupees='Rs' />
                                    </div>
                                );
                            })
                        ) : (
                            <div>No users available</div>
                        )}
                    </div>)}

                </div>


            </div>
        </Model>
    )
}

export default ChoosePayer
