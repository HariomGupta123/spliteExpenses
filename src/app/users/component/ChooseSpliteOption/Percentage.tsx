import React from 'react'
import { SimplifiedUser } from '../AddExpense';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import UserAvatar from '../Avatar';
import Input from '@/app/componets/Input/Input';
interface PercentageProps{
    userName: SimplifiedUser[]
    register: UseFormRegister<FieldValues>
    errors: FieldErrors;
    ChooseSpliteOptionFunction?: (user: { userId: string; userName: string; PaidAmount: number, paidOwn?: string } | any) => void;

}
const Percentage:React.FC<PercentageProps> = ({userName,register,errors}) => {
  return (
    <div>
          <div>
              <span className='font-semibold text-lg'>Split by percentages</span>
              <div>
                  {userName && userName.length > 0 ? (
                      userName.map((user, index) => {
                          return (
                              <div key={index} className=' flex  cursor-pointer justify-center items-center w-full p-1 px-10 rounded-sm gap-4 hover:bg-slate-200 '>
                                  <UserAvatar usersName={user.name} />
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
          </div>
    </div>
  )
}

export default Percentage
