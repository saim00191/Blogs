"use client";
import Container from "@/shared/Container";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { IoIosLogOut } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { setSignOut } from "@/redux/slice";
import { RootState } from "@/redux/store";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  const userInfo = useSelector(
    (state: RootState) => state.commentsSlice?.userInfo
  );

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const userInitial = userInfo?.displayName?.charAt(0).toUpperCase();

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        dispatch(setSignOut());
      })
      .catch(() => {
        console.log("An error occurred while signing out");
      });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-[36px] flex items-center py-14">
      <Container className="w-full flex flex-col xs:flex-row gap-4 items-center justify-between">
        <Link href="/">
          <h2 className="text-[22px] font-bold">ScribbleWorld!</h2>
        </Link>

        <div className="flex items-center gap-5">
          {userInfo ? (
            <div className="flex items-center gap-3 relative">
              {userInfo.photoURL ? (
                <img
                  src={userInfo.photoURL}
                  alt="User Profile"
                  className="w-8 h-8 rounded-full cursor-pointer"
                  onClick={toggleDropdown}
                />
              ) : (
                <div
                  className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <span className="text-white text-[16px]">{userInitial}</span>
                </div>
              )}
              <span className="text-[16px] text-gray-600">
                {userInfo.displayName}
              </span>

              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-20 w-40 bg-white border border-gray-300 rounded-md shadow-md"
                >
                  <button
                    className="w-full text-left flex items-center gap-4 px-4 py-2 text-[16px] text-gray-700 hover:bg-gray-100"
                    onClick={logoutHandler}
                  >
                    <IoIosLogOut size={24} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/signin"
                className="w-[70px] xsm:w-[100px] outline-none flex items-center justify-center h-8 rounded-md text-white hover:text-[#141624] hover:bg-white duration-300 bg-[#141624] border border-[#3B3C4A]"
              >
                Signin
              </Link>
              <Link
                href="/signup"
                className="w-[70px] xsm:w-[100px] flex items-center justify-center h-8 rounded-md border border-[#3B3C4A] hover:text-white text-[#141624] bg-white duration-300 hover:bg-[#141624]"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Header;
