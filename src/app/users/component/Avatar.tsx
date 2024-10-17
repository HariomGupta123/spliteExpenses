import { Avatar, AvatarImage } from "@/components/ui/avatar"
import React from 'react'
import profile from "../../../../public/cardphoto.jpeg"
    interface UserAvatarProps{
        usersName: string |undefined | null
        amount?:string | number |null
    }
const UserAvatar:React.FC<UserAvatarProps> = ({usersName,amount}) => {
  return (
   
          <div className=" flex row-auto justify-between items-center w-full ">
              <span className="mr-2">
                  <Avatar>
                      <AvatarImage src={profile.src} alt="/profile" />
                  
                  </Avatar>
              {amount && <span className="text-xs">total share Rs.{amount}</span>}
                
              </span>
              <span className="font-medium text-gray-950 ">{usersName}</span>
          </div>
      
  
  )
}

export default UserAvatar
