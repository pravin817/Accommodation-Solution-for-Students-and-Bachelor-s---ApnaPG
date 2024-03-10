import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Import the icons
import closeIcon from "../../assets/BasicIcon/closeIcon.svg";
import googleIcon from "../../assets/BasicIcon/googleIcon.svg";
import facebookIcon from "../../assets/BasicIcon/facebookIcon.svg";

const AuthenticationPopUp = ({ popup, setPopup }) => {
  const [inputFocused, setInputFocused] = useState(false);
  const popUpRef = useRef(null);

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
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
    <>
      {popup !== true ? null : (
        <div className="absolute inset-0 w-screen h-screen bg-[#0000005c] popup-overlay">
          <div
            ref={popUpRef}
            className="absolute left-[30%] right-[30%] top-[12%] h-[80vh] w-[40vw] bg-[#ffffff] shadow-2xl rounded-xl overflow-y-auto popup-container"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center w-full py-4 border-b-[1px] px-8">
                <img
                  src={closeIcon}
                  alt="close Icon"
                  className="w-8 hover:bg-[#f1f1f1] transition-colors rounded-full cursor-pointer p-2"
                  onClick={() => {
                    setPopup(false);
                  }}
                />

                <p className="text-base mx-auto font-semibold text-[#222222]">
                  Log in or sign up
                </p>
              </div>

              {/* welcome user on the popup */}
              <div className="px-8 pt-1">
                <h2 className="font-medium text-[22px] text-[#222222]">
                  Welcome to
                  <span className="text-[#ff385c] font-semibold">Apna</span>
                  <span className="text-black font-semibold">PG</span>
                </h2>
                <div>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    className={`w-full border-[1.5px] border-[#dddddd] p-3 rounded-lg transition-all duration-300 mt-3 ${
                      inputFocused
                        ? "placeholder-shrink"
                        : "placeholder-restore"
                    }`}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                  />

                  <p className="text-xs text-[#222222] pt-3 mb-5 opacity-80 ml-[2px]">
                    We’ll send a confirmation email to verify your email
                    address.
                    <br />
                    <Link className="font-semibold underline">
                      Privacy Policy
                    </Link>
                  </p>

                  <button className="bg-[#ff385c] hover:bg-[#d90b63] transition-all duration-300 text-white font-medium rounded-lg p-3 w-full">
                    Continue
                  </button>
                </div>
              </div>

              {/* social media login section */}
              {/* divider  */}
              <div className="flex flex-row items-center p-8">
                <div className="h-[1.2px] w-full inline-block bg-[#dddddd]"></div>
                <p className="text-xs inline-block mx-2">or</p>
                <div className="h-[1.2px] w-full inline-block bg-[#dddddd]"></div>
              </div>

              {/* continue with Google  */}
              <div className="flex flex-col gap-4 px-8">
                <div className="w-full flex flex-row items-center border border-[#222222] rounded-lg py-[10px] bg-[#ffffff] hover:bg-[#f7f7f7] cursor-pointer transition-colors">
                  <img
                    src={googleIcon}
                    alt="Log in With Google"
                    className="w-6 ml-5"
                  />
                  <p className="text-sm mx-auto font-medium text-[#222222]">
                    Continue with Google
                  </p>
                </div>

                <div className="w-full flex flex-row items-center border border-[#222222] rounded-lg py-[10px] bg-[#ffffff] hover:bg-[#f7f7f7] cursor-pointer transition-colors">
                  <img
                    src={facebookIcon}
                    alt="Log in With Facebook"
                    className="w-6 ml-5"
                  />
                  <p className="text-sm mx-auto font-medium text-[#222222]">
                    Continue with Facebook
                  </p>
                </div>
              </div>
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
