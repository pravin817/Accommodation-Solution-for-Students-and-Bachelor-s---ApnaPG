import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import PhotoCard from "../Components/ListingRoom/PhotoCard";

// import { FaGreaterThan } from "react-icons/fa";
import { FaGreaterThan } from "react-icons/fa6";
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
  // const history = useHistory();

  useEffect(() => {
    setRoomPhotos([...roomPhotos, photos]);
  }, [photos]);

  const handleVerifyGovtID = () => {
    // Redirect to the new page for document options
    // history.push("/verify-documents");
  };

  return (
    <div className="flex flex-col gap-20 max-w-screen-md mx-auto my-6 min-h-[70vh]">
      <div className="flex flex-col gap-3 md:gap-0 mt-10">
        <h1 className="text-[#222222] text-2xl md:text-[32px] font-medium">
          Verify Your Profile
        </h1>
        <p className="text-base md:text-lg mt-2 text-[#717171]">
          You'll need 5 photos to get started. You can add more or make changes
          later.
        </p>
      </div>

      {/* The list goes here  */}
      <div>
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
                {/* <FaGreaterThan /> */}
                {/* <FaGreaterThan /> */}
                <LiaGreaterThanSolid />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Take the photos of the room  */}
      {/* <PhotoCard /> */}
    </div>
  );
};

export default VerifyAccount;
