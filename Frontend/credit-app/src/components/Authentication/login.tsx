import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/userSlice";
import { AppDispatch } from "../../app/store";

interface UserData {
  username: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData>({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = userData;
    if ([username, password].some((field) => field.trim() === "")) {
      alert("All fields are required!");
      return;
    }

    try {
      const res = await axios.post(
        "https://credit-app-v1.onrender.com/api/v1/users/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      console.log("Login successful:", res.data.data.userData);

      dispatch(
        setUser({
          id: res.data.data.userData._id,
          username: res.data.data.userData.username,
          email: res.data.data.userData.email,
        })
      );

      setUserData({ username: "", password: "" });

      if (username === "Admin") navigate("/AdminDashboard");
      else navigate("/userDashboard");
    } catch (error) {
      console.error("Error login user:", error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <div className="log-mainDiv">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          type="text"
          value={userData.username}
          placeholder="Enter your username"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          value={userData.password}
          placeholder="Enter your password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
        <span>
          Already have an account?{" "}
          <a onClick={() => navigate("/")}>Register here</a>
        </span>
      </form>
    </div>
  );
};

export default Login;
