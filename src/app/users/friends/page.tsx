"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import EmailInvitationForm from '../../inviteFriends/invite';
import { FaUser } from 'react-icons/fa';
import Model from '@/app/componets/Model/Model';
import { User } from '@prisma/client';
import { useGetAllFriends } from './allFriends/getAllFriends';
import UserAvatar from '../component/Avatar';
// import { useRouter } from 'next/navigation';
// import useUserStore from '@/stores/friendName';

const Page = () => {
    const [open, setOpen] = useState(false);
   
    const { allVerifiedFriends, isLoading, isError } = useGetAllFriends();
    // console.log('Fetched allFriends:', allVerifiedFriends);
    if (isLoading) {
        return <div className="text-center text-gray-500">Loading...</div>;
    }
    if (isError) {
        return <div className="text-center text-red-500">Error fetching data</div>;
    }
  
    return (
        <>
            <div className="hidden md:block p-4 w-[200px] lg:w-[220px]">
                {/* Modal for inviting a friend */}
                <Model isOpen={open} onClose={() => setOpen(false)} heading="Invite Your Friend">
                    <EmailInvitationForm />
                </Model>

                {/* Header Section */}
                <div className="flex justify-between items-center border border-gray-300 rounded-lg py-0.5 px-2 bg-gray-50 hover:bg-slate-100 transition">
                    <div className="text-sm font-medium flex items-center space-x-2">
                        <FaUser className="text-gray-500" />
                        <span>Friends</span>
                    </div>
                    <div
                        className="cursor-pointer flex items-center"
                        onClick={() => setOpen(true)}
                    >
                        <span className="text-sm font-medium">+</span>
                        <span className="text-sm font-medium">Add</span>
                    </div>
                </div>

                {/* Friend List */}
                <div className="mt-4">
                    {allVerifiedFriends && allVerifiedFriends.length > 0 ? (
                        <div>
                            {allVerifiedFriends.map((user: User) => (
                                <Link
                                    key={user.id}
                                    href={`/users/friends/SingleFriendsExpenses/${user.id}`}
                                    className="flex items-center pl-2 mt-2 pt-1 rounded-md hover:bg-gray-50 transition"
                                >
                                    <FaUser className="text-gray-500 mr-1" />
                                    <span className="text-sm font-medium">{user.name}</span>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500">No friends found.</div>
                    )}
                </div>
            </div>

            <div className="w-full flex max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
                {allVerifiedFriends && allVerifiedFriends.length > 0 ? (
                    <div className="block md:hidden px-4 w-full justify-center items-center"> {/* Visible only on small devices */}
                        {allVerifiedFriends.map((user: User) => (
                            <Link
                                key={user.id}
                                href={`/users/friends/SingleFriendsExpenses/${user.id}`}
                                className="flex items-center pl-2 mt-2 pt-1 px-4 rounded-md hover:bg-gray-50 transition "
                            >
                                <UserAvatar usersName={user.name} />
                                <span className="text-sm font-medium">you owe $400</span>
                            </Link>
                        ))}
                        <div
                            className="cursor-pointer flex items-center justify-center border-2 w-40 mt-4 mx-auto" 
                            onClick={() => setOpen(true)}
                        >
                            <span className="text-lg font-medium">+</span>

                            <FaUser className="text-gray-500 mr-1" />

                            <span className="text-sm font-medium">Add more friends</span>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-gray-500 block md:hidden">No friends found.</div>
                )}
            </div>

        </>
       
    );
};

export default Page;
