import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SimplifiedUser } from '../AddExpense';
import { FieldErrors, FieldValues, useForm, UseFormRegister, useWatch } from 'react-hook-form';
import UserAvatar from '../Avatar';
import Input from '@/app/componets/Input/Input';
import { User } from '@/app/type/type';

interface PercentageProps {
    userName: SimplifiedUser[];
    register: UseFormRegister<FieldValues>;
    selectedMembers: number;
    errors: FieldErrors;
    equalSplitAmount: number | string;
    ChooseSpliteOptionFunction?: (
        user: { userId: string; userName: string; PaidAmount: number; paidOwn?: string } | any
    ) => void;
    onePayer: any;
    multiplePayerPeople?: any;
    handleRetriveSpliteType: (anyThing: any) => void;
    currentUser: User;
}

const Percentage: React.FC<PercentageProps> = ({
    onePayer,
    multiplePayerPeople,
    selectedMembers,
    userName,
    equalSplitAmount,
    register,
    errors,
    handleRetriveSpliteType,
    currentUser
}) => {
    const { setValue, control, watch, getValues, reset } = useForm();

    const watchedAxactAmount = useWatch({ control, name: 'peoplePercentage' });

    const [peoplePercentage, setAxactAmount] = useState(watchedAxactAmount || []);

    useEffect(() => {
        setAxactAmount(watchedAxactAmount || []);
    }, [watchedAxactAmount]);

    const amount = typeof equalSplitAmount === 'string' ? parseFloat(equalSplitAmount) : equalSplitAmount;
    const expensesAmount = selectedMembers * amount;

    const updatedUsers = useMemo(() => {
        return userName.map((user, index) => {
            const userPercentage = peoplePercentage[index]?.kharchOnUser || '';
            return {
                userId: user.id,
                userName: user.name,
                spliteType: 'percentage',
                kharchOnUserOnPercentage: userPercentage,
                kharchOnUserInAmount: (expensesAmount * userPercentage) / 100
            };
        });
    }, [userName, peoplePercentage, expensesAmount]);

    const prevUpdatedUsersRef = useRef<any>(null);

    useEffect(() => {
        const giver = updatedUsers.filter((user) => {
            const payer = onePayer;
            const payerName = payer[0];
            const some = payerName === 'you' ? currentUser?.name : payerName;
            return user.userName === some;
        });
        const current = giver[0] || onePayer[0];
        const percentagesendtodatabase = [{
            description: "something",
            expensesAmount,
            onePayer: onePayer[0] === 'you' ? currentUser?.name : onePayer[0],
            onePayerId: current?.userId,
            spliteType: "percentage",
            involvePeopleOnKharch: updatedUsers,
            getBackAmount: current?.kharchOnUserInAmount ? (expensesAmount - current.kharchOnUserInAmount) : expensesAmount
        }];
        console.log("percentagesenddata", percentagesendtodatabase);

        if (JSON.stringify(prevUpdatedUsersRef.current) !== JSON.stringify(updatedUsers)) {
            handleRetriveSpliteType(percentagesendtodatabase);
            prevUpdatedUsersRef.current = updatedUsers;
        }
    }, [updatedUsers, handleRetriveSpliteType, currentUser, onePayer, expensesAmount]);

    const totalAmountAddedCharch = peoplePercentage.reduce(
        (acc: any, current: any) => acc + parseFloat(current?.kharchOnUser || 0),
        0
    );

    const handleInputChange = (value: string | number, index: number) => {
        setValue(`peoplePercentage.${index}.kharchOnUser`, value || "");
        setAxactAmount((prev: any) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], kharchOnUser: value };
            return updated;
        });
    };

    useEffect(() => {
        return () => {
            reset(); // Clear all input values
            setAxactAmount([]); // Clear local state as well
        };
    }, [reset]);

    return (
        <div>
            <span className="font-semibold text-lg">Split by percentages</span>
            <div>
                {userName.length > 0 ? (
                    userName.map((user, index) => {
                        const currentPaid = peoplePercentage[index]?.kharchOnUser || 0;
                        return (
                            <div
                                key={index}
                                className="flex cursor-pointer justify-center items-center p-1 px-10 rounded-sm gap-2 hover:bg-slate-200 w-[400px]"
                            >
                                <UserAvatar usersName={user.name} />
                                <Input
                                    id={`peoplePercentage.${index}.kharchOnUser`}
                                    register={register}
                                    type="number"
                                    errors={errors}
                                    rupees="Rs"
                                    style="w-12"
                                    value={currentPaid}
                                    onChange={(event) => handleInputChange(event.target.value, index)}
                                />
                            </div>
                        );
                    })
                ) : (
                    <div>No users available</div>
                )}
            </div>
            <div className="flex justify-between w-full">
                <div>Total</div>
                <div className="grid grid-rows-2 grid-flow-col justify-start items-start">
                    <div>{totalAmountAddedCharch || 0}%</div>
                    <div className="font-medium text-sm text-green-400">
                        {100 - totalAmountAddedCharch || 0.0}% left
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Percentage;
