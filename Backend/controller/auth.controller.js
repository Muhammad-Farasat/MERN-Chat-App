import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetLocalStorage from "../utils/generateJwt.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { username, fullName, password, gender } = req.body;

    if (!username || !password || !fullName || !gender) {
      return res.status(400).json({ message: "Fill all feilds..!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    await newUser.save();

    const data = { id: newUser.id, fullName: newUser.fullName, username: newUser.username };

    const token = jwt.sign(data, process.env.JWT_SECRET);

    res.status(200).json({ success: true, newUser, token });
  } catch (error) {
    res.status(500).json({ error: "Error in signup..!" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "fill all feild..!" });
    }

    const user = await User.findOne({ username });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid password or username" });
    }

    if (!user) {
      return res.status(400).json({ error: "Not found user...!" });
    }

    const token = jwt.sign({ id: user.id, fullName: user.fullName, username: user.username }, process.env.JWT_SECRET);

    return res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: "Error in  login" });
    console.error("Error: ", error);
  }
};

export const logout = (req, res) => {
  try {
    // Send a response indicating successful logout
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error.message);
    res.status(500).json({ error: "Logout failed" });
  }
};
