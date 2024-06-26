import React from "react";
import { BsCart4 } from "react-icons/bs";
import { FaUserLarge } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import SummaryApi from "../common";
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice'

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  console.log("user header", user)



  const handelLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    })
    const data = await fetchData.json()
    if (data.success) {
      toast.success(data.message)
      dispatch(setUserDetails(null))
    }
    if (data.error) {
      toast.error(data.message)
    }
  }
  return (
    <header className="h-16 shadow-md bg-white">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className="">
          <Link to={"/"}>
            <Logo w={170} h={60} />
          </Link>
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-3">
          <input
            type="text"
            placeholder="Find your items...."
            className="w-full outline-none "
          />
          <div className="text:lg min-w-[50px] h-8 bg-red-500 flex items-center justify-center rounded-full text-white">
            <IoSearchSharp />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div className="text-2xl cursor-pointer">
            {
              user?.profilePic ? (
                <img src={user?.profilePic} className="w-8 h-8 rounded-full" alt={user?.name} />
              ) : (
                <FaUserLarge />
              )

            }

          </div>
          <div className="text-2xl relative">
            <span>
              <BsCart4 />
            </span>
            <div className="bg-red-400 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
              <p className="text-sm">0</p>
            </div>
          </div>
          <div>
            {
              user?._id ? (
                <button onClick={handelLogout} className="px-3 py-1 rounded-full text-white bg-red-500 hover:bg-red-700 flex items-center justify-center ">Logout</button>
              )
                : (
                  <Link to={"/login"} className="px-3 py-1 rounded-full text-white bg-red-500 hover:bg-red-700 flex items-center justify-center ">LogIn</Link>
                )
            }

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
