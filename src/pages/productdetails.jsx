import { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { Footer } from "@/widgets/layout";
import { useParams } from "react-router-dom";
import { Tag, Layers } from "lucide-react";
import { CircularProgress } from "@mui/material";

export function ProductDetails() {
  const [productDetails, setProductDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5021/product/${productId}`);
        const result = await response.json();
        if (result.success) {
          setProductDetails(result.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress size={50} />
      </div>
    );
  }

  if (!productDetails) {
    return (
      <p className="text-center text-gray-500">No product details found.</p>
    );
  }

  return (
    <>
      <section className="relative block h-[10vh]">
        <div className="absolute top-0 h-full w-full bg-[url('/img/thr.jpg')] bg-cover bg-center scale-105" />
        <div className="absolute top-0 h-full w-full bg-black/60" />
      </section>


      <section className="relative bg-white py-16">
        <div className="container mx-auto px-4">
          <Typography variant="h4" className="mb-10 text-center">
            PRODUCT DETAILS
          </Typography>
          <div className="max-w-5xl mx-auto bg-white border-4 shadow-2xl rounded-2xl p-8 transition hover:scale-[1.01] duration-300">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative w-full md:w-72 h-65">
                <img
                  src={productDetails.images || "/img/default.jpg"}
                  alt={productDetails.name}
                  className="w-full h-full rounded-xl object-contain border-4 border-white shadow-lg transform hover:scale-105 transition-all duration-300"
                />
                
              </div>
              <div className="flex-1">
                <Typography variant="h4" className="text-gray-800 font-bold">
                  {productDetails.name}
                </Typography>

                <p className="text-sm text-gray-600 mt-1">
                  Type: {productDetails.type || "N/A"}
                </p>

                <div className="text-sm text-gray-700 mt-2 space-y-1">
                  <p className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    <span>Category: {productDetails.categories?.map(cat => cat.name).join(", ") || "N/A"}</span>
                  </p>
                  {/* <p className="flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    <span>Industry Type: {productDetails.industrytype || "N/A"}</span>
                  </p> */}
                </div>

                {/* Sale Price Section */}
                <div className="mt-4">
                  <span className="text-xl font-bold  mr-3">
                    ₹{productDetails.salePrice}
                  </span>
                  {productDetails.originalPrice && (
                    <span className="text-gray-500 line-through">
                      ₹{productDetails.originalPrice}
                    </span>
                  )}
                </div>

                {/* Buy Now Button */}
                {/* <div className="mt-6">
                  <button className="w-full py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300">
                    Buy Now
                  </button>
                </div> */}
              </div>
            </div>

            <div className="mt-8">
              <Typography variant="h6" className="text-gray-700 mb-2">
                Description
              </Typography>
              <p className="text-gray-600 leading-relaxed">
                {productDetails.description
                  ? productDetails.description.replace(/<[^>]+>/g, '')
                  : "No Description available."}
              </p>
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

export default ProductDetails;
