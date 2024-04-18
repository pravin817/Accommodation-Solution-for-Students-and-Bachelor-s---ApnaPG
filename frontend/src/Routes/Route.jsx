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
import ListingRoomStepOneAddress from "../Pages/ListingRoomStepOne/ListingRoomStepOneAddress";
import ListingRoomStepOneFloorPlan from "../Pages/ListingRoomStepOne/ListingRoomStepOneFloorPlan";
import ListingRoomStepTwoOverview from "../Pages/ListingRoomStepTwo/ListingRoomStepTwoOverview";
import ListingRoomStepTwoAmenities from "../Pages/ListingRoomStepTwo/ListingRoomStepTwoAmenities";
import ListingRoomStepTwoPhotos from "../Pages/ListingRoomStepTwo/ListingRoomStepTwoPhotos";
import ListingRoomStepTwoTitle from "../Pages/ListingRoomStepTwo/ListingRoomStepTwoTitle";
import ListingRoomStepTwoHighlight from "../Pages/ListingRoomStepTwo/ListingRoomStepTwoHighlight";
import ListingRoomStepTwoDescription from "../Pages/ListingRoomStepTwo/ListingRoomStepTwoDescription";
import ListingRoomFinalStepOverview from "../Pages/ListingRoomFinalStep/ListingRoomFinalStepOverview";
import ListingRoomFinalStepVisibility from "../Pages/ListingRoomFinalStep/ListingRoomFinalStepVisibility";
import ListingRoomFinalStepPricing from "../Pages/ListingRoomFinalStep/ListingRoomFinalStepPricing";
import ListingRoomFinalStepLegal from "../Pages/ListingRoomFinalStep/ListingRoomFinalStepLegal";
import ListingRoomFinalStepReceipt from "../Pages/ListingRoomFinalStep/ListingRoomFinalStepReceipt";
import ListingRoomFinalStepThankyou from "../Pages/ListingRoomFinalStep/ListingRoomFinalStepThankyou";
import Home from "../Pages/Home";
import ListingDetails from "../Pages/ListingDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/rooms/:id",
        element: <ListingDetails />,
        loader: ({ params }) => fetch(`${API}room/listing/${params.id}`),
      },
      {
        path: "/users/show/:id",
        element: <UserProfile />,
        loader: ({ params }) => fetch(`${API}${params.id}`),
      },
      {
        path: "/users/show/:id/editMode=true",
        element: <EditProfile />,
        loader: ({ params }) => fetch(`${API}${params.id}`),
      },
      {
        path: "/host/rooms",
        element: <HostYourRoom />,
        loader: ({ params }) => fetch(`${API}${params.id}`),
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
        element: <ListingRoomStepOneAddress />,
      },
      {
        path: "/become-a-host/:id/floor-plan",
        element: <ListingRoomStepOneFloorPlan />,
      },
      {
        path: "/become-a-host/:id/stand-out",
        element: <ListingRoomStepTwoOverview />,
      },
      {
        path: "/become-a-host/:id/amenities",
        element: <ListingRoomStepTwoAmenities />,
      },
      {
        path: "/become-a-host/:id/photos",
        element: <ListingRoomStepTwoPhotos />,
      },
      {
        path: "/become-a-host/:id/title",
        element: <ListingRoomStepTwoTitle />,
      },
      {
        path: "/become-a-host/:id/highlight",
        element: <ListingRoomStepTwoHighlight />,
      },
      {
        path: "/become-a-host/:id/description",
        element: <ListingRoomStepTwoDescription />,
      },
      {
        path: "/become-a-host/:id/finish-step",
        element: <ListingRoomFinalStepOverview />,
      },
      {
        path: "/become-a-host/:id/visibility",
        element: <ListingRoomFinalStepVisibility />,
      },
      {
        path: "/become-a-host/:id/price",
        element: <ListingRoomFinalStepPricing />,
      },
      {
        path: "/become-a-host/:id/legal",
        element: <ListingRoomFinalStepLegal />,
      },
      {
        path: "/become-a-host/:id/receipt",
        element: <ListingRoomFinalStepReceipt />,
      },
      {
        path: "/become-a-host/:id/published",
        element: <ListingRoomFinalStepThankyou />,
      },
    ],
  },
]);

export default router;
