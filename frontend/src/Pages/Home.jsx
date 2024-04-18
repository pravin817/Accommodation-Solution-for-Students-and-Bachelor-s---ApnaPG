import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useGetSubCatListing } from "../hooks/useGetSubCatListing";
import { FadeLoader } from "react-spinners";
import SkeletonLoadingCards from "../Components/skeletonLoading/SkeletonLoadingCards";
import axios from "axios";
import { API } from "../backend";
import ListingPreviewCard from "../Components/Home/ListingPreviewCard";
import { useEffect, useState } from "react";
import HomePageSkeleton from "../Components/Home/HomePageSkeleton";

const Home = () => {
  const [hasScroll, setHasScroll] = useState(false);
  //  before tax price state
  const [showBeforeTaxPrice, setShowBeforeTaxPrice] = useState(false);
  const category = localStorage.getItem("category");

  //   get the listing data based on category
  const { isLoading, data } = useGetSubCatListing(category);

  const location = useLocation();

  // Handle the Scroll Tracking
  const handleScrollTracking = () => {
    const scrollPosition = window.scrollY;

    // check if we can scroll from the top
    if (scrollPosition >= 20) {
      setHasScroll(true);
    } else if (scrollPosition <= 10) {
      setHasScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollTracking);

    return () => {
      window.removeEventListener("scroll", handleScrollTracking);
    };
  }, []);

  //   fetch all listing Data
  const allListingData = useQuery({
    queryKey: ["allListing"],
    queryFn: async () => {
      const res = await axios.get(`${API}room/get-all-listing`);
      return res.data.allListingData;
    },
  });

  // saving category to local storage if the url has the category then save that otherwise default  will be house
  useEffect(() => {
    if (location.search.includes("category")) {
      const catValue = location.search.split("=");
      if (catValue[1].includes("%20")) {
        const removeSpaceValue = location.search
          .split("=")[1]
          .replace(/%20/g, " ");

        JSON.stringify(localStorage.setItem("category", removeSpaceValue));
      } else {
        JSON.stringify(localStorage.setItem("category", catValue[1]));
      }
    } else {
      JSON.stringify(localStorage.setItem("category", "House"));
    }
  }, [location.search]);

  if (allListingData.isLoading) {
    if (window.innerWidth <= 1080) {
      return (
        <div className="flex justify-center items-center h-[80dvh]">
          <FadeLoader color="#000" />
        </div>
      );
    } else {
      return <HomePageSkeleton />;
    }
  }
  return (
    <main className="max-w-screen-2xl xl:px-10 px-5 sm:px-16 mx-auto">
      {/* <section className="flex justify-between items-center">
        <p>Category</p>
        <p>GST Price</p>
      </section> */}

      {/* show the actual room Data  */}
      <section>
        {isLoading ? (
          <>
            {window.innerWidth <= 1080 ? (
              <div className="flex justify-center items-center h-[80dvh]">
                <FadeLoader color="#000" />
              </div>
            ) : (
              <SkeletonLoadingCards />
            )}
          </>
        ) : (
          <>
            {/* Fetch all listing data  */}
            <section className=" py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mx-auto gap-x-7 gap-y-10">
              {location?.search?.split("=")[1]?.includes("House") ||
              (location?.pathname === "/" &&
                !location?.search?.split("?")[1]?.includes("category")) ? (
                <>
                  {allListingData.data &&
                    allListingData.data.length !== 0 &&
                    allListingData.data.map((listing) => {
                      return (
                        <Link
                          to={`/rooms/${listing?._id}`}
                          key={listing._id}
                          className=" flex flex-col gap-3 rounded-xl w-full sm:max-w-[300px] md:w-full mx-auto"
                        >
                          <ListingPreviewCard
                            listingData={listing}
                            showBeforeTaxPrice={showBeforeTaxPrice}
                          />
                        </Link>
                      );
                    })}
                </>
              ) : (
                <>
                  {/* show only category based listing */}
                  {data.length !== 0 &&
                    data?.map((listing) => {
                      return (
                        <Link
                          key={listing._id}
                          className=" flex flex-col gap-3 rounded-xl w-full sm:max-w-[300px] md:w-full mx-auto"
                        >
                          <ListingPreviewCard
                            listingData={listing}
                            showBeforeTaxPrice={showBeforeTaxPrice}
                          />
                        </Link>
                      );
                    })}
                </>
              )}
            </section>
          </>
        )}
      </section>
    </main>
  );
};

export default Home;
