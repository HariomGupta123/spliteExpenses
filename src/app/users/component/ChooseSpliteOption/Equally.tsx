import React, { useMemo, useRef, useState, useEffect } from 'react';
import UserAvatar from '../Avatar';
import Input from '@/app/componets/Input/Input';
import { SimplifiedUser } from '../AddExpense';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import Checkbox from '@/app/componets/Input/CheckBox';
import clsx from 'clsx';
import { User } from '@prisma/client';

interface EquallyProps {
    userName: SimplifiedUser[];
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    setIsChecked: () => void;
    currentUser: User;
    isChecked: boolean;
    handleRetriveSpliteType: (anyThing: any) => void;
    equalSplitAmount: number | string;
    ChooseSpliteOptionFunction?: (
        user: { userId: string; userName: string; PaidAmount: number; paidOwn?: string } | any
    ) => void;
    onePayer: any;
    selectedMembers: number | string | any;
    multiplePayerPeople?: any;
}

const Equally: React.FC<EquallyProps> = ({
    selectedMembers,
    onePayer,
    multiplePayerPeople,
    userName,
    register,
    errors,
    setIsChecked,
    isChecked,
    equalSplitAmount,
    handleRetriveSpliteType,
    currentUser,
}) => {
    const [involvePerson, setInvolvePerson] = useState(true);
    const [selectedUsers, setSelectedUsers] = useState<boolean[]>(Array(userName.length).fill(true));
    const [involvedUsers, setInvolvedUsers] = useState<any[]>([]);
    const [exactAmountSendToDatabase, setExactAmountSendToDatabase] = useState<any>([]);

    const amount = typeof equalSplitAmount === 'string' ? parseFloat(equalSplitAmount) : equalSplitAmount;

    const activeUserCount = selectedUsers.filter(Boolean).length;
    const splitAmount = activeUserCount > 0 ? (amount * selectedMembers) / activeUserCount : 0;

    const updatedUsers = useMemo(() => {
        return userName.map((user) => ({
            userId: user.id,
            userName: user.name,
            spliteType: 'equally',
        }));
    }, [userName]);

    const payerDetail = updatedUsers.filter((user) => {
        const payer = onePayer[0];
        const some = payer === 'you' ? currentUser?.name : payer;
        return user.userName === some;
    });

    const current = payerDetail[0] || onePayer[0];

    useEffect(() => {
        const involvedUsersList = userName
            .map((user, i) => ({ ...user, involved: selectedUsers[i] }))
            .filter((user) => user.involved);

        const involvedUsersListWithspliteAmount = involvedUsersList.map((user) => ({ ...user, kharchOnUserInAmount: splitAmount }));
        const currentUserId = involvedUsersListWithspliteAmount.some((user) => user.id === currentUser.id);

        const newExactAmountSendToDatabase = {
            description: "something for exactAmount",
            expensesAmount: amount * selectedMembers,
            onePayer: onePayer[0] === 'you' ? currentUser?.name : onePayer[0],
            onePayerId: current?.userId,
            spliteType: "equally",
            involvePeopleOnKharch: involvedUsersListWithspliteAmount,
            getBackAmount: currentUserId ? (involvedUsersList.length - 1) * splitAmount : involvedUsersList.length * splitAmount
        };

        // Only update if `newExactAmountSendToDatabase` has actually changed
        if (JSON.stringify(newExactAmountSendToDatabase) !== JSON.stringify(exactAmountSendToDatabase)) {
            setInvolvedUsers(involvedUsersListWithspliteAmount);
            setExactAmountSendToDatabase(newExactAmountSendToDatabase);
            handleRetriveSpliteType(newExactAmountSendToDatabase);
           
        }
    }, [selectedUsers, amount, selectedMembers, splitAmount, userName, currentUser, current, onePayer, handleRetriveSpliteType,exactAmountSendToDatabase]);


    const handleSelect = (index: number) => {
        setInvolvePerson(false);
        setSelectedUsers((prev) => {
            const updated = [...prev];
            updated[index] = !updated[index];
            return updated;
        });
    };

    console.log("Involved Users:", involvedUsers);
    console.log("Exact Amount Data to Send:", exactAmountSendToDatabase);

    return (
        <div>
            <div>
                <span className="font-semibold text-lg">Split Equally</span>
                <div>
                    {userName && userName.length > 0 ? (
                        userName.map((user, index) => (
                            <div
                                key={index}
                                className="flex cursor-pointer w-full p-1 px-10 rounded-sm gap-4 hover:bg-slate-100"
                            >
                                <Checkbox
                                    register={register}
                                    errors={errors}
                                    id={`checkbox-${index}`}
                                    type="checkbox"
                                    onChange={() => handleSelect(index)}
                                    defaultChecked={selectedUsers[index]}
                                />
                                <div
                                    className={clsx(
                                        'flex gap-5 justify-center items-center',
                                        !selectedUsers[index] && 'opacity-50 cursor-not-allowed'
                                    )}
                                >
                                    <UserAvatar usersName={user.name} />
                                    <div className="font-bold text-sm">{selectedUsers[index] ? splitAmount : 0}</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>No users available</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Equally;
