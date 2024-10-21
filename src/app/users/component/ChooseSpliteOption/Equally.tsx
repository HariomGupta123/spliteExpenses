import React from 'react'
import UserAvatar from '../Avatar';
import Input from '@/app/componets/Input/Input';
import { SimplifiedUser } from '../AddExpense';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import Checkbox from '@/app/componets/Input/CheckBox';
import clsx from 'clsx';
interface EquallyProps {
    userName: SimplifiedUser[]
    register: UseFormRegister<FieldValues>
    errors: FieldErrors;
    setIsChecked:()=>void
    isChecked:Boolean
    equalSplitAmount: number | string 
    ChooseSpliteOptionFunction?: (user: { userId: string; userName: string; PaidAmount: number, paidOwn?: string } | any) => void;

}
const Equally:React.FC<EquallyProps> = ({userName,register,errors,setIsChecked,isChecked,equalSplitAmount}) => {
  return (
    <div>
          <div>
              <span className='font-semibold text-lg'>Split Equally</span>
              <div>
                  {userName && userName.length > 0 ? (
                      userName.map((user, index) => {
                          return (
                              <div key={index} className=' flex  cursor-pointer w-full p-1 px-10 rounded-sm gap-4 hover:bg-slate-100 '>
                                  <Checkbox register={register} errors={errors} id={`string${index}`} type="checkbox" onChange={setIsChecked} />
                                  <div className={clsx('flex gap-5 justify-center items-center', isChecked && "opacity-50 cursor-not- allowed")}>
                                      <UserAvatar usersName={user.name} /><div className='font-bold text-sm'>{equalSplitAmount}</div>
                                  </div>

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

export default Equally
