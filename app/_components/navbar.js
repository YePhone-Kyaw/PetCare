// NavBar.js
"use client";

import { dbGetAllPosts } from "@/app/_services/adoption-service";
import { useUserAuth } from "@/app/_utils/auth-context";
import { Fragment } from "react";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";
import Link from "next/link";

export default function NavBar() {
  const { user, firebaseSignOut } = useUserAuth() || {};

  async function handleSignOut() {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }

  return (
    <div className="flex justify-between bg-navigation text-font-color">
      <header>
        <b>
          <h1 className="text-4xl ml-5">Pet Care</h1>
        </b>
      </header>
      <div>
        {user ? (
          <Menu as="div">
            <MenuButton className="inline-block w-full mr-5 text-font-color hover:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                width={30}
                height={30}
                className="fill-current"
              >
                <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
              </svg>
            </MenuButton>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-100"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems
                className="absolute mt-2 right-5 origin-top-right bg-navigation rounded-md shadow-lg focus:outline-none"
              >
                <div className="flex flex-col justify-between">
                  <MenuItem>
                    <Link href="/pages/feeds" className="block w-full text-left bg-navigation rounded-md p-2 hover:bg-hover-style">
                      Feeds
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <button
                      className="bg-navigation rounded-md p-2 hover:bg-hover-style text-left w-full"
                      onClick={() => {/* Handle favorite action */}}
                    >
                      Favorite
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      className="bg-navigation rounded-md p-2 hover:bg-hover-style text-left w-full"
                      onClick={() => {/* Handle about us action */}}
                    >
                      About Us
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      className="bg-navigation rounded-md p-2 hover:bg-hover-style text-left w-full"
                      onClick={handleSignOut}
                    >
                      Logout
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </Transition>
          </Menu>
        ) : null}
      </div>
    </div>
  );
}
