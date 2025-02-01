"use client"

import React, { useState } from 'react';
import Header from '../component/Header/Header';
import MobileFooter from '@/app/componets/MobileFooter';
import MobileHeader from '../component/MobileHeader/MobileHeader';
import { User } from '@/app/type/type';
interface SideBarProps{
    children:  React.ReactNode
    currentUser:User
}
const SideBar:React.FC<SideBarProps> = ({ children ,currentUser}) => {
    const [isOpen,setIsOpen]=useState(false)
    return (
        <div>
            <div className='sticky z-10 top-0'>
                <Header currentUser={currentUser} isOpen={isOpen} handleOpen={()=>setIsOpen(true)} onClose={()=>setIsOpen(false)} />
                <MobileHeader />
            </div>
            <main className="h-full w-full">
                {children}
            </main>
            <MobileFooter />
        </div>
    );
};

export default SideBar;
