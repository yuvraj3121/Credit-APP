import AdminNavbar from "../Navbar/adminNavbar";
import "../../styles/adminDashboard.css";
import { FaFilter, FaSortAmountUp } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface Loan {
  _id: string;
  borrowerId: string;
  fullname: string;
  amount: number;
  tenure: number;
  reason: string;
  status: string;
  address: string;
  action: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [allLoans, setAllLoans] = useState<Loan[]>([]);

  const handleSignOut = async () => {
    try {
      await axios.post("http://localhost:8000/api/v1/users/logout", {
        withCredentials: true,
      });
      console.log("signout successful");
      navigate("/login");
    } catch (error) {
      console.error("Error signingout user:", error);
    }
  };

  const fetchAllLoans = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/loans/allLoans`,
        { withCredentials: true }
      );
      console.log("user loans fetched successfully:", res.data.userLoans);
      setAllLoans(res.data.allLoans);
    } catch (error) {
      console.error("Error fetching yuser loans:", error);
    }
  };

  useEffect(() => {
    fetchAllLoans();
  }, []);

  return (
    <div>
      <AdminNavbar />
      <div className="admain-div">
        <div className="ADM-left">
          <span className="Profile-span">
            <h3>Profile</h3>
          </span>
          <ul>
            <li>Dashboard</li>
            <li>Borrowers</li>
            <li>Loans</li>
            <li>Repayments</li>
            <li>Loan Parameters</li>
            <li>Accounting</li>
            <li>Reports</li>
            <li>Collateral</li>
            <li>Access Configuration</li>
            <li>Savings</li>
            <li>Other Incomes</li>
            <li>Payroll</li>
            <li>Expenses</li>
            <li>E-signature</li>
            <li>Investor Accounts</li>
            <li>Calendar</li>
            <li>Settings</li>
            <li onClick={handleSignOut}>Sign Out</li>
          </ul>
        </div>
        <div className="ADM-right">
          <h2>Dashboard</h2>
          <div className="ADM-rboxes">
            <span>ACTIVE USERS</span>
            <span>BORROWERS</span>
            <span>CASH DISBURSED</span>
            <span>CASH RECEIVED</span>
            <span>SAVINGS</span>
            <span>REPAID LOANS</span>
            <span>OTHER ACCOUNTS</span>
            <span>LOANS</span>
          </div>
          <div className="ADM-rtable">
            <div className="ADMT-lu">
              <h3>Recent Loans</h3>
              <span className="SF-span">
                <span>
                  <FaFilter />
                  <p>Sort</p>
                </span>
                <span>
                  <FaSortAmountUp />
                  <p>Filter</p>
                </span>
              </span>
            </div>
            <div className="ADMT-lb">
              <table style={{ width: "100%" }}>
                <tr>
                  <th style={{ width: "50%" }}>User recent activity</th>
                  <th>Customer name</th>
                  <th>Date</th>
                  <th>Acion</th>
                </tr>
                {allLoans.map((loan) => (
                  <tr key={loan._id}>
                    <td>{"activity"}</td>
                    <td>{loan.fullname}</td>
                    <td>{new Date(loan.createdAt).toLocaleDateString()}</td>
                    <td>{loan.action}</td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
