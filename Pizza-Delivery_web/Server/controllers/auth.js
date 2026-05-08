const async_handler = require("express-async-handler");

const User = require("../models/Usermodel");
const generateToken = require("../config/generateToken");
const { sendPasswordResetEmail } = require("../config/mailer");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//function to register user
const registerUser = async_handler(async (req, res) => {
    const { name, email, password, address } = req.body;

    if (!name || !email || (!password && password.length >= 8) || !address) {
        res.status(400);
        throw new Error("Please enter all the fields");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists!");
    }

    //create an User object in User model
    const newUser = await User.create({
        name,
        email,
        password,
        address,
    })

    if (newUser) {
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            address: newUser.address,
            success: true

        })

    } else {
        res.status(400);
        throw new Error("User creation failed!");
    }
})
//function to login user
const loginUser = async_handler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            address: user.address,
            token: generateToken(user._id),
            success: true
        })
    } else {
        res.status(400);
        throw new Error("Invalid email or password")
    }
})
//function to view logged in user's details
const getUser = async_handler(async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        res.status(401);
        throw new Error("Can't view user details");
    }
})
//function to edit logged in user's details
const updateUser = async_handler(async (req, res) => {
    try {
        const { name, email, address } = req.body;

        const userId = req.user.id;
        let user = await User.findById(userId).select("-password");

        let newUser = {};
        if (name) { newUser.name = name };
        if (email) { newUser.email = email };
        if (address) { newUser.address = address };

        if (!user) {
            return res.status(404).send({ error: "User not found!" })
        } else {


            const updatedUser = await User.findByIdAndUpdate(userId, { $set: newUser }, { new: true });
            res.status(201).send(updatedUser);
        }

    } catch (error) {
        res.status(401);
        throw new Error("Can't view user details");
    }
})
//function to change password || for logged in user
const changePassword = async_handler(async (req, res) => {
    try {
        const { password } = req.body;
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (user) {
            const salt = await bcrypt.genSalt(10);
            let newPassword = await bcrypt.hash(password, salt);
            let userPassword = await User.findByIdAndUpdate({ _id: userId }, { password: newPassword }, { new: true });
            if (userPassword) {
                res.status(201).send({ message: "Password changed successfully!" })
            }
        } else {
            res.status(401);
            throw new Error("Can't change password");
        }

    } catch (error) {
        res.status(401);
        throw new Error("Can't change password");
    }
})


// generate a short-lived reset token and send it via email
const requestPasswordReset = async_handler(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        res.status(400);
        throw new Error("Email is required");
    }
    const user = await User.findOne({ email });
    // Always return same response to prevent email enumeration
    if (!user) {
        return res.json({ success: true, message: "If this email exists, a reset link has been sent." });
    }
    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
    await sendPasswordResetEmail(user.email, resetToken);
    res.json({ success: true, message: "If this email exists, a reset link has been sent." });
})

// reset password using the token from requestPasswordReset
const forgotPassword = async_handler(async (req, res) => {
    const { resetToken, password } = req.body;
    if (!resetToken || !password) {
        res.status(400);
        throw new Error("Reset token and new password are required");
    }
    let decoded;
    try {
        decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    } catch (err) {
        res.status(401);
        throw new Error("Invalid or expired reset token");
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    await User.findByIdAndUpdate(decoded.userId, { password: hashed });
    res.status(200).json({ message: "Password changed successfully!" });
})

const verifyUserEmail = async_handler(async (req, res) => { //to verify user's email exists
    try {
        const { email } = req.body;
        const userExists = await User.findOne({ email: email });
        if (userExists) {
            res.json({ success: true });
        } else {
            throw new Error("An unknown error occurred!");
        }
    } catch (error) {
        res.status(401);
        throw new Error("Can't change password");
    }
})



module.exports = { registerUser, loginUser, getUser, updateUser, changePassword, forgotPassword, requestPasswordReset, verifyUserEmail };