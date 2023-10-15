import { Transition } from "@headlessui/react";
import { useSelector } from "react-redux";

export const SideBar = ({ children }) => {
  const sideBar = useSelector((state) => state.component?.sideBar);
  return (
    <Transition
      show={sideBar?.isOpen}
      as="section"
      enter="transition-opacity ease-linear duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity ease-linear duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="border lg:absolute lg:bg-white inset-y-0 z-50"
    >
      {children}
    </Transition>
  );
};
