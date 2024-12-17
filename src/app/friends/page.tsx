import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import EmailInvitationForm from '../inviteFriends/invite';
import { FaUser } from 'react-icons/fa';
import Model from '@/app/componets/Model/Model';

type VerifiedEmailResponse = {
    usersByEmail: { id: string; name: string; email: string }[];
    senders: { id: string; name: string; email: string }[];
};

const Page = () => {
    const [open, setOpen] = useState(false);

    // Fetch verified email data
    const fetchVerifiedEmail = async (): Promise<VerifiedEmailResponse> => {
        const response = await fetch('/api/invite/verifyEmail/getVerifiedEmail');
        if (!response.ok) {
            throw new Error('Failed to fetch verified emails');
        }
        return response.json();
    };

    // React Query to fetch data
    const { data: verifiedEmail, isLoading, isError } = useQuery({
        queryKey: ['verifiedEmail'],
        queryFn: fetchVerifiedEmail,
    });

    // Memoize derived data
    const { usersByEmail, senders } = useMemo(() => {
        return {
            usersByEmail: verifiedEmail?.usersByEmail ?? [],
            senders: verifiedEmail?.senders ?? [],
        };
    }, [verifiedEmail]);

    // Loading and Error States
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
                    className=" cursor-pointer flex items-center"
                    onClick={() => setOpen(true)}
                >
                    <span className="text-sm font-medium">+</span>
                    <span className='text-sm font-medium'>Add</span>
                </div>
            </div>

            {/* Friend List */}
            <div className="mt-4">
                {/* Users by Email */}
                {usersByEmail.length > 0 && (
                    <div>
                        {usersByEmail.map((user) => (
                            <Link
                                key={user.id}
                                href={`/friends/${user.id}`}
                                className="flex items-center pl-2 mt-2 pt-1 rounded-md hover:bg-gray-50 transition"
                            >
                                <FaUser className="text-gray-500 mr-1" />
                                <span className="text-sm font-medium">{user.name}</span>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Senders */}
                {senders.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-sm font-medium text-gray-600">Senders</h3>
                        {senders.map((sender) => (
                            <Link
                                key={sender.id}
                                href={`/friends/${sender.id}`}
                                className="flex items-center pl-2 mt-2 pt-1 rounded-md hover:bg-gray-50 transition"
                            >
                                <FaUser className="text-gray-500 mr-1" />
                                <span className="text-sm font-medium">{sender.name}</span>
                            </Link>
                        ))}
                    </div>
                )}

                {/* No Data Fallback */}
                {usersByEmail.length === 0 && senders.length === 0 && (
                    <div className="text-center text-gray-500">No friends found.</div>
                )}
            </div>
        </div>
    );
};

export default Page;
