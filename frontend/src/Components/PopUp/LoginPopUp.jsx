import { useState } from "react";
import api from "../../backend";
import { API } from "../../backend";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { PulseLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../../redux/actions/userActions";
import { toast } from "react-hot-toast";
import errorIcon from "../../assets/BasicIcon/errorIcon.png";
import errorMessageIcon from "../../assets/BasicIcon/errorIcon2.png";

// The login popup component
const LoginPopUp = ({
  loginEmail,
  setShowLoginPopup,
  setPopup,
  setDefaultPopup,
  setShowErrorMessage,
  showErrorMessage,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  // Get the user from the redux
  const user = useSelector((state) => state.user);
  // console.log("Get the user from the redux in LoginPopUp :", user);

  // Get the dispatch
  const dispatch = useDispatch();

  // handle show the error message
  const handleShowError = () => {
    setShowErrorMessage(false);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // handle the user login
  const handleUserLogin = async (data) => {
    setIsLoading(true);
    setShowErrorMessage(false);
    try {
      // console.log("User login data", data);
      const response = await axios.post(`${API}auth/log-in`, {
        email: loginEmail,
        password: data?.password,
      });

      const userData = response?.data;
      setIsLoading(false);

      // If error occurs then show the error message
      if (userData?.success === 0) {
        // toast.error(userData?.message);
        setShowErrorMessage(true);
        // return;
      } else if (userData?.success === 1) {
        // dispatch the user login action
        dispatch(userLogin(userData));

        // get the access and refresh token
        let accessToken = localStorage.getItem("accessToken");
        let refreshToken = localStorage.getItem("refreshToken");

        // If there is not the access and refreshtoken in the localstroage then set it up
        if (!accessToken) {
          localStorage.setItem(
            "accessToken",
            JSON.stringify(userData?.accessToken)
          );
        } else if (accessToken) {
          accessToken = userData?.accessToken;
          localStorage.setItem("accessToken", JSON.stringify(accessToken));
        }

        // refresh token
        if (!refreshToken) {
          localStorage.setItem(
            "refreshToken",
            JSON.stringify(userData?.refreshToken)
          );
        } else if (refreshToken) {
          refreshToken = userData?.refreshToken;
          localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
        }

        setShowErrorMessage(false);
        setDefaultPopup(true);
        setPopup(false);
        // toast.success(userData?.message);
      }

      // close the login Form popup
      // showLoginPopup(false);

      // console.log("User login response", userData);
    } catch (error) {
      setIsLoading(false);
      console.log("Error while login the user", error);
      toast.error("Network error, please try again later!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthenticated = async (data) => {
    const response = await api.post("/auth/post");
    console.log(response);
    console.log("called");
    console.log(data);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Form Section */}
      <div className="px-8 pt-1">
        {/* Show the error message if the user login fails */}
        {!showErrorMessage ? null : (
          <div className="flex flex-row gap-3 items-center px-3 py-2 border-[#dddddd] border rounded-xl mt-6 mb-2">
            <img src={errorMessageIcon} alt="error Icon" className="w-14" />
            <div className="flex flex-col gap-[2px]">
              <h6 className="text-sm text-[#222222] font-semibold">
                Let&apos;s try again
              </h6>
              <p className="text-[#717171] text-sm opacity-80">
                Incorrect login credentials, please try again
              </p>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit(handleUserLogin)}>
          <div className="relative my-4">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              className="w-full border-[1.5px] border-[#dddddd] p-3 rounded-lg transition-all duration-300"
              {...register("password", {
                required: true,
                pattern: /^.{8,}$/,
              })}
              onChange={handleShowError}
            />

            <span
              className={`absolute ${
                errors.password ? "top-[35%]" : "top-[50%]"
              }  right-3 transform -translate-y-1/2 text-[#222222] text-xs font-semibold underline cursor-pointer`}
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? "Hide" : "Show"}
            </span>
            {errors.password && (
              <div
                role="alert"
                className="flex flex-row items-center gap-2 mt-1"
              >
                <img src={errorIcon} alt="Error Icon" className="w-5" />
                <p className="text-xs text-[#c13515]">
                  Password must be atleast 8 characters long
                </p>
              </div>
            )}
          </div>

          <button
            className={`w-full bg-[#ff385c] hover:bg-[#d90b63] transition-all duration-300 text-white font-medium rounded-lg p-3 disabled:bg-[#dddddd] ${
              isLoading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <PulseLoader
                color="#f7f7f7"
                size={7}
                margin={4}
                speedMultiplier={0.6}
              />
            ) : (
              "Log In"
            )}
          </button>
        </form>
      </div>
      <Link className="underline text-[#222222] text-sm font-medium pt-3 px-8">
        Forgot Password?
      </Link>

      <div className=" pt-4 px-8 italic pb-7">
        <ul className=" list-disc text-xs text-[#222222] opacity-80">
          <p>You can use below guest credentials to try!</p>
          <p>Password: guest@12345</p>
        </ul>
      </div>
    </div>
  );
};

export default LoginPopUp;
