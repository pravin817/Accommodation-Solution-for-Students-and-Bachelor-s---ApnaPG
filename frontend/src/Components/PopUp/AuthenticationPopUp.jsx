import { useState, useEffect, useRef } from "react";

// Import the icons
import closeIcon from "../../assets/BasicIcon/closeIcon.svg";
import backIcon from "../../assets/BasicIcon/backIcon.png";

// Import the components
import LoginPopUp from "./LoginPopUp";
import WelcomePopUp from "./WelcomePopUp";
import CreateUserPopUp from "./CreateUserPopUp";
import CreateProfilePopUp from "./CreateProfilePopUp";

const AuthenticationPopUp = ({ popup, setPopup }) => {
  const [showCreateUserPopup, setShowCreateUserPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [defaultPopup, setDefaultPopup] = useState(true);
  const [loginEmail, setLoginEmail] = useState(null);
  const [profilePopup, setProfilePopup] = useState(false);

  const popUpRef = useRef(null);

  const handleCloseLoginPopup = () => {
    setShowLoginPopup(false);
    setShowCreateUserPopup(false);
    setDefaultPopup(true);
  };

  // Close the popup when clicked outside of the popup
  useEffect(() => {
    const handleOutSideClick = (event) => {
      if (popUpRef.current && !popUpRef.current.contains(event.target)) {
        setPopup(false);
        setShowCreateUserPopup(false);
        setShowLoginPopup(false);
        setProfilePopup(false);
        setDefaultPopup(true);
      }
    };

    document.addEventListener("mouseup", handleOutSideClick);
    return () => {
      document.removeEventListener("mouseup", handleOutSideClick);
    };
  }, []);

  return (
    <>
      {popup !== true ? null : (
        <div className="absolute inset-0 w-screen h-screen bg-[#0000005c] popup-overlay">
          <div
            ref={popUpRef}
            className={`absolute left-[27.5%] right-[27.5%] top-[12%]  w-[45vw] bg-[#ffffff] shadow-2xl rounded-xl  overflow-hidden
            ${
              showLoginPopup || profilePopup
                ? "h-[60vh] popup-container-login"
                : "h-[80vh] popup-container"
            }
            `}
          >
            {/* show the proper components based on the state */}
            <div className=" flex items-center w-full py-4 border-b-[1px] px-8 sticky top-0 bg-[#ffffff]">
              {defaultPopup ? (
                <img
                  src={closeIcon}
                  alt="close icon"
                  className="w-8 hover:bg-[#f1f1f1] transition-colors rounded-full p-2 cursor-pointer"
                  onClick={() => {
                    setPopup(false);
                  }}
                />
              ) : profilePopup ? (
                <img
                  src={backIcon}
                  alt="close Icon"
                  className="w-8 hover:bg-[#f1f1f1] transition-colors rounded-fyll p-2 cursor-pointer"
                  onClick={() => {
                    setPopup(false);
                  }}
                />
              ) : (
                <img
                  src={backIcon}
                  alt="close icon"
                  className="w-8 hover:bg-[#f1f1f1] transition-colors rounded-full p-2 cursor-pointer"
                  onClick={() => {
                    handleCloseLoginPopup();
                  }}
                />
              )}
              <p className="text-base mx-auto font-semibold text-[#222222]">
                {defaultPopup
                  ? "Log in or sign up"
                  : showLoginPopup
                  ? "Log in"
                  : showCreateUserPopup
                  ? "Finish signing up"
                  : profilePopup
                  ? "Create you ApnaPG profile"
                  : "Log in or sign up"}
              </p>
              <div className="w-[14px]"> </div>
            </div>
            <div
              className={`overflow-y-auto ${
                showLoginPopup ? "h-[50vh]" : "h-[70vh]"
              }`}
            >
              {!defaultPopup ? null : (
                <WelcomePopUp
                  setDefaultPopup={setDefaultPopup}
                  setShowLoginPopup={setShowLoginPopup}
                  setShowCreateUserPopup={setShowCreateUserPopup}
                  setLoginEmail={setLoginEmail}
                />
              )}
              {!showLoginPopup ? null : (
                <LoginPopUp
                  onBack={handleCloseLoginPopup}
                  loginEmail={loginEmail}
                  setDefaultPopup={setDefaultPopup}
                  setShowLoginPopup={setShowLoginPopup}
                  setPopup={setPopup}
                />
              )}
              {!showCreateUserPopup ? null : (
                <CreateUserPopUp
                  onBack={handleCloseLoginPopup}
                  loginEmail={loginEmail}
                  setProfilePopup={setProfilePopup}
                  showCreatePopUp={setShowCreateUserPopup}
                  setPopup={setPopup}
                />
              )}

              {/* go to create user profile */}
              {!profilePopup ? null : (
                <CreateProfilePopUp
                  setShowProfilePopup={setProfilePopup}
                  setPopup={setPopup}
                  setDefaultPopup={setDefaultPopup}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthenticationPopUp;
