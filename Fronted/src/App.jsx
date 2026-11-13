import { useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "./Router/router";
import { Toaster } from "react-hot-toast";

function App() {
  const a = useSelector((state) => state.user);

  console.log(a);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
