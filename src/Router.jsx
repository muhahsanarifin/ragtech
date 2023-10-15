import { createBrowserRouter } from "react-router-dom";

import {
  DirectToLogin,
  LoginEl,
  GuestEl,
  DashboardEl,
  DPCEl,
  ReportEl,
  WeigthingEL,
  MasterDataEl,
  UserEl,
  AccountEl,
  DetailEl,
  EditEl,
} from "../src/helpers/handleRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DirectToLogin />,
  },

  {
    path: "/auth/login",
    element: <LoginEl />,
  },
  {
    path: "/auth/guest",
    element: <GuestEl />,
  },

  {
    path: "/dashboard",
    element: <DashboardEl />,
  },
  {
    path: "/daily-progress-check",
    element: <DPCEl />,
  },
  {
    path: "/report",
    element: <ReportEl />,
  },
  {
    path: "/weigthing",
    element: <WeigthingEL />,
  },
  {
    path: "/master-data/:subtitle",
    element: <MasterDataEl />,
  },
  {
    path: "/user/:subtitle",
    element: <UserEl />,
  },
  {
    path: "/user/account/:coretitle",
    element: <AccountEl />,
  },
  {
    path: "/account/detail/:detailId",
    element: <DetailEl />,
  },
  {
    path: "/account/edit/:editId",
    element: <EditEl />,
  },
]);

export default router;
