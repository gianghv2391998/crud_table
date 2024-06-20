import Profile from "../../views/User/Profile";
import User from "../../views/User/User";
import { DefaultLayout } from "../../layouts/DefaultLayout";
import { Routes } from "../../utils/constants/Routes";

export const userRoute = [
  {
    path: Routes.Profile,
    component: Profile,
    layout: DefaultLayout,
  },
  {
    path: Routes.User,
    component: User,
    layout: DefaultLayout,
  },
];
