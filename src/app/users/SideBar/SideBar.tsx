import React, { Children } from 'react'
import Header from '../component/Header/Header'

const SideBar = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <div className='sticky z-10 top-0'>
                <Header />
            </div>
           
            <main className=" h-full w-full ">
                {children}
            </main>

        </div>
    )
}

export default SideBar
