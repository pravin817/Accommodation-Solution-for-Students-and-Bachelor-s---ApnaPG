import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar";

const MainLayout = () => {
  const location = useLocation();
  const pathName = location.pathname;
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
