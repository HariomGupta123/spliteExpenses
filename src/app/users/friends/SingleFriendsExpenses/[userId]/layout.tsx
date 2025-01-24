import getCurrentUser from '@/app/actions/getCurrentUser';
import { getUsers } from '@/app/actions/getUsers';
import MiddleInformation from '@/app/users/component/MiddleInformation';
import React from 'react';

const layout = async ({ children }: { children: React.ReactNode }) => {
    const currentUser =await getCurrentUser();
  if (!currentUser) {
    throw new Error('Current user is not available.');
  }

  const current = {
    id: currentUser.id,
    name: currentUser.name,
    email: currentUser.email,
  };
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