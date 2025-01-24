import MiddleInformation from '../component/MiddleInformation'
import Owe from '../Owe/owe'
// import { getUsers } from '@/app/actions/getUsers';
import getCurrentUser from '@/app/actions/getCurrentUser';


const DashBoard = async () => {
    
    // const otherUser =await getUsers()
    const currentUser = await getCurrentUser()
    const current={
        id:currentUser.id,
        name:currentUser.name,
        email:currentUser.email
    }


    return (
        <div className='w-full'>
            <MiddleInformation   titleText='DashBoard' currentUser={current} />
            <div className='full'>
                <Owe currentUser={currentUser} />
            </div>
        </div>
    )
}

export default DashBoard
