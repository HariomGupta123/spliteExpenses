import React from 'react';

import LeftSide from './LeftSide/leftSide';
import SideBar from './SideBar/SideBar';
import getCurrentUser from '../actions/getCurrentUser';
import { redirect } from 'next/navigation';

const Userlayout = async ({ children }: { children: React.ReactNode }) => {
//  const currentUser=await getCurrentUser()

  const currentUser = await getCurrentUser()
  if (!currentUser) {
    redirect("/"); // Redirect if user is not found
  }

  const current = {
    id: currentUser.id,
    name: currentUser.name,
    email: currentUser.email,
  };
  return (
    <div className="h-screen flex flex-col">
      <SideBar currentUser={currentUser}>
        <div className="flex flex-col md:flex-row h-full">
          {/* Left Side */}
          <div className="hidden md:flex md:w-1/4 lg:w-1/5 border-r border-gray-300 shadow-md">
            <LeftSide />
          </div>

          {/* Main Content */}
          <div className="flex-grow flex flex-col md:w-1/2 sm:w-2/5 border-l border-r border-gray-300 shadow-lg">
            {children}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex md:w-1/4 lg:w-1/5 border-l border-gray-300 shadow-md">
            <div className="flex-grow flex justify-start items-center p-4">
              <span className="text-gray-500">Content for the right side</span>
            </div>
          </div>
        </div>
      </SideBar>
    </div>
  );
};

export default Userlayout;
