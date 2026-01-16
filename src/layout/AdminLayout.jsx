import { useCallback, useEffect, useState } from "react";
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

  const checkLogin = useCallback(async () => {
    const isOnLoginPage = location.pathname === "/";

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("hexToken="))
        ?.split("=")[1];

      axios.defaults.headers.common["Authorization"] = token;

      const res = await axios.post(`${API_BASE}/api/user/check`);
      const success = res.data?.success;

      setIsAuth(success);

      if (success && isOnLoginPage) {
        navigate("/products", { replace: true });
      }

      if (!success && !isOnLoginPage) {
        navigate("/", { replace: true });
      }
    } catch (error) {
      alert(error.response?.data?.message);
      // console.log("驗證失敗");

      setIsAuth(false);

      if (!isOnLoginPage) {
        navigate("/", { replace: true });
      }
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    (async () => {
      await checkLogin();
    })();
  }, [checkLogin]);

  return (
    <>
      <AdminHeader isAuth={isAuth} setIsAuth={setIsAuth} />
      <Outlet context={{ setIsAuth }} />
    </>
  );
}
