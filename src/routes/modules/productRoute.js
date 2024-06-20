import Detail from "../../views/Product/Detail";
import Product from "../../views/Product/Product";
import { DefaultLayout } from "../../layouts/DefaultLayout";
import { Routes } from "../../utils/constants/Routes";

export const productRoute = [
  {
    path: Routes.Detail,
    component: Detail,
    layout: DefaultLayout,
  },
  {
    path: Routes.Product,
    component: Product,
    layout: DefaultLayout,
  },
];
