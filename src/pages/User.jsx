import { useParams } from "react-router-dom";

import Title from "../helpers/Title";

import * as Header from "../components/Navbar";
import SideBar from "../components/Sidebar";
import { CSBButton } from "../components/Button";
import * as Main from "../components/menu/User";
import * as Transition from "../components/Transition";

const User = () => {
  const params = useParams();

  return (
    <Title
      onTitle={
        params.subtitle === "account"
          ? "Account"
          : params.subtitle === "access"
          ? "Access"
          : params.coretitle === "add"
          ? "Add Account"
          : params.detailId
          ? "Detail Account"
          : params.editId
          ? "Edit"
          : "Regdalion"
      }
    >
      <main className="relative flex min-h-screen md:block">
        {/* Sidebar */}
        <Transition.SideBar>
          <CSBButton />
          <SideBar onTitle={"User"} onSubtitle={params?.subtitle} />
        </Transition.SideBar>
        <section className="flex-1 flex flex-col">
          {/* Navbar */}
          <Header.Navbar />

          {/* User*/}
          <div className="h-full lg:min-h-screen">
            <Main.User />
          </div>
        </section>
      </main>
    </Title>
  );
};

export default User;
