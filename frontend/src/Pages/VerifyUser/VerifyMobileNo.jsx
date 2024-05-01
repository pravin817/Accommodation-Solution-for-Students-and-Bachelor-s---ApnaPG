import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import backIcon from "../../assets/BasicIcon/backIcon.png";

import { LiaGreaterThanSolid } from "react-icons/lia";
import { Link, useNavigate } from "react-router-dom";

const governmentDocumentDetail = [
  {
    id: 1,
    title: "Passport",
    description: "Face photo page",
    to: "/doc",
  },
  {
    id: 2,
    title: "Aadhaar Card",
    description: "Front and back page",
    to: "/verify-phone",
  },
  {
    id: 3,
    title: "PAN Card",
    description: "Front and back page",
    to: "/verify-email",
  },
];

const VerifyMobileNo = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  // get the house photos from redux
  const photos = useSelector((state) => state.room.newRoom?.photos);
  const user = useSelector((state) => state.user.userDetails);
  console.log("User", user);

  const userId = user?._id;
  console.log("The user Id is ", userId);

  const navigate = useNavigate();

  const handleSendVerificationCode = () => {
    console.log("Sending verification code");
    console.log("The mobile number is ", mobileNumber);
    setIsVerificationSent(true);
  };

  const handleVerifyMobileNumber = () => {
    console.log("Verifying mobile number");
    console.log("The verification code is ", verificationCode);
  };

  return (
    <section className=" max-w-[1200px] mx-auto px-4 sm:px-8 md:px-10 xl:px-20 py-8 md:py-12">
      <div
        onClick={() => {
          navigate(-1);
        }}
        className=" flex flex-rows gap-3 items-center"
      >
        <img
          src={backIcon}
          alt="back"
          className="w-4 mix-blend-darken cursor-pointer hover:rounded-full hover:bg-[#f1f1f1] inline-block"
        />
        <h5 className="text-[#222222] text-xl font-semibold">
          Verify mobile number
        </h5>
      </div>

      <div className="mt-2">
        <hr className="mt-2 w-full h-[1px] bg-[#dddddd] z-0" />

        <div className="mt-10 w-10/12 mx-auto">
          <div className="flex flex-col items-center justify-center gap-3">
            {!isVerificationSent ? (
              <div className="flex flex-col items-center justify-center gap-3">
                <div>
                  <label>Mobile Number : </label>
                  <input
                    type="text"
                    placeholder="Enter your mobile number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full sm:w-[350px] border p-2 rounded-md"
                  />
                </div>
                <button
                  onClick={handleSendVerificationCode}
                  className="bg-black text-white px-5 py-2 rounded-lg"
                >
                  Send Verification Code
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3">
                <label>OTP : </label>

                <input
                  type="text"
                  placeholder="Enter verification code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full sm:w-[350px] border p-2 rounded-md"
                />
                <button
                  onClick={handleVerifyMobileNumber}
                  className="bg-black text-white px-5 py-2 rounded-lg"
                >
                  Verify Mobile Number
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyMobileNo;
