const express = require("express");
const { registerUser, loginUser, getUser, updateUser, changePassword, forgotPassword, requestPasswordReset, verifyUserEmail } = require("../controllers/auth");
const fetchUser= require("../middlewares/fetchUser");
const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/", fetchUser, getUser);
router.put("/edit_details", fetchUser, updateUser);
router.put("/change_password", fetchUser, changePassword);
router.post("/verify_email", verifyUserEmail);
router.post("/request_password_reset", requestPasswordReset);
router.put("/forgot_password", forgotPassword);


module.exports = router;