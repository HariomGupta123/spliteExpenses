"use client";
import React, { useState } from "react";
import EmailInvitationForm from "@/app/inviteFriends/invite";
import Link from "next/link";
import Page from "../friends/page";

const LeftSide = () => {
    const [activeIndex, setActiveIndex] = useState(0); // State to track active item

    const menuItems = [
        { name: "Dashboard", path: "/users/dashboard", component: <div>Dashboard Component</div> },
        { name: "Recent Activities", path: "/users/recentActivities", component: <div>Recent Activities Component</div> },
        { name: "All Expenses", path: "/users/allExpenses", component: <div>All Expenses Component</div> },
        // { name: "Add friend", path: "", component: <Page/> },

        // { name: "Add Group", path: "/add-group", component: <div>Add Group Component</div> },
        // { name: "Invite Friends", path: "/invite-friends", component: <EmailInvitationForm /> },
    ];

    return (
        <div className="flex flex-col justify-self-end pl-16   ">
            {menuItems.map((item, index) => (
                <div key={index} className="ml-4 p-1 hover:bg-slate-300 w-[170px] text-sm font-medium rounded-md">
                    {/* Menu Item */}
                    <div
                        className={`flex items-center   ${activeIndex === index ? "font-semibold border-l-4 border-blue-500" : ""
                            }`}
                        onClick={() => setActiveIndex(index)}
                    >
                        <div className="ml-2">
                            <Link href={item.path} className="">
                                {item.name}
                            </Link>
                        </div>
                    </div>

                </div>
            ))}
            <Page />
            <EmailInvitationForm />
        </div>
    );
};

export default LeftSide;
