import getCurrentUser from '@/app/actions/getCurrentUser';
import { getUsers } from '@/app/actions/getUsers';
import MiddleInformation from '@/app/users/component/MiddleInformation';
import React from 'react';

const layout = async ({ children }: { children: React.ReactNode }) => {
    const currentUser =await getCurrentUser();
  // console.log("sessionStorage", sessionStorage.getItem("FriendName"))
    // const otherUser=await getUsers()
  return(
    <>
    <MiddleInformation currentUser={currentUser} titleText="FriendName"  />
    <div>
        {children}
    </div>
    </>
  )
}
export default layout