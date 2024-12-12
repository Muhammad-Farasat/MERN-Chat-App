import User from "../model/user.model.js";
import jwt from 'jsonwebtoken'

export const getUserForSidebar = async (req, res) => {
    try {

        const user = req.user.id

        // console.log("coming from sidebar: ", req.user);

        const users = await User.find({_id: {$ne: user}}).select("-password")

        res.status(200).json(users)


    } catch (error) {
        console.error("Invalid Token Error:", error.message);
        res.status(403).json({ error: "Invalid or expired token" });
    }
};

