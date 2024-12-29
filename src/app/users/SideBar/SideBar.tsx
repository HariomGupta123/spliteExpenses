import React, { Children } from 'react'
import Header from '../component/Header/Header'
import MobileFooter from '@/app/componets/MobileFooter'
import MobileHeader from '../component/MobileHeader/MobileHeader'

const SideBar = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <div className='sticky z-10 top-0'>
                <Header />
                <MobileHeader/>
            </div>
            <main className=" h-full w-full ">
                {children}
            </main>
            <MobileFooter/>
        </div>
    )
}

export default SideBar
