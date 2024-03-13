import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import { API } from "../backend";
import About from "../Pages/About";
import UserProfile from "../Pages/UserProfile/UserProfile";

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
    ],
  },
]);

export default router;
