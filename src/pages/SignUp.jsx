import React, { useState } from "react";
import login from "../images/login.jpg";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";
//import { BASE_URL, ACCESS_TOKEN_NAME } from "../constants/ApiConstants";

import { addUser } from "../components/services/User";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  //const [users, setUsers] = useState([]);
  const [showpassword, setShowPassword] = useState(false);

  const { name, email, password } = formData;

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  // const sendDetailsToServer = async () => {
  //   if (name.length && email.length && password.length) {
  //     await addUser(formData);
  //     redirectToHome();
  //   } else {
  //     toast("please fill the form", { type: "warning" });
  //   }
  // };

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:5000/users", {
        name,
        email,
        password,
      });
      navigate('/');
      //onRegister(); // Notify parent component that registration was successful
    } catch (error) {
      console.error("Registration error:", error);
      toast("Registration failed. Please try again.");
    }
  };

  function redirectToHome() {
    // props.history.push('/');
    //navigate("/");
  }

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img src={login} alt="sign in" className="w-full rounded-2xl" />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20 relative">
          <form>
            <input
              type="text"
              id="name"
              value={name}
              placeholder="First name"
              onChange={onChange}
              className="w-full text-xl px-4 py-2 bg-white text-gray-700 border-gray-300 rounded transition ease-in-out mb-4"
            />
            <input
              type="text"
              id="email"
              value={email}
              placeholder="Email address"
              onChange={onChange}
              className="w-full text-xl px-4 py-2 bg-white text-gray-700 border-gray-300 rounded transition ease-in-out mb-4"
            />
            <input
              type={showpassword ? "text" : "password"}
              id="password"
              value={password}
              placeholder="Password"
              onChange={onChange}
              className="w-full text-xl px-4 py-2 bg-white text-gray-700 border-gray-300 rounded transition ease-in-out"
            />
            {showpassword ? (
              <FaEye
                className="absolute right-3 top-[130px] text-xl cursor-pointer"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            ) : (
              <FaEyeSlash
                className="absolute right-3 top-[130px] text-xl cursor-pointer"
                onClick={(prevState) =>
                  setShowPassword((prevState) => !prevState)
                }
              />
            )}

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mt-3">
                Already have an account?
                <Link
                  className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-2"
                  to="/sign-in"
                >
                  Login
                </Link>{" "}
              </p>
              <p className="mt-3">
                <Link
                  to="/forgot-password"
                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out "
                >
                  Forgot-password
                </Link>
              </p>
            </div>
            <button
              type="button"
              className="w-full bg-blue-600 py-3 px-7 mt-3 text-white uppercase rounded text-sm font-medium shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
              onClick={handleRegister}
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
