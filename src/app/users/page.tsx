import { getUsers } from '../actions/getUsers'
import MiddleInformation from './component/MiddleInformation'


const users =async () => {
  const users=await getUsers();
  return (
    <div className='w-full'>
      <MiddleInformation users={users}/>
      jhjhjh
      
    </div>
  )
}

export default users
