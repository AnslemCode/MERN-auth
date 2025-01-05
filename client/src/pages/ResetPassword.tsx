import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../components/ui/input-otp";
import axios from "axios";
import { toast } from "react-toastify";
import AppContext from "../context/AppContext";
import { AuthResponse } from "../type";

const ResetPassword = () => {
  const { baseUrl } = useContext(AppContext);
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState<string>("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const handleOtpChange = (otpValue: string) => {
    setOtp(otpValue); // Update OTP state
  };

  const onSubmitEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const { data } = await axios.post<AuthResponse>(
        `${baseUrl}/api/auth/send-reset-otp`,
        { email }
      );
      if (data.success) {
        toast.success(data.message);
        setIsEmailSent(true);
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

  const onSubmitOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsOtpSubmitted(true);
  };

  const onSubmitNewPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post<AuthResponse>(
        `${baseUrl}/api/auth/reset-password`,
        { email, otp, newPassword }
      );
      if (data.success) {
        setIsOtpSubmitted(true);
        toast.success(data.message);
        navigate("/login");
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
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="absolute top-5 left-5 sm:left-20 w-28 sm:w-32 cursor-pointer"
      />
      {!isEmailSent && (
        <form
          onSubmit={onSubmitEmail}
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4 ">
            Reset Password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter your registered email address
          </p>
          <div className="mb-4 flex items-center gap-3 w-full py-2.5 px-5 bg-[#333A5C] rounded-full">
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-transparent outline-none w-full text-white"
              type="email"
              placeholder="Email id"
              required
            />
          </div>
          <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 rounded-full text-white mt-3">
            Submit
          </button>
        </form>
      )}

      {!isOtpSubmitted && isEmailSent && (
        <form
          onSubmit={onSubmitOtp}
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4 ">
            Reset Password OTP
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter the 6 digit code sent to your email address
          </p>
          <div className="w-full flex items-center justify-center mb-8">
            <InputOTP maxLength={6} onChange={handleOtpChange} className="">
              <InputOTPGroup>
                <InputOTPSlot
                  index={0}
                  className="w-8 h-8 text-xl text-center border-2 border-indigo-600 rounded-lg bg-slate-800 text-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <InputOTPSlot
                  index={1}
                  className="w-8 h-8 text-xl text-center border-1 border-indigo-600 rounded-lg bg-slate-800 text-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <InputOTPSlot
                  index={2}
                  className="w-8 h-8 text-xl text-center border-2 border-indigo-600 rounded-lg bg-slate-800 text-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </InputOTPGroup>
              <InputOTPSeparator className="text-white" />
              <InputOTPGroup>
                <InputOTPSlot
                  index={3}
                  className="w-8 h-8 text-xl text-center border-2 border-indigo-600 rounded-lg bg-slate-800 text-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <InputOTPSlot
                  index={4}
                  className="w-8 h-8 text-xl text-center border-1 border-indigo-600 rounded-lg bg-slate-800 text-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <InputOTPSlot
                  index={5}
                  className="w-8 h-8 text-xl text-center border-2 border-indigo-600 rounded-lg bg-slate-800 text-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full">
            Submit
          </button>
        </form>
      )}

      {/* ENTER NEW PASSWORD */}
      {isOtpSubmitted && isEmailSent && (
        <form
          onSubmit={onSubmitNewPassword}
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4 ">
            New Password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter your new password
          </p>
          <div className="mb-4 flex items-center gap-3 w-full py-2.5 px-5 bg-[#333A5C] rounded-full">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              className="bg-transparent outline-none w-full text-white"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 rounded-full text-white mt-3">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
