import User from "../model/user.model.js";

export const getUserForSidebar = async (req, res) => {
    try {

        const user = req.user.id

        const users = await User.find({_id: {$ne: user}}).select("-password")

        res.status(200).json(users)


    } catch (error) {
        console.error("Invalid Token Error:", error.message);
        res.status(403).json({ error: "Invalid or expired token" });
    }
};