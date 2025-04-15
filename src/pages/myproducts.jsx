import { useEffect, useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { Footer } from "@/widgets/layout";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import Select from "react-select"; 
export function MYPRODUCTS() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [productToDelete, setProductToDelete] = useState(null); // for delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // for delete modal
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    salePrice: "",
    regularPrice: "",
    description: "",
    shortdescription: "",
    categories: [],
    images: [],
    coverImage: "",
  });

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/sign-in");
      return;
    }

    const parsedData = JSON.parse(userData);
    const ceoId = parsedData.ceo._id;
console.log('ceo',ceoId)
    
    

    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}categories`);
        setCategories(res.data.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchProductsByCeoId();
    fetchCategories();
  }, []);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append('upload_preset', 'productfiles');
    try {
      const response = await axios.post(`https://api.cloudinary.com/v1_1/drsh5gjtv/upload`, formData);
      return response.data.secure_url;
    } catch (err) {
      console.error("Cloudinary Upload Error:", err);
      return null;
    }
  };




  const openAddModal = () => {
    setSelectedProduct(null);
    setFormData({
      name: "",
      type: "",
      salePrice: "",
      regularPrice: "",
      description: "",
      shortdescription: "",
      categories: [],
      images: [],
      coverImage: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name || "",
      type: product.type || "",
      salePrice: product.salePrice || "",
      regularPrice: product.regularPrice || "",
      description: product.description.replace(/<[^>]+>/g, "") || "",
      shortdescription: product.shortdescription.replace(/<[^>]+>/g, "") || "",
      categories: product.categories || [],
      images: product.images || [],
      coverImage: product.coverImage || "",
    });
    setIsModalOpen(true);
  };

  const handleImagesChange = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedImages = [];
    for (const file of files) {
      const url = await uploadToCloudinary(file);
      if (url) uploadedImages.push(url);
    }
    setFormData({ ...formData, images: [...formData.images, ...uploadedImages] });
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData({ ...formData, images: updatedImages });
  };
  const fetchProductsByCeoId = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const ceoId = userData.ceo._id;
  
      const response = await axios.get(`${API_URL}product/ceo/${ceoId}`);
      console.log('response.data.data.products',response.data.data)
      const ceoProducts = Array.isArray(response.data.data.products)
        ? response.data.data.products
        : [];
      setProducts(ceoProducts);
    } catch (error) {
      console.error("Error fetching products by CEO ID:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${API_URL}product/${productId}`);
      setProducts(products.filter(product => product._id !== productId));
      setIsDeleteModalOpen(false); // Close the delete modal after successful deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.description) {
      alert("Please fill out all fields.");
      return;
    }
  
    try {
      if (selectedProduct) {
        // Update an existing product
        await axios.put(`${API_URL}product/${selectedProduct._id}`, formData);
        console.log('hii')
        const updatedProducts = products.map((p) =>
          p._id === selectedProduct._id ? { ...p, ...formData } : p
        );
        setProducts(updatedProducts);
        setIsModalOpen(false);
      } else {
        // Add a new product
        const userData = JSON.parse(localStorage.getItem("user"));
        const ceoId = userData.ceo._id;
        const response = await axios.post(`${API_URL}product`, {
          ...formData,
          ceoId,
        });
        
        // Add the new product to the local state without refetching everything
        setProducts(prevProducts => [...prevProducts, response.data]);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };
  
  

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress size={50} />
      </div>
    );
  }

  return (
    <>
      <section className="relative block h-[12vh]">
        <div className="absolute top-0 h-full w-full bg-[url('/img/thr.jpg')] bg-cover bg-center scale-105" />
        <div className="absolute top-0 h-full w-full bg-black/60" />
      </section>

      <section className="relative bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            <div className="w-1/4 bg-white p-4 shadow-lg rounded-lg">
              <div className="space-y-6">
                <Button
                  onClick={() => navigate("/account")}
                  fullWidth
                  className="bg-black text-white"
                >
                  My Profile
                </Button>
                <Button
                  onClick={() => navigate("/myproducts")}
                  fullWidth
                  className="bg-black text-white"
                >
                  My Products
                </Button>
              </div>
            </div>

            <div className="w-3/4 bg-white p-6 shadow-lg rounded-lg">
              <div className="flex justify-between items-center mb-6">
                <Typography variant="h5" className="font-semibold">
                  My Products
                </Typography>
                <Button
                  onClick={openAddModal}
                  className="bg-green-600 text-white"
                >
                  + Add Product
                </Button>
              </div>

              {products.length === 0 ? (
                <p className="text-gray-500">No products found.</p>
              ) : (
                <div className="space-y-4">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className="flex items-center gap-6 border p-4 rounded-lg shadow hover:shadow-md transition"
                    >
                      <img
                        src={
                          Array.isArray(product.images) &&
                          product.images.length > 0
                            ? product.images[0]
                            : "/img/placeholder.png"
                        }
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <div className="flex-1">
                        <Typography variant="h6">{product.name}</Typography>
                        <p className="text-gray-600">
  {product.description ? product.description.replace(/<[^>]+>/g, "") : "No description available"}
</p>

                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => openEditModal(product)}
                          className="bg-blue-500 text-white"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => { setProductToDelete(product); setIsDeleteModalOpen(true); }}
                          className="bg-red-500 text-white"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white">
        <Footer />
      </div>
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
          <div className="bg-white p-4 rounded-lg w-full max-w-sm space-y-4">
            <Typography variant="h5">Are you sure you want to delete this product?</Typography>
            <div className="flex justify-end gap-2">
              <Button onClick={() => setIsDeleteModalOpen(false)} className="bg-gray-500 text-white">
                Cancel
              </Button>
              <Button onClick={() => handleDelete(productToDelete._id)} className="bg-red-600 text-white">
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
          <div className="bg-white p-4 rounded-lg w-full max-w-2xl space-y-4 max-h-[80vh] overflow-y-auto">
            <Typography variant="h5">
              {selectedProduct ? "Edit Product" : "Add Product"}
            </Typography>

            {/* Inputs */}
            {["name", "type", "salePrice", "regularPrice", "shortdescription", "description"].map((field) => (
              <div className="mb-4" key={field}>
                <label className="block text-black dark:text-white mb-2 uppercase">
                  {field.replace(/([A-Z])/g, " $1").toUpperCase()}
                </label>
                {field.includes("description") ? (
                  <textarea
                    placeholder={field}
                    value={formData[field]}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    className="border w-full p-2 rounded h-20"
                  />
                ) : (
                  <input
                    type={field.toLowerCase().includes("price") ? "number" : "text"}
                    placeholder={field}
                    value={formData[field]}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    className="border w-full p-2 rounded"
                  />
                )}
              </div>
            ))}
            
            {/* Categories */}
            <div className="mb-4">
  <label className="block text-black dark:text-white mb-2 uppercase">
    Categories
  </label>
  <Select
  isMulti
  options={categories.map((cat) => ({ value: cat._id, label: cat.name }))}
  value={formData.categories.map((catId) => {
    const matched = categories.find((c) => c._id === catId);
    return matched ? { value: matched._id, label: matched.name } : null;
  }).filter(Boolean)}
  onChange={(selectedOptions) => {
    const selectedValues = selectedOptions.map((opt) => opt.value);
    setFormData({ ...formData, categories: selectedValues });
  }}
/>

</div>

            {/* Cover Image */}
            <div className="mb-4 flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-black dark:text-white mb-2 uppercase">
                  Cover Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const url = await uploadToCloudinary(file);
                      if (url) {
                        setFormData({ ...formData, coverImage: url });
                      }
                    }
                  }}
                  className="w-full p-2 rounded border border-gray-300"
                />
              </div>
              <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden border">
                {formData.coverImage ? (
                  <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-500 flex items-center justify-center h-full">No Photo</span>
                )}
              </div>
            </div>

            {/* Image Gallery */}
            <div className="mb-4">
              <label className="block text-black dark:text-white mb-2 uppercase">
                Image Gallery
              </label>
              <div className="grid grid-cols-4 gap-2">
                {formData.images.map((img, index) => (
                  <div key={index} className="relative w-24 h-24 border rounded-lg overflow-hidden">
                    <img src={img} alt={`img-${index}`} className="w-full h-full object-cover" />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <label
                  htmlFor="imageUpload"
                  className="w-24 h-24 border-dashed border-2 border-gray-400 flex items-center justify-center cursor-pointer"
                >
                  <span className="text-gray-400 text-3xl">+</span>
                </label>
              </div>
              <input
                id="imageUpload"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImagesChange}
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button onClick={() => setIsModalOpen(false)} color="red">
                Cancel
              </Button>
              <Button onClick={handleSave} color="green">
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MYPRODUCTS;
