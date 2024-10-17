import { FaBell, FaUser } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { useSelector } from "react-redux";
import "../../styles/navbar.css";
import { RootState } from "../../app/store";

const AdminNavbar = () => {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <div className="navbar-mainDiv">
      <h3 className="nav-left">CREDIT APP</h3>
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
      </span>
    </div>
  );
};

export default AdminNavbar;
