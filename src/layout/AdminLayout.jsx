import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import axios from "axios";
import AdminHeader from "../components/AdminHeader";

// API 設定
const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function AdminLayout() {
  const [isAuth, setIsAuth] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const checkLogin = async () => {
    const isOnLoginPage = location.pathname === "/";

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("hexToken="))
        ?.split("=")[1];

      axios.defaults.headers.common["Authorization"] = token;

      const res = await axios.post(`${API_BASE}/api/user/check`);
      // console.log(res.data);

      const isLogin = res.data?.success;

      setIsAuth(isLogin);

      if (isLogin && isOnLoginPage) {
        navigate("/products", { replace: true });
      }

      if (!isLogin && !isOnLoginPage) {
        navigate("/", { replace: true });
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      // alert(error.response?.data?.message);
      setIsAuth(false);

      if (!isOnLoginPage) {
        navigate("/", { replace: true });
      }
    }
  };

  useEffect(() => {
    checkLogin();
  }, [location.pathname, navigate]);

  return (
    <>
      <AdminHeader />
      <Outlet context={{ setIsAuth }} />
    </>
  );
}
