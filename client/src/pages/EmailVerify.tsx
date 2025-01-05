import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../components/ui/input-otp";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthResponse } from "../type";

const EmailVerify = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const { userData, baseUrl, isLoggedIn, getUserData } = useContext(AppContext);
  const [otp, setOtp] = useState<string>("");

  const handleOtpChange = (otpValue: string) => {
    setOtp(otpValue); // Update OTP state
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post<AuthResponse>(
        `${baseUrl}/api/auth/verify-email`,
        { otp }
      );
      if (data.success) {
        getUserData();
        navigate("/");
        toast.success(data.message);
      } else {
        toast.error(data.message);
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

  useEffect(() => {
    if (isLoggedIn && userData && userData.isAccountVerified) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, userData]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="absolute top-5 left-5 sm:left-20 w-28 sm:w-32 cursor-pointer"
      />
      <form
        onSubmit={onSubmitHandler}
        className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
      >
        <h1 className="text-white text-2xl font-semibold text-center mb-4 ">
          Email Verify OTP
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter the 6 digit code sent to your email address
        </p>
        <div className="w-full flex items-center justify-center mb-8">
          <InputOTP maxLength={6} onChange={handleOtpChange} className="">
            <InputOTPGroup>
              <InputOTPSlot
                index={0}
                className="w-12 h-12 text-2xl text-center border-2 border-indigo-600 rounded-lg bg-slate-800 text-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <InputOTPSlot
                index={1}
                className="w-12 h-12 text-2xl text-center border-1 border-indigo-600 rounded-lg bg-slate-800 text-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <InputOTPSlot
                index={2}
                className="w-12 h-12 text-2xl text-center border-2 border-indigo-600 rounded-lg bg-slate-800 text-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </InputOTPGroup>
            <InputOTPSeparator className="text-white" />
            <InputOTPGroup>
              <InputOTPSlot
                index={3}
                className="w-12 h-12 text-2xl text-center border-2 border-indigo-600 rounded-lg bg-slate-800 text-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <InputOTPSlot
                index={4}
                className="w-12 h-12 text-2xl text-center border-1 border-indigo-600 rounded-lg bg-slate-800 text-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <InputOTPSlot
                index={5}
                className="w-12 h-12 text-2xl text-center border-2 border-indigo-600 rounded-lg bg-slate-800 text-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <button className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full">
          Verify Email
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
