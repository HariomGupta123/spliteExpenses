import { redirect } from 'next/navigation';
import MiddleInformation from '../component/MiddleInformation'
import Owe from '../Owe/owe'
import getCurrentUser from '@/app/actions/getCurrentUser';


const DashBoard = async () => {
    
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        redirect("/")
    }

    const current = {
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        image:currentUser.image
    };


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
