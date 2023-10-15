import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import supabase from "../utils/auth/configClient";
import { authAction } from "../redux/reducer/auth";
import Title from "./Title";

import Dashboard from "../pages/Dashboard";
import User from "../pages/User";
import DailyProgressCheck from "../pages/DPC";
import Report from "../pages/Report";
import Weigthing from "../pages/Weigthing";
import MasterData from "../pages/MD";
import Login from "../pages/Login";
import Guest from "../pages/Guest";

export const DirectToLogin = () => {
  return <Navigate to="/auth/login" replace={true} />;
};

export const LoginEl = () => {
  const guest = useSelector((state) => state.auth?.guest);
  const [session, setSession] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
    };

    supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(authAction.login(session));
    });

    handleSession();
  }, [dispatch]);

  if (session || guest?.isVisited) {
    return <Navigate to="/dashboard" replace={true} />;
  }

  return (
    <Title onTitle={"Login"}>
      <Login />
    </Title>
  );
};

export const GuestEl = () => {
  const guest = useSelector((state) => state.auth?.guest);

  if (!guest?.isVisited) {
    return (
      <Title onTitle={"Guest"}>
        <Guest />
      </Title>
    );
  }

  return <Navigate to="/dashboard" replace={true} />;
};

export const DashboardEl = () => {
  const guest = useSelector((state) => state.auth?.guest);
  const login = useSelector((state) => state.auth?.login);

  if (guest?.isVisited || login?.data) {
    return (
      <Title onTitle={"Dashboard"}>
        <Dashboard />
      </Title>
    );
  }

  return <Navigate to="/" replace={true} />;
};

// Daily Progress Check
export const DPCEl = () => {
  const guest = useSelector((state) => state.auth?.guest);
  const login = useSelector((state) => state.auth?.login);

  if (login?.data || guest?.isVisited) {
    return (
      <Title onTitle={"Daily Progress Check"}>
        <DailyProgressCheck />
      </Title>
    );
  }

  return <Navigate to="/" replace={true} />;
};

export const WeigthingEL = () => {
  const guest = useSelector((state) => state.auth?.guest);
  const login = useSelector((state) => state.auth?.login);

  if (login?.data || guest?.isVisited) {
    return (
      <Title onTitle={"Weigthing"}>
        <Weigthing />
      </Title>
    );
  }

  return <Navigate to="/" replace={true} />;
};

export const ReportEl = () => {
  const guest = useSelector((state) => state.auth?.guest);
  const login = useSelector((state) => state.auth?.login);

  if (login?.data || guest?.isVisited) {
    return (
      <Title onTitle={"Report"}>
        <Report />
      </Title>
    );
  }

  return <Navigate to="/" replace={true} />;
};

export const MasterDataEl = () => {
  const guest = useSelector((state) => state.auth?.guest);
  const login = useSelector((state) => state.auth?.login);

  if (login?.data || guest?.isVisited) {
    return (
      <Title onTitle={"Master Data"}>
        <MasterData />
      </Title>
    );
  }

  return <Navigate to="/" replace={true} />;
};

export const UserEl = () => {
  const guest = useSelector((state) => state.auth?.guest);
  const login = useSelector((state) => state.auth?.login);

  if (login?.data || guest?.isVisited) {
    return <User />;
  }

  return <Navigate to="/" replace={true} />;
};

export const AccountEl = () => {
  const guest = useSelector((state) => state.auth?.guest);
  const login = useSelector((state) => state.auth?.login);
  const params = useParams();

  if (login?.data || guest?.isVisited) {
    return <User />;
  }

  if (params?.coretitle !== "add") {
    return <Navigate to="/dashboard" replace={true} />;
  }

  return <Navigate to="/" replace={true} />;
};

export const DetailEl = () => {
  const guest = useSelector((state) => state.auth?.guest);
  const login = useSelector((state) => state.auth?.login);
  const detailConfirmation = useSelector(
    (state) => state.user?.detailConfirmation
  );
  const params = useParams();

  if (login?.data || guest?.isVisited) {
    return <User />;
  }

  if (+params?.detailId !== detailConfirmation?.data?.id) {
    return <Navigate to="/dashboard" replace={true} />;
  }

  return <Navigate to="/" replace={true} />;
};

export const EditEl = () => {
  const guest = useSelector((state) => state.auth?.guest);
  const login = useSelector((state) => state.auth?.login);
  const editConfirmation = useSelector((state) => state.user?.editConfirmation);
  const params = useParams();

  if (login?.data || guest?.isVisited) {
    return <User />;
  }

  if (+params?.editId !== editConfirmation?.data?.id) {
    return <Navigate to="/dashboard" replace={true} />;
  }

  return <Navigate to="/" replace={true} />;
};
