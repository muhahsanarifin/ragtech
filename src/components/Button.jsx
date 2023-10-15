// import { useRef } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { useClickAway } from "react-use";

import { componentAction } from "../redux/reducer/component";

import { Icon } from "@iconify/react";

export const CNAButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="inline-flex items-center gap-x-2 rounded border border-[#6a6f85] bg-[#6a6f85] px-6 py-3 lg:rounded-full lg:p-3 md:p-2 text-white hover:bg-transparent hover:text-[#6a6f85] focus:outline-none focus:ring-1 focus:ring-[#818598]  active:text-[#818598]"
      onClick={() => navigate("/user/account/add")}
    >
      <svg
        className="h-5 w-5 rtl:rotate-180"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 12H20M12 4V20"
        />
      </svg>

      <span className="text-sm font-medium lg:hidden">
        {" "}
        Create New Account{" "}
      </span>
    </button>
  );
};

export const ACButton = ({
  onInitial,
  setClick,
  onClassName,
  onType,
  disabled,
}) => {
  return (
    <button
      className={onClassName}
      onClick={setClick}
      type={onType}
      disabled={disabled}
    >
      {onInitial}
    </button>
  );
};

ACButton.propTypes = {
  onInitial: PropTypes.string.isRequired,
  setClick: PropTypes.func,
  onClassName: PropTypes.string,
  onType: PropTypes.string,
  disabled: PropTypes.bool,
};

export const DEDButton = ({
  onInitial,
  setClick,
  onClassName,
  onIconColor,
  onIconType,
  onId,
  onName,
}) => {
  return (
    <button className={onClassName} onClick={setClick} id={onId} name={onName}>
      <Icon icon={onIconType} color={onIconColor} width="16" height="16" />
      <p>{onInitial}</p>
    </button>
  );
};

DEDButton.propTypes = {
  onInitial: PropTypes.string.isRequired,
  setClick: PropTypes.func,
  onClassName: PropTypes.string,
  onIconColor: PropTypes.string,
  onIconType: PropTypes.string,
  onId: PropTypes.string,
  onName: PropTypes.string,
};

export const DAButton = ({
  onInitial,
  setClick,
  onClassName,
  onIconColor,
  onIconType,
  onId,
  onName,
}) => {
  return (
    <button className={onClassName} onClick={setClick} id={onId} name={onName}>
      <Icon icon={onIconType} color={onIconColor} width="16" height="16" />
      <p>{onInitial}</p>
    </button>
  );
};

DAButton.propTypes = {
  onInitial: PropTypes.string.isRequired,
  setClick: PropTypes.func,
  onClassName: PropTypes.string,
  onIconColor: PropTypes.string,
  onIconType: PropTypes.string,
  onId: PropTypes.string,
  onName: PropTypes.string,
};

export const CSBButton = () => {
  const dispatch = useDispatch();

  const handleCloseSideBar = () => {
    dispatch(componentAction.sideBar(false));
  };

  return (
    <div className=" py-1.5 px-1 flex items-center h-[3rem]">
      <button
        className="group shrink-0 rounded-lg hover:bg-[#cc2e37] hover:bg-opacity-10 text-[#cc2e37] p-1 shadow-sm ml-auto hidden lg:block"
        onClick={handleCloseSideBar}
      >
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
            d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z"
          ></path>
        </svg>
      </button>
    </div>
  );
};
