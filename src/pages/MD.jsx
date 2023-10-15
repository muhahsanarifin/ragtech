
import SideBar from "../components/Sidebar";
import * as Header from "../components/Navbar";
import { CSBButton } from "../components/Button";
import * as Main from "../components/menu/MasterData";
import * as Transition from "../components/Transition";

const MasterData = () => {
  

  return (
    <main  className="relative flex min-h-screen">
      {/* Sidebar */}
      <Transition.SideBar>
        <CSBButton />
        <SideBar onTitle={"Master Data"} />
      </Transition.SideBar>

      <section className="flex-1 flex flex-col">
        {/* Navbar */}
        <Header.Navbar />

        {/* MD*/}
        <div className="h-full">
          <Main.MasterData />
        </div>
      </section>
    </main>
  );
};

export default MasterData;
