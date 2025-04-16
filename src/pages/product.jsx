import { useEffect, useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { Footer } from "@/widgets/layout";
import { useNavigate } from "react-router-dom";
import { Layers } from "lucide-react";

export function Product() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}product`);
        const result = await response.json();
        console.log('res', result);
        if (result.success) {
          setProducts(result.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      <section className="relative block h-[12vh]">
        <div className="absolute top-0 h-full w-full bg-[url('/img/thr.jpg')] bg-cover bg-center scale-105" />
        <div className="absolute top-0 h-full w-full bg-black/60 flex items-center justify-center">
          {/* <Typography variant="h2" color="white" className="text-4xl font-bold">
            Discover Our Products
          </Typography> */}
        </div>
      </section>

      <section className="relative bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <Typography variant="h4" className="mb-10 text-center text-black-700 font-semibold">
            ALL PRODUCTS
          </Typography>

          {currentProducts.length > 0 ? (
            <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
              {currentProducts.map((product) => (
                <div
                  key={product._id}
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="cursor-pointer group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-5 border border-gray-100 hover:border-blue-300"
                >
                  <div className="overflow-hidden rounded-xl">
                    <img
                      src={product.images || "/img/default.jpg"}
                      alt="cover"
                      className="h-52 w-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  <Typography
                    variant="h6"
                    className="mt-4 font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200"
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
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No products found.</p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
  <div className="flex justify-center items-center mt-6">
    <div className="flex items-center bg-white shadow-md  px-3 py-3 gap-2 min-w-[110px] justify-center">
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="text"
        className="text-gray-700 text-base font-bold p-0 min-w-0"
      >
        &lt;
      </Button>

      <span className="text-sm font-medium text-gray-800">
        <span className="text-orange-500 font-bold">{currentPage}</span>
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


          {/* Current page info */}
          {/* <p className="text-gray-600 mt-4 text-sm text-center">
            Page {currentPage} of {totalPages}
          </p> */}
        </div>
      </section>

      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default Product;
