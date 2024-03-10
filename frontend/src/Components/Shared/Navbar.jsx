import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// Import the icons
import searchIcon from "../../assets/BasicIcon/search.svg";
import hamburgerMenu from "../../assets/BasicIcon/hamburgerMenu.svg";
import userProfile from "../../assets/BasicIcon/userProfile.png";
import AuthenticationPopUp from "../PopUp/AuthenticationPopUp";

const Navbar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [popup, setPopup] = useState(false);

  const userMenuRef = useRef(null);

  // Close the user menu when clicked outside of the menu
  useEffect(() => {
    const handleOutSideClick = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mouseup", handleOutSideClick);
    return () => {
      document.removeEventListener("mouseup", handleOutSideClick);
    };
  }, []);

  return (
    <nav className=" max-w-screen-2xl xl:mx-auto">
      <div className="xl:px-10 grid grid-cols-3 py-4">
        {/* The Company logo */}
        <div className="flex flex-row gap-2 items-center">
          <Link className="text-xl text-[#ff385c] font-bold">
            Apna<span className="text-black">PG</span>
          </Link>
        </div>
        {/* search bar */}
        <div className="mx-auto max-w-sm">
          <div className="border-[1px] border-[#dddddd] rounded-full px-3 py-2 flex items-center shadow hover:shadow-md transition-all cursor-pointer">
            <div className="flex flex-row items-center nav__search__button">
              <p className="text-[#717171] mr-5">Search Room now...</p>
              <div className="bg-[#ff385c] rounded-full p-2">
                <img src={searchIcon} alt="Search hotel" className="w-4" />
              </div>
            </div>
          </div>
        </div>
        {/* user profile */}
        <div className="flex justify-end items-center">
          <div className=" bg-[#ffffff] hover:bg-[#f0f0f0] transition-all rounded-full p-3 cursor-pointer mr-3">
            <p className="text-sm font-medium text-[#222222]">Rent room now</p>
          </div>
          <div
            className="border-[1px] border-[#dddddd] rounded-full py-1 px-2 flex flex-row gap-2 hover:shadow-md transition-all cursor-pointer relative"
            onClick={() => {
              setShowUserMenu((preValue) => !preValue);
            }}
          >
            <img src={hamburgerMenu} alt="User Menu" className="w-4" />
            <img src={userProfile} alt="User Profile" className="w-8" />
          </div>

          {/* show the user menu based on the condition  */}
          {showUserMenu && (
            <div
              ref={userMenuRef}
              className="flex flex-col border-[1px] border-[#ddddd] rounded-lg py-2 w-[230px] absolute top-[74px] right-9 shadow-md transition-all user-menu"
            >
              <Link
                className="font-medium"
                onClick={() => {
                  setShowUserMenu(false);
                  setPopup(true);
                }}
              >
                Sign up
              </Link>
              <Link
                onClick={() => {
                  setShowUserMenu(false);
                  setPopup(true);
                }}
              >
                Login
              </Link>
              <hr className="h-[1.5px] bg-[#ddddd] my-1" />
              <Link>Rent your Room</Link>
              <Link>Help</Link>
            </div>
          )}
        </div>
      </div>
      <AuthenticationPopUp popup={popup} setPopup={setPopup} />
    </nav>
  );
};

export default Navbar;
