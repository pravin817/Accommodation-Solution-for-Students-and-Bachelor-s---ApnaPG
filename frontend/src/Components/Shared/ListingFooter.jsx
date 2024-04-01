import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";

const ListingFooter = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();

  // get the user
  const user = useSelector((state) => state.user.userDetails);
  // console.log("Listing Footer user data : ", user);
  const url = window.location.pathname;

  const handleNext = () => {
    console.log("Next button clicked");
  };
  return (
    <footer className="sticky bottom-0 bg-white">
      {/* Progress bar  */}
      {!url.includes("/published") && (
        <div>
          <progress
            className="progress w-full shadow-sm transition-all duration-700 h-2"
            value={progress}
            max={100}
          ></progress>
        </div>
      )}
      {/* Buttons  */}
      <div className="flex justify-between py-3 px-6 sm:px-10 md:px-20 top-0 z-10 bg-white max-w-screen-xl xl:px-20 xl:mx-auto">
        {/* If we are on the last page don't show back button  */}
        {!url.includes("/published") ? (
          <button
            className="hover:bg-[#f1f1f1] text-black rounded-md px-4 py-2 underline"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </button>
        ) : (
          <div></div>
        )}

        {url.includes("/published") ? (
          <a
            href={`/users/dashboard/${user?._id}/listing=true`}
            className="text-lg text-white font-medium rounded-md px-9 py-3 disabled:bg-[#dddddd] disabled:cursor-not-allowed transition durtion-300 ease-in bg-[#222222] hover:bg-black"
          >
            See Listing
          </a>
        ) : (
          <button
            className={`text-lg text-white font-medium rounded-md px-9 py-3 disabled:bg-[#dddddd] disabled:cursor-not-allowed transition durtion-300 ease-in ${
              url?.includes("/receipt")
                ? "bg-[#ff385c] hover:bg-[#d90b63]"
                : "bg-[#222222] hover:bg-black"
            }`}
            onClick={handleNext}
            disabled={loading}
          >
            {loading ? (
              <>
                <PulseLoader
                  color="#f7f7f7"
                  size={7}
                  margin={4}
                  speedMultiplier={0.6}
                />
              </>
            ) : (
              <>{url?.includes("/receipt") ? "Publish" : "Next"}</>
            )}
          </button>
        )}
      </div>
    </footer>
  );
};

export default ListingFooter;
