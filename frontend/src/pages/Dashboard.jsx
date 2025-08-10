import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Users } from "../components/Users";
import axios from "axios";

export default function Dashboard() {
  const [balance, setBalance] = useState(0);
//  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: "Bearer ${token}" };

        const response = await axios.get("http://localhost:3000/api/v1/account/balance", { headers });
        setBalance(response.data.balance);

      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchData();
  }, []);

  return (
    
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Balance Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your Balance</h2>
        <div className="flex items-baseline">
          <div >{balance}</div>
          <span className="text-4xl font-bold text-gray-900">₹{balance}</span>
          <span className="ml-2 text-gray-500">INR</span>
        </div>
      </div>

      {/* Users Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        { <Users /> }
        lols
      </div>
    </div>
  );
}
