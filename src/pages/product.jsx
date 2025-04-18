import { useEffect, useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { Footer } from "@/widgets/layout";
import { useNavigate } from "react-router-dom";
import { Layers } from "lucide-react";
import { motion } from "framer-motion";

export function Product() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20);
  const [categories, setCategories] = useState([]); // fetch categories from API
  const [showAllCategories, setShowAllCategories] = useState(false); // Show/Hide categories
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}product`);
        const result = await response.json();
        if (result.success) {
          setProducts(result.data);
          setFilteredProducts(result.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}categories`);
        const data = await res.json();
        if (data.success) {
          setCategories(data.data); // assuming data.data is an array of categories
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Filter Products Logic
  useEffect(() => {
    let filtered = [...products];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        product.categories?.some((cat) => selectedCategories.includes(cat.name))
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // reset to page 1 on filter
  }, [products, selectedCategories]);

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

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
            ALL PRODUCTS
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

            {/* PRODUCT LIST */}
            <div className="w-full md:w-3/4">
              {currentProducts.length > 0 ? (
                <motion.div
                  className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={{
                    visible: {
                      transition: { staggerChildren: 0.15 },
                    },
                  }}
                >
                  {currentProducts.map((product) => (
                    <motion.div
                      key={product._id}
                      onClick={() => navigate(`/product/${product._id}`)}
                      className="cursor-pointer group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-5 border border-gray-100 hover:border-[#283850]"
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      viewport={{ once: true, amount: "top" }}
                    >
                      <div className="overflow-hidden rounded-xl">
                        <img
                          src={product.images || "/img/default.jpg"}
                          alt="cover"
                          className="h-52 w-full object-contain"
                        />
                      </div>

                      <Typography
                        variant="h6"
                        className="mt-4 font-bold text-gray-800 group-hover:text-[#283850]"
                      >
                        {product.name}
                      </Typography>

                      <p className="text-sm text-gray-700 mt-2">
                        {product.shortdescription?.replace(/<[^>]+>/g, "").slice(0, 130)}...
                      </p>

                      <div className="mt-3 flex flex-col text-sm text-gray-700 space-y-1">
                        <div className="flex items-center gap-1">
                          <Layers className="w-4 h-4" />
                          <span className="font-medium">Category:</span>{" "}
                          <span>{product.categories?.map((cat) => cat.name).join(", ") || "None"}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <p className="text-center text-gray-500">No products found.</p>
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
                      <span className="text-[#283850] font-bold">{currentPage}</span>
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

export default Product;
