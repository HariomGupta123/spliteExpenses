"use client";

import Button from '@/app/componets/Button/Button';
import Select from '@/app/componets/Input/Select';
import Model from '@/app/componets/Model/Model';
import { User } from '@prisma/client';
import axios from 'axios';
import Image from 'next/image';
import notes from "../../../../public/cardphoto.jpeg"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';


interface AddExpenseProps {
    isOpen?: boolean; // corrected the type here
    onClose: () => void;
    users: User[] | null | undefined;
}

const AddExpense: React.FC<AddExpenseProps> = ({ isOpen, onClose, users }) => {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            members: [],// This should be an array for multi-select,
            amount: '',
            discription: '',
        }
    });

    const [isLoading, setIsLoading] = useState(false);
    const members = watch('members'); // Watching the members field to update UI
    const amount=watch('amount')
    const router = useRouter();
const date=new Date()
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post('/api/group', { ...data, isGroup: true })
            .then(() => {
                router.refresh();
                onClose();
            })
            .catch(() => toast.error('Something went wrong'))
            .finally(() => setIsLoading(false));
    };
    const numberOfMembers = members.length;
    const splitAmount = (numberOfMembers > 0 && amount) ? ((Number(amount) / numberOfMembers).toFixed(2)) :( 0);
    return (
        <Model isOpen={isOpen} onClose={onClose} >
            <div className='p-6 bg-white rounded-lg '>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-12">
                        <h2 className=" flex justify-between rounded-lg p-2 border-b border-gray-900/10 text-base font-semibold leading-7 text-gray-900  h-full">
                            Add an Expense
                        </h2>
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
                                            className={` block w-full h-5 text-gray-400 text-2xl font-extrabold rounded-md text-center bg-white  sm:text-sm placeholder:font-semibold outline-none focus:outline-none ${errors.description ? 'ring-red-500' : 'ring-transparent'}`}

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
                                    <span>
                                        Paid by <span className='bg-gray-100 hover:bg-gray-200 rounded-xl py-1 px-2 border-dashed border-2 border-orange-300 cursor-pointer'>You</span> and splite <span className='bg-gray-100 hover:bg-gray-200 rounded-xl py-1 px-2 border-dashed border-2 border-orange-300 cursor-pointer'>Equally</span>
                                       
                                    </span>
                                    <span>  (({splitAmount})/per)</span>
                                </div>
                                <div className='flex mt-5 gap-4'>
                                    <span className='rounded-3xl border-orange-100 border-2 px-12 py-1 bg-gray-100 hover:bg-gray-200 cursor-pointer'>{date.toLocaleDateString()}</span>
                                    <span className='rounded-3xl border-orange-100 border-2 px-12 py-1 bg-gray-100 hover:bg-gray-200 cursor-pointer'>Add note/imags</span>

                                </div>

                            </div>
                        )}
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <Button disabled={isLoading} onClick={onClose} type="button" secondary> Cancel</Button>
                        <Button disabled={isLoading} type="submit">Create</Button>
                    </div>
                </form>
            </div>
        </Model>
    );
};

export default AddExpense;
