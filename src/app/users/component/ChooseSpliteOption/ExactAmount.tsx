import React, { useEffect, useMemo, useRef, useState } from 'react';
import UserAvatar from '../Avatar';
import Input from '@/app/componets/Input/Input';
// import { SimplifiedUser } from '../AddExpense';
import { FieldErrors, FieldValues, useForm, UseFormRegister, useWatch, Control } from 'react-hook-form';
import { SimplifiedUser, User } from '@/app/type/type';


interface ExactAmountProps {
    userName: SimplifiedUser[];
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    ChooseSpliteOptionFunction?: (user: { userId: string; userName: string; PaidAmount: number, paidOwn?: string } | any) => void;
    onePayer: any;
    multiplePayerPeople?: any;
    selectedMembers: number;
    equalSplitAmount: number | string;
    currentUser: User;
    handleRetriveSpliteType: any;
}

const ExactAmount: React.FC<ExactAmountProps> = ({
    currentUser,
    handleRetriveSpliteType,
    equalSplitAmount,
    selectedMembers,
    onePayer,
    multiplePayerPeople,
    userName,
    register,
    errors
}) => {
    const { setValue, control } = useForm();

    // Use useWatch to track the value of 'axactAmount'
    const watchedAxactAmount = useWatch({ control, name: 'axactAmount' });

    // Store the values in state for stable reference
    const [axactAmount, setAxactAmount] = useState(watchedAxactAmount || []);

    useEffect(() => {
        setAxactAmount(watchedAxactAmount || []);
    }, [watchedAxactAmount]);

    const amount = typeof equalSplitAmount === 'string' ? parseFloat(equalSplitAmount) : equalSplitAmount;
    const expensesAmount = selectedMembers * amount;

    // Memoizing updatedUsers to avoid unnecessary recalculations
    const updatedUsers = useMemo(() => {
        return userName.map((user, index) => {
            const userPercentage = axactAmount[index]?.kharchOnUser || '';
            return {
                userId: user.id,
                userName: user.name,
                spliteType: 'axactAmount',
                kharchOnUserInAmount: userPercentage,
            };
        });
    }, [userName, axactAmount]);

    const prevUpdatedUsersRef = useRef<any>(null);

    const payerDetail = updatedUsers.filter((user) => {
        const payer = onePayer[0];
        const some = payer === 'you' ? currentUser?.name : payer;
        return user.userName === some;
    });

    const current = payerDetail[0] ? payerDetail[0] : onePayer[0];

    

    useEffect(() => {
        const exactAmountSendToDatabase = [{
            description: "something for exactAmount",
            expensesAmount: expensesAmount,
            onePayer: onePayer[0] === 'you' ? currentUser?.name : onePayer[0],
            onePayerId: current?.userId,
            spliteType: "exactAmount",
            involvePeopleOnKharch: updatedUsers,
            getBackAmount: current?.kharchOnUserInAmount ? (expensesAmount - current.kharchOnUserInAmount) : expensesAmount
        }]
        const isUpdatedUsersDifferent = JSON.stringify(prevUpdatedUsersRef.current) !== JSON.stringify(updatedUsers);
        if (isUpdatedUsersDifferent) {
            handleRetriveSpliteType(exactAmountSendToDatabase);
            prevUpdatedUsersRef.current = updatedUsers;
        }
    }, [updatedUsers, handleRetriveSpliteType,current,currentUser,expensesAmount,onePayer]);

    const totalAmountAddedKharch = useMemo(() => {
        return axactAmount.reduce(
            (accumulator: number, currentValue: { kharchOnUser: string }) => accumulator + parseFloat(currentValue.kharchOnUser || "0"),
            0
        );
    }, [axactAmount]);

    const handleInputChange = (value: number | string, index: number) => {
        setValue(`axactAmount.${index}.kharchOnUser`, value || "");
    };

    return (
        <div>
            <span className='font-semibold text-lg'>Split by exact amounts</span>
            <div>
                {userName && userName.length > 0 ? (
                    userName.map((user, index) => {
                        const currentPaid = axactAmount[index]?.kharchOnUser || 0;
                        return (
                            <div key={index} className='flex cursor-pointer justify-center items-center p-1 px-10 rounded-sm gap-2 hover:bg-slate-200 w-[400px]'>
                                <UserAvatar usersName={user.name} />
                                <Input
                                    id={`axactAmount.${index}.kharchOnUser`}
                                    register={register}
                                    type="number"
                                    errors={errors}
                                    rupees="Rs"
                                    style="w-12"
                                  
                                    onChange={(event: any) => handleInputChange(event.target.value, index)}
                                />
                            </div>
                        );
                    })
                ) : (
                    <div>No users available</div>
                )}
            </div>
            <div className='flex justify-between w-full'>
                <div className='text-lg font-medium'>Total</div>
                <div className='grid grid-rows-2 grid-flow-col justify-start items-start'>
                    <div>{totalAmountAddedKharch || 0}</div>
                    <div className='font-medium text-sm text-green-400'>
                        Rs.{totalAmountAddedKharch ? ((amount * selectedMembers) - totalAmountAddedKharch) : 0.00} left
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExactAmount;
