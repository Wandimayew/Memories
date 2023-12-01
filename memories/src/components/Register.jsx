import { useState } from "react";
import image from "../assets/memory_poster.jpg";
import { FcGoogle } from "react-icons/fc";
import { ImTelegram } from "react-icons/im";
import { BsLinkedin } from "react-icons/bs";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const Register = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const registerHandler = async (e) => {
    e.preventDefault();
    await axios
      .post("http://127.0.0.1:5000/users/register", {
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
      });
  };
  return (
    <div className="flex flex-col p-3 justify-stretch h-full bg-white">
      <div className="text-black text-2xl font-bold text-center m-5">
        <h1 className="hover:animate-ping">MEMORIES</h1>
      </div>
      <div className="flex flex-col justify-center sm:flex-row sm:justify-around">
        <div className="flex justify-evenly flex-row mt-2 h-auto shadow-2xl border-solid  w-auto rounded-2xl ">
          <div className="hidden lg:flex">
            <img
              src={image}
              alt="Image"
              className=" max-h-[512px] pr-4 transition duration-300 ease-in-out rounded-2xl text-white hover:opacity-80"
            />
          </div>
          <div className="">
            <h1 className="text-green-400 font-bold text-center m-1 text-2xl">
              Welcome to Memories
            </h1>
            <form>
              <p className="text-center font-bold p-1">Registration Form</p>
              <div className="flex flex-row p-4">
                <label className="text-xl">Full Name:</label>
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  className="flex flex-1 ml-8 mr-8 w-auto border-solid border-b-2 shadow-sm rounded-md px-4 py-2"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-row p-4">
                <label className="text-xl mr-10">Email: {"      "}</label>
                <input
                  type="text"
                  placeholder="Enter Email"
                  className="flex flex-1 ml-8 mr-8  w-auto border-solid border-b-2 shadow-sm rounded-md px-4 py-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-row p-4">
                <label className="text-xl">Password:</label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="flex flex-1 justify-center ml-10 mr-8 w-auto border-solid border-b-2 shadow-sm rounded-md px-4 py-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </form>
            <div className="flex justify-center p-3 pl-12">
              <button
                className="border-solid w-2/5 text-white rounded-xl bg-green-500 border-2 shadow-xl mt-2 pt-2 pb-2 hover:opacity-80 hover:cursor-pointer"
                onClick={registerHandler}
              >
                Register
              </button>
            </div>
            <div>
              <p className="text-center">Or Register using GOOGLE</p>
            </div>
            <div className="mt-7 ml-6">
              <p>
                Do you have an account?{" "}
                <Link
                  to="/"
                  className="text-green-400 font-bold cursor-pointer"
                >
                  Login!
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

export default Register;
