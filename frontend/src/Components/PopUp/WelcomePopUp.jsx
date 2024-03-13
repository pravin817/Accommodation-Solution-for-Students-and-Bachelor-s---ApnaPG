import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import { API } from "../../backend";

// Import the icons
import googleIcon from "../../assets/BasicIcon/googleIcon.svg";
import facebookIcon from "../../assets/BasicIcon/facebookIcon.svg";

const WelcomePopUp = ({
  setDefaultPopup,
  setShowLoginPopup,
  setShowCreateUserPopup,
  setLoginEmail,
  signInDivRef,
}) => {
  const { handleSubmit, register, reset } = useForm();
  const [inputFocused, setInputFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [testEmail, setTestEmail] = useState(false);

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };

  // Check if the user exists
  const handleCheckEmail = async (data) => {
    console.log(data);
    console.log("The Authentications :", data.email);

    const email = data.email;
    setLoginEmail(email);
    setIsLoading(true);

    try {
      const res = await axios.post(
        `${API}auth/check-email`,
        { email: email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res.data);

      // If the user is alreday registered
      if (res?.data?.success) {
        setDefaultPopup(false);
        setShowLoginPopup(true);
      } else {
        setDefaultPopup(false);
        setShowCreateUserPopup(true);
      }

      // Use this data for the further process
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookLogin = () => {
    console.log("Facebook login clicked");
    // Loading the Facebook SDK asynchronously
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "1025897438850966",
        cookie: true,
        xfbml: true,
        version: "v13.0",
      });

      // Check login status
      window.FB.getLoginStatus(function (response) {
        if (response.status === "connected") {
          // User is logged in and authenticated
          setIsLoggedIn(true);
        } else {
          // User is not logged in or not authenticated
          // Prompt the user to log in with Facebook
          window.FB.login(function (response) {
            if (response.authResponse) {
              // User successfully logged in and authenticated
              setIsLoggedIn(true);
            } else {
              // User canceled the login or didn't authorize the app
              setIsLoggedIn(false);
            }
          });
        }
      });
    };

    // Load the Facebook SDK script
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src =
        "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v13.0&appId=1025897438850966&autoLogAppEvents=1";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  };

  return (
    <div className="flex flex-col gap-4">
      {/* welcome user on the popup */}
      <div className="px-8 pt-4">
        <h2 className="font-medium text-[22px] text-[#222222]">
          Welcome to
          <span className="text-[#ff385c] font-semibold">Apna</span>
          <span className="text-black font-semibold">PG</span>
        </h2>

        <form onSubmit={handleSubmit(handleCheckEmail)}>
          <input
            type="email"
            placeholder="Enter Email"
            value={testEmail ? "guest@gmail.com" : ""}
            className={`w-full border-[1.5px] border-[#dddddd] p-3 rounded-lg transition-all duration-300 mt-3 ${
              inputFocused ? "placeholder-shrink" : "placeholder-restore"
            }`}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            {...register("email", { required: true })}
          />

          <p className="text-xs text-[#222222] pt-3 mb-5 opacity-80 ml-[2px]">
            We’ll send a confirmation email to verify your email address.
            <br />
            <Link className="font-semibold underline">Privacy Policy</Link>
          </p>

          <div
            className="flex flex-row items-center gap-5 mb-4 ml-[2px] cursor-pointer"
            onClick={() => {
              setTestEmail(!testEmail);
            }}
          >
            <input
              type="checkbox"
              className="h-4 w-4"
              id="addGuestEmailCheckbox"
              checked={testEmail}
              onChange={() => setTestEmail(!testEmail)}
            />
            <span htmlFor="addGuestEmailCheckbox">Add guest email</span>
          </div>

          <button className="bg-[#ff385c] hover:bg-[#d90b63] transition-all duration-300 text-white font-medium rounded-lg p-3 w-full">
            Continue
          </button>
        </form>
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
          <img src={googleIcon} alt="Log in With Google" className="w-6 ml-5" />
          <p className="text-sm mx-auto font-medium text-[#222222]">
            Continue with Google
          </p>
        </div>

        <div
          className="w-full flex flex-row items-center border border-[#222222] rounded-lg py-[10px] bg-[#ffffff] hover:bg-[#f7f7f7] transition-colors cursor-pointer"
          onClick={handleFacebookLogin}
        >
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
  );
};

export default WelcomePopUp;
