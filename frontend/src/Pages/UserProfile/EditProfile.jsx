import { useState } from "react";
import { useSelector } from "react-redux";
import cameraIcon from "../../assets/BasicIcon/cameraIcon.png";
// import UserProfile from "./UserProfile";
import UserProfilePopup from "../../Components/PopUp/userProfilePopup/UserProfilePopup";

import UserProfileOptions from "../../Components/UserProfile/UserProfileOptions";

const EditProfile = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // get the user details
  const user = useSelector((state) => state.user.userDetails);
  console.log("User Details from editProfile: ", user);
  return (
    <>
      <main className="max-w-[1200px] mx-auto xl:px-10 py-12 flex min-h-[80vh] relative border">
        <section className="flex flex-row gap-16 items-start flex-auto">
          {user?.photoUrl ? (
            <figure>
              <img src={user?.photoUrl} alt="user Image" />
            </figure>
          ) : (
            <div className="flex flex-col gap-4 items-center justify-center w-[350px] h-[220px] p-7 sticky top-[128px]">
              <div className="min-w-[214px] min-h-[214px] border bg-[#222222] rounded-full flex justify-center items-center relative">
                <p className="text-8xl text-white font-semibold mb-2">
                  {user?.name.firstName.slice(0, 1)}
                </p>
                <div className="absolute flex flex-row gap-2 items-center bg-white shadow-md px-3 py-2 rounded-full -bottom-4 cursor-pointer">
                  <img src={cameraIcon} alt="Choose photo" className="w-4" />
                  <p className="text-sm text-[#222222] font-medium">Add</p>
                </div>
              </div>
            </div>
          )}
          <section className="xl:min-h-[400px] flex flex-col flex-1 profile-container">
            <UserProfileOptions
              setShowPopup={setShowPopup}
              setSelectedOption={setSelectedOption}
            />
          </section>
        </section>
      </main>

      {showPopup && (
        <UserProfilePopup
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          popupData={selectedOption}
        />
      )}
    </>
  );
};

export default EditProfile;
