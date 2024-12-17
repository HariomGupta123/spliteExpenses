import MiddleInformation from '../component/MiddleInformation'
import Owe from '../Owe/owe'
import { getUsers } from '@/app/actions/getUsers';
import getCurrentUser from '@/app/actions/getCurrentUser';

const DashBoard = async () => {
    const Otherusers = await getUsers();
    const currentUser = await getCurrentUser()
    return (
        <div className='w-full'>
            <MiddleInformation users={Otherusers} currentUser={currentUser} />
            <div className='full'>
                <Owe currentUser={currentUser} />
            </div>
        </div>
    )
}

export default DashBoard
