import React, { useState } from 'react'
import UserAvatar from '../Avatar'
import Input from '@/app/componets/Input/Input'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import Checkbox from '@/app/componets/Input/CheckBox'
import clsx from 'clsx'
interface ChooseSpliteOptionComProps {
    userName: (string | null)[]
    activeOptionButton: number
    register: UseFormRegister<FieldValues>
    errors: FieldErrors;

}
const ChooseSpliteOptionCom: React.FC<ChooseSpliteOptionComProps> = ({ userName, activeOptionButton, register, errors }) => {
    const [isChecked, setIsChecked] = useState(false)

    return (
        <>
            {/* Split by exact amounts */}
            {activeOptionButton === 1 && <div>
                <span className='font-semibold text-lg'>Split by exact amounts</span>
                <div>
                    {userName && userName.length > 0 ? (
                        userName.map((user, index) => {
                            return (
                                <div key={index} className=' flex  cursor-pointer w-full p-1 px-10 rounded-sm gap-4 hover:bg-slate-100 '>
                                    <Checkbox register={register} errors={errors} id={`string${index}`} type="checkbox" onChange={()=>setIsChecked(true)} />
                                    <div className={clsx('flex gap-5 justify-center items-center', isChecked && "opacity-50 cursor-not- allowed" )}>
                                        <UserAvatar usersName={user} /><div className='font-bold text-sm'>{"Rs.75"}</div>
                                         </div>

                                </div>
                            );
                        })
                    ) : (
                        <div>No users available</div>
                    )}
                </div>
            </div>}

            {/* //Split by exact amounts */}
            {activeOptionButton === 2 && <div>
                <span className='font-semibold text-lg'>Split by exact amounts</span>
                <div>
                    {userName && userName.length > 0 ? (
                        userName.map((user, index) => {
                            return (
                                <div key={index} className=' flex  cursor-pointer justify-center items-center w-full p-1 px-10 rounded-sm gap-4 hover:bg-slate-200 '>
                                    <UserAvatar usersName={user} />
                                    <Input register={register} errors={errors} id={`string${index}`} type="number" style='w-12' rupees='Rs' />

                                </div>
                            );
                        })
                    ) : (
                        <div>No users available</div>
                    )}
                </div>
                <div className='flex justify-between w-full'> 
                    <div>Total</div>
                    <div>Rs.500 <br/><span className='font-medium text-sm text-green-300'>Rs.400 left</span></div>
                </div>
            </div>}

            {/* Split by percentages */}
            {activeOptionButton === 3 && <div>
                <span className='font-semibold text-lg'>Split by percentages</span>
                <div>
                    {userName && userName.length > 0 ? (
                        userName.map((user, index) => {
                            return (
                                <div key={index} className=' flex  cursor-pointer justify-center items-center w-full p-1 px-10 rounded-sm gap-4 hover:bg-slate-200 '>
                                    <UserAvatar usersName={user} />
                                    <Input register={register} errors={errors} id={`string${index}`} type="number" style='w-12' rupees='%' />

                                </div>
                            );
                        })
                    ) : (
                        <div>No users available</div>
                    )}
                </div>
                <div className='flex justify-between w-full'>
                    <div>Total</div>
                    <div>0.00% <br /><span className='font-medium text-sm text-green-300'>50% left</span></div>
                </div>
            </div>}
            {/* Split by shares */}
            {activeOptionButton === 4 && <div>
                <span className='font-semibold text-lg'>Split by shares</span>
                <div>
                    {userName && userName.length > 0 ? (
                        userName.map((user, index) => {
                            return (
                                <div key={index} className=' flex  cursor-pointer w-full justify-center items-center p-1 px-10 rounded-sm gap-4 hover:bg-slate-200'>
                                    <UserAvatar usersName={user} amount={`${45}`} />    
                                    <Input register={register} errors={errors} id={`string${index}`} type="number" style='w-12' rupees='share(s)' />
                                  

                                </div>
                            );
                        })
                    ) : (
                        <div>No users available</div>
                    )}
                </div>
                
            </div>}
            {/* Split by adjustment */}
            {activeOptionButton === 5 && <div>
                <span className='font-semibold text-lg'>Split by adjustment</span>
                <div>
                    {userName && userName.length > 0 ? (
                        userName.map((user, index) => {
                            return (
                                <div key={index} className=' flex  cursor-pointer w-full justify-center items-center p-1 px-10 rounded-sm gap-4 hover:bg-slate-200'>
                                    <UserAvatar usersName={user} amount={`${45}`} />

                                    <Input register={register} errors={errors} id={`string${index}`} type="number" style='w-12' rupees='+Rs' />
                                

                                </div>
                            );
                        })
                    ) : (
                        <div>No users available</div>
                    )}
                </div>
                
            </div>}

        </>
    )
}

export default ChooseSpliteOptionCom
