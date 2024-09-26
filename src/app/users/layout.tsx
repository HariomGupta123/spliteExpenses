import React from 'react'
import Userlist from './component/Userlist'
import { getUsers } from '../actions/getUsers';

const Userlayout =async ({children}:{children:React.ReactNode}) => {
  const currentUsers = await getUsers();
  return (
    <div>
      
      <Userlist item={currentUsers}/>
        {children}
      
    </div>
  )
}

export default Userlayout
