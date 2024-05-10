import React, { useEffect, useState } from "react";
import login from "../images/login.jpg";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
//import axios from "axios";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";

import { getUsers } from "../components/services/User";
import axios from "axios";
import { BASE_URL } from "../constants/ApiConstants";
import { useAuth } from "../providers/authProvider";

export default function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [users, setUsers] = useState([]);
  const [showpassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { email, password } = formData;

  const { setToken } = useAuth();
  // useEffect(() => {
  //   getAllUsers()
  // }, []);

  // const getAllUsers=async ()=>{
  //   const res = await getUsers();
  //   const res1 = res;
  //   setUsers(res1.data);
  //   localStorage.setItem("stringfy",JSON.stringify(res1))
  //   localStorage.setItem("token1", res1.data.token);
  // }
  function onChange(e) {
    //console.log(e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
 function handleLogin(e) {
    e.preventDefault();

    try{
       axios.get(BASE_URL).then(response=>{
        response.data.map(user=>{
          if(user.email===email && user.password===password){
            toast("user login success",{type:"success"});
             setToken("my_token");
             navigate("/profile", { replace: true });
          }
          else{
            toast("failed login",{type:'error'})
          }
        })
       });
      
    } catch(error){
      toast("error, login failed", { type: "error" });
      console.log(error);
    }
    // if (
    //   users !== null &&
    //   users.find((user) => user.email === email && user.password === password)
    // ) {
    //   //localStorage.setItem('id',)
    //   toast("login success", { type: "success" });
    //   navigate("/");
    // } else {
    //   toast("error, login failed",{type:'error'});
    // }
  }
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign In</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img src={login} alt="sign in" className="w-full rounded-2xl" />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20 relative">
          <form onSubmit={(e)=>handleLogin(e)}>
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
                className="absolute right-3 top-[74px] text-xl cursor-pointer"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            ) : (
              <FaEyeSlash
                className="absolute right-3 top-[74px] text-xl cursor-pointer"
                onClick={(prevState) =>
                  setShowPassword((prevState) => !prevState)
                }
              />
            )}

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mt-3">
                Don't have an account?
                <Link
                  className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-2"
                  to="/sign-up"
                >
                  Register
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
              type="submit"
              className="w-full bg-blue-600 py-3 px-7 mt-3 text-white uppercase rounded text-sm font-medium shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
