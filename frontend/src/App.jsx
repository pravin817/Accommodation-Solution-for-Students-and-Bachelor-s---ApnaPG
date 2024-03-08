import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";

// import the router
import router from "./Routes/Route";

const notify = () => {
  toast("Welcome  !", {
    icon: "👏",
  });
  console.log("notify clicked");
};

function App() {
  return (
    <>
      {/* Dummy check for the tailwind and toast  */}
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <button onClick={notify} className="btn">
        Make me Toast
      </button>

      {/* wrapup the router  */}
      <RouterProvider router={router} />

      {/* Add for the Toast Notification  */}
      <Toaster></Toaster>
    </>
  );
}

export default App;
