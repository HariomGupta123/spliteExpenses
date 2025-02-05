import profile from "../../../../../public/cardphoto.jpeg";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Profile from "@/app/componets/Profile/Profile";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { User } from "@prisma/client";
interface HeaderProps{
  isOpen:boolean,
  onClose:()=>void
  handleOpen:()=>void
  currentUser:User
}
const Header:React.FC<HeaderProps> =  ({isOpen,onClose,handleOpen,currentUser}) => {
  // const currentUser = await getCurrentUser();

  return (
    <>
   {isOpen && <Profile onClose={onClose} /> }
    <div className="hidden md:flex w-full h-15 bg-red-500 sticky z-10 top-0 font-Poppins text-white">
      <div className="w-full flex">
        {/* First child (Title) */}
        <div className="flex-grow flex justify-center">
          <h1 className="font-extrabold text-3xl p-5">ShareKharch</h1>
        </div>
        {/* Second child (Empty for now) */}
        <div className="flex-grow">
          {/* Add content if needed */}
        </div>
        {/* Third child (Avatar and Name) */}
        <div className="flex-grow flex items-center justify-start">
          <div className="flex row-auto justify-center items-center">
            <span className="mr-2">
              <Avatar>
                  <AvatarImage src={currentUser?.image ?? undefined} alt="profile" />
              </Avatar>
            </span>
            <span className="font-semibold text-white cursor-pointer" onClick={handleOpen}>
              {currentUser.name}
            </span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Header;
