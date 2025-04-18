import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Footer } from "@/widgets/layout";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Import the eye icons

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [showPasswordChecks, setShowPasswordChecks] = useState(false);

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    try {
      const res = await axios.post(`${API_URL}ceo/login`, {
        email,
        password,
      });

      if (res.data.success) {
        toast.success("Login successful");
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data));

        setTimeout(() => {
          navigate("/home");
        }, 1500);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Something went wrong during login."
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
        localStorage.setItem("user", JSON.stringify({ ceo: res.data.data, token: res.data.token }));

        navigate("/home");
      }
    } catch (error) {
      console.error("Google login error", error);
      toast.error("Google login failed");
    }
  };

  return (
    <>
       <section className="relative block h-[10vh]">
        <div className="absolute top-0 h-full w-full bg-[#283850] bg-cover bg-center scale-105" />
        <div className="absolute top-0 h-full w-full bg-[#283850]flex items-center justify-center">
          {/* <Typography variant="h2" color="white" className="text-4xl font-bold">
            Discover Our Products
          </Typography> */}
        </div>
      </section>

      <section className="m-8 flex gap-4">
        <ToastContainer position="top-center" />
        <div className="w-full lg:w-3/5 mt-24">
          <div className="text-center">
            <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
            <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
              Enter your email and password to Sign In.
            </Typography>
          </div>
          <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit}>
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                Your email
              </Typography>
              <Input
                size="lg"
                placeholder="name@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              />

              <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                Password
              </Typography>
              {/* Wrapper div for the password input and eye icon */}
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  size="lg"
                  placeholder="********"
                  value={password}
                  onChange={(e) => {
                    const val = e.target.value;
                    setPassword(val);
                    setShowPasswordChecks(true);

                    let errorMsg = "";
                    if (val.length < 6) errorMsg = "Password must be at least 6 characters.";
                    else if (!/[A-Z]/.test(val)) errorMsg = "Must contain an uppercase letter.";
                    else if (!/[a-z]/.test(val)) errorMsg = "Must contain a lowercase letter.";
                    else if (!/\d/.test(val)) errorMsg = "Must contain a number.";
                    else if (!/[!@#$%^&*]/.test(val)) errorMsg = "Must contain a special character.";
                    else {
                      errorMsg = "";
                      setShowPasswordChecks(false);
                    }

                    setPasswordError(errorMsg);
                  }}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 z-10"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </button>
              </div>

              {showPasswordChecks && (
                <div className="text-sm text-gray-700 mt-2 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`${password.length >= 8 ? "text-green-600" : "text-red-500"}`}>
                      {password.length >= 8 ? "✅" : "❌"}
                    </span>
                    Minimum 8 characters
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`${/[A-Z]/.test(password) ? "text-green-600" : "text-red-500"}`}>
                      {/[A-Z]/.test(password) ? "✅" : "❌"}
                    </span>
                    At least one uppercase letter
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`${/[a-z]/.test(password) ? "text-green-600" : "text-red-500"}`}>
                      {/[a-z]/.test(password) ? "✅" : "❌"}
                    </span>
                    At least one lowercase letter
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`${/\d/.test(password) ? "text-green-600" : "text-red-500"}`}>
                      {/\d/.test(password) ? "✅" : "❌"}
                    </span>
                    At least one number
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`${/[!@#$%^&*]/.test(password) ? "text-green-600" : "text-red-500"}`}>
                      {/[!@#$%^&*]/.test(password) ? "✅" : "❌"}
                    </span>
                    At least one special character (!@#$%^&*)
                  </div>
                </div>
              )}

              {passwordError && (
                <Typography variant="small" color="red" className="mt-1">
                  {passwordError}
                </Typography>
              )}
            </div>

            <Checkbox
              label={
                <Typography variant="small" color="gray" className="flex items-center font-medium">
                  I agree the&nbsp;
                  <a href="#" className="text-black underline hover:text-gray-900">
                    Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />

            <Button type="submit" className="mt-6" fullWidth>
              Sign In
            </Button>

            <div className="space-y-4 mt-6">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => toast.error("Google login failed")}
              />
            </div>

            <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
              Not registered?
              <Link to="/sign-up" className="text-gray-900 ml-1">Create account</Link>
            </Typography>
          </form>
        </div>

        <div className="w-2/5 h-full hidden lg:block">
          <img
            src="/img/profile.avif"
            className="h-full w-full object-cover rounded-3xl"
            alt="Sign In Visual"
          />
        </div>
      </section>

      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default SignIn;
