const router = require('express').Router();
const authController = require('../controllers/AuthController');

// Xử lý OTP
router.post("/send-otp", authController.sendOtp);
router.post("/verify-otp", authController.verifyOtp);

// Đăng ký người dùng
router.post("/register", authController.register);

// Đăng nhập
router.post("/login", authController.login);

// Rest mật khẩu
router.post("/reset-password", authController.resetPassword);

// Refresh token
router.post("/refresh-token", authController.refreshToken);

// Đổi mật khâu
router.post("/change-password", authController.changePassword);

module.exports = router;