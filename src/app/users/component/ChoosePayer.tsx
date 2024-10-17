import Model from '@/app/componets/Model/Model'
import React, { useEffect, useState } from 'react'
import UserAvatar from './Avatar'
import Checkbox from '@/app/componets/Input/CheckBox'
import { Controller, DefaultValues, FieldErrors, FieldValues, SubmitHandler, useForm, UseFormRegister, useWatch } from 'react-hook-form'
import Input from '@/app/componets/Input/Input'
import { person, SimplifiedUser } from './AddExpense'
import { User } from '@prisma/client'
// interface User {
//     id: string;
//     name: string;
//     paid: number;
// }



interface ChoosePayerProps {
    register: UseFormRegister<FieldValues>;
    equalSplitAmount: number |string // Ensure it's a number
    isChecked?:boolean
    onClose: () => void;
    openPayer: Boolean;
    setIsChecked?:()=>void
    style?: string;
    errors: FieldErrors;
    userName: SimplifiedUser[] ;
    setOpenPayerUser: (user: { userId: string; userName: string; PaidAmount: number  }) => void;
    currentUser:User
}

const ChoosePayer: React.FC<ChoosePayerProps> = ({ onClose, openPayer, style, userName, register, errors ,equalSplitAmount,setOpenPayerUser,currentUser}) => {
    const [isMultiple, setIsMultiple] = useState(false)
    const [isChecked, setIsChecked] = useState(false)

    const { setValue, control, watch, handleSubmit } = useForm();
    const people = useWatch({ control, name: 'people' }) || []; // Watch the values for the people array
    const amount = typeof equalSplitAmount === 'string' ? parseFloat(equalSplitAmount) : equalSplitAmount;

     const TotalUser:string|number=userName.length
    const handleCheckBox = () => {
        const checked = !isChecked;
        setIsChecked(checked);

        // Create an array to store the selected users
        const updatedUsers:any = [];

        userName.forEach((user, index) => {
            if (checked) {
                // Update the paid value for each user
                setValue(`people.${index}.paid`, equalSplitAmount || 0);

                // Add the user's information to the array for the parent
                updatedUsers.push({
                    userId: user.id,
                    userName: user.name,
                    PaidAmount: equalSplitAmount || 0,
                });
            } else {
                // Set the individual paid value when unchecked
                setValue(`people.${index}.paid`, people[index]?.paid || 0);
            }
        });

        // Update the parent state with all selected users
        if (checked) {
            setOpenPayerUser(updatedUsers); // Send all selected users to the parent
        } else{
                setOpenPayerUser([])
        }
    };



    const handleInputChange = (value: number | string, index: number) => {
        setValue(`people.${index}.paid`, value); // Dynamically update the value using setValue
    };

    return (
        <Model isOpen={openPayer} onClose={onClose} heading='Choose payer' style={style}>

            <div className='mt-10 w-full'>
                {userName && userName.length > 0 ? (
                    userName.map((user, index) => {
                        console.log("alluser", user); // Log each user correctly
                        return (

                            <div key={user.id} className=' hover:bg-slate-200 cursor-pointer w-full p-1 px-10 rounded-sm shadow-md' onClick={() => {
                                if (user.name) {
                                    setOpenPayerUser({userId:user.id,userName:user.name,PaidAmount:amount*TotalUser}); // Safely pass user name to parent
                                }
                            }}>
                                <UserAvatar usersName={user.name} />
                            </div>
                        );
                    })
                ) : (
                    <div>No users available</div>
                )}

                <div className='p-4 bg-slate-100 flex-wrap w-full mt-5'>
                    <span className='font-semibold text-lg text-slate-950  w-full cursor-pointer' onClick={() => setIsMultiple(!isMultiple)}>Multiple people</span>
                    <div className='  mt-2 w-full border-b-[1px] border-lime-700' />

                   { isMultiple &&( 
                   
                    <div>
                        <Checkbox label='Each person paid for their own share' id='checkbox' type='checkbox' onChange={() => handleCheckBox()} register={register} errors={errors} />

                        {userName && userName.length > 0 ? (
                            userName.map((user, index) => {
                                const currentPaid = people[index]?.paid || 0; // Get the value from useWatch

                                console.log(`Current value for ${user.name}:`, currentPaid);
                                return (

                                    <div key={user.id} className=' flex  cursor-pointer w-full p-1 px-10 rounded-sm'>
                                                                             
                                        <Input
                                            id={`people.${index}.paid`}
                                            label={user.name}
                                            register={register}
                                            type="number"
                                            errors={errors}
                                            disabled={isChecked}
                                            rupees="Rs"
                                            style="w-full"
                                            defaultValue={currentPaid}
                                            onChange={(event: any) => handleInputChange(event.target.value, index)}
                                        />
                                        <span className="ml-4 text-slate-800">{currentPaid}</span>
                      
                                    </div>
                                );
                            })
                        ) : (
                            <div>No users available</div>
                        )}
                    </div>
                           )}


                </div>


            </div>
        </Model>
    )
}

export default ChoosePayer
