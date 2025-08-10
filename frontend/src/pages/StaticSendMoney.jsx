import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import InputBox from "../components/InputBox";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import { Button } from "../components/Button";

export const SendMoney = () => {
  // Extract recipient userId and name from URL query params
  const [searchParams] = useSearchParams();
  const toUserId = searchParams.get("id"); // matches your backend expected `to`
  const recipientName = searchParams.get("name");

  const [form, setForm] = useState({
    amount: "",
    note: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) {
      setError("Please enter a valid positive amount.");
      setSuccess("");
      return;
    }
    if (!toUserId) {
      setError("Recipient user ID is missing.");
      setSuccess("");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Call backend transfer API
      const response = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          amount: Number(form.amount),
          to: toUserId
          // Optionally: include note if backend supports
          // note: form.note 
        },
        {
          // Include credentials if needed (cookies etc.)
          withCredentials: true,
          // Add authorization header if your auth middleware expects tokens
          headers: { Authorization: "Bearer "+localStorage.getItem("token") }
        }
      );

      // Success response
      setSuccess(response.data.msg || "Transfer successful!");
      setForm({ amount: "", note: "" });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Transfer failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-8">
        <Heading>Send Money</Heading>
        <SubHeading>
          {recipientName ? `Sending money to ${recipientName}` : "Send money to your friend"}
        </SubHeading>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center font-semibold">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center font-semibold">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputBox
            label="Amount"
            type="number"
            name="amount"
            min="0"
            step="0.01"
            value={form.amount}
            onChange={handleChange}
            placeholder="Enter amount in USD"
            required
            disabled={loading}
          />

          <InputBox
            label="Note (optional)"
            type="text"
            name="note"
            value={form.note}
            onChange={handleChange}
            placeholder="Add a note (e.g., rent, gift)"
            disabled={loading}
          />

          <Button text="send" label="submit" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SendMoney;
