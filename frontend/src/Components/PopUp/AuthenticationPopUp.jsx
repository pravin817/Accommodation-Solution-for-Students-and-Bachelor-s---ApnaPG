import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import axios from "axios";
import { PulseLoader } from "react-spinners";
import { API } from "../../backend";

// Import the icons
import closeIcon from "../../assets/BasicIcon/closeIcon.svg";
import backIcon from "../../assets/BasicIcon/backIcon.png";
import googleIcon from "../../assets/BasicIcon/googleIcon.svg";
import facebookIcon from "../../assets/BasicIcon/facebookIcon.svg";

// Import the components
import LoginPopUp from "./LoginPopUp";
import CreateUserProfile from "./CreateUserProfile";
import WelcomePopUp from "./WelcomePopUp";

const AuthenticationPopUp = ({ popup, setPopup }) => {
  const [showCreateUserPopup, setShowCreateUserPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [defaultPopup, setDefaultPopup] = useState(true);

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
      }
    };

    document.addEventListener("mouseup", handleOutSideClick);
    return () => {
      document.removeEventListener("mouseup", handleOutSideClick);
    };
  }, []);

  return (
    // <>
    //   <LoginPopUp />
    // </>
    <>
      {popup !== true ? null : (
        <div className="absolute inset-0 w-screen h-screen bg-[#0000005c] popup-overlay">
          <div
            ref={popUpRef}
            className={`absolute left-[27.5%] right-[27.5%] top-[12%]  w-[45vw] bg-[#ffffff] shadow-2xl rounded-xl  overflow-hidden
            ${
              showLoginPopup
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
                />
              )}
              {!showLoginPopup ? null : (
                <LoginPopUp onBack={handleCloseLoginPopup} />
              )}
              {!showCreateUserPopup ? null : (
                <CreateUserProfile onBack={handleCloseLoginPopup} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// set the propsType
AuthenticationPopUp.propTypes = {
  popup: PropTypes.bool,
  setPopup: PropTypes.bool,
};

export default AuthenticationPopUp;
