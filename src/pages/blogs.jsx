import { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { Footer } from "@/widgets/layout";
import { useNavigate } from "react-router-dom";
import { Tag, Layers } from "lucide-react";

export function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("https://ceo.apis.stageprojects.xyz/blog");
        const result = await response.json();
        if (result.success) {
          setBlogs(result.data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <section className="relative block h-[10vh]">
        <div className="absolute top-0 h-full w-full bg-[url('/img/thr.jpg')] bg-cover bg-center scale-105" />
        <div className="absolute top-0 h-full w-full bg-black/60" />
      </section>

      <section className="relative bg-white py-16">
        <div className="container mx-auto px-4">
          <Typography variant="h4" className="mb-10 text-center">
            All Blogs
          </Typography>

          {blogs.length > 0 ? (
            <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  onClick={() => navigate(`/blog/${blog._id}`)}
                  className="cursor-pointer group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4"
                >
                  <div className="overflow-hidden rounded-xl">
                    <img
                      src={blog.coverimage || "/img/default.jpg"}
                      alt="cover"
                      className="h-52 w-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <Typography
                    variant="h6"
                    className="mt-4 font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200"
                  >
                    {blog.title}
                  </Typography>

                  <p className="text-sm text-gray-700 mt-2">
                    {blog.description?.replace(/<[^>]+>/g, "").slice(0, 130)}...
                  </p>

                  <div className="mt-3 flex flex-col text-sm text-gray-700 space-y-1">
                    <div className="flex items-center gap-1">
                      <Layers className="w-4 h-4" />
                      <span className="font-medium">Industry type:</span>{" "}
                      <span>{blog.category?.map((cat) => cat.name).join(", ") || "None"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      <span className="font-medium">Tags:</span>{" "}
                      <span>{blog.tags?.map((tag) => `#${tag.name}`).join(", ") || "None"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No blogs found.</p>
          )}
        </div>
      </section>

      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default Blogs;
