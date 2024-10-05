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
import { IoClose } from 'react-icons/io5';

interface AddExpenseProps {
    isOpen?: boolean; // corrected the type here
    onClose: () => void;
    users: User[] |null|undefined;
}

const AddExpense: React.FC<AddExpenseProps> = ({ isOpen, onClose, users }) => {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            members: [] // This should be an array for multi-select
        }
    });

    const [isLoading, setIsLoading] = useState(false);
    const members = watch('members'); // Watching the members field to update UI
    const router = useRouter();

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

    return (
        <Model isOpen={isOpen} onClose={onClose} >
            <div className='p-6 bg-white rounded-lg '>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-12">
                        <h2 className=" flex justify-between rounded-lg p-2 border-b border-gray-900/10 text-base font-semibold leading-7 text-gray-900  h-full">
                            Add an Expense 
                        </h2>
                        <div className="border-b border-gray-900/10 pb-2">
                           
                            <div className="mt-10 text-sm flex-col gap-y-8">
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
                            <div className="mt-4">
                               
                                <div className="border-b border-gray-300 pb-4 flex flex-grow">
                                    <div className='w-[50px] h-[50px] rounded-lg '>
                                        <Image src={notes} width={50} height={50} alt='/note'/>
                                    </div>
                                    
                                </div>
                                    <h3 className="text-sm font-medium text-gray-700">Additional Details</h3>
                                    <div className="mt-2">
                                        <label className="block text-sm font-medium text-gray-700">Expense Description</label>
                                        <input
                                            {...register("description", { required: true })}
                                            type="text"
                                            disabled={isLoading}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
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
