import {
  FaBell,
  FaBook,
  FaCreditCard,
  FaTachometerAlt,
  FaUser,
} from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { TbCurrencyNaira } from "react-icons/tb";
import { useSelector } from "react-redux";
import "../../styles/navbar.css";
import { RootState } from "../../app/store";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);

  const handleClick = async () => {
    try {
      await axios.post("http://localhost:8000/api/v1/users/logout", {
        withCredentials: true,
      });
      console.log("Logout successful");
      navigate("/login");
    } catch (error) {
      console.error("Error logout user:", error);
    }
  };

  return (
    <div className="navbar-mainDiv">
      <h3 className="nav-left">CREDIT APP</h3>
      <span className="nav-mid">
        <span>
          <FaTachometerAlt />
          Home
        </span>
        <span>
          <TbCurrencyNaira />
          Payments
        </span>
        <span>
          <FaBook />
          Budget
        </span>
        <span>
          <FaCreditCard />
          Card
        </span>
      </span>
      <span className="nav-right">
        <span>
          <FaBell />
        </span>
        <span>
          <AiFillMessage />
        </span>
        <span>
          <FaUser />
        </span>
        <span>{user?.username}</span>
        <span onClick={handleClick}>
          <FiLogOut />
        </span>
      </span>
    </div>
  );
};

export default Navbar;
