import React from 'react'
import UserAvatar from '../Avatar';
import Input from '@/app/componets/Input/Input';
import { SimplifiedUser } from '../AddExpense';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
interface ExactAmountProps {
    userName: SimplifiedUser[]
    register: UseFormRegister<FieldValues>
    errors: FieldErrors;
    ChooseSpliteOptionFunction?: (user: { userId: string; userName: string; PaidAmount: number, paidOwn?: string } | any) => void;

}
const ExactAmount:React.FC<ExactAmountProps> = ({userName,register,errors}) => {
  return (
    <div>
          <div>
              <span className='font-semibold text-lg'>Split by exact amounts</span>
              <div>
                  {userName && userName.length > 0 ? (
                      userName.map((user, index) => {
                          return (
                              <div key={index} className=' flex  cursor-pointer justify-center items-center w-full p-1 px-10 rounded-sm gap-4 hover:bg-slate-200 '>
                                  <UserAvatar usersName={user.name} />
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
                  <div>Rs.500 <br /><span className='font-medium text-sm text-green-300'>Rs.400 left</span></div>
              </div>
          </div>
      
    </div>
  )
}

export default ExactAmount
