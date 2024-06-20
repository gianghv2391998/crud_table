import Login from "../../views/Auth/Login";
import Register from "../../views/Auth/Register";
import { AuthLayout } from "../../layouts/AuthLayout";
import { Routes } from "../../utils/constants/Routes";

export const authRoute = [
  {
    path: Routes.Login,
    component: Login,
    layout: AuthLayout,
  },
  {
    path: Routes.Register,
    component: Register,
    layout: AuthLayout,
  },
];
