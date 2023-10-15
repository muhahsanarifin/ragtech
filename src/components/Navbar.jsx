import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authAction } from "../redux/reducer/auth";
import { useToggle } from "react-use";

import * as promise from "../helpers/promise";
import { componentAction } from "../redux/reducer/component";
import logout from "../utils/auth/logout";
import supabase from "../utils/auth/configClient";

import { Menu } from "@headlessui/react";
import { Icon } from "@iconify/react";

export const Navbar = () => {
  const dispatch = useDispatch();
  const [on, toggle] = useToggle(true);
  const guest = useSelector((state) => state.auth?.guest);
  const login = useSelector((state) => state.auth?.login);
  const user_metadata = login?.data?.user?.user_metadata;

  const handleBackToLogin = async () => {
    await promise.body(dispatch(authAction.cdGuest()));
  };

  const handleToggleSideBar = () => {
    toggle();
    dispatch(dispatch(componentAction.sideBar(on)));
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(authAction.login(session));
    });
  }, [dispatch]);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="bg-gray-50">
      <div className="px-6 py-2 bg-[#cc2e37] h-[3rem] flex items-center">
        <div className="flex items-center justify-between sm:gap-4 flex-1">
          <button
            className="group shrink-0 p-2 rounded-lg hover:bg-white hover:bg-opacity-30 text-white shadow-sm"
            onClick={handleToggleSideBar}
          >
            <div className="flex boder-2 border-solid border-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current transition group-hover:text-[#374151]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </div>
          </button>
          {login?.data && (
            <Menu as="div" className="relative">
              <Menu.Button className="group flex shrink-0 items-center">
                <span className="sr-only">Menu</span>
                <img
                  src={user_metadata?.picture}
                  alt={user_metadata?.full_name}
                  className="h-8 w-8 rounded-full object-cover"
                />

                <p className="ms-2 text-left text-xs sm:block">
                  <strong className="block font-medium text-[#fffcff]">
                    {user_metadata?.full_name}
                  </strong>

                  <span className="text-[#fffcff]">{user_metadata?.email}</span>
                </p>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ms-4 h-5 w-5 text-[#fffcff] transition group-hover:text-[#d0cdd0] sm:block"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Menu.Button>
              <Menu.Items className="absolute mt-2 inset-x-0 space-y-1 bg-white border-x boder-b border-solid p-2 rounded-b-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item className="w-full flex rounded-lg p-2 text-sm font-medium  hover:bg-gray-100 hover:text-gray-700">
                  <button
                    className="flex gap-x-1 items-center"
                    onClick={handleLogout}
                  >
                    <Icon icon="material-symbols:logout" color="#374151" />
                    <p className="text-[#374151]">Close</p>
                  </button>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          )}
          {guest?.isVisited && (
            <div className="group flex shrink-0 items-center rounded-lg transition gap-x-1">
              <span className="sr-only">Menu</span>
              <p className="ms-2 text-left text-xs sm:block">
                <strong className="block font-medium text-[#fffcff]">
                  {guest?.data?.name}
                </strong>
              </p>
              <span className="text-xs text-[#fffcff]">|</span>
              <button onClick={handleBackToLogin}>
                <p className="text-xs text-[#fffcff] underline">
                  Back to login
                </p>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
