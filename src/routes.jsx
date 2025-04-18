import { Home, SignIn, SignUp, Blogs, People, Product } from "@/pages";
import Description from "./pages/description";
import ProductDetails from "./pages/productdetails";
import MyAccount from "./pages/myaccount";
import MYPRODUCTS from "./pages/myproducts";
import BlogDetail from "./pages/blogdetail";
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
    name: "Products",
    path: "/product",
    element: <Product />,
  },
  {
    name: "blogs",
    path: "/blogs",
    element: <Blogs />,
  },
  {
    name: "MyAccount",
    path: "/account",
    element: <MyAccount />,
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
    path: "/blog/:blogId",
    element: <BlogDetail />,
  },
  {
    // name: "Description",
    path: "/myproducts",
    element: <MYPRODUCTS/>,
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
