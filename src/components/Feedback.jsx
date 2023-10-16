import PropTypes from "prop-types";
import Img from "../utils/image";

export const Developing = () => {
  return (
    <div className="grid px-4 h-full bg-white place-content-center">
      <div className="text-center flex flex-col">
        <img
          src={Img.SEA}
          alt={"Developing"}
          className="w-[300px] h-[295.612px] mx-auto"
        />
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-400 md:text-sm">
          OUR NEW FEATURE IS COMING SOON!
        </h1>
      </div>
    </div>
  );
};

export const Success = ({ msg }) => {
  return (
    <div className="m-auto flex h-full w-full">
      <h3 className="m-auto font-semibold text-2xl md:text-xl text-[#68B984]">{msg}</h3>
    </div>
  );
};

Success.propTypes = {
  msg: PropTypes.string,
};

export const Empty = () => {
  return (
    <div className="grid h-full sm:min-h-[23.45rem] px-4 bg-white place-content-center border-x-2 border-b-2 border-t rounded-b-lg">
      <h1 className="tracking-widest text-gray-500 uppercase">
        DATA IS NOT AVAILABLE.
      </h1>
    </div>
  );
}
