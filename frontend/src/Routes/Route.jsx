import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import { API } from "../backend";
import UserProfile from "../Pages/UserProfile/UserProfile";
import EditProfile from "../Pages/UserProfile/EditProfile";
import HostYourRoom from "../Pages/HostYourRoom";
import CreateNewListLayout from "../Layouts/CreateNewListLayout";
import ListRoomOverview from "../Pages/ListRoomOverview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
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
    ],
  },
]);

export default router;
