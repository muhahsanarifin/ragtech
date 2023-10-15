import * as Header from "../components/Navbar";
import { CSBButton } from "../components/Button";
import SideBar from "../components/Sidebar";
import * as Main from "../components/menu/Weigthing";
import * as Transition from "../components/Transition";

const Weigthing = () => {
  return (
    <main className="relative flex min-h-screen">
      {/* Sidebar */}
      <Transition.SideBar>
        <CSBButton />
        <SideBar onTitle={"Weigthing"} />
      </Transition.SideBar>

      <section className="flex-1 flex flex-col">
        {/* Navbar */}
        <Header.Navbar />

        {/* Weigthing*/}
        <div className="h-full">
          <Main.Weigthing />
        </div>
      </section>
    </main>
  );
};

export default Weigthing;
