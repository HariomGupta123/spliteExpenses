import React, { useEffect, useState } from "react";
import UserAvatar from "../component/Avatar";
import { useExpenseData } from "../getExpenses/GetExpenses";
import { GiveTakeAmount } from "@prisma/client";
import getUserDetialsById from "@/app/actions/[userId]/getUserDetials";
import { useRouter } from "next/navigation";
import { useExpenseByUserId } from "../getExpenses/GetExpensesByUserId";

interface OwedYouProps {
    incoming: GiveTakeAmount[];
}

const OwedYou: React.FC<OwedYouProps> = ({ incoming }) => {
    const route=useRouter()
    // const { data, involvePeopleOncharch, isError, isLoading } = useExpenseData();

    // const [userDetails, setUserDetails] = useState([]);


const sigleFriendDetial=(userId:string)=>{
    route.push(`friends/SingleFriendsExpenses/${userId}`)


}


// console.log("data",data)
//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     if (isError) {
//         return <div>Error fetching data</div>;
//     }

    return (
        <div>
            <ul style={{ listStyleType: "none", padding: 0 }} className="mr-10">
                {incoming.map((item:any) => (
                    <li
                        key={item.id}
                        className="hover:cursor-pointer hover:bg-slate-300 rounded-md my-2 flex justify-center items-center p-2"
                        onClick={()=>sigleFriendDetial(item.giverUser.id)}
                    >
                        <UserAvatar
                            usersName={item.giverUser.name || "Loading..."}
                            amount={item.toGiveAmount || 0}
                            text={"owes you"}
                            image={item.giverUser.image}
                        />
                    </li>)               
                )}
            </ul>
        </div>
    );
};

export default OwedYou;
