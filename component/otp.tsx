"use client";
import { GiCheckMark } from "react-icons/gi";
import { BiEnvelope } from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


export default function Otp() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const api = process.env.NEXT_PUBLIC_API;

  useEffect(() => {
    const message = localStorage.getItem("gmail") || "";
    setEmail(message);
    if (!message) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const btnFun = async () => {
    setLoading(true)
    if (!(email && otp)) {
      return setError("input all field"), setLoading(false);
    }

    if (email && otp) {
      try {
        const res = await axios.post(
          `${api}/verify`,
          {
            gmail: email,
            otp,
          },
          { withCredentials: true }
        );
        if (res.status === 200 || res.status === 201) {
          const message = res.data.message;
          toast.success(message);
          localStorage.setItem("gmail", "");
          setTimeout(() => {
            router.push("/data");
          },1000);
          setLoading(false)
        }
      } catch (error: any) {
        if (error.response) {
          const message = error.response.data.message;
          setError(message);
          setLoading(false)
        } else {
          console.log(error.message);
          toast.error("Network or server error, try again later");
          setLoading(false)
        }
      }
    }
  };

 return (
  <div className="min-h-screen bg-[#FEF7DC] flex items-center justify-center p-4 sm:p-6 lg:p-8">
    <div className="w-full max-w-6xl flex flex-col lg:flex-row rounded-none sm:rounded-xl lg:rounded-2xl shadow-none sm:shadow-lg lg:shadow-xl overflow-hidden">
      {/* Left Panel - Brand & Features */}
      <div className="w-full lg:w-1/2 bg-gradient-to-b from-amber-500 to-amber-600 text-white flex items-center justify-center p-6 sm:p-8 lg:p-10 rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none">
        <div className="text-center max-w-md">
          <p className="text-3xl sm:text-4xl lg:text-5xl xl:text-[50px] font-bold mb-4 sm:mb-6">
            StasHit
          </p>
          <p className="text-base sm:text-lg lg:text-[18px] mb-6 sm:mb-8 leading-relaxed">
            We're verifying your email to keep your contacts secure.
          </p>
          <div className="space-y-4 sm:space-y-5 lg:space-y-6">
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-5">
              <GiCheckMark className="text-lg sm:text-xl lg:text-[20px] flex-shrink-0" />
              <p className="text-sm sm:text-base lg:text-lg">Quick verification process</p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-5">
              <GiCheckMark className="text-lg sm:text-xl lg:text-[20px] flex-shrink-0" />
              <p className="text-sm sm:text-base lg:text-lg">Secure account protection</p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-5">
              <GiCheckMark className="text-lg sm:text-xl lg:text-[20px] shrink-0" />
              <p className="text-sm sm:text-base lg:text-lg">One-time setup only</p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-5">
              <GiCheckMark className="text-lg sm:text-xl lg:text-[20px] shrink-0" />
              <p className="text-sm sm:text-base lg:text-lg">Your data stays private</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Verification Form */}
      <div className="w-full lg:w-1/2 bg-white rounded-b-xl lg:rounded-r-xl lg:rounded-bl-none flex justify-center items-center p-6 sm:p-8 lg:p-10">
        <div className="w-full max-w-sm text-center">
          <div className="flex justify-center mb-4 sm:mb-6">
            <BiEnvelope className="text-3xl sm:text-4xl lg:text-[50px] bg-amber-100 rounded-full w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 p-3 sm:p-4 text-amber-500" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[40px] font-bold text-gray-900 mb-2 sm:mb-4">
            Verify Your Email
          </h2>
          <p className="text-[#78350F] text-sm sm:text-base mb-1">We sent a code to</p>
          <p className="text-amber-500 font-medium text-sm sm:text-base mb-4 sm:mb-6 lg:mb-8 break-all">
            {email}
          </p>
          
          <div className="flex flex-col items-center">
            {error && (
              <p className="text-red-500 text-sm sm:text-[15px] mb-3 sm:mb-4">
                {error}
              </p>
            )}
            <label htmlFor="OTP" className="text-[#78350F] text-sm sm:text-base mb-2 sm:mb-3">
              Enter 6-digit code
            </label>
            <input
              type="number"
              id="OTP"
              className="w-full max-w-xs sm:w-55 p-2 sm:p-3 border border-amber-200 sm:border-2 rounded-lg bg-amber-50 focus:outline-none focus:border-amber-500 focus:bg-white transition-all text-center text-lg"
              onChange={(e) => setOtp(e.target.value)}
              placeholder="000000"
            />
          </div>
          
          <button
            className="w-full max-w-xs sm:w-55 bg-linear-to-l from-amber-500 to-amber-600 py-2.5 sm:py-3 rounded-lg mt-4 sm:mt-5 text-white font-medium cursor-pointer disabled:cursor-not-allowed disabled:opacity-70 hover:shadow-lg transition-all duration-200"
            onClick={btnFun}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </div>
      </div>
    </div>
  </div>
);
}
