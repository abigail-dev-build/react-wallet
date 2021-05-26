import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import "../SignupForm/SignupForm";
import "./Login.css";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import API from '../../uttils/API'

function Login() {
  let history = useHistory();
  const { register, handleSubmit } = useForm({
    criteriaMode: "all",
    mode: "all",
  });
  const [passwordtype, setPasswordType] = useState(false);

  const passwordVisibility = () => {
    setPasswordType(passwordtype ? "text" : "password");
    setPasswordType(!passwordtype);
  };
  const login = async (data) => {
    console.log(data);
    await API
      .post("/auth/login", data)
      .then((response) => {
        const { loginToken } = response.data.data;
        localStorage.setItem("Logintoken", loginToken);
        alert("Let's get you started");
      })
      .catch((error) => {
        console.log(error);
      });
      history.push("/createPin");
  };
  return (
    <div>
      <form className="form" onSubmit={handleSubmit(login)}>
        <Input
          type="email"
          label="Email Address"
          placeholder="kingsleyomin@gmail.com"
          name="email"
          {...register("email")}
        />
        <div className="password">
          <Input
            type={passwordtype ? "text" : "password"}
            label="Password"
            placeholder="•••••••••"
            name="password"
            {...register("password")}
          />
          <span className="passwordIcon">
            <svg
              onClick={passwordVisibility}
              width="20"
              height="16"
              viewBox="0 0 20 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.70711 0.292893C3.31658 -0.0976311 2.68342 -0.0976311 2.29289 0.292893C1.90237 0.683418 1.90237 1.31658 2.29289 1.70711L16.2929 15.7071C16.6834 16.0976 17.3166 16.0976 17.7071 15.7071C18.0976 15.3166 18.0976 14.6834 17.7071 14.2929L16.2339 12.8197C17.7715 11.5924 18.939 9.9211 19.5424 7.99996C18.2681 3.94288 14.4778 1 10.0002 1C8.37665 1 6.84344 1.38692 5.48779 2.07358L3.70711 0.292893ZM7.96813 4.55391L9.48201 6.0678C9.6473 6.02358 9.82102 6 10.0003 6C11.1048 6 12.0003 6.89543 12.0003 8C12.0003 8.17923 11.9767 8.35296 11.9325 8.51824L13.4463 10.0321C13.7983 9.43658 14.0003 8.74187 14.0003 8C14.0003 5.79086 12.2094 4 10.0003 4C9.25838 4 8.56367 4.20197 7.96813 4.55391Z"
                fill="#B3BECF"
              />
              <path
                d="M12.4541 14.6967L9.74965 11.9923C7.74013 11.8681 6.1322 10.2601 6.00798 8.2506L2.33492 4.57754C1.50063 5.57223 0.856368 6.73169 0.458008 8.00004C1.73228 12.0571 5.52257 15 10.0002 15C10.8469 15 11.6689 14.8948 12.4541 14.6967Z"
                fill="#B3BECF"
              />
            </svg>
          </span>
        </div>
        <p className="forgotLink">Forgot Password?</p>
        <Button>Log In</Button>
        <p className="desc">
          Don't have an account? <span className="link">Register now</span>
        </p>
      </form>
    </div>
  );
}

export default Login;
