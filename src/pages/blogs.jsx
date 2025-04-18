import { useEffect, useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { Footer } from "@/widgets/layout";
import { useNavigate } from "react-router-dom";
import { Layers } from "lucide-react";
import { motion } from "framer-motion";

export function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(20);
  const [categories, setCategories] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch Blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${API_URL}blog`);
      
        const result = await response.json();
        console.log('blog',result.data)
        if (result.success) {
          setBlogs(result.data);
          setFilteredBlogs(result.data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}blog-category`);
        const data = await res.json();
        if (data.success) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Filter Blogs Logic
  useEffect(() => {
    let filtered = [...blogs];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((blog) =>
        blog.category?.some((cat) => selectedCategories.includes(cat.name))
      );
    }

    setFilteredBlogs(filtered);
    setCurrentPage(1);
  }, [blogs, selectedCategories]);

  // Pagination Logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      <section className="relative block h-[10vh]">
        <div className="absolute top-0 h-full w-full bg-[#283850] bg-cover bg-center scale-105" />
        <div className="absolute top-0 h-full w-full bg-[#283850]" />
      </section>

      <section className="relative bg-white py-16">
        <div className="container mx-auto px-4">
          <Typography variant="h4" className="mb-10 text-center text-black font-semibold">
            ALL BLOGS
          </Typography>

          <div className="flex flex-col md:flex-row gap-10">
            {/* FILTER SIDEBAR */}
            <div className="w-full md:w-1/4 border rounded-xl p-4 shadow-sm bg-white h-full">
              <h4 className="font-semibold text-lg mb-4">Filters</h4>

              {/* Category Filter */}
              <div>
                <h5 className="font-medium mb-2">Category</h5>
                {(showAllCategories ? categories : categories.slice(0, 8)).map((cat) => (
                  <label key={cat._id} className="flex items-center gap-2 text-sm mb-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.name)}
                      onChange={() =>
                        setSelectedCategories((prev) =>
                          prev.includes(cat.name)
                            ? prev.filter((c) => c !== cat.name)
                            : [...prev, cat.name]
                        )
                      }
                      className="accent-blue-500"
                    />
                    {cat.name}
                  </label>
                ))}

                {/* Show More / Less Toggle */}
                {categories.length > 8 && (
                  <button
                    onClick={() => setShowAllCategories(!showAllCategories)}
                    className="text-[#283850] mt-2 text-sm font-medium hover:underline"
                  >
                    {showAllCategories ? "Show Less" : "Show More"}
                  </button>
                )}
              </div>
            </div>

            {/* BLOG LIST */}
            <div className="w-full md:w-3/4">
              {currentBlogs.length > 0 ? (
                <motion.div
                  className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={{
                    visible: {
                      transition: { staggerChildren: 0.15 },
                    },
                  }}
                >
                  {currentBlogs.map((blog) => (
                    <motion.div
                      key={blog._id}
                      onClick={() => navigate(`/blog/${blog._id}`)}
                      className="cursor-pointer group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-5 border border-gray-100 hover:border-[#283850]"
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      viewport={{ once: true, amount: "top" }}
                    >
                      <div className="overflow-hidden rounded-xl">
                        <img
                          src={blog.images || "/img/default.jpg"}
                          alt="cover"
                          className="h-52 w-full object-contain"
                        />
                      </div>

                      <Typography
                        variant="h6"
                        className="mt-4 font-bold text-gray-800 group-hover:text-[#283850]"
                      >
                        {blog.title}
                      </Typography>

                      <p className="text-sm text-gray-700 mt-2">
                        {blog.shortdescription?.replace(/<[^>]+>/g, "").slice(0, 130)}...
                      </p>

                      <div className="mt-3 flex flex-col text-sm text-gray-700 space-y-1">
                        <div className="flex items-center gap-1">
                          <Layers className="w-4 h-4" />
                          <span className="font-medium">Category:</span>{" "}
                          <span>{blog.category?.map((cat) => cat.name).join(", ") || "None"}</span>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-col text-sm text-gray-700 space-y-1">
                        <div className="flex items-center gap-1">
                          <Layers className="w-4 h-4" />
                          <span className="font-medium">Tags:</span>{" "}
                          <span>{blog.tags?.map((tag) => tag.name).join(", ") || "None"}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <p className="text-center text-gray-500">No blogs found.</p>
              )}

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-6">
                  <div className="flex items-center bg-white shadow-md px-3 py-3 gap-2 min-w-[110px] justify-center">
                    <Button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      variant="text"
                      className="text-gray-700 text-base font-bold p-0 min-w-0"
                    >
                      &lt;
                    </Button>

                    <span className="text-sm font-medium text-gray-800">
                      <span className="text-[rgb(202,179,66)] font-bold">{currentPage}</span>
                      <span className="mx-0.5">/</span>
                      {totalPages}
                    </span>

                    <Button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      variant="text"
                      className="text-gray-700 text-base font-bold p-0 min-w-0"
                    >
                      &gt;
                    </Button>
                  </div>
                </div>
              )}
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

export default Blogs;
