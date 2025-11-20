"use client";
import { FiUsers } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { LuSearch } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiHeart } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";


export default function AddData() {
  const [fullname, setFullname] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [relationship, setRelationship] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const api = process.env.NEXT_PUBLIC_API;

  useEffect(() => {
    if (error) {
      const time = setTimeout(() => {
        setError("");
      }, 5000);
      return () => {
        clearTimeout(time);
      };
    }
  }, [error]);

  console.log(number, email, relationship, notes, fullname);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data") || "{}");
    if (Object.keys(data).length > 0) {
      setFullname(data.name);
      setNumber(data.number);
      setEmail(data.email);
      setNotes(data.notes);
      setRelationship(data.relationship);
    }
  }, []);

  const btn = async () => {
    setLoading(true);
    if (!(fullname && number && relationship)) {
      setError("input all the required field");
      setLoading(false);
    }
    if ((fullname && number && relationship) || notes || email) {
      const data = JSON.parse(localStorage.getItem("data") || "{}");
      if (Object.keys(data).length > 0) {
        try {
          const id = data.id;
          const res = await axios.put(
            `${api}/edit-data/${id}`,
            {
              contactname: fullname,
              contact: number,
              relationship: relationship,
              notes: notes,
              email,
            },
            { withCredentials: true }
          );
          if (res.status === 200) {
            setLoading(false);
            const message = res.data.message;
            setFullname("");
            setNumber("");
            setRelationship("");
            setNotes("");
            setEmail("");
            toast.success(message);
            setTimeout(() => {
              router.push("/data");
            }, 2010);
            localStorage.setItem("data", "");
          }
        } catch (error: any) {
          if (error.response.status === 401) {
            toast.error("Verify your account");
            router.push("/sign-up");
          }
          if (error.response.status === 400) {
            const message = error.response.data.message;
            return setError(message);
          }
          if (error.response.status === 404) {
            const message = error.response.data.message;
            return setError(message);
          } else {
            return toast.error("Try again later");
          }
        }
      } else {
        try {
          const res = await axios.post(
            `${api}/save-data`,
            {
              contactname: fullname,
              contact: number,
              relationship: relationship,
              notes: notes,
              email,
            },
            { withCredentials: true }
          );
          if (res.status === 201) {
            const message = res.data.message;
            setFullname("");
            setNumber("");
            setRelationship("");
            setNotes("");
            setEmail("");
            toast.success(message);
            setLoading(false);
            setTimeout(() => {
              router.push("/data");
            }, 1300);
          }
          if (res.status === 204) {
            setError("Note should not exceed 50 characters");
            setLoading(false);
          }
        } catch (error: any) {
          if (error.response.status === 401) {
            const message = error.response.data.message;
            setTimeout(() => {
              router.push("/sign-up");
            }, 1300);
            console.log(message);
          } else if (error.response.status === 400) {
            const message = error.response.data.message;
            setError(message);
            setLoading(false);
            setTimeout(() => {
              router.push("/sign-up");
            }, 1300);
          } else {
            setError("try again later");
            console.log(error.message);
          }
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4">
            <div className="bg-linear-to-r from-amber-500 to-amber-600 w-16 h-16 flex items-center justify-center rounded-2xl shadow-sm mx-auto">
              <FiUser className="text-white text-2xl" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Add New Contact
          </h1>
          <p className="text-gray-600 text-sm">
            Save your important contacts securely
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-800 text-sm text-center">{error}</p>
          </div>
        )}

        {/* Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <form className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <FiUser size={16} />
                Full name *
              </label>
              <input
                type="text"
                required
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                placeholder="Enter full name"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <FiPhone size={16} />
                Phone number *
              </label>
              <input
                type="tel"
                required
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                placeholder="Enter phone number"
              />
            </div>

            {/* Relationship */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <CiHeart size={16} />
                Relationship *
              </label>
              <input
                type="text"
                required
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                placeholder="e.g. Friend, Family, Colleague"
              />
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <MdOutlineEmail size={16} />
                Email
                <span className="text-gray-400 text-xs font-normal">
                  (optional)
                </span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                placeholder="Enter email address"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <IoDocumentTextOutline size={16} />
                Notes
                <span className="text-gray-400 text-xs font-normal">
                  (optional)
                </span>
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 h-20 resize-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                placeholder="Add any additional notes"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={btn}
                disabled={loading}
                className="flex-1 bg-amber-600 text-white py-2.5 rounded-lg font-medium hover:bg-amber-700 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Saving..." : "Save contact"}
              </button>
              <button
                type="button"
                onClick={() => (router.push("/data"), localStorage.setItem("data", ""))}
                className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
