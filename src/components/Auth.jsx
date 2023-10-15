import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";

import * as promise from "../helpers/promise";
import { authAction } from "../redux/reducer/auth";
import login from "../utils/auth/login";

import Img from "../utils/image";

export const Login = () => {
  const navigate = useNavigate();
  
  const handleLogin = async () => {
    await login();
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <img src={Img.GLOGO} alt="G" className="w-[128px] h-[128px] mx-auto" />

        <h1 className="text-center text-2xl font-bold text-[#cc2e37] sm:text-3xl">
          RAGTECH | <span className="text-[#cc2e36aa]">DASHBOARD</span>.
        </h1>

        <div className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
          <p className="text-center text-md font-semibold">Sign in to</p>

          <div className="flex justify-center">
            <button className="mx-1" onClick={handleLogin}>
              <Icon icon="devicon:google" width="32" height="32" />
            </button>
          </div>

          <p className="text-center text-sm text-gray-500">
            No account?
            <button className="underline cursor-not-allowed" href="" disabled>
              Sign up
            </button>
            <span className="px-1">|</span>
            <button
              className="underline"
              onClick={() => navigate("/auth/guest")}
            >
              Guest
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export const Guest = () => {
  const dispatch = useDispatch();
  const [body, setBody] = useState({
    name: "",
  });
  const navigate = useNavigate();

  const handleInputGuest = (e) => {
    const { name, value } = e.target;

    setBody({ ...body, [name]: value.trimStart() });
  };

  const handleGuest = async () => {
    await promise.body(dispatch(authAction.guest(body)));
  };

  return (
    <>
      <div className="w-full px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-[#cc2e37] sm:text-3xl">
            RAGTECH.
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            <span className="font-bold">Please</span>, input your{" "}
            <span className="font-bold">name </span>to visit our Dashboard.
          </p>

          <div className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
            <p className="text-center text-md font-semibold">
              Visit as{" "}
              <span className="text-[#cc2e37]">
                {body.name && `"${body.name}"`}
              </span>{" "}
              Guest
            </p>

            <div className="h-[3.55rem]">
              <label htmlFor="name" className="sr-only">
                Name
              </label>

              <div className="relative">
                <input
                  name="name"
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:ring-1 focus:ring-[#818598] focus:border-[#6a6f85] active:text-[#818598]"
                  placeholder="Enter name"
                  onChange={handleInputGuest}
                />
              </div>
            </div>

            <button
              className={` ${
                Object.values(body).includes("")
                  ? "cursor-not-allowed bg-[#cc2e36a8]"
                  : "bg-[#cc2e37]"
              } block w-full rounded-lg px-5 py-3 text-sm font-medium text-white`}
              onClick={handleGuest}
              disabled={Object.values(body).includes("")}
            >
              Visit
            </button>

            <p className="text-center text-sm text-gray-500">
              No account?
              <button
                className="underline"
                onClick={() => navigate("/auth/login")}
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
