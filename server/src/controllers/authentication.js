import { generateToken } from "../libraries/utilities.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    const user = await User.findOne({ username });

    if (user) return res.status(400).json({ message: "username already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // generate jwt token here
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
