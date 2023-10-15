import SideBar from "../components/Sidebar";
import * as Header from "../components/Navbar";
import * as Main from "../components/menu/Dashboard";
import { CSBButton } from "../components/Button";
import * as Transition from "../components/Transition";
const Dashboard = () => {
  return (
    <main className="relative flex min-h-screen">
      {/* Sidebar */}
      <Transition.SideBar>
        <CSBButton />
        <SideBar onTitle={"Dashboard"} />
      </Transition.SideBar>
      <section className="flex-1 flex flex-col">
        {/* Navbar */}
        <Header.Navbar />

        {/* Dashboard*/}
        <div className="h-full">
          <Main.Dashboard />
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
