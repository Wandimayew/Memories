import { useState } from "react";
import image from "../assets/memory_poster.jpg";
import { FcGoogle } from "react-icons/fc";
import { ImTelegram } from "react-icons/im";
import { BsLinkedin } from "react-icons/bs";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSnackbar } from "notistack";
import { PropagateLoader } from 'react-spinners';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading]=useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const loginHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("https://memory-2jvo.onrender.com/users/login/", {
        email,
        password,
      });
      if (response.data && response.data.token) {
        const { token, user } = response.data;
        const userId = response.data.user._id;
        // Save the token to local storage for subsequent requests
        localStorage.setItem("token", token);

        // Update user information in the context
        login(user);
        console.log(response.data.user.email);
        enqueueSnackbar("Login Success Fully", { variant: "success" });
        navigate(`/home/${userId}`);
      } else {
        console.error("Invalid credentials");
      }
    } catch (error) {
      if (error.response) {
        enqueueSnackbar(
          "Invalid UserName or Password Please try with valid Credentials",
          { variant: "warning" }
        );
        console.error("Response data:", error.response.data);
      }
      console.error(error);
    }finally {
      setIsLoading(false);
    }
  };
  return (
    <div className=" flex flex-col justify-stretch h-full bg-white">
  <div className="text-black text-2xl font-bold text-center my-5">
    <h1 className="hover:animate-ping">MEMORIES</h1>
  </div>
  <div className="flex flex-col justify-center sm:flex-row sm:justify-around">
    <div className="flex justify-evenly flex-col sm:flex-row mt-4 h-auto shadow-lg border-solid w-auto rounded-xl">
      <div className="hidden lg:flex">
        <img
          src={image}
          alt="Cover Image"
          className="max-h-[450px] pr-4 transition duration-300 ease-in-out rounded-xl text-white hover:opacity-80"
        />
      </div>
      <div className="pt-6">
        <h1 className="text-green-400 font-bold text-center m-4 text-2xl">
          Welcome to Memories
        </h1>
        <form className="mx-4">
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="text-lg sm:text-xl">
              Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full border-solid border-b-2 shadow-sm rounded-md px-4 py-2"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="password" className="text-lg sm:text-xl">
              Password:
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full border-solid border-b-2 shadow-sm rounded-md px-4 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </form>
        {isLoading && (
          <div className="flex justify-center mt-4">
          <PropagateLoader color="#36D7B7" loading={true} />
        </div>)}
          <div className="flex justify-center mt-4">
          <button
            className="w-3/4 text-white rounded-xl bg-green-500 border-2 shadow-lg py-2 hover:opacity-80 hover:cursor-pointer"
            onClick={loginHandler}
          >
            Login
          </button>
        </div>
        <div className="mt-4 mx-2">
          <p>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-green-400 font-bold cursor-pointer"
            >
              Create a new one!
            </Link>
          </p>
        </div>

        <div className="flex justify-evenly mt-4 py-4">
          <FcGoogle className="text-2xl hover:animate-bounce hover:cursor-pointer" />
          <ImTelegram className="text-2xl hover:animate-bounce hover:cursor-pointer" />
          <BsLinkedin className="text-2xl hover:animate-bounce hover:cursor-pointer" />
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Login;
