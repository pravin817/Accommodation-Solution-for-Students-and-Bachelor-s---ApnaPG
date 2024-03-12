import { useState } from "react";
import backIcon from "../../assets/BasicIcon/backIcon.png";

import { PulseLoader } from "react-spinners";
import { Link } from "react-router-dom";

const LoginPopUp = () => {
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <div className="flex flex-col gap-4">
      {/* Form Section */}
      <div className="px-8 pt-1">
        <form>
          <div className="relative my-4">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              className="w-full border-[1.5px] border-[#dddddd] p-3 rounded-lg transition-all duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
