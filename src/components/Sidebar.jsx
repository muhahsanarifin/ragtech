import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const SideBar = ({ onTitle, onSubtitle }) => {
  const menu = [
    {
      title: "Dashboard",
      subTitle: [],
      icon: {
        type: "material-symbols:dashboard-outline",
        color: {
          active: "#cc2e37",
          disable: "#6d717c",
        },
      },
    },
    {
      title: "Daily Progress Check",
      subTitle: [],
      icon: {
        type: "material-symbols:rotate-right",
        color: {
          active: "#cc2e37",
          disable: "#6d717c",
        },
      },
    },
    {
      title: "Report",
      subTitle: [],
      icon: {
        type: "material-symbols:note-outline-rounded",
        color: {
          active: "#cc2e37",
          disable: "#6d717c",
        },
      },
    },
    {
      title: "Weigthing",
      subTitle: [],
      icon: {
        type: "material-symbols:monitor-weight-outline",
        color: {
          active: "#cc2e37",
          disable: "#6d717c",
        },
      },
    },
    {
      title: "Master Data",
      subTitle: [],
      icon: {
        type: "material-symbols:box-outline",
        color: {
          active: "#cc2e37",
          disable: "#6d717c",
        },
      },
    },
    {
      title: "User",
      subTitle: ["Account", "Access"],
      icon: {
        type: "material-symbols:person-outline-rounded",
        color: {
          active: "#cc2e37",
          disable: "#6d717c",
        },
      },
    },
  ];

  return (
    <>
      <ul className="space-y-1 p-2 flex flex-col gap-y-4 min-w-[12rem]">
        <summary className="font-semibold px-4">Menu</summary>
        {menu.map((elMain, idx) => (
          <>
            {elMain.title === "Master Data" || elMain.title === "User" ? (
              <li>
                <details
                  className="group [&_summary::-webkit-details-marker]:hidden"
                  open={elMain.title === onTitle}
                >
                  <summary
                    className={`group flex items-center justify-between rounded-lg px-4 py-2 text-gray-500 ${
                      elMain.title === onTitle
                        ? "bg-gray-100 text-gray-700"
                        : "hover:bg-gray-100 hover:text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon icon={elMain.icon.type} width="24" height="24" />

                      <span className="text-sm font-medium">
                        {" "}
                        {elMain.title}{" "}
                      </span>
                    </div>

                    <span className="shrink-0 transition duration-300 group-open:-rotate-90">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>

                  <ul className="mt-2 space-y-1 px-4">
                    {elMain.subTitle.map((elSubTitle, idxsubTitle) => (
                      <li key={idxsubTitle}>
                        <Link
                          to={`/${elMain.title.toLowerCase()}/${elSubTitle.toLowerCase()}`}
                          className={`block rounded-lg px-4 py-2 text-sm font-medium text-gray-500  ${
                            elSubTitle.toLowerCase() === onSubtitle
                              ? "bg-gray-100 text-gray-700"
                              : "hover:bg-gray-100 hover:text-gray-700"
                          }`}
                        >
                          {elSubTitle}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            ) : (
              <li key={idx}>
                <Link
                  to={
                    elMain.title === "Dashboard"
                      ? `/`
                      : elMain.title === "Daily Progress Check"
                      ? `/daily-progress-check`
                      : `/${elMain.title.toLowerCase()}`
                  }
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-gray-700 ${
                    elMain.title === onTitle
                      ? "bg-gray-100 text-gray-700"
                      : "hover:bg-gray-100 hover:text-gray-700"
                  }`}
                >
                  <Icon icon={elMain.icon.type} width="24" height="24" />

                  <span className="text-sm font-medium"> {elMain.title}</span>
                </Link>
              </li>
            )}
          </>
        ))}
      </ul>
    </>
  );
};

export default SideBar;
