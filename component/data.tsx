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
// import { CiHeart } from "react-icons/ci";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ok } from "assert";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const api = process.env.NEXT_PUBLIC_API;

  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await axios.get(`${api}/get-data`, {
          withCredentials: true,
        });
        if (res.status === 204) {
          console.log(100);
        }
        if (res.status === 200) {
          const message = res.data.data;
          console.log(message);
          setData(message);
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          router.push("/sign-up");
        }
        if (error.response.status === 400) {
          router.push("/sign-up");
        } else {
          toast.error("Try again later");
        }
      }
    };
    getdata();
  }, []);

  const deleteBtn = async (event: any) => {
    try {
      const result = confirm("Delete contact");
      if (result) {
        const id = event.currentTarget.dataset.id;
        const res = await axios.delete(
          `${api}/delete-data/${id}`,
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          toast.success("Deleted successfully");
          setData((prev) => prev.filter((item: any) => item._id !== id));
        }
      }
    } catch (error: any) {
      if (error.response === 400) {
        console.log(error.response.data.message);
      } else {
        toast.error("Try again later");
      }
    }
  };

  const editBtn = (event: any) => {
    const id = event.currentTarget.dataset.id;
    const find: any = data.find((data: any) => id === data._id);
    const save = {
      id: id,
      name: find.contactname,
      number: find.contact,
      email: find.email,
      notes: find.notes,
      relationship: find.relationship,
    };
    const value = JSON.stringify(save);
    localStorage.setItem("data", value);

    router.push("/addData");
  };

  const filteredContacts = search
    ? data.filter((e: any) =>
        Object.values(e).some((v: any) =>
          v.toString().toLowerCase().includes(search.toLowerCase())
        )
      )
    : data;

  function renderContacts(list: any) {
    return list.map((element: any) => (
      <div
        key={element._id}
        data-id={element._id}
        className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
      >
        {/* Header with name and actions */}
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-linear-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-semibold text-base sm:text-lg shrink-0">
              {element.contactname.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-900 text-base sm:text-lg truncate">
                {element.contactname}
              </h3>
              <span className="text-sm text-gray-500 block truncate">
                {element.relationship}
              </span>
            </div>
          </div>

          <div className="flex gap-1 sm:gap-2 shrink-0 ml-2">
            <button
              className="p-1.5 sm:p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
              onClick={editBtn}
              data-id={element._id}
              aria-label="Edit contact"
            >
              <FaRegEdit size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
            <button
              className="p-1.5 sm:p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              onClick={deleteBtn}
              data-id={element._id}
              aria-label="Delete contact"
            >
              <RiDeleteBinLine size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
          </div>
        </div>

        {/* Contact info */}
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center gap-2 sm:gap-3 text-gray-600">
            <FiPhone className="text-gray-400 shrink-0" size={16} />
            <span className="text-sm truncate">{element.contact}</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-gray-600">
            <MdOutlineEmail className="text-gray-400 shrink-0" size={16} />
            <span className="text-sm truncate">{element.email}</span>
          </div>

          {element.notes && (
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600 line-clamp-2 wrap-break-words">
                {element.notes}
              </p>
            </div>
          )}
        </div>
      </div>
    ));
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-linear-to-r from-amber-500 to-amber-600 px-4 sm:px-6 lg:px-12 py-4 sm:py-6 rounded-b-2xl shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          <div className="text-white text-center sm:text-left space-y-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold drop-shadow-md">
              StasHIt
            </h1>
            <p className="text-base sm:text-lg font-medium text-amber-100">
              Your secure contact manager
            </p>
          </div>

          <div className="bg-white flex items-center gap-3 sm:gap-5 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 w-full sm:w-auto justify-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-100 flex justify-center items-center shadow-inner shrink-0">
              <FiUsers className="text-xl sm:text-2xl lg:text-3xl text-amber-600" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-500 tracking-wide">
                SAVED CONTACTS
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-600 text-center">
                {data.length}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Search and Add Button Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 max-w-7xl mx-auto mb-6 sm:mb-8">
          <div className="flex items-center gap-3 border border-gray-200 sm:border-2 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl bg-white focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-100 transition-all w-full sm:w-80">
            <LuSearch className="text-gray-400 shrink-0" size={18} />
            <input
              type="text"
              className="flex-1 h-7 outline-none bg-transparent text-gray-800 placeholder-gray-400 text-sm sm:text-base"
              placeholder="Search contacts"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Link href={"/addData"} className="w-full sm:w-auto">
            <button className="bg-linear-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl flex items-center justify-center gap-2 sm:gap-3 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 w-full">
              <IoMdAdd size={20} className="sm:w-6 sm:h-6" />
              <span className="text-sm sm:text-base">Add Contact</span>
            </button>
          </Link>
        </div>

        {/* Contacts Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredContacts.length > 0 ? (
              renderContacts(filteredContacts)
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-12 sm:py-20 col-span-full">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center shadow-inner mb-3 sm:mb-4">
                  <FiUser size={32} className="sm:w-10 sm:h-10" />
                </div>
                <p className="text-lg sm:text-xl font-semibold text-gray-700 mb-1">
                  No contacts found
                </p>
                <p className="text-gray-500 text-sm sm:text-base">
                  Add a contact or adjust your search.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
