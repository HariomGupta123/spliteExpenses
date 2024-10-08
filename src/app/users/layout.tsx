import React from 'react'
import Userlist from './component/Userlist'
import { getUsers } from '../actions/getUsers';
import getCurrentUser from '../actions/getCurrentUser';
import Header from './component/Header/Header';

const Userlayout =async ({children}:{children:React.ReactNode}) => {
  const Users = await getUsers();
  const currentUser=await getCurrentUser()
  const withCurrentUser=[...Users,currentUser]
  return (
    <div>
      <div className='sticky z-10 top-0'>
        <Header />
      </div>
     
      <div className='w-full flex h-[100vh]'>
        <div className='flex-grow h-full'>
          <Userlist item={withCurrentUser} email={currentUser?.email} />
        </div>
        <div className='flex-grow flex z-5  border-l border-r border-black shadow-lg  '>
          {children}
         </div>
        <div className='flex-grow flex justify-center '>
          lskj;lsaljdalks
         </div>
       
      </div>
    </div>
  )
}

export default Userlayout
