import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import house from "../../assets/BasicIcon/houseWhite.png";

import AuthenticationPopUp from "../PopUp/authentication/AuthenticationPopUp";
import DashboardMenu from "./DashboardMenu";

const Navbar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [popup, setPopup] = useState(false);

  const navigate = useNavigate();
  const userMenuRef = useRef(null);
  const location = useLocation();
  const pathName = location.pathname;

  const inUserProfile = pathName.includes("/users/show/");
  const inUserDashboard = pathName?.includes("/users/dashboard/");
  const inHostRoomsLandingPage = pathName.includes("/host/rooms");
  const inListingDetailsPage = pathName?.includes("/listing");
  const inBookingPage = pathName?.includes("/book/stays");
  const isSmallDevice = window.innerWidth < 768;

  // get the user
  const user = useSelector((state) => state.user.userDetails);
  console.log("user : ", user);

  // Get the user id

  const userId = user?._id;
  console.log("The user Id is ", userId);

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(userLogOut());
  };

  // get the user details
  useEffect(() => {
    dispatch(getUser());
  }, []);

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
      className={`border-b-[1.4px] border-[#f1f1f1] sticky top-0 z-[99] bg-white ${
        inBookingPage && "hidden md:block"
      }`}
    >
      <div
        className={`xl:px-10 py-4 xl:mx-auto items-center px-5 relative ${
          inUserProfile ||
          inUserDashboard ||
          inHostRoomsLandingPage ||
          inListingDetailsPage
            ? " max-w-screen-xl"
            : " max-w-screen-2xl"
        }
        ${
          inUserDashboard || inHostRoomsLandingPage
            ? "flex flex-row justify-between"
            : "grid grid-cols-2 lg:grid-cols-3 gap-2"
        }
        ${inHostRoomsLandingPage ? " xl:px-20" : ""}
        `}
      >
        {/* The Company logo */}
        <div className=" md:w-[160px]">
          <span className="flex flex-row gap-2 items-center max-w-[120px]">
            <Link
              className="text-xl text-[#ff385c] font-bold"
              onClick={() => {
                JSON.stringify(localStorage.setItem("category", "House"));
              }}
              to={"/"}
            >
              Apna<span className="text-black">PG</span>
            </Link>

            {/* if user is in hosting homes page we want only logo */}
            {/* {inHostRoomsLandingPage || isSmallDevice ? null : (
              <p className="text-xl text-[#ff385c] font-bold">ApanaPG</p>
            )} */}
          </span>
        </div>

        {/* if not in the booking page then show the options 👇 */}
        {inBookingPage ? (
          <div> </div>
        ) : (
          <>
            {/* searchbar */}
            {inUserProfile || inUserDashboard || inHostRoomsLandingPage ? (
              // if user is in dahsboard
              <div>{inUserDashboard && <DashboardMenu />} </div>
            ) : (
              <div className="mx-auto lg:block hidden">
                <div className="border-[1px] border-[#dddddd] rounded-full px-3 py-2 flex items-center shadow hover:shadow-md transition-all cursor-pointer">
                  <input
                    type="search"
                    className=" focus:outline-none pl-2"
                    placeholder="Search for places"
                  />
                  <div className="bg-[#ff385c] rounded-full p-2">
                    <img src={searchIcon} alt="Search Rooms" className="w-4" />
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* if in the booking page don't show any option 👇  */}
        {inBookingPage ? (
          <div> </div>
        ) : (
          <>
            {/* If the user in the host Room landing page then show the different options  */}
            {inHostRoomsLandingPage ? (
              <div className=" flex flex-row items-center justify-between gap-4">
                <p className=" text-[#222222] text-sm font-medium hidden sm:block">
                  Ready to Host it?
                </p>
                <Link
                  to="/become-a-host"
                  className=" flex flex-row justify-between items-center gap-2 bg-[#ff385c] hover:bg-[#d90b63] transition-all duration-300 px-3 py-2 rounded-lg"
                >
                  <img src={house} alt="House setup" className=" w-4 md:w-5" />
                  <p className=" font-semibold text-sm md:text-base text-white">
                    ApnaPG setup
                  </p>
                </Link>
              </div>
            ) : (
              <>
                {/* user profile */}
                <div className="flex justify-end items-center">
                  {!inUserDashboard && (
                    <Link
                      to="/host/rooms"
                      className=" bg-[#ffffff] hover:bg-[#f0f0f0] transition-all rounded-full p-3 cursor-pointer mr-3 md:block hidden"
                    >
                      <p className="text-sm font-medium text-[#222222]">
                        Host your room
                      </p>
                    </Link>
                  )}

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
                      <img
                        src={userProfile}
                        alt="User Profile"
                        className="w-8"
                      />
                    )}
                  </div>

                  {/* show the below user menu if the user is not login */}
                  {showUserMenu ? (
                    <div>
                      {!user ? (
                        <div
                          ref={userMenuRef}
                          className="shadow-md absolute right-9 top-[74px] bg-[#ffffff] border-[1px] border-[#dddddd] rounded-lg flex flex-col py-2 w-[230px] transition-all user-menu"
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
                          <Link to={"/host/rooms"}>Rent your Room</Link>
                          <Link to={"/help"}>Help</Link>
                        </div>
                      ) : (
                        // Logged In User Menu
                        <div
                          ref={userMenuRef}
                          className="shadow-md absolute right-9 top-[70px] bg-[#ffffff] border-[1px] border-[#dddddd] rounded-lg flex flex-col py-2 w-[230px] transition-all user-menu z-10000"
                          onClick={() => {
                            setShowUserMenu((prev) => !prev);
                          }}
                        >
                          {user?.role === "host" || user?.role === "admin" ? (
                            <>
                              {!inUserDashboard ? (
                                <Link
                                  to={`/users/dashboard/${user._id}/overview=true`}
                                  onClick={() => {
                                    JSON.stringify(
                                      sessionStorage.setItem("activePage", 1)
                                    );
                                  }}
                                  className="font-medium"
                                >
                                  Dashboard
                                </Link>
                              ) : (
                                <Link className="font-medium" to={"/"}>
                                  Home
                                </Link>
                              )}
                            </>
                          ) : (
                            <Link className="font-medium">Notifications</Link>
                          )}

                          <Link
                            className="font-medium"
                            onClick={() => {
                              setShowUserMenu(false);
                            }}
                          >
                            Bookings
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
                          <Link to={"/host/rooms"}>Rent Your Room</Link>
                          <Link to={`/users/show/${userId}/verify-account`}>
                            Verify Account
                          </Link>
                          <Link to={`/users/show/${user._id}`}>Account</Link>
                          <hr className="h-[1.5px] bg-[#dddddd] my-1" />
                          <Link to={"/help"}>Help</Link>
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
              </>
            )}
          </>
        )}
      </div>
      <AuthenticationPopUp popup={popup} setPopup={setPopup} />
    </nav>
  );
};

export default Navbar;
