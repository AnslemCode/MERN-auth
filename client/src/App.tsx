import { useEffect, useState } from "react";
import AppContext from "./context/AppContext.tsx";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import EmailVerify from "./pages/EmailVerify.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { IsAuthResponse, UserData, UserDataResponse } from "./type";

const App = () => {
  axios.defaults.withCredentials = true;
  const baseUrl = import.meta.env.VITE_BASE_URL || "";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  const getAuthState = async () => {
    try {
      const { data } = await axios.get<IsAuthResponse>(
        `${baseUrl}/api/auth/is-auth`
      );
      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response.data);
        toast.error(error.response.data.message || "An error occurred");
      } else {
        console.log(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get<UserDataResponse>(
        `${baseUrl}/api/user/data`
      );
      if (data.success) {
        setUserData(data.userData);
      }

      console.log(data?.userData);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response.data);
        toast.error(error.response.data.message || "An error occurred");
      } else {
        console.log(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    getAuthState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    baseUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
  };
  return (
    <AppContext.Provider value={value}>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </AppContext.Provider>
  );
};

export default App;
