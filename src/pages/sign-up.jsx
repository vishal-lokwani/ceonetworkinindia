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
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Add this import for the eye icon

export function SignUp() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [showPasswordChecks, setShowPasswordChecks] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for showing/hiding the password

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      setShowPasswordChecks(true);
      let errorMsg = "";
      if (value.length < 6) errorMsg = "Password must be at least 6 characters.";
      else if (!/[A-Z]/.test(value)) errorMsg = "Must contain an uppercase letter.";
      else if (!/[a-z]/.test(value)) errorMsg = "Must contain a lowercase letter.";
      else if (!/\d/.test(value)) errorMsg = "Must contain a number.";
      else if (!/[!@#$%^&*]/.test(value)) errorMsg = "Must contain a special character.";
      else errorMsg = "";

      setPasswordError(errorMsg);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordError) {
      toast.error(passwordError);
      return;
    }
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
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const { name, email } = decoded;

      const res = await axios.post(`${API_URL}ceo/google-login`, { name, email });

      if (res.data.success) {
        toast.success("Google Login Successful!");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({ ceo: res.data.data, token: res.data.token })
        );
        navigate("/home");
      }
    } catch (error) {
      console.error("Google login error", error);
      toast.error("Google login failed");
    }
  };

  const isPasswordValid = formData.password.length >= 8 &&
                          /[A-Z]/.test(formData.password) &&
                          /[a-z]/.test(formData.password) &&
                          /\d/.test(formData.password) &&
                          /[!@#$%^&*]/.test(formData.password);

  return (
    <>
      <section className="relative block h-[10vh]">
        <div className="absolute top-0 h-full w-full bg-[#283850] bg-cover bg-center scale-100" />
        <div className="absolute top-0 h-full w-full bg-[#283850]flex items-center justify-center">
          {/* <Typography variant="h2" color="white" className="text-4xl font-bold">
            Discover Our Products
          </Typography> */}
        </div>
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

          <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit}>
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

            <div className="mb-6 relative">
  <Typography variant="small" color="blue-gray" className="font-medium mb-2">Password</Typography>
  {/* Wrapper div to hold the input and eye icon */}
  <div className="relative">
    <Input
      type={showPassword ? "text" : "password"} // Toggle password visibility
      name="password"
      size="lg"
      placeholder="********"
      value={formData.password}
      onChange={handleChange}
      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
      className="absolute top-1/2 right-3 transform -translate-y-1/2 z-10"
    >
      {showPassword ? <Visibility /> : <VisibilityOff />}
    </button>
  </div>

  {/* Validation checks below the input */}
  {showPasswordChecks && !isPasswordValid && (
    <div className="text-sm text-gray-700 mt-2 space-y-1">
      <div className="flex items-center gap-2">
        <span className={`${formData.password.length >= 8 ? "text-green-600" : "text-red-500"}`}>
          {formData.password.length >= 8 ? "✅" : "❌"}
        </span>
        Minimum 8 characters
      </div>
      <div className="flex items-center gap-2">
        <span className={`${/[A-Z]/.test(formData.password) ? "text-green-600" : "text-red-500"}`}>
          {/[A-Z]/.test(formData.password) ? "✅" : "❌"}
        </span>
        At least one uppercase letter
      </div>
      <div className="flex items-center gap-2">
        <span className={`${/[a-z]/.test(formData.password) ? "text-green-600" : "text-red-500"}`}>
          {/[a-z]/.test(formData.password) ? "✅" : "❌"}
        </span>
        At least one lowercase letter
      </div>
      <div className="flex items-center gap-2">
        <span className={`${/\d/.test(formData.password) ? "text-green-600" : "text-red-500"}`}>
          {/\d/.test(formData.password) ? "✅" : "❌"}
        </span>
        At least one number
      </div>
      <div className="flex items-center gap-2">
        <span className={`${/[!@#$%^&*]/.test(formData.password) ? "text-green-600" : "text-red-500"}`}>
          {/[!@#$%^&*]/.test(formData.password) ? "✅" : "❌"}
        </span>
        At least one special character (!@#$%^&*)
      </div>
    </div>
  )}
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
  