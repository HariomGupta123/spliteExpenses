import Input from '@/app/componets/Input/Input';
import React from 'react'
import UserAvatar from '../Avatar';
import { SimplifiedUser } from '../AddExpense';
import { FieldErrors, FieldValues, useForm, UseFormRegister, useWatch } from 'react-hook-form';
interface AdjustmentProps{
    userName:SimplifiedUser[]
    register: UseFormRegister<FieldValues>
    errors: FieldErrors;
    ChooseSpliteOptionFunction?: (user: { userId: string; userName: string; PaidAmount: number, paidOwn?: string } | any) => void;
    onePayer: any
    multiplePayerPeople: any
    equalSplitAmount: number | string;
    selectedMembers: number;
}
const Adjustment:React.FC<AdjustmentProps> = ({onePayer,multiplePayerPeople,selectedMembers,equalSplitAmount,userName,register,errors}) => {
    const { setValue, control, watch } = useForm();
    const adjustmentAmount = useWatch({ control, name: 'adjustmentAmount' }) || [];
    const amounts = watch("amount");
    console.log("amount", amounts)
    console.log("peoplePercentage:", adjustmentAmount)
    // Convert `equalSplitAmount` to a number if it's a string
    const amount = typeof equalSplitAmount === 'string' ? parseFloat(equalSplitAmount) : equalSplitAmount;

    // Calculate the total percentage added
    const totalAmountAddedCharch = adjustmentAmount.reduce(
        (accumulator: any, currentValue: any) =>
            accumulator + parseFloat(currentValue?.kharchOnUser || 0),
        0
    );
    // Handle input change dynamically
    const handleInputChange = (value: number | string, index: number) => {
        setValue(`adjustmentAmount.${index}.kharchOnUser`, value || "");
    };
  return (
    <div>
          <div>
              <span className='font-semibold text-lg'>Split by adjustment</span>
              <div>
                  {userName && userName.length > 0 ? (
                      userName.map((user, index) => {
                          const currentPaid = adjustmentAmount[index]?.kharchOnUser || 0; // Get the value from useWatch
                          const perPersonAmountAfter=currentPaid/selectedMembers
                          const tobe = (adjustmentAmount[index]== index) ? (amount + currentPaid) : amount - perPersonAmountAfter
                          return (
                              <div key={index} className='flex cursor-pointer justify-center items-center p-1 px-10 rounded-sm gap-2 hover:bg-slate-200 w-[400px]'>
                                  <UserAvatar usersName={user.name} amount={`${tobe}`} />

                                  <Input 
                                   errors={errors} 
                                      id={`adjustmentAmount.${index}.kharchOnUser`} 
                                    register={register}
                                   type="number" style='w-12' 
                                   rupees='+Rs'
                                   onChange={(event: any) => handleInputChange(event.target.value, index)}

                                  />
                               <div>{currentPaid}</div>

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

export default Adjustment
