import { createHashRouter } from "react-router";
import AdminLayout from "../layout/AdminLayout";
import Login from "../pages/Login";
import ProductsList from "../pages/ProductsList";

const router = createHashRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "products",
        element: <ProductsList />,
      },
    ],
  },
]);

export default router;
