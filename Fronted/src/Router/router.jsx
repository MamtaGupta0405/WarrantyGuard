import { createBrowserRouter } from "react-router-dom";
import UserRoute from "./userRoute/UserRoute";
import ProductRoute from "./ProductRoute/ProductRoute";


const router = createBrowserRouter([
    ...UserRoute,
    ...ProductRoute
]);

export default router;