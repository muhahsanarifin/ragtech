import * as Header from "../components/Navbar";
import SideBar from "../components/Sidebar";
import { CSBButton } from "../components/Button";
import * as Main from "../components/menu/DPC";
import * as Transition from "../components/Transition";

const DailyProgressCheck = () => {
  return (
    <main className="relative flex min-h-screen">
      {/* Sidebar */}
      <Transition.SideBar>
        <CSBButton />
        <SideBar onTitle={"Daily Progress Check"} />
      </Transition.SideBar>
      <section className="flex-1 flex flex-col">
        {/* Navbar */}
        <Header.Navbar />

        {/* DPC*/}
        <div className="h-full">
          <Main.DPC />
        </div>
      </section>
    </main>
  );
};

export default DailyProgressCheck;
