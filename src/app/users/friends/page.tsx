"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import EmailInvitationForm from '../../inviteFriends/invite';
import { FaUser } from 'react-icons/fa';
import Model from '@/app/componets/Model/Model';
import { User } from '@prisma/client';
import { useGetAllFriends } from './allFriends/getAllFriends';
import { useRouter } from 'next/navigation';
import useUserStore from '@/stores/friendName';

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
        <div className="p-4 w-[200px]">
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
    );
};

export default Page;
