
import getCurrentUser from '../actions/getCurrentUser';
import { getUsers } from '../actions/getUsers'
import MiddleInformation from './component/MiddleInformation'
import DashBoard from './dashboard/page';

import Owe from './Owe/owe';

const Users = async () => {
  const Otherusers = await getUsers();
  const currentUser = await getCurrentUser()
 
  return (
    <div className='w-full'>
  jhgk
    </div>
  )
}

export default Users
