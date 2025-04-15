
import { useEffect, useState } from "react";
import {
  Typography, Button, Dialog, DialogHeader, DialogBody,
  DialogFooter, Input, Textarea, Select, Option
} from "@material-tailwind/react";
import { Footer } from "@/widgets/layout";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import SelectMulti from 'react-select';
import { toast, ToastContainer } from "react-toastify";

export function Account() {
  const [ceoDetails, setCeoDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    linkedInUrl: "",
    position: "",
    companyName: "",
    image: "",
    industryType: null,
    products: [],
    description: ""
  });

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/sign-in");
      return;
    }

    try {
      const parsedData = JSON.parse(userData);
      setCeoDetails(parsedData.ceo);
      setFormData({
        ...parsedData.ceo,
        industryType: parsedData.ceo.industryType || null,
        products: parsedData.ceo.products.map(p => p._id)
      });
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
    } finally {
      setIsLoading(false);
    }

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}industries`);
        setCategories(response.data.data || []);
      } catch (error) {
        console.error("Error fetching industries", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}product`);
        setProducts(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/sign-in");
  };

  const handleDialogOpen = () => {
    if (ceoDetails) {
      setFormData({
        ...ceoDetails,
        industryType: ceoDetails.industryType || null,
        products: ceoDetails.products ? ceoDetails.products.map(p => p._id) : [] // Safely access products
      });
      setImageFile(null);
    }
    setOpen(true);
  };
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const localImageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: localImageUrl }));
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "productfiles");

    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/drsh5gjtv/image/upload", data);
      return response.data.secure_url;
    } catch (error) {
      console.error("Image upload error:", error);
      return null;
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      let imageUrl = formData.image;

      if (imageFile) {
        const uploadedUrl = await uploadImageToCloudinary(imageFile);
        if (uploadedUrl) imageUrl = uploadedUrl;
      }

      const payload = {
        ...formData,
        image: imageUrl,
        industryType: formData.industryType?._id,
        products: formData.products
      };

      const response = await fetch(`${API_URL}ceo/${ceoDetails._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (result.success) {
        setCeoDetails(result.data);
        setOpen(false);
        localStorage.setItem("user", JSON.stringify({ ceo: result.data }));
        toast.success("Profile updated successfully!");
      } else {
        alert(result.message || "Update failed!");
      }
    } catch (error) {
      console.error("Error updating CEO:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress size={50} />
      </div>
    );
  }

  if (!ceoDetails) {
    return <p className="text-center text-gray-500">No CEO details found.</p>;
  }

  const productOptions = products.map(product => ({
    value: product._id,
    label: product.name
  }));

  return (
    <>
      <section className="relative block h-[12vh]">
        <div className="absolute top-0 h-full w-full bg-[url('/img/thr.jpg')] bg-cover bg-center scale-105" />
        <div className="absolute top-0 h-full w-full bg-black/60" />
      </section>

      <section className="relative bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            <div className="w-1/4 bg-white p-6 shadow-lg rounded-lg mt-5">
              <div className="space-y-6">
                <Button onClick={() => navigate("/account")} fullWidth className="bg-black text-white">
                  My Profile
                </Button>
                <Button onClick={() => navigate("/myproducts")} fullWidth className="bg-black text-white">
                  My Products
                </Button>
              </div>
            </div>

            <div className="w-3/4 bg-white p-6 shadow-lg rounded-lg">
              <Typography variant="h5" className="font-semibold">My Profile</Typography>
              <div className="mt-4">
                <div className="flex gap-4 items-center">
                  {ceoDetails.image ? (
                    <img src={ceoDetails.image} alt={ceoDetails.name} className="w-24 h-24 rounded-full object-cover" />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">No Photo</div>
                  )}
                  <div>
                    <Typography variant="h6" className="font-semibold">{ceoDetails.name}</Typography>
                    <p className="text-sm text-gray-600">{ceoDetails.position}</p>
                    <p className="text-sm text-gray-500">{ceoDetails.companyName}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p><strong>Email:</strong> {ceoDetails.email}</p>
                  <p><strong>LinkedIn:</strong> <a href={ceoDetails.linkedInUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600">{ceoDetails.linkedInUrl}</a></p>
                  <p><strong>Industry:</strong> {ceoDetails.industryType?.name}</p>
                </div>
                <div className="flex gap-x-4 mt-4">
  <Button onClick={handleDialogOpen} color="blue">Edit Profile</Button>
  <Button onClick={handleLogout} color="red">Logout</Button>
</div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <ToastContainer />
      <div className="bg-white">
        <Footer />
      </div>

      <Dialog open={open} handler={() => setOpen(!open)}>
        <DialogHeader>Edit CEO Details</DialogHeader>
        <DialogBody className="max-h-[500px] overflow-y-auto">
          <div className="space-y-4">
            <Input label="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <Input label="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <Input label="LinkedIn URL" value={formData.linkedInUrl} onChange={(e) => setFormData({ ...formData, linkedInUrl: e.target.value })} />
            <Input label="Position" value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} />
            <Input label="Company Name" value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} />
            <Textarea label="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />

            <Select label="Industry" value={formData.industryType?._id || ""} onChange={(val) => setFormData({ ...formData, industryType: categories.find(cat => cat._id === val) })}>
              {categories.map((category) => (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>

            <SelectMulti
              isMulti
              options={productOptions}
              value={productOptions.filter(option => formData.products.includes(option.value))}
              onChange={(selected) => setFormData({ ...formData, products: selected.map(s => s.value) })}
            />

            <Input type="file" onChange={handleFileChange} />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button color="green" onClick={handleUpdate} className="mr-2">Save</Button>
          <Button color="red" onClick={() => setOpen(false)}>Cancel</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default Account;
