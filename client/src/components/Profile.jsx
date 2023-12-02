import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaUserEdit } from "react-icons/fa";
import { useSnackbar } from "notistack";

const Profile = ({ onClose }) => {
  const { id } = useParams();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [editable, setEditable] = useState(false);
  const [editablePassword, setEditablePassword] = useState(false);
  const [text, setText] = useState(null);
  const [now, setNow] = useState(false);
  const [pass, setPass] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/users/home/${id}`
        );
        let result = response.data;
        if (result) {
          setEmail(result.email);
          setUserName(result.username);
          setPass(result.password);
        } else {
          enqueueSnackbar("Response Not Found", { variant: "warning" });
          console.log("response not found");
        }
      } catch (error) {
        enqueueSnackbar("Server Error", { variant: "error" });
        console.log(error);
      }
    };
    getUser();
  }, []);
  const handleChange = async (e) => {
    setEditable(false);
    setEditablePassword(false);
    setNow(false);
    e.preventDefault();
    try {
      await axios
        .put(`http://localhost:5000/users/edit/${id}`, { username })
        .then((result) => {
          enqueueSnackbar(
            `Profile Updated Success Fully To ${result.data.user.username}`,
            { variant: "success" }
          );
          setText("Profile updated successfully");
        })
        .catch((error) => {
          console.log(error);
          enqueueSnackbar("Error Updating Profile", { variant: "error" });
          setText("Error updating profile");
        });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Error Updating Profile", { variant: "error" });
      setText("Error updating profile");
    }
  };
  const handleChangePassword = async () => {
    if (pass === oldPassword) {
      if (newPassword === confirmPassword) {
        try {
          await axios
            .put(`http://localhost:5000/users/edit/password/${id}`, {
              newPassword,
            })
            .then((result) => {
              enqueueSnackbar("Password Changed Successfully", {
                variant: "success",
              });
              setText("Profile updated successfully");
            })
            .catch((error) => {
              enqueueSnackbar("Error Changing Password", { variant: "error" });
              console.log(error);
              setText("Error updating profile");
            });
        } catch (error) {
          console.log(error);
          enqueueSnackbar("Error Changing Password", { variant: "error" });
          setText("Error updating profile");
        }
      } else {
        enqueueSnackbar(
          "Password not Match, Two password Field Must be Matched",
          { variant: "warning" }
        );
        console.log("new not match");
      }
    } else {
      enqueueSnackbar("Password not Matched, Please Fill the right Password", {
        variant: "error",
      });
      console.log("not matched");
    }
    setEditablePassword(false);
    setEditable(false);
    setNow(false);
  };
  return (
    <div className="top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="max-w-md mx-auto my-1 w-full bg-white p-4 rounded-md shadow-md relative">
        <button
          className="absolute top-0 h-8 w-8 font-bold right-0 bg-blue-600 rounded-full text-white hover:bg-blue-400 cursor-pointer focus:outline-none"
          onClick={onClose}
        >
          X
        </button>
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Profile</h1>
          {now && (
            <p className="text-green-500 px-6 font-bold text-xl">{text}</p>
          )}
          <FaUserEdit
            size={30}
            onClick={() => {
              setEditable(true),
                setText("Editing Profile"),
                setEditablePassword(false),
                setNow(true);
            }}
            className="mr-4 cursor-pointer text-yellow-400"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={username}
            onChange={(e) => {
              editable && setUserName(e.target.value);
            }}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            readOnly
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="button"
          onClick={handleChange}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Save Change
        </button>
        <div className="my-2 border-gray-400 border-t-2 mt-8 border-dashed">
          <div className="flex justify-between my-6">
            <p className="text-xl font-bold">Change Password?</p>
            <FaUserEdit
              size={30}
              onClick={() => {
                setEditablePassword(true),
                  setText("Editing Password"),
                  setEditable(false),
                  setNow(true);
              }}
              className="mr-4 cursor-pointer text-yellow-400"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Old Password:
            </label>
            <input
              type="password"
              id="oldpassword"
              value={oldPassword}
              onChange={(e) => {
                editablePassword && setOldPassword(e.target.value);
              }}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              New Password:
            </label>
            <input
              type="password"
              id="newpassword"
              value={newPassword}
              onChange={(e) => {
                editablePassword && setNewPassword(e.target.value);
              }}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => {
                editablePassword && setConfirmPassword(e.target.value);
              }}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="button"
            onClick={handleChangePassword}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};
export default Profile;
