"use client";
import { GiCheckMark } from "react-icons/gi";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Login() {
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const api = process.env.NEXT_PUBLIC_API;
  const liveApi = process.env.NEXT_PUBLIC_DEPLOYED_API;

  useEffect(() => {
    if (error) {
      const time = setTimeout(() => {
        setError("");
      }, 5000);
      const cut = () => {
        clearTimeout(time);
      };
      return cut;
    }
  }, [error]);

  const validate = async () => {
    setLoading(true);
    if (!(gmail && password)) {
      setError("Pls input all field");
      setLoading(false);
    }
    if (gmail && password) {
      try {
        const res = await axios.post(
          `${liveApi}/login`,
          {
            gmail,
            password,
          },
          { withCredentials: true }
        );
        if (res.status === 200 || res.status === 201) {
          const message = res.data.message;
          toast.success(message);
          setTimeout(() => {
            router.push("/data");
          }, 1000);
          setLoading(false);
        }
      } catch (error: any) {
        if (error.response.status === 400) {
          const message = error.response.data.message;
          setError(message);
          setLoading(false);
          setTimeout(() => {
            router.push("/sign-up");
          }, 5000);
        }
        if (error.response) {
          const message = error.response.data.message;
          setError(message);
          setLoading(false);
        } else {
          console.log(error.message);
          toast.error("Network or server error, try again later");
          setLoading(false);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FEF7DC] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg sm:shadow-xl lg:shadow-2xl overflow-hidden">
        {/* Left Panel - Brand & Features */}
        <div className="w-full lg:w-1/2 bg-amber-500 text-white flex flex-col justify-center items-center p-6 sm:p-8 lg:p-10 space-y-4 sm:space-y-6">
          <Link
            href={"/"}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center"
          >
            StashIt
          </Link>
          <p className="text-center text-base sm:text-lg lg:text-xl opacity-95 max-w-md">
            Welcome back! Access your safely stored contacts anytime, anywhere.
          </p>
          <div className="w-full max-w-xs sm:max-w-sm space-y-3 sm:space-y-4 mt-4 sm:mt-6 lg:mt-8">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="rounded-full bg-[#EFA73A] p-1.5 sm:p-2 shrink-0">
                <GiCheckMark className="text-sm sm:text-base" />
              </div>
              <p className="text-sm sm:text-base">Secure cloud storage</p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="rounded-full bg-[#EFA73A] p-1.5 sm:p-2 shrink-0">
                <GiCheckMark className="text-sm sm:text-base" />
              </div>
              <p className="text-sm sm:text-base">
                Instant access to your contacts
              </p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="rounded-full bg-[#EFA73A] p-1.5 sm:p-2 shrink-0">
                <GiCheckMark className="text-sm sm:text-base" />
              </div>
              <p className="text-sm sm:text-base">Sync across all devices</p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="rounded-full bg-[#EFA73A] p-1.5 sm:p-2 shrink-0">
                <GiCheckMark className="text-sm sm:text-base" />
              </div>
              <p className="text-sm sm:text-base">Protected with encryption</p>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center items-center text-[#78350F] p-6 sm:p-8 lg:p-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-center">
            Welcome Back
          </h2>
          <p className="text-amber-800 mb-6 sm:mb-8 text-center">
            Log in to access your contacts
          </p>

          {error && (
            <p className="text-sm sm:text-[15px] text-red-500 text-center mb-4 w-full max-w-sm">
              {error}
            </p>
          )}

          <div className="w-full max-w-xs sm:max-w-sm space-y-4 sm:space-y-5">
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-sm sm:text-base">
                Email Address
              </label>
              <input
                type="email"
                placeholder="teejay@example.com"
                className="px-3 sm:px-4 py-2.5 sm:py-3 border border-amber-200 sm:border-2 rounded-lg bg-amber-50 focus:outline-none focus:border-amber-500 focus:bg-white transition-all text-sm sm:text-base"
                onChange={(e) => setGmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-medium text-sm sm:text-base">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••••"
                className="px-3 sm:px-4 py-2.5 sm:py-3 border border-amber-200 sm:border-2 rounded-lg bg-amber-50 focus:outline-none focus:border-amber-500 focus:bg-white transition-all text-sm sm:text-base"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 accent-amber-500 cursor-pointer"
                />
                <label
                  htmlFor="remember"
                  className="text-xs sm:text-sm text-gray-600 cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              <span className="text-xs sm:text-sm text-amber-500 font-semibold hover:text-amber-600 hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>

            <button
              className="w-full bg-linear-to-r from-amber-500 to-amber-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold text-base sm:text-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-70"
              onClick={validate}
              disabled={loading}
            >
              {loading ? "Processing..." : "Login"}
            </button>
          </div>

          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-gray-600 text-sm sm:text-base">
              Don't have an account?{" "}
              <Link href={"/sign-up"}>
                <span className="text-amber-500 font-semibold hover:text-amber-600 hover:underline cursor-pointer">
                  Sign up
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
