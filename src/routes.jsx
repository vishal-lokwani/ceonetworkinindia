import { Home, SignIn, SignUp, Blogs, People, Product } from "@/pages";
import Description from "./pages/description";
import ProductDetails from "./pages/productdetails";
import Account from "./pages/account";
export const routes = [
  {
    // name: "home",
    path: "/home",
    element: <Home />,
  },
  // {
  //   name: "profile",
  //   path: "/profile",
  //   element: <Profile />,
  // },
  {
    name: "CEO's",
    path: "/people",
    element: <People />,
  },
  {
    name: "Product",
    path: "/product",
    element: <Product />,
  },
  {
    name: "blogs",
    path: "/blogs",
    element: <Blogs />,
  },
  {
    name: "Account",
    path: "/account",
    element: <Account />,
  },
  {
    name: "Sign In",
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    name: "Sign Up",
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    // name: "Description",
    path: "/description/:ceoId",
    element: <Description />,
  },
  {
    // name: "Description",
    path: "/product/:productId",
    element: <ProductDetails />,
  },
 
  // {
  //   name: "Docs",
  //   href: "https://www.material-tailwind.com/docs/react/installation",
  //   target: "_blank",
  //   element: "",
  // },
];

export default routes;
