import { userRoute } from "./modules/userRoute";
import { productRoute } from "./modules/productRoute";
import { authRoute } from "./modules/authRoute";

const publicRoutes = [
    ...userRoute,
    ...productRoute,
    ...authRoute

]

export { publicRoutes }