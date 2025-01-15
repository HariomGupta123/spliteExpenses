import React from "react";
import UserAvatar from "../component/Avatar";
import { Expense, GiveTakeAmount } from "@prisma/client";
import { useExpenseData } from "../getExpenses/GetExpenses";
import { useRouter } from "next/navigation";
interface YouOweProps {
    outGoing: GiveTakeAmount[];
}
const YouOwe:React.FC<YouOweProps> = ({outGoing}) => {
    const route=useRouter();
    const sigleFriendDetial = (userId: string) => {
        route.push(`friends/SingleFriendsExpenses/${userId}`)


    }

    return (
        <div>
           
            <ul style={{ listStyleType: "none", padding: 0 }} className=" ml-10">
                {outGoing.map((item:any) => (
                    <li 
                    key={item.id}
                        onClick={() => sigleFriendDetial(item.receiverUser.id)}

                     className="hover:cursor-pointer hover:bg-slate-300  rounded-md my-2 flex justify-center items-center p-2 ">
                        <UserAvatar
                            usersName={item.receiverUser?.name || "Loading..." }
                            amount={item.toGiveAmount}
                            style={"text-red-400"}
                            text={"You owe"}
                            // Pass `youOwe` here
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default YouOwe;
