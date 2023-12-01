import { User } from "../model/User.js";
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = "your-secret-key";
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if id is undefined or null
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const user = await User.findById(id);

    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { username, email } = req.body;
    console.log(req.body);
    console.log("username", username);

    if (!id) {
      return res.status(400).json({ message: "User Id is required" });
    }
    const user = await User.findById(id);
    console.log("user is", user);
    console.log("name", user.username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      // Update fields if provided in the request
      if (username) {
        user.username = username;
        console.log("hi");
      }
      // Save the updated user
      const updatedUser = await user.save();

      // Respond with the updated user
      res
        .status(200)
        .json({ message: "User updated successfully", user: updatedUser });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const editUserPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    if (!id) {
      return res.status(400).json({ message: "User Id is required" });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      // Update fields if provided in the request
      if (newPassword) {
        user.password = newPassword;
      }
      // Save the updated user
      const updatedUser = await user.save();

      // Respond with the updated user
      res
        .status(200)
        .json({ message: "User updated successfully", user: updatedUser });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addUser = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.create(req.body);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({ message: error.message });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email, password: password });
    console.log("User found:", user);
    if (user) {
      // Generate a JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET_KEY,
        {
          expiresIn: "2m", // Token expiration time (adjust as needed)
        }
      );
      console.log(user);
      res.json({ success: true, token, user });
    } else {
      // If the user is not found, send an error message
      res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
