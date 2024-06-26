import { Suspense, lazy } from "react";
import { FadeLoader } from "react-spinners";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import { API } from "../backend";
import UserProfile from "../Pages/UserProfile/UserProfile";
import EditProfile from "../Pages/UserProfile/EditProfile";
import HostYourRoom from "../Pages/HostYourRoom";
import CreateNewListLayout from "../Layouts/CreateNewListLayout";
import ListRoomOverview from "../Pages/ListRoomOverview";
import ListingRoomStepOne from "../Pages/ListingRoomStepOne/ListingRoomStepOne";

import ListingRoomStepOneStructure from "../Pages/ListingRoomStepOne/ListingRoomStepOneStructure";
import ListingRoomStepOnePlaceType from "../Pages/ListingRoomStepOne/ListingRoomStepOnePlaceType";
// import ListingRoomStepOneAddress from "../Pages/ListingRoomStepOne/ListingRoomStepOneAddress";
// import ListingRoomStepOneFloorPlan from "../Pages/ListingRoomStepOne/ListingRoomStepOneFloorPlan";
// import ListingRoomStepTwoOverview from "../Pages/ListingRoomStepTwo/ListingRoomStepTwoOverview";
// import ListingRoomStepTwoAmenities from "../Pages/ListingRoomStepTwo/ListingRoomStepTwoAmenities";
// import ListingRoomStepTwoPhotos from "../Pages/ListingRoomStepTwo/ListingRoomStepTwoPhotos";
// import ListingRoomStepTwoTitle from "../Pages/ListingRoomStepTwo/ListingRoomStepTwoTitle";
// import ListingRoomStepTwoHighlight from "../Pages/ListingRoomStepTwo/ListingRoomStepTwoHighlight";
// import ListingRoomStepTwoDescription from "../Pages/ListingRoomStepTwo/ListingRoomStepTwoDescription";
// import ListingRoomFinalStepOverview from "../Pages/ListingRoomFinalStep/ListingRoomFinalStepOverview";
// import ListingRoomFinalStepVisibility from "../Pages/ListingRoomFinalStep/ListingRoomFinalStepVisibility";
// import ListingRoomFinalStepPricing from "../Pages/ListingRoomFinalStep/ListingRoomFinalStepPricing";
// import ListingRoomFinalStepLegal from "../Pages/ListingRoomFinalStep/ListingRoomFinalStepLegal";
// import ListingRoomFinalStepReceipt from "../Pages/ListingRoomFinalStep/ListingRoomFinalStepReceipt";
// import ListingRoomFinalStepThankyou from "../Pages/ListingRoomFinalStep/ListingRoomFinalStepThankyou";
// import Home from "../Pages/Home";
// import ListingDetails from "../Pages/ListingDetails";
import Overview from "../Pages/Dashboard/Overview";
import Reservations from "../Pages/Dashboard/Reservations";
import Listing from "../Pages/Dashboard/Listing";
import Book from "../Pages/Book";
import PaymentConfirmed from "../Pages/PaymentConfirmed";
import Help from "../Pages/Help";
import VerifyAccount from "../Pages/VerifyUser/VerifyAccount";
import VerifyDocuments from "../Pages/VerifyUser/VerifyDocuments";
import VerifyMobileNo from "../Pages/VerifyUser/VerifyMobileNo";
import VerifyEmail from "../Pages/VerifyUser/VerifyEmail";
import VerifyDoc from "../Pages/VerifyUser/VerifyDoc";
// import VerifyAccount from "../Pages/VerifyAccount";

// import HelloWorld from "../Pages/HelloWorld";
// import Test from "../Pages/Test";

const ListingRoomStepOneAddress = lazy(() =>
  import("../Pages/ListingRoomStepOne/ListingRoomStepOneAddress")
);
const ListingRoomStepOneFloorPlan = lazy(() =>
  import("../Pages/ListingRoomStepOne/ListingRoomStepOneFloorPlan")
);

const ListingRoomStepTwoOverview = lazy(() =>
  import("../Pages/ListingRoomStepTwo/ListingRoomStepTwoOverview")
);

const ListingRoomStepTwoAmenities = lazy(() =>
  import("../Pages/ListingRoomStepTwo/ListingRoomStepTwoAmenities")
);

const ListingRoomStepTwoPhotos = lazy(() =>
  import("../Pages/ListingRoomStepTwo/ListingRoomStepTwoPhotos")
);

const ListingRoomStepTwoTitle = lazy(() =>
  import("../Pages/ListingRoomStepTwo/ListingRoomStepTwoTitle")
);

const ListingRoomStepTwoHighlight = lazy(() =>
  import("../Pages/ListingRoomStepTwo/ListingRoomStepTwoHighlight")
);

const ListingRoomStepTwoDescription = lazy(() =>
  import("../Pages/ListingRoomStepTwo/ListingRoomStepTwoDescription")
);

const ListingRoomFinalStepOverview = lazy(() =>
  import("../Pages/ListingRoomFinalStep/ListingRoomFinalStepOverview")
);

const ListingRoomFinalStepVisibility = lazy(() =>
  import("../Pages/ListingRoomFinalStep/ListingRoomFinalStepVisibility")
);

const ListingRoomFinalStepPricing = lazy(() =>
  import("../Pages/ListingRoomFinalStep/ListingRoomFinalStepPricing")
);

const ListingRoomFinalStepLegal = lazy(() =>
  import("../Pages/ListingRoomFinalStep/ListingRoomFinalStepLegal")
);

const ListingRoomFinalStepReceipt = lazy(() =>
  import("../Pages/ListingRoomFinalStep/ListingRoomFinalStepReceipt")
);

const ListingRoomFinalStepThankyou = lazy(() =>
  import("../Pages/ListingRoomFinalStep/ListingRoomFinalStepThankyou")
);

const Home = lazy(() => import("../Pages/Home"));

const ListingDetails = lazy(() => import("../Pages/ListingDetails"));

const HelloWorld = lazy(() => import("../Pages/HelloWorld"));

const Test = lazy(() => import("../Pages/Test"));

// const VerifyAccount = lazy(() => import("../Pages/VerifyAccount"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense
            fallback={
              <div className=" flex justify-center items-center w-full h-[60dvh]">
                <FadeLoader color="#000" />
              </div>
            }
          >
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/rooms/:id",
        element: (
          <Suspense
            fallback={
              <div className=" flex justify-center items-center w-full h-[60dvh]">
                <FadeLoader color="#000" />
              </div>
            }
          >
            <ListingDetails />
          </Suspense>
        ),
        loader: ({ params }) => fetch(`${API}room/listing/${params.id}`),
      },
      {
        path: "/book/stays/:id",
        element: (
          <Suspense
            fallback={
              <div className=" flex justify-center items-center w-full h-[60dvh]">
                <FadeLoader color="#000" />
              </div>
            }
          >
            <Book />,
          </Suspense>
        ),
      },
      {
        path: "/users/show/:id",
        element: <UserProfile />,
        // loader: ({ params }) => fetch(`${API}${params.id}`),
      },
      {
        path: "/users/show/:id/editMode=true",
        element: <EditProfile />,
        // loader: ({ params }) => fetch(`${API}${params.id}`),
      },
      {
        path: "/users/dashboard/:id/overview=true",
        element: <Overview />,
      },
      {
        path: "/users/dashboard/:id/reservations",
        element: <Reservations />,
      },
      {
        path: "/users/dashboard/:id/listing=true",
        element: <Listing />,
      },
      {
        path: "/host/rooms",
        element: <HostYourRoom />,
        loader: ({ params }) => fetch(`${API}${params.id}`),
      },
      {
        path: "/payment-confirmed",
        element: (
          <Suspense
            fallback={
              <div className=" flex justify-center items-center w-full h-[60dvh]">
                <FadeLoader color="#000" />
              </div>
            }
          >
            <PaymentConfirmed />
          </Suspense>
        ),
      },

      // The verification section
      {
        path: "/users/show/:id/verify-account",
        element: <VerifyAccount />,
      },
      {
        path: "/users/show/:id/verify-account/verify-documents",
        element: <VerifyDocuments />,
      },
      {
        path: "/users/show/:id/verify-account/verify-phone",
        element: <VerifyMobileNo />,
      },
      {
        path: "/users/show/:id/verify-account/verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "/users/show/:id/verify-account/verify-documents/doc/:id",
        element: <VerifyDoc />,
      },

      {
        path: "/help",
        element: (
          <Suspense
            fallback={
              <div className=" flex justify-center items-center w-full h-[60dvh]">
                <FadeLoader color="#000" />
              </div>
            }
          >
            <Help />
          </Suspense>
        ),
      },
      {
        path: "/helloworld",
        element: (
          <Suspense
            fallback={
              <div className=" flex justify-center items-center w-full h-[60dvh]">
                <FadeLoader color="#000" />
              </div>
            }
          >
            <HelloWorld />
          </Suspense>
        ),
      },
      {
        path: "/test",
        element: (
          <Suspense
            fallback={
              <div className=" flex justify-center items-center w-full h-[60dvh]">
                <FadeLoader color="#000" />
              </div>
            }
          >
            <Test />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/become-a-host",
    element: <CreateNewListLayout />,
    children: [
      {
        path: "/become-a-host",
        element: <ListRoomOverview />,
      },
      {
        path: "/become-a-host/:id/about-your-place",
        element: <ListingRoomStepOne />,
      },
      {
        path: "/become-a-host/:id/structure",
        element: <ListingRoomStepOneStructure />,
      },
      {
        path: "/become-a-host/:id/privacy-type",
        element: <ListingRoomStepOnePlaceType />,
      },
      {
        path: "/become-a-host/:id/location",
        element: (
          <Suspense
            fallback={
              <div className=" flex justify-center items-center w-full h-[60dvh]">
                <FadeLoader color="#000" />
              </div>
            }
          >
            <ListingRoomStepOneAddress />
          </Suspense>
        ),
      },
      {
        path: "/become-a-host/:id/floor-plan",
        element: (
          <Suspense
            fallback={
              <div className=" flex justify-center items-center w-full h-[60dvh]">
                <FadeLoader color="#000" />
              </div>
            }
          >
            <ListingRoomStepOneFloorPlan />
          </Suspense>
        ),
      },
      {
        path: "/become-a-host/:id/stand-out",
        element: (
          <Suspense
            fallback={
              <div className=" flex justify-center items-center w-full h-[60dvh]">
                <FadeLoader color="#000" />
              </div>
            }
          >
            <ListingRoomStepTwoOverview />
          </Suspense>
        ),
      },
      {
        path: "/become-a-host/:id/amenities",
        element: (
          <Suspense
            fallback={
              <div className=" flex justify-center items-center w-full h-[60dvh]">
                <FadeLoader color="#000" />
              </div>
            }
          >
            <ListingRoomStepTwoAmenities />
          </Suspense>
        ),
      },
      {
        path: "/become-a-host/:id/photos",
        element: (
          <Suspense
            fallback={
              <div className=" flex justify-center items-center w-full h-[60dvh]">
                <FadeLoader color="#000" />
              </div>
            }
          >
            <ListingRoomStepTwoPhotos />
          </Suspense>
        ),
      },
      {
        path: "/become-a-host/:id/title",
        element: (
          <Suspense
            fallback={
              <div className=" flex justify-center items-center w-full h-[60dvh]">
                <FadeLoader color="#000" />
              </div>
            }
          >
            <ListingRoomStepTwoTitle />
          </Suspense>
        ),
      },
      {
        path: "/become-a-host/:id/highlight",
        element: (
          <Suspense
            fallback={
              <div className=" flex justify-center items-center w-full h-[60dvh]">
                <FadeLoader color="#000" />
              </div>
            }
          >
            <ListingRoomStepTwoHighlight />
          </Suspense>
        ),
      },
      {
        path: "/become-a-host/:id/description",
        element: (
          <Suspense
            fallback={
              <div className=" flex justify-center items-center w-full h-[60dvh]">
                <FadeLoader color="#000" />
              </div>
            }
          >
            <ListingRoomStepTwoDescription />
          </Suspense>
        ),
      },
      {
        path: "/become-a-host/:id/finish-step",
        element: (
          <Suspense
            fallback={
              <div className=" flex justify-center items-center w-full h-[60dvh]">
                <FadeLoader color="#000" />
              </div>
            }
          >
            <ListingRoomFinalStepOverview />
          </Suspense>
        ),
      },
      {
        path: "/become-a-host/:id/visibility",
        element: (
          <Suspense
            fallback={
              <div className=" flex justify-center items-center w-full h-[60dvh]">
                <FadeLoader color="#000" />
              </div>
            }
          >
            <ListingRoomFinalStepVisibility />
          </Suspense>
        ),
      },
      {
        path: "/become-a-host/:id/price",
        element: (
          <Suspense
            fallback={
              <div className=" flex justify-center items-center w-full h-[60dvh]">
                <FadeLoader color="#000" />
              </div>
            }
          >
            <ListingRoomFinalStepPricing />
          </Suspense>
        ),
      },
      {
        path: "/become-a-host/:id/legal",
        element: (
          <Suspense
            fallback={
              <div className=" flex justify-center items-center w-full h-[60dvh]">
                <FadeLoader color="#000" />
              </div>
            }
          >
            <ListingRoomFinalStepLegal />
          </Suspense>
        ),
      },
      {
        path: "/become-a-host/:id/receipt",
        element: (
          <Suspense
            fallback={
              <div className=" flex justify-center items-center w-full h-[60dvh]">
                <FadeLoader color="#000" />
              </div>
            }
          >
            <ListingRoomFinalStepReceipt />
          </Suspense>
        ),
      },
      {
        path: "/become-a-host/:id/published",
        element: (
          <Suspense
            fallback={
              <div className=" flex justify-center items-center w-full h-[60dvh]">
                <FadeLoader color="#000" />
              </div>
            }
          >
            <ListingRoomFinalStepThankyou />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
