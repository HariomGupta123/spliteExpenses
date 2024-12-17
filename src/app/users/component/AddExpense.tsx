"use client"
import Button from '@/app/componets/Button/Button';
import Select from '@/app/componets/Input/Select';
import Model from '@/app/componets/Model/Model';
import { User } from '@prisma/client';
import axios from 'axios';
import Image from 'next/image';
import notes from "../../../../public/cardphoto.jpeg"
import { useRouter } from 'next/navigation';
import React, { use, useEffect, useMemo, useState } from 'react';
import { FieldValues, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ChoosePayer from './ChoosePayer';
import ChooseSpliteOption from './ChooseSpliteOption/ChooseSpliteOption';
export interface FormData {
    people: {
        paid: number;
    }[];
}
export interface SimplifiedUser {
    id: string;
    name?: string;
    paid?: number
}
export interface person {
    userId: string;
    userName: string | null | any
    PaidAmount: number
    paidOwn?: string
    kharchOnUser?:number | null |string
    spliteType?:string
}
interface AddExpenseProps {
    isOpen?: boolean; // corrected the type here
    onClose: () => void;
    users: User[] | null | undefined;
    currentUser: User | null
}

const AddExpense: React.FC<AddExpenseProps> = ({ isOpen, onClose, users, currentUser }) => {
    const { control, register, handleSubmit, setValue, getValues, watch, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            members: [], // This should be an array for multi-select
            amount: '',
            description: '',
            // people: [{name:"",age:""}],
    
        }
    });
    const amount = watch('amount')
    const [isMultiple, setIsMultiple] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isOpenPayer, setIsOpenPayer] = useState(false);
    const [isEqual, setIsEqual] = useState(false);
    const [MultiplePayers,setMultiplePayers]=useState<[]>([])
    const [activePayer,setActivePayer]=useState<any>(currentUser.id)
    const [openPayerUser, setOpenPayerUser] = useState<person[] | []>([
        {
            userId: currentUser.id,
            userName: currentUser.name,
            PaidAmount: amount
        }
    ]);
    console.log("currentPayer",openPayerUser)
  // retriev Splite Type and involve people in splite type
    const [retriveSpliteType,setRetriveSpliteType]=useState<[]>([]);
    const retri=retriveSpliteType
    console.log("retriveSpliteType", retri)

    //all members start
    const [isSpliteOption, setIsSpliteOption] = useState(false)
    const members = watch('members'); // Watching the members field to update UI
    const router = useRouter();
    const date = new Date()
    const numberOfMembers = members.length;
    console.log("members",members)
    const currentUsers=[currentUser]
    const currentUserLenght=currentUsers.length
    console.log("currentUsersLength:",currentUserLenght)
    const numberOfMembersWithCurrentUser=currentUserLenght ? (currentUserLenght+numberOfMembers) :currentUserLenght
    console.log("numberOfMembersWithCurrentUser", numberOfMembersWithCurrentUser)
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
   
    //all members end 

    // Initialize people field in the form with selectedUsers
    // const { fields, append } = useFieldArray({
    //     control,
    //     name: "people"
    // });
    
    console.log(" useMemoToSelectedUsers from comparing with all users", useMemoToSelectedUsers)
    const fieldSelectedUsersWithCurrentUser = currentUser ? [...useMemoToSelectedUsers, currentUser] : currentUser;
    console.log("fieldSelectedUsersWithCurrentUser", fieldSelectedUsersWithCurrentUser)

    // Automatically update the people array whenever selectedUsers changes
    // useEffect(() => {
    //     // Get the current value of the "people" field
    //     const currentPeople = getValues("people");
    //     console.log("people",currentPeople)
    //     console.log("selected user:", useMemoToSelectedUsers)
         
    //     // Check if selectedUsers have actually changed
    //     const hasChanged = useMemoToSelectedUsers.length !== currentPeople.length || useMemoToSelectedUsers.some((user, index) => user.id !== currentPeople[index]?.id);
    //     console.log("hasChanged",hasChanged)
    //     // Only update the "people" field if the useMemoToSelectedUsers have changed
    //     if (hasChanged) {
    //         setValue("people", useMemoToSelectedUsers.map(user => ({
    //             id: user.id,
    //             name: user.name,
    //             paid: 0,// Initialize paid with 0
            
    //         })));
    //     }
    // }, [useMemoToSelectedUsers, setValue, getValues, isChecked]);
    console.log("currentUser",currentUser)




    //  multiple payers
    const chooseMultiplePayer = (chooseMultiplePayer:any) => {
        setMultiplePayers(chooseMultiplePayer); // Update the state with the new user data
    };
    console.log(" chooseMultiplePayer",MultiplePayers)
    const chooseOnePayer = (newState: { userId: string, userName: string, PaidAmount: number, paidOwn?: string, kharchOnUser?: number | null | string }) => {
        setOpenPayerUser([newState]); // Update the state with the new user data
    };

  console.log("chooseOnePayer",openPayerUser)

    // splite type
    const handleRetriveSpliteType=(retriveSpliteType:any)=>{
        setRetriveSpliteType(retriveSpliteType);
    }
    console.log("percentageRRRRR:",retriveSpliteType)
    console.log("numberOfPayer:", openPayerUser.length.valueOf)
    const innerArray=[openPayerUser]
    const lengthOfInnerArray = innerArray[0].length || 0; // Safe access with optional chaining
    console.log("lengthOfInnerArray",lengthOfInnerArray); // Output: 2
    const pickOnePayer = openPayerUser.map((user) => {
        const currentUserName = user.userName === currentUser.name ? "you" : (user.userName ||"")
        return currentUserName
    }) ;

    console.log("pickone",  pickOnePayer )
    // setActivePayer(pickOnePayer)
    // const memo=useMemo(()=>setActivePayer(pickOnePayer),[pickOnePayer])
    useEffect(()=>{
        
        setActivePayer(pickOnePayer )},[])
    const [selectedOwns, setSelectedOwns] = useState<string | number>(""); // To store the selected option

    // Function passed to the child component
    const whoOwns = (owns: string | number) => {
        setSelectedOwns(owns); // Set the selected option from the child
    };
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        //  const {amount,description}=data
        // const PaidUserToExpensesAmount=users?.filter((user)=>user.id ===payerUserId);
        // if(paidUserToExensesAmount.length == 1){
        // payerId:PaidUserToExpensesAmount
        //   toGiversId:useMemoToSelectedUsers.filter((user)=>({
        // toGiverId:user.id,
        //  toGiveAmount:equalSplitedAmount}))
        // }
       if(MultiplePayers){
           // axios.post('/api/group', { ...data, isGroup: true })
           {
            amount:data.amount;
            discriptions:data.decriptions;
            totalPayers:MultiplePayers
           }
       }else{
        if(openPayerUser){

        }
       }
        
        PaidUserToExpensesAmount: ;
        console.log("Form data:", data);
        console.log("Amount:", amount);
        console.log("Members:", members);

        // axios.post('/api/group', { ...data, isGroup: true })
        //     .then(() => {
        //         router.refresh();
        //         onClose();
        //     })
        //     .catch(() => toast.error('Something went wrong'))
        //     .finally(() => setIsLoading(false));
    };
    return (
        <>
            <Model isOpen={isOpen} onClose={onClose} heading='Add an Expenses' >
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
                                            <input
                                                {...register("description", { required: true })}
                                                type="text"
                                                placeholder='description'
                                                disabled={isLoading}
                                                className={`block w-full h-5 text-gray-400 text-2xl font-extrabold rounded-md text-center bg-white  sm:text-sm placeholder:font-semibold outline-none focus:outline-none ${errors.description ? 'ring-red-500' : 'ring-transparent'}`}

                                                style={{ border: 'none' }}
                                            // Ensure no outline and border on focus
                                            />
                                            <hr className=" border-gray-300 border-dashed border-1/5 " />
                                            <input
                                                {...register("amount", { required: true })}
                                                type="number"
                                                placeholder='Rs : 0.00'
                                                disabled={isLoading}
                                                className={`mt-5 block w-full h-5 text-lg text-gray-400 rounded-md font-extrabold text-center bg-white sm:text-sm placeholder:font-bold outline-none focus:outline-none ${errors.description ? 'ring-red-500' : 'ring-transparent'}`}

                                                style={{ border: 'none' }}
                                            // Ensure no outline and border on focus
                                            // className="outline-none focus:outline-none"
                                            />
                                            <hr className=" border-gray-300 border-dashed border-1 " />
                                        </div>
                                    </div>
                                    <div className="mt-5 text-center flex row-2 gap-2 ">
                                        {selectedOwns ? (selectedOwns ==="Splite the Expenses"  ? (<><span className='text-sm'>
                                            Paid by <span className='bg-gray-100 hover:bg-gray-200 rounded-xl  px-2 border-dashed border-2 border-orange-300 cursor-pointer' onClick={() => setIsOpenPayer(true)}>{isMultiple ? "multiple" : pickOnePayer}</span> and splite <span className='bg-gray-100 hover:bg-gray-200 rounded-xl  px-2 border-dashed border-2 border-orange-300 cursor-pointer' onClick={() => setIsSpliteOption(true)}>{isEqual ? "unEqually" : "Equally"}</span>
                                        </span>
                                            <span className='text-sm'>  (({equalSplitAmount})/per)</span> </>) : (<span>{selectedOwns}</span>)) : <><span className='text-sm'>
                                                Paid by <span className='bg-gray-100 hover:bg-gray-200 rounded-xl  px-2 border-dashed border-2 border-orange-300 cursor-pointer' onClick={() => setIsOpenPayer(true)}>{isMultiple ? "multiple" : pickOnePayer}</span> and splite <span className='bg-gray-100 hover:bg-gray-200 rounded-xl  px-2 border-dashed border-2 border-orange-300 cursor-pointer' onClick={() => setIsSpliteOption(true)}>{isEqual ? "unEqually" : "Equally"}</span>
                                            </span>
                                            <span className='text-sm'>  (({equalSplitAmount})/per)</span> </> }
                                       
                                    </div>
                                    <div className='flex mt-5 gap-4 text-sm'>
                                        <span className='rounded-3xl border-orange-100 border-2 px-12 py-1 bg-gray-100 hover:bg-gray-200 cursor-pointer'>{date.toLocaleDateString()}</span>
                                        <span className='rounded-3xl border-orange-100 border-2 px-12 py-1 bg-gray-100 hover:bg-gray-200 cursor-pointer'>Add note/imags</span>
                                    </div>

                                </div>
                            )}
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <Button disabled={isLoading} onClick={onClose} type="button" secondary> Cancel</Button>
                            <Button disabled={isLoading} type="submit" >Create</Button>
                        </div>

                        {   isOpenPayer && <ChoosePayer
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
                            selectedMembers={numberOfMembersWithCurrentUser}
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
