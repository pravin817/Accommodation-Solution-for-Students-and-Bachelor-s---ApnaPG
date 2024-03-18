import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getUser,
  userLogin,
  userLogOut,
} from "../../redux/actions/userActions";

// Import the icons
import searchIcon from "../../assets/BasicIcon/search.svg";
import hamburgerMenu from "../../assets/BasicIcon/hamburgerMenu.svg";
import userProfile from "../../assets/BasicIcon/userProfile.png";
import AuthenticationPopUp from "../PopUp/AuthenticationPopUp";

const Navbar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [popup, setPopup] = useState(false);

  const location = useLocation();
  const pathName = location.pathname;
  const inUserProfile = pathName.includes("/users/show/");

  const userMenuRef = useRef(null);

  // get the user
  const user = useSelector((state) => state.user.userDetails);
  console.log("user : ", user);

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(userLogOut());
  };

  // get the user details
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

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
    <nav
      className={` border-b-[1.4px] border-[#f1f1f1] sticky top-0 z-[99] bg-white`}
    >
      <div
        className={`xl:px-10 grid grid-cols-3 py-4 xl:mx-auto ${
          inUserProfile ? " max-w-[1200px]" : " max-w-screen-2xl"
        }`}
      >
        {/* The Company logo */}
        <div className="flex flex-row gap-2 items-center">
          <Link className="text-xl text-[#ff385c] font-bold">
            Apna<span className="text-black">PG</span>
          </Link>
        </div>
        {/* search bar */}
        {!inUserProfile ? (
          <div className="mx-auto max-w-sm">
            <div className="border-[1px] border-[#dddddd] rounded-full px-3 py-2 flex items-center shadow hover:shadow-md transition-all cursor-pointer">
              <div className="flex flex-row items-center nav__search__button">
                <p>Anywhere</p>
                <p>Any week</p>
                <p className=" text-[#717171]">Add guests</p>
                <div className="bg-[#ff385c] rounded-full p-2">
                  <img src={searchIcon} alt="Search hotel" className="w-4" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className=" w-8"></div>
        )}
        {/* user profile */}
        <div className="flex justify-end items-center">
          <div className=" bg-[#ffffff] hover:bg-[#f0f0f0] transition-all rounded-full p-3 cursor-pointer mr-3">
            <p className="text-sm font-medium text-[#222222]">Rent room now</p>
          </div>
          <div
            className="border-[1px] border-[#dddddd] rounded-full py-1 px-2 flex flex-row gap-3 hover:shadow-md transition-all cursor-pointer relative"
            onClick={() => {
              setShowUserMenu((preValue) => !preValue);
            }}
          >
            <img src={hamburgerMenu} alt="User Menu" className="w-4" />

            {/* show the user name based on the condition */}
            {user ? (
              <p className=" bg-[#222222] text-[#efefef] px-3 py-2 rounded-full text-xs">
                {user.name?.firstName?.slice(0, 1)}
              </p>
            ) : (
              <img src={userProfile} alt="User Profile" className="w-8" />
            )}
          </div>

          {/* show the user menu based on the condition  */}
          {showUserMenu ? (
            <div>
              {!user ? (
                <div
                  ref={userMenuRef}
                  className="shadow-md absolute right-9 top-[74px] bg-[#ffffff] border-[1px] border-[#dddddd] rounded-lg flex flex-col py-2 w-[230px] transition-all user-menu"
                  onClick={() => {
                    setShowUserMenu((prev) => !prev);
                  }}
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
              ) : (
                <div
                  ref={userMenuRef}
                  className="shadow-md absolute right-9 top-[70px] bg-[#ffffff] border-[1px] border-[#dddddd] rounded-lg flex flex-col py-2 w-[230px] transition-all user__menu"
                >
                  <Link
                    className="font-medium"
                    onClick={() => {
                      setShowUserMenu(false);
                    }}
                  >
                    Notifications
                  </Link>

                  <Link
                    className="font-medium"
                    onClick={() => {
                      setShowUserMenu(false);
                    }}
                  >
                    Trips
                  </Link>

                  <Link
                    className="font-medium"
                    onClick={() => {
                      setShowUserMenu(false);
                    }}
                  >
                    WishLists
                  </Link>

                  <hr className="h-[1.5px] bg-[#dddddd] my-1" />
                  <Link>Rent Your Room</Link>
                  <Link to={`/users/show/${user._id}`}>Account</Link>
                  <hr className="h-[1.5px] bg-[#dddddd] my-1" />
                  <Link>Help</Link>
                  <Link
                    onClick={() => {
                      handleLogOut();

                      // Reload the page to avoid the UX issues
                      // window.reload();
                    }}
                  >
                    Log Out
                  </Link>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
      <AuthenticationPopUp popup={popup} setPopup={setPopup} />
    </nav>
  );
};

export default Navbar;
