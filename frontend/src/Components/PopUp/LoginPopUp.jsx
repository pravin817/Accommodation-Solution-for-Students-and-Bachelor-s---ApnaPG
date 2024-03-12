import { useState } from "react";
import api from "../../backend";
import { API } from "../../backend";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { PulseLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const LoginPopUp = ({ loginEmail }) => {
  const user = useSelector((state) => state.user);
  // console.log("Get the user from the redux in LoginPopUp :", user);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, register, reset } = useForm();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // handle the user login
  const handleUserLogin = async (data) => {
    console.log(data);
    setIsLoading(true);
    const response = await axios.post(`${API}auth/log-in`, {
      email: loginEmail,
      password: data?.password,
    });
    const userData = response.data;
    setIsLoading(false);
    console.log(userData);

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
        <form onSubmit={handleSubmit(handleUserLogin)}>
          <div className="relative my-4">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              className="w-full border-[1.5px] border-[#dddddd] p-3 rounded-lg transition-all duration-300"
              {...register("password", { required: true })}
            />

            <span
              className="absolute top-[50%] right-3 transform -translate-y-1/2 text-[#222222] text-xs font-semibold underline cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? "Hide" : "Show"}
            </span>
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
    </div>
  );
};

export default LoginPopUp;
