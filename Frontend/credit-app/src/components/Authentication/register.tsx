import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/register.css";

interface UserData {
  fullname: string;
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData>({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { fullname, username, email, password } = userData;
    if (
      [fullname, username, email, password].some((field) => field.trim() === "")
    ) {
      alert("All fields are required!");
      return;
    }

    try {
      const res = await axios.post(
        "https://credit-app-v1.onrender.com/api/v1/users/register",
        {
          fullname,
          username,
          email,
          password,
        }
      );
      console.log(res);
      setUserData({ fullname: "", username: "", email: "", password: "" });
      navigate("/Login");
    } catch (error) {
      console.error("Error registering user:", error);
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
    <div className="reg-mainDiv">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="fullname"
          type="text"
          value={userData.fullname}
          placeholder="Enter your fullname"
          onChange={handleChange}
        />
        <input
          name="username"
          type="text"
          value={userData.username}
          placeholder="Enter your username"
          onChange={handleChange}
        />
        <input
          name="email"
          type="text"
          value={userData.email}
          placeholder="Enter your email"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          value={userData.password}
          placeholder="Enter your password"
          onChange={handleChange}
        />
        <button type="submit">Register</button>
        <span>
          Have already an account?{" "}
          <a onClick={() => navigate("/Login")}>Login here</a>
        </span>
      </form>
    </div>
  );
};

export default Register;
