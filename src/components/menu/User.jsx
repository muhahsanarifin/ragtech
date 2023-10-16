import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useToggle, useDebounce } from "react-use";

import { userAction } from "../../redux/reducer/user";
import * as promise from "../../helpers/promise";
import { encPwd, decPwd } from "../../helpers/hash";
import { meta, currentPosts } from "../../helpers/handlePaginate";

import { CNAButton, DEDButton, ACButton, DAButton } from "../Button";
import Breadcrumb from "../Breadcrumb";
import * as Feed from "../../components/Feedback";
import Paginate from "../Pagination";

export const User = () => {
  const dispatch = useDispatch();
  const create = useSelector((state) => state.user?.create);
  const get = useSelector((state) => state.user?.get);
  const edit = useSelector((state) => state.user?.edit);
  const detailConfirmation = useSelector(
    (state) => state.user?.detailConfirmation
  );
  const navigate = useNavigate();
  const params = useParams();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const handleEditAccount = async () => {
    navigate(`/account/edit/${detailConfirmation?.data?.id}`, {
      relative: "path",
    });

    await promise.body(
      dispatch(userAction.editConfirmation(detailConfirmation?.data))
    );
  };

  // Handle search
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useDebounce(
    () => {
      setDebouncedSearch(search);
    },
    2000,
    [search]
  );

  return (
    <div className="p-4 flex flex-col h-full sm:min-h-[23.45rem]">
      {/* BREADCRUMB */}
      <section className="my-3">
        <Breadcrumb
          onData={
            params.subtitle === "account"
              ? ["Account"]
              : params.subtitle === "access"
              ? ["Access"]
              : params.coretitle === "add"
              ? ["Account", "Add"]
              : params.editId
              ? ["Account", "Edit"]
              : params.detailId
              ? ["Account", "Detail"]
              : []
          }
          onPath={"/user/account"}
        />
      </section>

      {/* TOP OF CONTENT */}
      <section
        className={`flex py-2 px-4 items-center  ${
          params.subtitle === "access"
            ? "border-none"
            : "rounded-t-lg border-t-2 border-b border-x-2"
        }`}
      >
        <div>
          <h1 className="font-semibold text-xl">
            {params.subtitle === "account"
              ? "Account"
              : params.coretitle === "add"
              ? "Add Account"
              : params.editId
              ? "Edit Account"
              : params.detailId
              ? "Detail Account"
              : null}
          </h1>
        </div>
        <div className="flex ml-auto gap-x-4 items-center md:gap-x-1 md:px-1">
          {/* ACCOUNT BUTTON */}
          {params.subtitle === "account" && (
            <>
              <div className="relative">
                <label className="sr-only" htmlFor="search">
                  {" "}
                  Search{" "}
                </label>

                <input
                  className="h-10 w-full rounded-lg border-none bg-white ps-10 pe-4 text-sm shadow-sm"
                  id="search"
                  type="search"
                  placeholder="Search website..."
                  onChange={handleSearch}
                />

                <div className="absolute start-1 top-1/2 -translate-y-1/2 rounded-full bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700">
                  <span className="sr-only">Search</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
              <CNAButton />
            </>
          )}
          {/* DETAIL ACCOUNT BUTTON */}
          {params.detailId && (
            <>
              <DAButton
                onInitial={"Back"}
                onIconType={"material-symbols:arrow-left-alt-rounded"}
                onClassName={
                  "inline-block rounded border border-[#6a6f85] bg-transparent p-2 text-xs font-medium text-[#6a6f85] hover:bg-[#6a6f85] hover:text-white focus:outline-none focus:ring-1 flex gap-x-2 items-center focus:ring-[#818598] active:text-white"
                }
                setClick={() => navigate(-1)}
              />
              <DAButton
                onInitial={"Edit"}
                onIconType={"material-symbols:edit-square-outline"}
                onClassName={
                  "inline-block rounded p-2 text-xs font-medium text-white flex gap-x-2 bg-[#ee8a13] hover:bg-[#f69d44]"
                }
                setClick={handleEditAccount}
              />
            </>
          )}
        </div>
      </section>

      {/* ACCOUNT */}
      {params.subtitle === "account" && (
        <>
          {get?.data ? <Account onSearch={debouncedSearch} /> : <Feed.Empty />}
        </>
      )}

      {/* ACCESS */}
      {params.subtitle === "access" && <Access />}

      {/* ADD, DETAIL, EDIT ACCOUNT */}
      <section
        className={
          params.coretitle === "add" || params.detailId || params.editId
            ? "flex h-full p-4 border rounded-b-lg sm:min-h-[23.45rem]"
            : null
        }
      >
        {params.coretitle === "add" && (
          <>
            {create?.isFulfilled ? (
              <Feed.Success msg={create?.msg} />
            ) : (
              <AddAccount />
            )}
          </>
        )}
        {params.detailId && <DetailAccount />}
        {params.editId && (
          <>
            {edit?.isFulfilled ? (
              <Feed.Success msg={edit?.msg} />
            ) : (
              <EditAccount />
            )}
          </>
        )}
      </section>
    </div>
  );
};

// ACCOUNT SECTION
export const Account = ({ onSearch }) => {
  const dispatch = useDispatch();
  const get = useSelector((state) => state.user?.get);
  const navigate = useNavigate();

  // Handle edit data confirmation
  const handleEditDataConfirmation = async ({ data }) => {
    navigate("/account/edit/" + `${data.id}`);

    await promise.body(dispatch(userAction.editConfirmation(data)));
  };

  const handleDetailAccount = async ({ data }) => {
    navigate(`/account/detail/${data.id}`, { relative: "path" });

    await promise.body(dispatch(userAction.detailConfirmation(data)));
  };

  // Handle status user
  const handleStatusUser = async ({ et, data }) => {
    const { checked } = et.target;

    const status = checked ? "active" : "inactive";

    const body = {
      id: data.id,
      email: data.email,
      name: data.name,
      role: data.role,
      password: data.password,
      status: status,
    };

    let datas = [];

    for (let el of get.data) {
      if (el.id === data?.id) {
        el = body;
      }
      datas.push(el);
    }

    await promise.body(dispatch(userAction.updateStatus(datas)));

    await promise.body(dispatch(userAction.cdUpdateStatus()));
  };

  // Handle delete account
  const handleDeleteAccount = async ({ id }) => {
    const data = get?.data?.filter((el) => el.id !== id);

    await promise.body(
      dispatch(userAction.delete(data.length === 0 ? null : data))
    );

    await promise.body(dispatch(userAction.cdDelete()));
  };

  // Handle paginate
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(7);

  const posts = currentPosts(get?.data, currentPage, postsPerPage);

  const metaData = meta(get?.data, currentPage, postsPerPage);

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const currentPost = posts?.filter(
    (post) =>
      post.status.toLowerCase() === onSearch.toLowerCase() ||
      post.email.toLowerCase().includes(onSearch.toLowerCase()) ||
      post.name.toLowerCase().includes(onSearch.toLowerCase()) ||
      post.role.toLowerCase() === onSearch.toLowerCase()
  );

  const currentMetaData = meta(
    onSearch ? currentPost : get?.data,
    currentPage,
    postsPerPage
  );

  useEffect(() => {
    posts?.length === 0
      ? setCurrentPage(metaData?.currentPage - 1)
      : setCurrentPage(metaData?.currentPage);
  }, [posts?.length, metaData?.currentPage]);

  return (
    <>
      <section
        className={`${
          currentPost.length === 0 && "flex"
        } border h-full sm:min-h-[23.45rem]`}
      >
        {currentPost.length === 0 ? (
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-xl m-auto">
            We can&apos;t find data.
          </h1>
        ) : (
          <div className="lg:h-full lg:overflow-x-auto">
            <table className="w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="text-left border-x">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Status
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Name
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Email
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Role
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 w-[241.6px]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentPost?.map((el) => (
                  <>
                    <tr key={el.id}>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 flex items-center gap-x-2">
                        <label
                          htmlFor={el.id}
                          className="relative h-8 w-14 cursor-pointer flex"
                        >
                          <input
                            type="checkbox"
                            id={el.id}
                            className="peer sr-only [&:checked_+_span_svg[data-checked-icon]]:block [&:checked_+_span_svg[data-unchecked-icon]]:hidden"
                            onChange={(e) =>
                              handleStatusUser({ et: e, data: el })
                            }
                            defaultChecked={
                              el.status === "active" ? true : false
                            }
                          />

                          <span className="absolute inset-y-0 start-0 z-10 m-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-gray-400 transition-all peer-checked:start-6 peer-checked:text-green-600">
                            <svg
                              data-unchecked-icon
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>

                            <svg
                              data-checked-icon
                              xmlns="http://www.w3.org/2000/svg"
                              className="hidden h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>

                          <span className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-green-500"></span>
                        </label>
                        {/* STATUS */}
                        {el.status}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        {el.name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {el.email}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {el.role}
                      </td>
                      <td className="whitespace-nowrap overflow-x-auto px-4 py-2 w-[241.6px] flex gap-x-2">
                        <DEDButton
                          onId={el.id}
                          onInitial="Detail"
                          onIconType={"material-symbols:visibility-outline"}
                          onIconColor={"#fffcff"}
                          onClassName={
                            "inline-block rounded p-2 text-xs font-medium text-white flex gap-x-2 bg-[#2acbd4] hover:bg-[#64d4db]"
                          }
                          setClick={() => handleDetailAccount({ data: el })}
                        />
                        <DEDButton
                          onId={el.id}
                          onInitial="Edit"
                          onIconType={
                            "material-symbols:edit-square-outline-rounded"
                          }
                          onIconColor={"#fffcff"}
                          onClassName={
                            "inline-block rounded p-2 text-xs font-medium text-white flex gap-x-2 bg-[#ee8a13] hover:bg-[#f69d44]"
                          }
                          setClick={() =>
                            handleEditDataConfirmation({ data: el })
                          }
                        />
                        <DEDButton
                          onInitial="Delete"
                          onIconType={"material-symbols:delete-outline-rounded"}
                          onIconColor={"#fffcff"}
                          onClassName={
                            "inline-block rounded p-2 text-xs font-medium text-white flex gap-x-2 bg-[#e3333d] hover:bg-[#ee5e5a]"
                          }
                          setClick={() => handleDeleteAccount({ id: el.id })}
                        />
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      {/* PAGINATION */}
      <section className="flex p-2 border-x border-b rounded-b-lg">
        <Paginate
          meta={currentMetaData}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
        />
      </section>
    </>
  );
};

export const AddAccount = () => {
  const [on, toggle] = useToggle(true);
  const dispatch = useDispatch();
  const get = useSelector((state) => state.user?.get);
  const [body, setBody] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleInputAddAccount = (e) => {
    const { name, value } = e.target;
    setBody({
      ...body,
      [name]: value,
    });
  };

  const handleAddAccount = async () => {
    await promise.body(
      dispatch(
        userAction.create(
          get?.data?.length > 0
            ? [
                ...get.data,
                {
                  id: get?.data[get?.data.length - 1]?.id + 1,
                  name: body.name,
                  email: body.email,
                  password: encPwd(body.password),
                  role: body.role,
                  status: "inactive",
                },
              ]
            : [
                {
                  id: 1,
                  name: body.name,
                  email: body.email,
                  password: encPwd(body.password),
                  role: body.role,
                  status: "inactive",
                },
              ]
        )
      )
    );

    await promise.body(dispatch(userAction.cdcreate()));
  };

  const handleCancelAddAccount = () => {
    setBody({
      name: "",
      email: "",
      password: "",
      role: "",
    });
  };

  return (
    <div className="w-1/2 flex flex-col gap-y-4 lg:w-full">
      <div className="flex flex-col gap-y-2">
        <label htmlFor="name" className="font-semibold text-[14px]">
          Name
        </label>
        <div className="relative">
          <input
            name="name"
            id="name"
            type="name"
            className="w-full rounded-lg border-gray-200 p-2 pe-12 text-sm shadow-sm focus:border-none focus:outline-none focus:ring-2 focus:ring-[#818598] active:text-[#818598] h-[36px]"
            placeholder="Input name"
            onChange={handleInputAddAccount}
            value={body.name}
          />
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <label htmlFor="email" className="font-semibold text-[14px]">
          Email
        </label>
        <div className="relative">
          <input
            name="email"
            id="email"
            type="email"
            className={`w-full rounded-lg  p-2 pe-12 text-sm shadow-sm focus:border-none focus:outline-none focus:ring-2 focus:ring-[#818598] active:text-[#818598] h-[36px] ${get?.data?.some(
              (el) =>
                el.email === body.email ? "border-pink-600" : "border-gray-200"
            )}`}
            placeholder="Input email"
            onChange={handleInputAddAccount}
            value={body.email}
          />

          <span
            className={` absolute inset-y-0 end-0 grid place-content-center px-4`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </span>
        </div>
        {get?.data?.some((el) => el.email === body.email) && (
          <p className="mt-2 text-pink-600 text-xs font-bold">
            Email already use.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-y-2">
        <label htmlFor="password" className="font-semibold text-[14px]">
          Password
        </label>

        <div className="relative">
          <input
            name="password"
            id="password"
            type={on ? "password" : "text"}
            className="w-full rounded-lg border-gray-200 p-2 pe-12 text-sm shadow-sm focus:border-none focus:outline-none focus:ring-2 focus:ring-[#818598] active:text-[#818598] h-[36px]"
            placeholder="Input password"
            onChange={handleInputAddAccount}
            value={body.password}
          />

          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            {on ? (
              <button onClick={toggle}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="none"
                  viewBox="0 0 16 16"
                >
                  <g fill="#9ca3af">
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288c-.335.48-.83 1.12-1.465 1.755c-.165.165-.337.328-.517.486l.708.709z" />
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884l-12-12l.708-.708l12 12l-.708.708z" />
                  </g>
                </svg>
              </button>
            ) : (
              <button onClick={toggle}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            )}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <label
          htmlFor="role"
          className="block text-[14px] font-semibold text-gray-900"
        >
          Role
        </label>

        <select
          name="role"
          id="role"
          className="w-full p-2 rounded-lg border-gray-300 text-gray-700 text-sm focus:border-none focus:outline-none focus:ring-2 focus:ring-[#818598] active:text-[#818598] h-[36px]"
          onChange={handleInputAddAccount}
          value={body.role}
        >
          <option className="sr-only">Select role</option>
          <option value="Admin">Admin</option>
          <option value="Super Admin">Super Admin</option>
        </select>
      </div>

      <div className="flex gap-x-4">
        <ACButton
          onClassName={`inline-block rounded-sm px-12 py-3 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-[#818598] active:text-[#818598] ${
            Object.values(body).includes("") ||
            get?.data?.some((el) => el.email === body.email)
              ? "bg-[#d4d1dc] cursor-not-allowed"
              : "hover:bg-transparent hover:text-[#6a6f85] bg-[#6a6f85] border border-[#6a6f85]"
          }`}
          onType={"button"}
          onInitial="Add"
          setClick={handleAddAccount}
          disabled={
            Object.values(body).includes("") ||
            get?.data?.some((el) => el.email === body.email)
          }
        />
        <ACButton
          onClassName={`inline-block rounded-sm border border-[#6a6f85] bg-transparent px-12 py-3 text-sm font-medium text-[#6a6f85] ${
            Object.values(body).some((el) => el !== "")
              ? "hover:text-white focus:outline-none focus:ring-2 focus:ring-[#818598] active:text-white hover:bg-[#6a6f85]"
              : "cursor-not-allowed"
          }`}
          onType={"reset"}
          onInitial="Cancel"
          setClick={handleCancelAddAccount}
          disabled={Object.values(body).every((el) => el === "")}
        />
      </div>
    </div>
  );
};

export const DetailAccount = () => {
  const detailConfirmation = useSelector(
    (state) => state.user?.detailConfirmation
  );

  return (
    <div className="flex flex-col w-1/2 gap-y-2">
      <div className="flex flex-col gap-y-2">
        <h1 className="font-semibold text-lg">User Information</h1>
        <p className="text-[14px]">
          Status:{" "}
          <span
            className={`font-semibold ${
              detailConfirmation?.data?.status === "active"
                ? "text-[#a0e6c9]"
                : "text-[#FD5D5D]"
            }`}
          >
            {detailConfirmation?.data?.status}
          </span>
        </p>
      </div>
      <div className="flow-root">
        <dl className=" divide-y divide-gray-100 text-sm">
          <div className="flex items-center gap-x-2 py-3 odd:bg-[#d2d2da] px-2">
            <dt className="font-medium text-gray-900 w-[100.262px]">Name</dt>
            <dd className="text-gray-700">{detailConfirmation?.data?.name}</dd>
          </div>

          <div className="flex items-center gap-x-2 py-3 odd:bg-[#d2d2da] px-2">
            <dt className="font-medium text-gray-900 w-[100.262px]">Email</dt>
            <dd className="text-gray-700">{detailConfirmation?.data?.email}</dd>
          </div>

          <div className="flex items-center gap-x-2 py-3 odd:bg-[#d2d2da] px-2">
            <dt className="font-medium text-gray-900 w-[100.262px]">Role</dt>
            <dd className="text-gray-700">{detailConfirmation?.data?.role}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export const EditAccount = () => {
  const [on, toggle] = useToggle(true);
  const editConfirmation = useSelector((state) => state.user?.editConfirmation);
  const get = useSelector((state) => state.user?.get);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [body, setBody] = useState({
    id: "" || editConfirmation?.data?.id,
    name: "" || editConfirmation?.data?.name,
    email: "" || editConfirmation?.data?.email,
    password:
      "" || editConfirmation?.data?.password
        ? decPwd(editConfirmation?.data?.password)
        : "",
    role: "" || editConfirmation?.data?.role,
    status: "" || editConfirmation?.data?.status,
  });

  const handleInputEditAccount = (e) => {
    const { name, value } = e.target;

    setBody({ ...body, [name]: value.trimStart() });
  };

  const handleSaveEditAccount = async () => {
    let data = [],
      newBody = {
        id: body.id,
        name: body.name,
        email: body.email,
        password: encPwd(body.password),
        role: body.role,
        status: body.status,
      };
    for (let el of get.data) {
      if (el.id === editConfirmation?.data?.id) {
        el = newBody;
      }
      data.push(el);
    }

    await promise.body(dispatch(userAction.edit(data)));

    await promise.body(dispatch(userAction.editConfirmation(newBody)));

    await promise.body(dispatch(userAction.cdedit()));
  };

  const handleCancelEdit = async () => {
    navigate("/user/account");

    await promise.body(dispatch(userAction.cEditConfirmation()));
  };

  return (
    <div className="w-1/2 flex flex-col gap-y-4 lg:w-full">
      <div className="flex flex-col gap-y-2">
        <label htmlFor="name" className="font-semibold text-[14px]">
          Name
        </label>
        <div className="relative">
          <input
            name="name"
            id="name"
            type="name"
            className="w-full rounded-lg border-gray-200 p-2 pe-12 text-sm shadow-sm focus:border-none focus:outline-none focus:ring-2 focus:ring-[#818598] active:text-[#818598] h-[36px]"
            placeholder="Input name"
            value={body.name}
            onChange={handleInputEditAccount}
          />
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <label htmlFor="email" className="font-semibold text-[14px]">
          Email
        </label>
        <div className="relative">
          <input
            name="email"
            id="email"
            type="email"
            className="w-full rounded-lg border-gray-200 p-2 pe-12 text-sm shadow-sm focus:border-none focus:outline-none focus:ring-2 focus:ring-[#818598] active:text-[#818598] h-[36px] cursor-not-allowed"
            placeholder="Input email"
            value={body.email}
            onChange={handleInputEditAccount}
            disabled
          />

          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <label htmlFor="password" className="font-semibold text-[14px]">
          Password
        </label>

        <div className="relative">
          <input
            name="password"
            id="password"
            type={on ? "password" : "text"}
            className="w-full rounded-lg border-gray-200 p-2 pe-12 text-sm shadow-sm focus:border-none focus:outline-none focus:ring-2 focus:ring-[#818598] active:text-[#818598] h-[36px]"
            placeholder="Input password"
            value={body.password}
            onChange={handleInputEditAccount}
          />

          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            {on ? (
              <button onClick={toggle}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="none"
                  viewBox="0 0 16 16"
                >
                  <g fill="#9ca3af">
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288c-.335.48-.83 1.12-1.465 1.755c-.165.165-.337.328-.517.486l.708.709z" />
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884l-12-12l.708-.708l12 12l-.708.708z" />
                  </g>
                </svg>
              </button>
            ) : (
              <button onClick={toggle}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            )}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <label
          htmlFor="role"
          className="block text-[14px] font-semibold text-gray-900"
        >
          Role
        </label>

        <select
          name="role"
          id="role"
          className="w-full p-2 rounded-lg border-gray-300 text-gray-700 text-sm focus:border-none focus:outline-none focus:ring-2 focus:ring-[#818598] active:text-[#818598] h-[36px]"
          value={body.role}
          onChange={handleInputEditAccount}
        >
          <option disabled>Select role</option>
          <option value="Admin">Admin</option>
          <option value="Super Admin">Super Admin</option>
        </select>
      </div>

      <div className="flex gap-x-4">
        <ACButton
          onClassName={`inline-block rounded-sm px-12 py-3 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-[#818598] active:text-[#818598] ${
            Object.values(body).includes("")
              ? "bg-[#d4d1dc] cursor-not-allowed"
              : "hover:bg-transparent hover:text-[#6a6f85] bg-[#6a6f85] border border-[#6a6f85]"
          }`}
          onInitial="Edit"
          setClick={handleSaveEditAccount}
          disabled={Object.values(body).some((el) => el === "")}
        />
        <ACButton
          onClassName={`inline-block rounded-sm border border-[#6a6f85] bg-transparent px-12 py-3 text-sm font-medium text-[#6a6f85] ${
            Object.values(body).some((el) => el === "")
              ? "cursor-not-allowed"
              : "hover:text-white focus:outline-none focus:ring-2 focus:ring-[#818598] active:text-white hover:bg-[#6a6f85]"
          }`}
          onInitial="Cancel"
          setClick={handleCancelEdit}
          disabled={Object.values(body).some((el) => el === "")}
        />
      </div>
    </div>
  );
};

// ACCESS SECTION
export const Access = () => {
  return (
    <section className="h-full flex p-2 border rounded-lg justify-center">
      <Feed.Developing />
    </section>
  );
};
