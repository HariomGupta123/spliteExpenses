import React, { useEffect, useMemo, useRef, useState } from 'react';
import UserAvatar from '../Avatar';
import Input from '@/app/componets/Input/Input';
import { SimplifiedUser } from '../AddExpense';
import { FieldErrors, FieldValues, useForm, UseFormRegister, useWatch } from 'react-hook-form';
import { User } from '@prisma/client';

interface ShareProps {
    userName: SimplifiedUser[];
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    ChooseSpliteOptionFunction?: (user: { userId: string; userName: string; PaidAmount: number, paidOwn?: string } | any) => void;
    onePayer: any;
    multiplePayerPeople?: any;
    equalSplitAmount: number | string;
    selectedMembers: number;
    handleRetriveSpliteType: any;
    currentUser: User;
}

const Shares: React.FC<ShareProps> = ({
    onePayer,
    currentUser,
    multiplePayerPeople,
    handleRetriveSpliteType,
    userName,
    selectedMembers,
    equalSplitAmount,
    register,
    errors,
}) => {
    const { setValue, control, watch, handleSubmit } = useForm({
        defaultValues: {
            shareAmount: userName.map(() => ({
                kharchOnUser: 1, // default value for each user
            })),
        },
    });

    // Call useWatch directly in the component body
    const rawWatchedshareAmount = useWatch({ control, name: 'shareAmount' });

    // Memoize the watchedshareAmount
    const watchedshareAmount = useMemo(() => rawWatchedshareAmount, [rawWatchedshareAmount]);

    const [shareAmount, setShareAmount] = useState(watchedshareAmount);

    useEffect(() => {
        setShareAmount(watchedshareAmount || []);
    }, [watchedshareAmount]);

    const SplitedAmount = typeof equalSplitAmount === 'string' ? parseFloat(equalSplitAmount) : equalSplitAmount;
    const totalShareAddedCharch = shareAmount.reduce(
        (accumulator: any, currentValue: any) => accumulator + parseFloat(currentValue.kharchOnUser === "" ? 0 : currentValue.kharchOnUser),
        0
    );
    const expensesAmount = SplitedAmount * selectedMembers;
    const perShareAmount = expensesAmount / totalShareAddedCharch || 0;

    const updatedUserShare = useMemo(() => {
        return userName.map((user, index) => {
            const share = shareAmount[index]?.kharchOnUser || '';
            return {
                userId: user.id,
                userName: user.name,
                spliteType: 'Share',
                kharchOnUserOnShare: share,
                kharchOnUserInAmount: share ? perShareAmount * share : 0,
            };
        });
    }, [userName, shareAmount, perShareAmount]);

    // Use a ref to store the previous value of updatedUsers and only call handleRetriveSpliteType when needed
    const prevUpdatedUsersRef = useRef<any>(null);

    const payerDetial = updatedUserShare.filter((user) => {
        const payer = onePayer;
        const payerName = payer[0];
        const some = payerName === 'you' ? currentUser?.name : payerName;
        const payerPercentage = user.userName === some ? user.userName : '';
        return payerPercentage;
    });

    const current = payerDetial[0] ? payerDetial[0] : onePayer[0];

    const percentagesendtodatabase = useMemo(
        () => [
            {
                decription: "something",
                expensesAmount: expensesAmount,
                onePayer: onePayer[0] === 'you' ? currentUser?.name : onePayer[0],
                onePayerId: current?.userId,
                spliteType: "share",
                involvePeopleOnKharch: updatedUserShare,
                getBackAmount: current?.kharchOnUserInAmount ? expensesAmount - current?.kharchOnUserInAmount : expensesAmount,
            },
        ],
        [expensesAmount, currentUser, current, updatedUserShare, onePayer]
    );

    useEffect(() => {
        // Compare the new and previous `updatedUsers` value
        const isUpdatedUsersDifferent = JSON.stringify(prevUpdatedUsersRef.current) !== JSON.stringify(updatedUserShare);

        // Only call handleRetriveSpliteType if updatedUsers has changed
        if (isUpdatedUsersDifferent) {
            handleRetriveSpliteType(percentagesendtodatabase);
            prevUpdatedUsersRef.current = updatedUserShare; // Update the ref with the latest value
        }
    }, [updatedUserShare, handleRetriveSpliteType,percentagesendtodatabase]);

    const handleInputChange = (value: number, index: number) => {
        setValue(`shareAmount.${index}.kharchOnUser`, value || 0); // Dynamically update the value using setValue
    };

    return (
        <div>
            <div>
                <span className='font-semibold text-lg'>Split by shares</span>
                <div>
                    {userName && userName.length > 0 ? (
                        userName.map((user, index) => {
                            const currentPaid = shareAmount[index]?.kharchOnUser || 0; // Get the value from useWatch
                            return (
                                <div key={index} className='flex cursor-pointer justify-between items-center p-1 px-6 rounded-sm hover:bg-slate-200 w-[400px]'>
                                    <UserAvatar usersName={user.name} amount={(perShareAmount * currentPaid).toFixed(2)} />
                                    <Input
                                        id={`shareAmount.${index}.kharchOnUser`}
                                        register={register}
                                        type="number"
                                        errors={errors}
                                        rupees="share(s)"
                                        style="w-8"
                                        defaultValue={currentPaid}
                                        onChange={(event: any) => handleInputChange(event.target.value, index)}
                                    />
                                </div>
                            );
                        })
                    ) : (
                        <div>No users available</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shares;
