import axios from "axios";
import React, { useEffect } from "react";
//import { withRouter } from "react-router-dom";
import { ACCESS_TOKEN_NAME, BASE_URL } from "../constants/ApiConstants";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(BASE_URL, {
        headers: { token: localStorage.getItem(ACCESS_TOKEN_NAME) },
      })
      .then((response) => {
        if (response.status !== 200) {
          redirectToLogin();
        }
      })
      .catch((error) => {
        redirectToLogin();
      });
  }, []);

  function redirectToLogin() {
    //props.history.push("./sign-in");
    navigate("/sign-in");
  }
  return <div>Home</div>;
}
export default Home;
