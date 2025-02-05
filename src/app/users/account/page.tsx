import React from 'react'
import Account from './Account'
import getCurrentUser from '@/app/actions/getCurrentUser'
import { redirect } from 'next/navigation';

const page = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        redirect("/")
    }

    // const current = {
    //     id: currentUser.id,
    //     name: currentUser.name,
    //     email: currentUser.email,
    // };
    return (
        <div>
            <Account currentUser={currentUser} />
        </div>
    )
}

export default page
