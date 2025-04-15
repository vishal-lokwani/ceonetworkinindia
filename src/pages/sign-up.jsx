import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Footer } from "@/widgets/layout";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";





export function SignUp() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}ceo/register`, formData);
      if (res.data.success) {
        toast.success("Registration Successful!");
        navigate("/sign-in");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    console.log('1')
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const { name, email} = decoded;
console.log('2')
      const res = await axios.post(`${API_URL}ceo/google-login`, {
        name,
        email,
      });
console.log('res',res);
      if (res.data.success) {
        toast.success("Google Login Successful!");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({ ceo: res.data.data, token: res.data.token })
        );

        navigate("/account"); 
      }
    } catch (error) {
      console.error("Google login error", error);
      toast.error("Google login failed");
    }
    
  };

  return (
    <>
      <section className="relative block h-[8vh]">
        <div className="absolute top-0 h-full w-full bg-white/60" />
      </section>

      <section className="m-8 flex">
        <div className="w-2/5 h-full hidden lg:block">
          <img
            src="/img/profile.avif"
            className="h-full w-full object-cover rounded-3xl"
            alt="Signup Visual"
          />
        </div>

        <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
          <div className="text-center">
            <Typography variant="h2" className="font-bold mb-4">Join Us Today</Typography>
            <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
              Enter your email and password to register.
            </Typography>
          </div>

          <form
            className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
            onSubmit={handleSubmit}
          >
            <div className="mb-6">
              <Typography variant="small" color="blue-gray" className="font-medium mb-2">Name</Typography>
              <Input
                type="text"
                name="name"
                size="lg"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              />
            </div>

            <div className="mb-6">
              <Typography variant="small" color="blue-gray" className="font-medium mb-2">Email</Typography>
              <Input
                type="email"
                name="email"
                size="lg"
                placeholder="name@mail.com"
                value={formData.email}
                onChange={handleChange}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              />
            </div>

            <div className="mb-6">
              <Typography variant="small" color="blue-gray" className="font-medium mb-2">Password</Typography>
              <Input
                type="password"
                name="password"
                size="lg"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              />
            </div>

            <Checkbox
              required
              label={
                <Typography variant="small" color="gray" className="flex items-center font-medium">
                  I agree to the&nbsp;
                  <a href="#" className="text-black underline hover:text-gray-900">
                    Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />

            <Button type="submit" className="mt-6" fullWidth>
              Register Now
            </Button>

            <div className="space-y-4 mt-8">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => toast.error("Google login failed")}
              />
            </div>

            <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
              Already have an account?
              <Link to="/sign-in" className="text-gray-900 ml-1">Sign in</Link>
            </Typography>
          </form>
        </div>
      </section>

      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default SignUp;
