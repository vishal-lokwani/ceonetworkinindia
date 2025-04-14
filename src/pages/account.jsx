import { useEffect, useState } from "react";
import { Typography, Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Textarea, Select, Option } from "@material-tailwind/react";
import { Footer } from "@/widgets/layout";
import { useNavigate } from "react-router-dom";
import { Tag, Layers, Pencil } from "lucide-react";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import SelectMulti from 'react-select';
import { toast, ToastContainer} from "react-toastify";

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
    description: "",
    password: ""
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
        products: parsedData.ceo.products || []
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
        setCategories([]);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}product`);
        setProducts(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        console.error("Error fetching products", error);
        setProducts([]);
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

  // const handleOpen = () => {
  //   if (ceoDetails) {
  //     setFormData({
  //       ...ceoDetails,
  //       industryType: ceoDetails.industryType || null,
  //       products: ceoDetails.products || []
  //     });
  //     setImageFile(null);
  //   }
  //   setOpen(true);
  // };
  const handleOpen = () => {
    if (ceoDetails) {
      setFormData({
        ...ceoDetails,
        industryType: ceoDetails.industryType || null,
        products: ceoDetails.products.map(p => p._id)  // 👈 only IDs
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
      <section className="relative block h-[10vh]">
        <div className="absolute top-0 h-full w-full bg-[url('/img/thr.jpg')] bg-cover bg-center scale-105" />
        <div className="absolute top-0 h-full w-full bg-black/60" />
      </section>

      <section className="relative bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <Typography variant="h4" className="font-semibold text-gray-800">
              My Profile
            </Typography>
            <Button onClick={handleLogout} color="red">Logout</Button>
          </div>

          <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8">
            <div className="flex items-center space-x-6">
              {ceoDetails.image ? (
                <img src={ceoDetails.image} alt={ceoDetails.name} className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg" />
              ) : (
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg flex items-center justify-center bg-gray-200 text-gray-600 text-lg font-semibold">No Photo</div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <Typography variant="h5" className="font-semibold text-gray-800">{ceoDetails.name}</Typography>
                  <button onClick={handleOpen} className="text-gray-500 hover:text-blue-600">
                    <Pencil size={18} />
                  </button>
                </div>
                <p className="text-sm text-gray-600">{ceoDetails.position}</p>
                <div className="text-sm text-gray-700 mt-2">
                  <p className="flex items-center gap-2"><Tag className="w-4 h-4" /><span>Industry: {ceoDetails?.industryType?.name || "N/A"}</span></p>
                  <p className="flex items-center gap-2 mt-2"><Layers className="w-4 h-4" /><span>Company: {ceoDetails.companyName || "N/A"}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
<ToastContainer/>
      <div className="bg-white">
        <Footer />
      </div>

      <Dialog open={open} handler={() => setOpen(false)}>
        <DialogHeader>Edit CEO Details</DialogHeader>
        <DialogBody className="max-h-[500px] overflow-y-auto">
          <div className="space-y-4">
            <Input label="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <Input label="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <Input label="LinkedIn URL" value={formData.linkedInUrl} onChange={(e) => setFormData({ ...formData, linkedInUrl: e.target.value })} />
            <Input label="Position" value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} />
            <Input label="Company Name" value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} />

            <div className="flex items-center gap-4">
              {imageFile || formData.image ? (
                <img src={imageFile ? URL.createObjectURL(imageFile) : formData.image} alt="CEO" className="w-24 h-24 rounded-full object-cover border" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">No Image</div>
              )}
              <input type="file" onChange={handleFileChange} />
            </div>

            <Select
              label="Industry"
              value={formData.industryType?._id || ""}
              onChange={(val) => {
                const selectedIndustry = categories.find(ind => ind._id === val);
                setFormData({ ...formData, industryType: selectedIndustry });
              }}
            >
              {categories.map(industry => (
                <Option key={industry._id} value={industry._id}>
                  {industry.name}
                </Option>
              ))}
            </Select>

            <div>
              <label className="text-sm font-semibold">Products</label>
              {/* <SelectMulti
                isMulti
                options={productOptions}
                value={productOptions.filter(opt => formData.products.includes(opt.value))}
                onChange={(selectedOptions) => setFormData({ ...formData, products: selectedOptions.map(option => option.value) })}
              /> */}
              <SelectMulti
  isMulti
  options={productOptions}
  value={productOptions.filter(opt =>
    formData.products.some(p => (p._id || p) === opt.value)
  )}
  onChange={(selectedOptions) =>
    setFormData({ ...formData, products: selectedOptions.map(opt => opt.value) })
  }
/>

            </div>

            <Textarea label="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            <Input type="password" label="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
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
