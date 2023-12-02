import { useState } from "react";
import image from "../assets/memory_poster.jpg";
import { FcGoogle } from "react-icons/fc";
import { ImTelegram } from "react-icons/im";
import { BsLinkedin } from "react-icons/bs";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { PropagateLoader } from "react-spinners";

const Register = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading]= useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const registerHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
    await axios
      .post("https://memory-2jvo.onrender.com/users/register/", {
        username,
        email,
        password,
      })
      .then(() => {
        navigate("/");
        enqueueSnackbar("Registration successful", { variant: "success" });
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Registration is Failed, Please try again", {
          variant: "error",
        });
      }
      );}
      finally{
        setIsLoading(false)
      }
  };
  return (
<div className="flex flex-col p-3 justify-stretch h-full bg-white">
  <div className="text-black text-2xl font-bold text-center my-5">
    <h1 className="hover:animate-ping">MEMORIES</h1>
  </div>
  <div className="flex flex-col justify-center sm:flex-row sm:justify-around">
    <div className="flex justify-evenly flex-col sm:flex-row mt-2 h-auto shadow-lg border-solid w-auto rounded-xl">
      <div className="hidden lg:flex "> {/* Added flex-grow */}
        <img
          src={image}
          alt="Cover Image"
          className="w-11/12 max-h-[512px]  transition duration-300 ease-in-out rounded-xl text-white hover:opacity-80"
        />
      </div>
      <div className="pt-6 w-auto"> {/* Added flex-grow */}
        <h1 className="text-green-400 font-bold text-center m-1 text-2xl">
          Welcome to Memories
        </h1>
        <form className="mx-4">
          <p className="text-center font-bold p-2">Registration Form</p>
          <div className="flex flex-col mb-4">
            <label htmlFor="username" className="text-lg sm:text-xl">
              Full Name:
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter Full Name"
              className="w-full border-solid border-b-2 shadow-sm rounded-md px-4 py-2"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="text-lg sm:text-xl">
              Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              className="w-full border-solid border-b-2 shadow-sm rounded-md px-4 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="password" className="text-lg sm:text-xl">
              Password:
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              className="w-full border-solid border-b-2 shadow-sm rounded-md px-4 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        {isLoading && (
          <div className="flex justify-center mt-4">
          <PropagateLoader color="#36D7B7" loading={true} />
        </div>)}
        <div className="flex justify-center mt-4">
          <button
            className="w-3/4 text-white rounded-xl bg-green-500 border-2 shadow-xl py-2 hover:opacity-80 hover:cursor-pointer"
            onClick={registerHandler}
          >
            Register
          </button>
        </div>
        </form>
        <div className="mt-7 mx-6">
          <p>
            Already have an account?{" "}
            <Link
              to="/"
              className="text-green-400 font-bold cursor-pointer"
            >
              Login!
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
export default Register;