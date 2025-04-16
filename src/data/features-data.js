// import {
//   ChatBubbleBottomCenterTextIcon,
// } from "@heroicons/react/24/solid";

// export const featuresData = [
//   {
//     color: "gray",
//     title: "Awarded Agency",
//     icon: ChatBubbleBottomCenterTextIcon,
//     description:
//       "Divide details about your product or agency work into parts. A paragraph describing a feature will be enough.",
//   },
//   {
//     color: "gray",
//     title: "Free Revisions",
//     icon: ChatBubbleBottomCenterTextIcon,
//     description:
//       "Keep you user engaged by providing meaningful information. Remember that by this time, the user is curious.",
//   },
//   {
//     color: "gray",
//     title: "Verified Company",
//     icon: ChatBubbleBottomCenterTextIcon,
//     description:
//       "Write a few lines about each one. A paragraph describing a feature will be enough. Keep you user engaged!",
//   },
// ];

// export default featuresData;
import {
  UserGroupIcon,
  CubeIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";

export const featuresData = async () => {
  const API_URL = import.meta.env.VITE_API_URL;
  try {
    const [usersRes, productsRes, blogsRes] = await Promise.all([
      axios.get(`${API_URL}ceo/count`),
      axios.get(`${API_URL}product/count`),
      axios.get(`${API_URL}blog/count`),
    ]);

    return [
      {
        color: "gray",
        title: "Total CEO's",
        icon: UserGroupIcon,
        description: `Total registered users: ${usersRes.data.data}`,
      },
      {
        color: "gray",
        title: "Total Products",
        icon:  CubeIcon,
        description: `Total products listed: ${productsRes.data.data}`,
      },
      {
        color: "gray",
        title: "Total Blogs",
        icon: DocumentTextIcon,
        description: `Total  blogs: ${blogsRes.data.data}`,
      },
    ];
  } catch (error) {
    console.error("Error fetching features data:", error);
    return [
      {
        color: "gray",
        title: "Total Users",
        icon: UserGroupIcon,
        description: `Unable to fetch users.`,
      },
      {
        color: "gray",
        title: "Total Products",
        icon: CubeIcon,
        description: `Unable to fetch products.`,
      },
      {
        color: "gray",
        title: "Total Blogs",
        icon: DocumentTextIcon,
        description: `Unable to fetch blogs.`,
      },
    ];
  }
};
 export default featuresData;