import getCurrentUser from '../actions/getCurrentUser';
import { getUsers } from '../actions/getUsers'
import MiddleInformation from './component/MiddleInformation'


const users =async () => {
  const users=await getUsers();
  const currentUser=await getCurrentUser()
  const allUsers = currentUser ? [...users, currentUser] : users;
  return (
    <div className='w-full'>
      <MiddleInformation users={allUsers}/>
      jhjhjh
      
    </div>
  )
}

export default users
