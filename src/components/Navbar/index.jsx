import { MdLightbulbOutline } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import PropTypes from "prop-types";
import Context from "../../contexts";
import { useContext, useState } from "react";
import SideBar from "./SideBar";

function Navigation( { isAuthedUser, logOut }) {
  const {locale, toggleLocale, theme, toggleTheme} = useContext(Context)
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);

  const buttonSideBarHandler = () => {
    setIsOpenSideBar(!isOpenSideBar);
  }

  return (
    <>
      {(isAuthedUser !== null) && (
        <>
          <SideBar
            logOut={logOut}
            isOpen={isOpenSideBar}
            sideBarHandler={buttonSideBarHandler}
          />
          {isOpenSideBar && (
            <div
              className="fixed z-20 inset-0 overflow-hidden bg-black opacity-50"
            ></div>
          )}
        </>
      )}
      <nav className="fixed z-10 w-screen">
        <div className="py-4 px-8">
          <div className="flex justify-between items-center">
            <button 
              className={"cursor-pointer"}
              onClick={buttonSideBarHandler}
            >
              <RxHamburgerMenu className={((isAuthedUser !== null) ? 'md:hidden block' : 'hidden') + " text-2xl"}/>
            </button>
            <div className="flex gap-4">
              <button 
                className={(theme === 'light' ? 'text-white bg-gray-900' : 'text-black bg-gray-100') + " cursor-pointer rounded-full w-10 h-10 flex items-center justify-center"}
                onClick={toggleTheme}
              >
                {theme === 'light'
                  ? <MdLightbulbOutline />
                  : <FaMoon />}
              </button>
              <button 
                className={(theme === 'light' ? 'text-white bg-gray-900' : 'text-black bg-gray-100') + " cursor-pointer rounded-full w-10 h-10"}
                onClick={toggleLocale}
              >
                {locale === 'id'
                  ? 'ID'
                  : 'EN'}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

Navigation.propTypes = {
  isAuthedUser: PropTypes.any,
  logOut: PropTypes.func.isRequired
}

export default Navigation;