import jwt from 'jsonwebtoken'

const generateTokenAndSetLocalStorage = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET); // No expiration time

    console.log("Generated Token is:", token);

    // Send the token in response (optional) or store in localStorage on the frontend
    return token // Example: Send token back as response for storage
};


export default generateTokenAndSetLocalStorage;