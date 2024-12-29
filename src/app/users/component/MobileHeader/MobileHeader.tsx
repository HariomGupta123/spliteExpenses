import { FaSearch, FaUsers } from "react-icons/fa";

const SmallDeviceHeader = () => {
    return (
        <div className="flex justify-end items-center px-4 py-3 bg-gray-100 text-gray-800 shadow-md sm:flex md:hidden">
            {/* Search Icon */}
            <FaSearch className="text-xl mx-2" />
            {/* Add Group Icon */}
            <FaUsers className="text-xl mx-2" />
        </div>
    );
};

export default SmallDeviceHeader;
