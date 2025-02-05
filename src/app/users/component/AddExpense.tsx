"use client"
import Button from '@/app/componets/Button/Button';
import Select from '@/app/componets/Input/Select';
import Model from '@/app/componets/Model/Model';
import axios from 'axios';
import Image from 'next/image';
import notes from "../../../../public/cardphoto.jpeg"
import { useRouter } from 'next/navigation';
import React, { use, useEffect, useMemo, useState } from 'react';
import { FieldValues, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ChoosePayer from './ChoosePayer';
import ChooseSpliteOption from './ChooseSpliteOption/ChooseSpliteOption';
import { ExpenseDetail, person, User } from '@/app/type/type';
import AddExpenseMember from './AddExpenseMember/AddExpenseMember';
import SelectedPayer from './AddExpenseMember/SelectedPayer';

// export interface FormData {
//     people: {
//         paid: number;
//     }[];    console.log("members", members)

// }


interface AddExpenseProps {
    isOpen?: boolean; // corrected the type here
    onClose: () => void;
    users: User[] | null | undefined;
    currentUser: User
}

const AddExpense: React.FC<AddExpenseProps> = ({ isOpen, onClose, users, currentUser }) => {
    const { control, register, handleSubmit, setValue, getValues, watch, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            members: [], // This should be an array for multi-select
            amount: 0,
            description: '',
            // people: [{name:"",age:""}],

        }
    });
    const amount = watch('amount')
    console.log("currentID", currentUser?.id)
    const [isMultiple, setIsMultiple] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isOpenPayer, setIsOpenPayer] = useState(false);
    const [isEqual, setIsEqual] = useState(false);
    const [MultiplePayers, setMultiplePayers] = useState<[]>([])
    const [activePayer, setActivePayer] = useState<any>(currentUser.id)
    const [payerUser, setpayerUser] = useState<person[] | []>([
        {
            userId: currentUser.id,
            userName: currentUser.name,
            PaidAmount: amount
        }
    ]);

    console.log("currentPayer", payerUser)
    // retriev Splite Type and involve people in splite type
    const [retriveSpliteType, setRetriveSpliteType] = useState<ExpenseDetail | null>(null);
    const retri = retriveSpliteType
    console.log("retriveSpliteType", retri)

    //all members start
    const [isSpliteOption, setIsSpliteOption] = useState(false)
    const members = watch('members'); // Watching the members field to update UI
    // const router = useRouter();
    const date = new Date()
    const numberOfMembers = members.length;
    const currentUsers = [currentUser]
    const currentUserLenght = currentUsers.length
    // console.log("currentUsersLength:", currentUserLenght)
    const numberOfMembersWithCurrentUser = currentUserLenght ? (currentUserLenght + numberOfMembers) : currentUserLenght
    // console.log("numberOfMembersWithCurrentUser", numberOfMembersWithCurrentUser)
    const equalSplitAmount = (numberOfMembersWithCurrentUser > 0 && amount) ? ((Number(amount) / numberOfMembersWithCurrentUser).toFixed(2)) : (0);
    // selected user after comparing with all users from the database
    const useMemoToSelectedUsers = useMemo(() => {
        return users
            ?.filter((user: any) => members.some((member: any) => member.value === user.id))
            .map(user => ({
                id: user.id,
                name: user.name
            })) || [];
    }, [users, members])



    // console.log(" useMemoToSelectedUsers from comparing with all users", useMemoToSelectedUsers)
    const fieldSelectedUsersWithCurrentUser = currentUser ? [...useMemoToSelectedUsers, currentUser] : currentUser;
    // console.log("fieldSelectedUsersWithCurrentUser", fieldSelectedUsersWithCurrentUser)


    // console.log("currentUser",currentUser)




    //  multiple payers
    const chooseMultiplePayer = (chooseMultiplePayer: any) => {
        setMultiplePayers(chooseMultiplePayer); // Update the state with the new user data
    };
    // console.log(" chooseMultiplePayer",MultiplePayers)
    const chooseOnePayer = (newState: { userId: string, userName: string, PaidAmount: number, paidOwn?: string, kharchOnUser?: number | null | string }) => {
        setpayerUser([newState]); // Update the state with the new user data
    };

    //   console.log("chooseOnePayer",payerUser)

    // splite type
    const handleRetriveSpliteType = (retriveSpliteType: any) => {
        setRetriveSpliteType(retriveSpliteType);
    }
    console.log("percentageRRRRR:", retriveSpliteType)
    // console.log("numberOfPayer:", payerUser.length.valueOf)
    const innerArray = [payerUser]
    const lengthOfInnerArray = innerArray[0].length || 0; // Safe access with optional chaining
    console.log("lengthOfInnerArray", lengthOfInnerArray); // Output: 2
    const pickOnePayer = useMemo(() => {
        return payerUser.map((user) => {
            return user.userName === currentUser?.name ? "you" : user.userName || "";
        });
    }, [payerUser, currentUser]); // Dependencies: payerUser, currentUser

    useEffect(() => {
        setActivePayer(pickOnePayer);
    }, [pickOnePayer]);
    const [selectedOwns, setSelectedOwns] = useState<string | number>(""); // To store the selected option

    // Function passed to the child component
    const whoOwns = (owns: string | number) => {
        setSelectedOwns(owns); // Set the selected option from the child
    };
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        // description,
        //     amount,
        //     paidBy,
        //     involvePeopleOncharch,
        //     EqualSplite,
        //     getBackAmount,

        //     spliteType,
        //     createdBy,
        //     toGiveInType
        setIsLoading(true);

        const { description, amount } = data

        try {
            const response = await axios.post("/api/spliteType", {
                description: description,
                amount: parseFloat(amount),
                paidBy: [retriveSpliteType?.onePayerId],
                involvePeopleOncharch: retriveSpliteType?.involvePeopleOnKharch,
                EqualSplite: isLoading,
                createdBy: currentUser?.id,
                getBackAmount: retriveSpliteType?.getBackAmount,
                toGiveInType: "equally",
                spliteType: "equallyiii"

            });
            console.log("Expense created successfully:", response.data);
            toast("expenses created successfully")
            setIsLoading(false)
        } catch (error) {
            console.error("Error creating expense:", error);
            setIsLoading(false)
            toast("something went wrong")
            console.log("paidone", retriveSpliteType?.onePayerId)
        }


        if (MultiplePayers) {
            // axios.post('/api/group', { ...data, isGroup: true })
            {
                amount: data.amount;
                discriptions: data.decriptions;
                totalPayers: MultiplePayers
            }
        } else {
            if (payerUser) {

            }
        }

        PaidUserToExpensesAmount: ;
        console.log("Form data:", data);
        console.log("Amount:", amount);
        console.log("Members:", members);


    };
    // console.log("amount", amount)
    const h=() => {
            setIsMultiple(true)
            onClose()
            members[0]
        }

   console.log("multiple",isMultiple)
    return (
        <>
            <Model isOpen={isOpen} onClose={h} heading='Add an Expenses' >
                <div className=' bg-white rounded-lg '>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-2">
                                <div className="mt-5 text-sm flex-col gap-y-4">
                                    <Select
                                        disabled={isLoading}
                                        label="with you and"
                                        options={(users || []).map((user) => ({
                                            value: user.id,
                                            label: user.name
                                        }))}
                                        onChange={(value) => setValue('members', value, { shouldValidate: true })}
                                        value={members} // make sure it's an array if it's a multi-select
                                    />
                                </div>
                            </div>
                            {members.length > 0 && (
                                <div className="mt-0">

                                    <div className="border-b border-gray-300 pb-4 flex flex-grow gap-10">
                                        <div className='w-[100px] h-[80px] rounded-lg '>
                                            <Image src={notes} width={100} height={80} alt='/note' />
                                        </div>
                                        <div className=''>

                                            <AddExpenseMember disabled={isLoading} placeholder='decriptions' type='text' id={"description"} register={register} />
                                            <hr className=" border-gray-300 border-dashed border-1/5 " />

                                            <AddExpenseMember
                                                id="amount"
                                                type="number"
                                                placeholder="Amount"
                                                register={register}
                                                // errors={errors.amount}
                                                disabled={false}
                                            />                                            <hr className=" border-gray-300 border-dashed border-1" />
                                        </div>
                                    </div>
                                  
                                    <SelectedPayer equalSplitAmount={equalSplitAmount} selectedPayer={selectedOwns} isEqual={isEqual} pickOnePayer={pickOnePayer} isMultiple={isMultiple} setIsOpenPayer={() => setIsOpenPayer(true)} setIsSpliteOption={() => setIsSpliteOption(true)} />
                                    <div className='flex mt-5 gap-4 text-sm'>
                                        <span className='rounded-3xl border-orange-100 border-2 px-12 py-1 bg-gray-100 hover:bg-gray-200 cursor-pointer'>{date.toLocaleDateString()}</span>
                                        <span className='rounded-3xl border-orange-100 border-2 px-12 py-1 bg-gray-100 hover:bg-gray-200 cursor-pointer'>Add note/imags</span>
                                    </div>

                                </div>
                            )}
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <Button disabled={isLoading} onClick={onClose} type="button" secondary> Cancel</Button>
                            <Button type={'submit'} disabled={isLoading} >Create</Button>
                        </div>

                        {isOpenPayer && <ChoosePayer
                            activePayer={activePayer}
                            setActivePayer={setActivePayer}
                            onClose={() => setIsOpenPayer(false)}
                            isMultiple={isMultiple}
                            setIsMultiple={(isMultiples) => setIsMultiple(isMultiples)}
                            openPayer={isOpenPayer}
                            style={"top-28 right-12 "}
                            userName={fieldSelectedUsersWithCurrentUser}
                            register={register}
                            currentUser={currentUser}
                            errors={errors}
                            chooseOnePayer={chooseOnePayer}
                            chooseMultiplePayer={chooseMultiplePayer}
                            key="uniqueKey"
                            equalSplitAmount={equalSplitAmount}
                            setIsChecked={() => setIsChecked(!isChecked)}
                            isChecked={isChecked} />}

                        {/* for Choose SpliteOption */}
                        {isSpliteOption && <ChooseSpliteOption
                            selectedMembers={numberOfMembersWithCurrentUser}
                            equalSplitAmount={equalSplitAmount}
                            onClose={() => setIsSpliteOption(false)}
                            isSpliteOption={isSpliteOption}
                            style='top-28 right-12'
                            setIsEqual={(any) => setIsEqual(any)}
                            userName={fieldSelectedUsersWithCurrentUser}
                            ChooseSpliteOptionFunction={chooseOnePayer}
                            register={register}
                            whoOwns={whoOwns}
                            currentUser={currentUser}
                            errors={errors}

                            onePayer={pickOnePayer}
                            handleRetriveSpliteType={handleRetriveSpliteType}
                        />}

                    </form>
                </div>

            </Model>

        </>
    );
};

export default AddExpense;
