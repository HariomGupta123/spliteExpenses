import React from "react";
import { FaMoneyBillAlt, FaShoppingCart } from "react-icons/fa";

const activities = [
    {
        id: 1,
        user: "Ansarul H.",
        action: "recorded a payment from",
        targetUser: "Hari o..",
        amount: 627.58,
        status: "You paid",
        date: "Monday",
        icon: <FaMoneyBillAlt className="text-green-500 text-2xl" />,
    },
    {
        id: 2,
        user: "Sandesh G.",
        action: "recorded a payment from",
        targetUser: "Hari o..",
        amount: 923.4,
        status: "You paid",
        date: "Monday",
        icon: <FaMoneyBillAlt className="text-green-500 text-2xl" />,
    },
    {
        id: 3,
        user: "Sandesh G.",
        action: 'added "Dudh puff".',
        amount: 20.0,
        status: "You owe",
        date: "Sunday",
        icon: <FaShoppingCart className="text-blue-500 text-2xl" />,
    },
    {
        id: 4,
        user: "Sandesh G.",
        action: 'added "Dudh".',
        amount: 14.0,
        status: "You owe",
        date: "Sunday",
        icon: <FaShoppingCart className="text-blue-500 text-2xl" />,
    },
    {
        id: 5,
        user: "Sandesh G.",
        action: 'added "Dudh chiya 10 dec".',
        amount: 17.5,
        status: "You owe",
        date: "Sunday",
        icon: <FaShoppingCart className="text-blue-500 text-2xl" />,
    },
];

const RecentActivity = () => {
    return (
        <div className="w-full max-w-3xl mx-auto p-4">
            {/* Recent Activity Header with Background */}
            <div className="bg-gray-100 p-4 rounded-md">
                <h2 className="text-lg font-semibold mb-2 text-gray-700">
                    Recent activity
                </h2>
            </div>

            {/* Recent Activities List */}
            <ul className="mt-4 bg-white p-4 rounded-md shadow-sm border">
                {activities.map((activity) => (
                    <li
                        key={activity.id}
                        className="flex items-start space-x-4 py-3 border-b last:border-b-0"
                    >
                        {/* Icon */}
                        <div className="flex-shrink-0">{activity.icon}</div>

                        {/* Details */}
                        <div className="flex-1">
                            <p className="text-sm text-gray-800">
                                <span className="font-semibold">{activity.user}</span>{" "}
                                {activity.action}{" "}
                                {activity.targetUser && (
                                    <span className="font-semibold">{activity.targetUser}</span>
                                )}
                            </p>
                            <p
                                className={`text-sm ${activity.status === "You paid"
                                        ? "text-green-600"
                                        : "text-red-600"
                                    } font-medium`}
                            >
                                {activity.status} ${activity.amount.toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-500">{activity.date}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentActivity;
