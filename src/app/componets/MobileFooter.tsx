"use client"
import { useRouter } from "next/navigation";
import React from "react";
import { FaUsers, FaUserFriends, FaUserCircle, FaListAlt } from "react-icons/fa";

const footerItems = [
    { id: 1, icon: FaUsers, label: "Groups", route: "/groups" },
    { id: 2, icon: FaUserFriends, label: "Friends", route: "/friends" },
    { id: 3, icon: FaUserCircle, label: "Account", route: "/account" },
    { id: 4, icon: FaListAlt, label: "Activities", route: "/users/recentActivities" },
];

const MobileFooter = () => {
    const router = useRouter();

    const handleRedirect = (route: string) => {
        router.push(route);
    };

    return (
        <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md sm:hidden">
            <div className="flex justify-around items-center py-2">
                {footerItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={item.id}
                            className="flex flex-col items-center cursor-pointer"
                            onClick={() => handleRedirect(item.route)}
                        >
                            <Icon className="text-gray-600 text-xl" />
                            <span className="text-sm text-gray-700 mt-1">{item.label}</span>
                        </div>
                    );
                })}
            </div>
        </footer>
    );
};

export default MobileFooter;
