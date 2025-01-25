import React from 'react';

import LeftSide from './LeftSide/leftSide';
import SideBar from './SideBar/SideBar';

const Userlayout = async ({ children }: { children: React.ReactNode }) => {
 
  return (
    <div className="h-screen flex flex-col">
      <SideBar>
        <div className="flex flex-col md:flex-row h-full">
          {/* Left Side */}
          <div className="hidden md:flex md:w-1/4 lg:w-1/5 border-r border-gray-300 shadow-md">
            <LeftSide />
          </div>

          {/* Main Content */}
          <div className="flex-grow flex flex-col md:w-1/2 lg:w-3/5 border-l border-r border-gray-300 shadow-lg">
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
