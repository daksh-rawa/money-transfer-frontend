import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import InputBox from "../components/InputBox";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import { Button } from "../components/Button";
import BottomWarningButton from "../components/BottomWarningButton";

const SignIn = () => {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError("All fields are required.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", form);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Could not sign in. Please check your credentials."
      );
    }
  };

  return (
    <>
    <div className="flex min-h-[80vh] flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Heading>Sign In</Heading>
        <SubHeading>Welcome back! Please sign in to your account.</SubHeading>
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <InputBox
              label="Username"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <InputBox
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Button type="submit" text={"ssignin"}></Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold leading-6 text-gray-800 hover:text-gray-700">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
    </>
  );
};


export default SignIn;
