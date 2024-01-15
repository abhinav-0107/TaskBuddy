import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { credentialParams } from "@abhinav_0107/common";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signupInput: credentialParams = {
    username,
    password,
  };

  return (
    <div>
      <h2>Signup</h2>
      {/* Username Input box */}
      <input
        placeholder="Username"
        type={"email"}
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      {/* Password Input box */}
      <input
        placeholder="Password"
        type={"password"}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      Already Signed up?
      <a href="http://localhost:5173/Login">Login</a>
      {/* Signup Button */}
      <button
        onClick={async () => {
          const response = await axios.post(
            "http://localhost:3000/user/signup",
            {
              signupInput,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = response.data;
          if (data.token) {
            localStorage.setItem("token", data.token);
            navigate("/todo");
          } else {
            alert(data.message);
          }
        }}
      >
        Signup
      </button>
    </div>
  );
}
