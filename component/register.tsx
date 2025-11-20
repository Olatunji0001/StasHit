"use client";
import { GiCheckMark } from "react-icons/gi";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const api = process.env.NEXT_PUBLIC_API;
  const liveApi = process.env.NEXT_PUBLIC_DEPLOYED_API;

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const check = async () => {
    setLoading(true);
    if (!(fullname && email && password)) {
      return setError("Pls input all filed"), setLoading(false);
    }

    if (fullname && email && password) {
      try {
        const res = await axios.post(`${liveApi}/register`, {
          fullname,
          gmail: email,
          password,
        });

        const message = res.data.message;
        if (res.status === 200 || res.status === 201) {
          localStorage.setItem("gmail", email);
          setFullname("");
          setEmail("");
          setPassword("");
          setLoading(false);
          toast.success(message)
          setTimeout(() => {
            router.push("/otp-verification");
          },1000);
        }
      } catch (error: any) {
        if (error.response) {
          const message = error.response.data.message;
          setError(message), setLoading(false);
        } else {
          console.log(error, error.message); setLoading(false)
          toast.error("Network or server error, try again later");
        }
      }
    }
  };

 return (
  <div className="min-h-screen bg-[#FEF7DC] flex items-center justify-center p-4 sm:p-6">
    <div className="w-full max-w-5xl flex flex-col lg:flex-row rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg sm:shadow-xl lg:shadow-2xl overflow-hidden">
      {/* Left Panel - Brand & Features */}
      <div className="w-full lg:w-1/2 bg-linear-to-b from-amber-500 to-amber-600 text-white flex flex-col justify-center items-center p-6 sm:p-8 lg:p-10 space-y-4 sm:space-y-6">
        <Link href={"/"}>
          <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center">StasHit</p>
        </Link>
        <p className="text-center text-base sm:text-lg lg:text-lg opacity-95 max-w-md">
          Join thousands of users who never worry about losing their contacts again.
        </p>
        <div className="w-full max-w-xs sm:max-w-sm space-y-3 sm:space-y-4 mt-4 sm:mt-6 lg:mt-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="rounded-full bg-[#EFA73A] p-1.5 sm:p-2 shrink-0">
              <GiCheckMark className="text-sm sm:text-base" />
            </div>
            <p className="text-sm sm:text-base">Backup all your contacts</p>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="rounded-full bg-[#EFA73A] p-1.5 sm:p-2 shrink-0">
              <GiCheckMark className="text-sm sm:text-base" />
            </div>
            <p className="text-sm sm:text-base">Access your contacts from anywhere</p>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="rounded-full bg-[#EFA73A] p-1.5 sm:p-2 shrink-0">
              <GiCheckMark className="text-sm sm:text-base" />
            </div>
            <p className="text-sm sm:text-base">Instant recovery on any device</p>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="rounded-full bg-[#EFA73A] p-1.5 sm:p-2 shrink-0">
              <GiCheckMark className="text-sm sm:text-base" />
            </div>
            <p className="text-sm sm:text-base">24/7 customer support</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Sign Up Form */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center items-center text-[#78350F] p-6 sm:p-8 lg:p-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-center">Create Account</h2>
        <p className="text-amber-800 mb-6 sm:mb-8 text-center">
          Start protecting your contacts today
        </p>
        
        {error && (
          <p className="text-sm sm:text-[15px] text-red-500 text-center mb-3 w-full max-w-sm">
            {error}
          </p>
        )}
        
        <div className="w-full max-w-xs sm:max-w-sm space-y-4 sm:space-y-5">
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-sm sm:text-base">Full Name</label>
            <input
              type="text"
              placeholder="Tee Jay"
              className="px-3 sm:px-4 py-2.5 sm:py-3 border border-amber-200 sm:border-2 rounded-lg bg-amber-50 focus:outline-none focus:border-amber-500 focus:bg-white transition-all text-sm sm:text-base"
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium text-sm sm:text-base">Email Address</label>
            <input
              type="email"
              placeholder="teejay@example.com"
              className="px-3 sm:px-4 py-2.5 sm:py-3 border border-amber-200 sm:border-2 rounded-lg bg-amber-50 focus:outline-none focus:border-amber-500 focus:bg-white transition-all text-sm sm:text-base"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium text-sm sm:text-base">Password</label>
            <input
              type="password"
              placeholder="••••••••••"
              className="px-3 sm:px-4 py-2.5 sm:py-3 border border-amber-200 sm:border-2 rounded-lg bg-amber-50 focus:outline-none focus:border-amber-500 focus:bg-white transition-all text-sm sm:text-base"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="w-full bg-linear-to-r from-amber-500 to-amber-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold text-base sm:text-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
            onClick={check}
            disabled={loading}
          >
            {loading ? "Processing..." : "Register"}
          </button>
        </div>

        <div className="mt-4 sm:mt-6 text-center">
          <p className="text-gray-600 text-sm sm:text-base">
            Already have an account?{" "}
            <Link href={"/login"}>
              <span className="text-amber-500 font-semibold hover:text-amber-600 hover:underline cursor-pointer">
                Log in
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  </div>
);
}
