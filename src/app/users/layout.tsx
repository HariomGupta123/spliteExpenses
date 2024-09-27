import React from 'react'
import Userlist from './component/Userlist'
import { getUsers } from '../actions/getUsers';
import getCurrentUser from '../actions/getCurrentUser';

const Userlayout =async ({children}:{children:React.ReactNode}) => {
  const currentUsers = await getUsers();
  const user=await getCurrentUser()
  console.log("currentuser",user)
  return (
    <div>
      
      <Userlist item={currentUsers} email={user?.email} />
        {children}
      
    </div>
  )
}

export default Userlayout
