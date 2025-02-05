"use client"
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
interface ProfileProps{
    onClose:()=>void
}
const documents = [
    { name: "Your Account", path: "/users/account" },
    { name: "Create Group", path: "/users/create-group" },
    { name: "Fairness Calculator", path: "/users/fairness-calculator" },
    { name: "Contact Support", path: "/users/contact-support" },
    { name: "Log Out", path: "/" }
];

const Profile = ({onClose}:ProfileProps) => {
    const router = useRouter();

    const handleNavigation = (path: string) => {
        if (path === "/") {
            signOut(); // Sign out the user
        }
        router.push(path);
        onClose()
    };

    return (
        <div className='absolute top-8 z-20 w-[200px] right-60'>
            <div className="absolute top-6 left-10  w-0 h-0 border-l-[20px] border-l-transparent border-b-[20px] border-b-white border-r-[20px] border-r-transparent"></div>
            <div className="bg-white absolute top-10 z-20 w-[200px] right-20 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 w-[200px]">
                    {documents.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => handleNavigation(item.path)}
                            className={`
                            border border-gray-300 text-green-600 bg-white px-3 py-1 text-sm  font-extralight text-left
                            hover:bg-sky-600 transition-all duration-300
                            ${index === 0 ? "rounded-t-md" : ""} 
                            ${index === documents.length - 1 ? "rounded-b-md" : ""}
                        `}
                            aria-label={item.name}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
            </div>

        </div>
       
    );
};

export default Profile;
