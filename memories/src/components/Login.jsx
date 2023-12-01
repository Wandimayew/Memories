import { useState } from "react";
import image from "../assets/memory_poster.jpg";
import { FcGoogle } from "react-icons/fc";
import { ImTelegram } from "react-icons/im";
import { BsLinkedin } from "react-icons/bs";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSnackbar } from "notistack";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/users/login/", {
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
    }
  };
  return (
    <div className="flex flex-col p-4 justify-stretch h-full bg-white">
      <div className="text-black text-2xl font-bold text-center m-5">
        <h1 className="hover:animate-ping">MEMORIES</h1>
      </div>
      <div className="flex flex-col justify-center sm:flex-row sm:justify-around">
        <div className="flex justify-evenly flex-row mt-4 h-auto shadow-2xl border-solid  w-auto rounded-2xl ">
          <div className="hidden lg:flex">
            <img
              src={image}
              alt="Image"
              className=" max-h-[450px] pr-4 transition duration-300 ease-in-out rounded-2xl text-white hover:opacity-80"
            />
          </div>
          <div className="pt-6">
            <h1 className="text-green-400 font-bold text-center m-4 text-2xl">
              Welcome to Memories
            </h1>
            <form>
              <div className="flex flex-row p-4">
                <label className="text-xl">User Name:</label>
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="flex flex-1 ml-8 mr-8 w-auto border-solid border-b-2 shadow-sm rounded-md px-4 py-2"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-row p-4">
                <label className="text-xl">Password:</label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="flex flex-1 justify-center ml-11 mr-8 w-auto border-solid border-b-2 shadow-sm rounded-md px-4 py-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </form>
            <div className="flex justify-center p-3 pl-12">
              <button
                className="border-solid w-2/5 text-white rounded-xl bg-green-500 border-2 shadow-xl mt-4 pt-2 pb-2 hover:opacity-80 hover:cursor-pointer"
                onClick={loginHandler}
              >
                Login
              </button>
            </div>
            <div className="mt-7 ml-6">
              <p>
                Don't have account?{" "}
                <Link
                  to="/register"
                  className="text-green-400 font-bold cursor-pointer"
                >
                  Create new one!
                </Link>
              </p>
            </div>
            <div className="">
              <div className="flex justify-evenly m-2 py-4">
                <FcGoogle className="text-2xl hover:animate-bounce hover:cursor-pointer" />
                <ImTelegram className="text-2xl hover:animate-bounce hover:cursor-pointer" />
                <BsLinkedin className="text-2xl hover:animate-bounce hover:cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
