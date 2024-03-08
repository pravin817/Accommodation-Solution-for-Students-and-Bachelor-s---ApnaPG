import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import About from "../Pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

export default router;
