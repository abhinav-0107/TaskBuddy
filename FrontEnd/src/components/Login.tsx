import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <h2>Login</h2>
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
      New here?
      <a href="http://localhost:5173/signup" >Signup</a>
      {/* <link>Signin</link> */}
      {/* Login Button */}
      <button
        onClick={async () => {
          const response = await axios.post(
            "http://localhost:3000/user/login",
            {
              username,
              password,
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
        Login
      </button>
    </div>
  );
}

export default Login;
