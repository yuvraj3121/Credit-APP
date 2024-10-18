import { BsCashStack } from "react-icons/bs";
import Navbar from "../Navbar/Navbar";
import { TbCurrencyNaira } from "react-icons/tb";
import "../../styles/userDashboard.css";
import { FaFilter, FaSortAmountUp } from "react-icons/fa";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { setLoan } from "../../features/loanSlice";

interface FormData {
  fullname: string;
  amount: number;
  tenure: number;
  reason: string;
  status: string;
  address1: string;
  address2: string;
}

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

const UserDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    amount: 0,
    tenure: 0,
    reason: "",
    status: "",
    address1: "",
    address2: "",
  });
  const [userLoans, setUserLoans] = useState<Loan[]>([]);

  const handleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { fullname, amount, tenure, reason, status, address1, address2 } =
      formData;
    if (
      [fullname, reason, status, address1, address2].some(
        (field) => field.trim() === ""
      ) ||
      amount === 0 ||
      tenure === 0
    ) {
      alert("All fields are required!");
      return;
    }

    try {
      const res = await axios.post(
        `https://credit-app-v1.onrender.com/api/v1/loans/applyForLoan/${user?.id}`,
        {
          fullname,
          amount,
          tenure,
          reason,
          status,
          address1,
          address2,
        },
        { withCredentials: true }
      );
      console.log("Loan application successful:", res.data.loan);
      dispatch(setLoan(res.data.loan));

      setFormData({
        fullname: "",
        amount: 0,
        tenure: 0,
        reason: "",
        status: "",
        address1: "",
        address2: "",
      });

      setIsFormOpen(false);
    } catch (error) {
      console.error("Error submitting loan application:", error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const fetchUserLoans = async () => {
    try {
      const res = await axios.get(
        `https://credit-app-v1.onrender.com/api/v1/loans/userLoans/${user?.id}`,
        { withCredentials: true }
      );
      console.log("user loans fetched successfully:", res.data.userLoans);
      setUserLoans(res.data.userLoans);
    } catch (error) {
      console.error("Error fetching yuser loans:", error);
    }
  };

  useEffect(() => {
    fetchUserLoans();
  }, [formData]);

  return (
    <div className="userDB-mainDiv">
      <Navbar />
      <div className="wrapper">
        <div className="userDB-centerDiv">
          <div className="udbcenter-upper">
            <div className="upper-right">
              <div className="first">
                <BsCashStack />
              </div>
              <div className="second">
                <p>DEFICIT</p>
                <span>
                  <span className="sign">
                    <TbCurrencyNaira />
                  </span>
                  <p>0.0</p>
                </span>
              </div>
            </div>
            <div className="third">
              <button onClick={handleForm}>Get A Loan</button>
            </div>
          </div>
        </div>
        <div className="userDB-lowerDiv">
          <div className="UDBlower-upper">
            <button>Borrow Cash</button>
            <button>Transact</button>
            <button>Deposit</button>
          </div>
          <div className="UDBlower-center">
            <input type="text" placeholder="Search for loans" />
          </div>
          <div className="UDBlower-lower">
            <div className="UDBL-lu">
              <h3>Applied Loans</h3>
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
            <div className="UDBL-lb">
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th style={{ width: "50%" }}>Loan Officer</th>
                    <th>Amount</th>
                    <th>Date Applied</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {userLoans.map((loan) => (
                    <tr key={loan._id}>
                      <td>officer 1</td>
                      <td>{loan.amount}</td>
                      <td>{new Date(loan.createdAt).toLocaleDateString()}</td>
                      <td>{loan.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {isFormOpen && (
        <>
          <div className="backdrop"></div>
          <div className="loanform">
            <div className="modal-form">
              <h2>APPLY FOR A LOAN</h2>
              <form onSubmit={handleSubmit}>
                <span>
                  <p>Full name as it appears on bank account</p>
                  <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    placeholder="Full name as it appears on bank account"
                    required
                  />
                </span>
                <span>
                  <p>How much you need?</p>
                  <input
                    // type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="How much you need?"
                    required
                  />
                </span>
                <span>
                  <p>{`Loan tenure (in months)`}</p>
                  <input
                    // type="number"
                    name="tenure"
                    value={formData.tenure}
                    onChange={handleChange}
                    placeholder="Loan tenure (in months)"
                    required
                  />
                </span>
                <span>
                  <p>Employment status</p>
                  <input
                    type="text"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    placeholder="Employment status"
                    required
                  />
                </span>
                <span>
                  <p>Reason for loan</p>
                  <input
                    className="reason"
                    type="text"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="Reason for loan"
                    required
                  />
                </span>
                <span>
                  <p>Employment address</p>
                  <input
                    type="text"
                    name="address1"
                    value={formData.address1}
                    onChange={handleChange}
                    placeholder="Employment address"
                    required
                  />
                </span>
                <span>
                  <p>Secondary address (optional)</p>
                  <input
                    type="text"
                    name="address2"
                    value={formData.address2}
                    onChange={handleChange}
                    placeholder="Secondary address (optional)"
                  />
                </span>
                <button type="submit">Submit</button>
              </form>
              <button className="cancelBtn" onClick={handleForm}>
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDashboard;
