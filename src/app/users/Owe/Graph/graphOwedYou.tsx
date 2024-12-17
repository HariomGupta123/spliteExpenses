import React from "react";
import UserAvatar from "../../component/Avatar";


const GraphOwedYou = () => {
    const data = [
        { name: "Avatarshankarkharel35", amount: 671.83 },
        { name: "JohnDoe", amount: 120.5 },
        { name: "JaneSmith", amount: 45.75 },
    ];

    return (
        <div>

            <ul style={{ listStyleType: "none", padding: 0 }} className=" mr-10">
                {data.map((item, index) => (
                    <li key={index} className="hover:cursor-pointer hover:bg-slate-300  rounded-md my-2 flex justify-center items-center p-2 ">
                        <UserAvatar
                            usersName={item.name}
                            amount={item.amount}
                        // Pass `youOwe` here
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GraphOwedYou;