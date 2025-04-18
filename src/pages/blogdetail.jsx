import { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { Footer } from "@/widgets/layout";
import { useParams } from "react-router-dom";
import { Tag, Layers } from "lucide-react";
import { CircularProgress } from "@mui/material";

export function BlogDetails() {
  const [blogDetails, setBlogDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { blogId } = useParams();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}blog/${blogId}`);
        const result = await response.json();
        console.log('res',result.data)
        if (result.success) {
          setBlogDetails(result.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching blog details:", error);
        setIsLoading(false);
      }
    };

    if (blogId) {
      fetchBlog();
    }
  }, [blogId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress size={50} />
      </div>
    );
  }

  if (!blogDetails) {
    return (
      <p className="text-center text-gray-500">No blog details found.</p>
    );
  }

  return (
    <>
      <section className="relative block h-[10vh]">
        <div className="absolute top-0 h-full w-full bg-[#283850] bg-cover bg-center scale-105" />
        <div className="absolute top-0 h-full w-full bg-[#283850]60" />
      </section>

      <section className="relative bg-white py-16">
        <div className="container mx-auto px-4">
          <Typography variant="h4" className="mb-10 text-center">
          {blogDetails.title}
          </Typography>
          <div className="max-w-5xl mx-auto bg-white border-4 shadow-2xl rounded-2xl p-8 transition hover:scale-[1.01] duration-300">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative w-full md:w-72 h-65">
                <img
                  src={blogDetails.coverimage || "/img/default.jpg"}
                  alt={blogDetails.title}
                  className="w-full h-full rounded-xl object-contain border-4 border-white shadow-lg transform hover:scale-105 transition-all duration-300"
                />
              </div>
              <div className="flex-1">
                <Typography variant="h4" className="text-gray-800 font-bold">
                  {blogDetails.title}
                </Typography>

                {/* <p className="text-sm text-gray-600 mt-1">
                  Author: {blogDetails.author || "N/A"}
                </p> */}

                <div className="text-sm text-gray-700 mt-2 space-y-1">
                  <p className="flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    <span>Category: {blogDetails.category?.[0]?.name || "N/A"}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    <span>Tags: {blogDetails.tags?.map(tag => `#${tag.name}`).join(", ") || "N/A"}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Typography variant="h6" className="text-gray-700 mb-2">
                Content
              </Typography>
              <div className="text-gray-600 leading-relaxed">
                {/* Render the blog content, can use `dangerouslySetInnerHTML` if the content is HTML formatted */}
                <div dangerouslySetInnerHTML={{ __html: blogDetails.description || "No content available." }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default BlogDetails;
