import React from 'react'
import UserAvatar from '../Avatar';
import Input from '@/app/componets/Input/Input';
import { SimplifiedUser } from '../AddExpense';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
interface ShareProps {
    userName: SimplifiedUser[]
    register: UseFormRegister<FieldValues>
    errors: FieldErrors;
    ChooseSpliteOptionFunction?: (user: { userId: string; userName: string; PaidAmount: number, paidOwn?: string } | any) => void;

}
const Shares: React.FC<ShareProps> = ({ userName, register, errors }) => {
    return (
        <div>
            <div>
                <span className='font-semibold text-lg'>Split by shares</span>
                <div>
                    {userName && userName.length > 0 ? (
                        userName.map((user, index) => {
                            return (
                                <div key={index} className=' flex  cursor-pointer w-full justify-center items-center p-1 px-10 rounded-sm gap-4 hover:bg-slate-200'>
                                    <UserAvatar usersName={user.name} amount={`${45}`} />
                                    <Input register={register} errors={errors} id={`string${index}`} type="number" style='w-12' rupees='share(s)' />
                                </div>
                            );
                        })
                    ) : (
                        <div>No users available</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Shares
