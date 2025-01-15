import getCurrentUser from '@/app/actions/getCurrentUser';
import { getUsers } from '@/app/actions/getUsers';
import MiddleInformation from '@/app/users/component/MiddleInformation';
import React from 'react';

const layout = async ({ children }: { children: React.ReactNode }) => {
    const currentUser =await getCurrentUser();
    const otherUser=await getUsers()
  return(
    <>
    <MiddleInformation currentUser={currentUser} users={otherUser} titleText='users'/>
    <div>
        {children}
    </div>
    </>
  )
}
export default layout