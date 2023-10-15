import * as Header from "../components/Navbar";
import SideBar from "../components/Sidebar";
import { CSBButton } from "../components/Button";
import * as Main from "../components/menu/Report";
import * as Transition from "../components/Transition";

const Report = () => {
  return (
    <main className="relative flex min-h-screen">
      {/* Sidebar */}
      <Transition.SideBar>
        <CSBButton />
        <SideBar onTitle={"Report"} />
      </Transition.SideBar>
      <section className="flex-1 flex flex-col">
        {/* Navbar */}
        <Header.Navbar />

        {/* Report*/}
        <div className="h-full">
          <Main.Report />
        </div>
      </section>
    </main>
  );
};

export default Report;
