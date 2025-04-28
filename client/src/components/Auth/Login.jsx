import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const baseUrl = import.meta.env.VITE_API_URL;



export default function Login() {
  let [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  //  Handle Showing Password
  const handleShowPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(form.length === 0 ) {
      alert("All feilds are required")
    }
    const res = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      login(data.user, data.token);
      alert("User Login Succesfully")
      navigate("/dashboard");
    } else {
      alert("Error Login User" ,data.error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="lg:w-[50%] xl:w-[35%] md:w-[75%] bg-white w-[97%] rounded-lg text-black p-6 max-sm-p-0 flex flex-col justify-center items-center"
    >
      <h2 className="w-full text-center mb-8 lg:text-4xl text-2xl mt-4 font-extrabold">
        Login
      </h2>
      <label
        htmlFor="username"
        className="mb-2 lg:text-lg md:text-md w-full p-2 text-black font-semibold"
      >
        User Name
        <input
          name="username"
          type="text"
          id="Username"
          onChange={handleChange}
          className="w-full  active:border-blue-400 active:border active:outline-0 focus:outline-0 focus:border focus:border-blue-400 h-[50px] px-3  border border-gray-400 required rounded-2xl"
        />
      </label>

      <label
        htmlFor="password"
        className="w-full p-1 text-gray-600 font-semibold"
      >
        Password
        <div className="input w-full h-auto flex  p-1">
          {showPassword == false ? (
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              className="w-full  active:border-blue-400 active:border active:outline-0 focus:outline-0 focus:border focus:border-blue-400 h-[50px] px-3  border border-gray-400 required rounded-2xl"
            />
          ) : (
            <input
              type="text"
              name="password"
              id="password"
              className="w-full  active:border-blue-400 active:border active:outline-0 focus:outline-0 focus:border focus:border-blue-400 h-[50px] px-3  border border-gray-400 required rounded-2xl"
            />
          )}
          <button
            onClick={handleShowPassword}
            className="eyeButton text-blue-400 hover:text-white hover:bg-blue-300 hover:border-2 active:shadow-sm  active:shadow-blue-600 focus:shadow-sm  focus:shadow-blue-600 w-[60px] rounded-xl h-[50px] px-3 border-blue-400 border flex justify-center items-center"
          >
            {showPassword == false ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
      </label>

      <p className="w-full text-sm mt-5 p-2">
        You don't have an account !{" "}
        <Link
          to="/signup"
          className="text-blue-300 hover:border-b hover:border-blue-300 hover:text-black cursor-pointer text-lg"
        >
          Signup
        </Link>
      </p>
      <button
        type="submit"
        className="px-8 py-2 cursor-pointer my-8 hover:bg-blue-300 text-xl rounded-lg  bg-blue-400 text-white"
      >
        Login
      </button>
    </form>
  );
}
