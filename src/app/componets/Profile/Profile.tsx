"use client"
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoClose } from 'react-icons/io5';
import Button from '../Button/Button';
interface ProfileProps{
    onClose:()=>void
}
const Profile:React.FC<ProfileProps> = ({onClose}) => {
    const navigator=useRouter()
    const handleSignOut=()=>{
        signOut()
        navigator.push("/");
    }
    return (
        <div className="absolute top-20 z-10 w-96 right-5 bg-gray-100 flex items-center justify-center">
            
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center ">My Profile</h1>
                <IoClose className="h-6 w-6 text-black absolute top-5 right-5 cursor-pointer"  onClick={onClose}/>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Change Password</label>
                        <input
                            type="password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter new password"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">My Account</label>
                        <input
                            type="text"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Account details"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Language</label>
                        <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                            <option>EN</option>
                            {/* Add other language options here */}
                        </select>
                    </div>

                    <div>
                        <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            Save Settings
                        </button>
                    </div>

                    <Button onClick={handleSignOut}>Log Out</Button>
                </div>
            </div>
        </div>
    );
};

export default Profile;