import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Authentication/login";
import Register from "./components/Authentication/register";
import UserDashboard from "./components/Dashboard/userDashboard";
import AdminDashboard from "./components/Dashboard/adminDashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/UserDashboard" element={<UserDashboard />}></Route>
          <Route path="/AdminDashboard" element={<AdminDashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
