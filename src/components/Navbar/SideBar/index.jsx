import { FaNoteSticky } from "react-icons/fa6";
import { FaBoxArchive } from "react-icons/fa6";
import { FiLogOut } from 'react-icons/fi';
import { MdDashboard } from "react-icons/md";
import Context from "../../../contexts";
import { useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { IoMdClose } from "react-icons/io";
import { FaNotesMedical } from "react-icons/fa6";

function SideBar({ logOut, isOpen, sideBarHandler }) {
  const { locale, theme } = useContext(Context)

  return (
    <aside
      className={
        (theme === 'light' ? 'border-gray-600 md:bg-inherit bg-gray-100' : 'border-gray-400 md:bg-inherit bg-gray-900') + 
        " fixed z-30 top-0 left-0 w-64 h-screen p-4 border-r md:translate-x-0 transition-transform duration-700 " + 
        (isOpen ? 'translate-x-0' : '-translate-x-full')
      }
    >
      <div className="h-full overflow-y-auto flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="md:text-4xl text-2xl font-bold"> Notes App </h1>
          <button className="md:hidden block" onClick={sideBarHandler}><IoMdClose className="w-7 h-7"/></button>
        </div>
        <div className="grid gap-3">
          <div className="px-3 md:text-lg text-sm grid gap-4">
            <Link
              to="/notes-app/"
              className={(theme === 'light' ? 'hover:bg-gray-300' : 'hover:bg-gray-700') + " flex items-center gap-3"}
            >
              <MdDashboard className="md:w-8 md:h-8 w-6 h-8"/>
              <span>{locale === 'id' ? 'Dasbor' : 'Dashboard'}</span>
            </Link>
            <Link
              to="/notes-app/notes/active"
              className={(theme === 'light' ? 'hover:bg-gray-300' : 'hover:bg-gray-700') + " flex items-center gap-3"}
            >
              <FaNoteSticky className="md:w-8 md:h-8 w-6 h-8"/>
              <span >{locale === 'id' ? 'Catatan Aktif' : 'Active Notes'}</span>
            </Link>
            <Link
              to="/notes-app/notes/archive"
              className={(theme === 'light' ? 'hover:bg-gray-300' : 'hover:bg-gray-700') + " flex items-center gap-3"}
            >
              <FaBoxArchive className="md:w-8 md:h-8 w-6 h-8"/>
              <span>{locale === 'id' ? 'Catatan Arsip' : 'Archive Notes'}</span>
            </Link>
            <Link
              to="/notes-app/notes/active/add"
              className={(theme === 'light' ? 'hover:bg-gray-300' : 'hover:bg-gray-700') + " flex items-center gap-3"}
            >
              <FaNotesMedical className="md:w-8 md:h-8 w-6 h-8"/>
              <span>{locale === 'id' ? 'Tambah Catatan' : 'Add Notes'}</span>
            </Link>
          </div>
          <div className={(theme === 'light' ? 'border-gray-600' : 'border-gray-400') + " border-t"}></div>
          <div className="px-3 md:text-lg text-sm grid gap-4">
            <button
              onClick={logOut}
              className={(theme === 'light' ? 'hover:bg-gray-300' : 'hover:bg-gray-700') + " flex items-center gap-3"}
            >
              <FiLogOut className="md:w-8 md:h-8 w-6 h-8"/>
              <span>{locale === 'id' ? 'Keluar' : 'Log Out'}</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

SideBar.propTypes = {
  logOut: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  sideBarHandler: PropTypes.func.isRequired,
};

export default SideBar;
