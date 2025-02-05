import { Avatar, AvatarImage } from "@/components/ui/avatar"
import React from 'react'
import profile from "../../../../public/cardphoto.jpeg"
interface UserAvatarProps {
    usersName: string | undefined | null
    amount?: string | number | null
    style?:string
    text?:string
    image?:string

}
const UserAvatar: React.FC<UserAvatarProps> = ({ usersName, amount ,style,text,image}) => {
    return (

        <div className=" flex justify-start items-center w-full gap-2 ">

            <div>
                <Avatar>
                    <AvatarImage src={image || profile.src} alt="/profile" />
                </Avatar>
            </div>
            <div className="ml-6">
                <div className="font-medium text-gray-950 ">{usersName}</div>

                {amount && <div className={`'text-sm'${style ? " text-red-400":"text-slate-400"}`}> {text ?`${text} ${amount}` :`total share Rs.${amount}`}</div>}
            </div>

        </div>


    )
}

export default UserAvatar
