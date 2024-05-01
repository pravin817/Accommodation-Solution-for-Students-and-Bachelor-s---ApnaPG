import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { LiaGreaterThanSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

const verificationOptions = [
  {
    id: 1,
    title: "Verify your Government ID",
    description: "Verify your Government ID to continue",
    to: "/verify-documents",
  },
  {
    id: 2,
    title: "Verify your Phone Number",
    description: "Verify your Phone Number to continue",
    to: "/verify-phone",
  },
  {
    id: 3,
    title: "Verify your Email",
    description: "Verify your Email to continue",
    to: "/verify-email",
  },
];

const VerifyAccount = () => {
  // get the house photos from redux
  const photos = useSelector((state) => state.room.newRoom?.photos);
  const user = useSelector((state) => state.user.userDetails);
  console.log("User", user);

  const userId = user?._id;
  console.log("The user Id is ", userId);

  const [roomPhotos, setRoomPhotos] = useState([]);

  useEffect(() => {
    setRoomPhotos([...roomPhotos, photos]);
  }, [photos]);

  return (
    <div className="flex flex-col gap-8 max-w-screen-md mx-auto my-6 min-h-[70vh]">
      <div className="flex flex-col gap-3 md:gap-0 mt-10 m-2">
        <h1 className="text-[#222222] text-2xl md:text-[32px] font-medium">
          Verify Your Profile
        </h1>
        <p className="text-base mt-2 text-[#717171]">
          Verify your account with the government documents , phone number and
          email to increase the trust of the users.
        </p>
      </div>

      {/* The list goes here  */}
      <div className="m-2">
        {verificationOptions.map((option) => {
          return (
            <Link
              key={option.id}
              to={`/users/show/${userId}/verify-account${option.to}`}
              className="flex items-center justify-between border mb-4 p-3 rounded-lg hover:bg-[#f1f1f1] cursor-pointer transition duration-200"
            >
              <div>
                <h4 className="text-[#222222] text-base md:text-[18px] font-medium">
                  {option.title}
                </h4>
                <p className="text-base md:text-sm mt-2 text-[#717171]">
                  {option.description}
                </p>
              </div>
              <div>
                <LiaGreaterThanSolid />
              </div>
            </Link>
          );
        })}

        <div className="m-2 mt-8">
          <p className="text-sm md:text-xs">
            The data collected by ApnaPG is neccessary in the verifying the your
            identity. For more informations and to exercise your right, see our
            <span className="text-red-700 font-semibold"> Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
