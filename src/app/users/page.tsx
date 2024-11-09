import getCurrentUser from '../actions/getCurrentUser';
import { getUsers } from '../actions/getUsers'
import MiddleInformation from './component/MiddleInformation'


const users =async () => {
  const Otherusers=await getUsers();
  const currentUser=await getCurrentUser()
  // const allUsers = currentUser ? [...otherUsers, currentUser] : users;
  return (
    <div className='w-full'>
      <MiddleInformation users={Otherusers} currentUser={currentUser}/>
      jhjhjh
      
    </div>
  )
}

export default users
