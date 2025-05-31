const router = require('express').Router();
const authController = require('../controllers/AuthController');

// Xử lý OTP
router.post("/send-otp", authController.sendOtp);
router.post("/verify-otp", authController.verifyOtp);

// Đăng ký người dùng
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Đăng ký người dùng mới
 *     description: Tạo tài khoản mới với thông tin người dùng cơ bản.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nguyen Van A"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "test@gmail.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "Abc@123456"
 *               phone:
 *                 type: string
 *                 example: "0987654321"
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Đăng ký thành công!
 *       400:
 *         description: Dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email không hợp lệ!
 *       500:
 *         description: Lỗi hệ thống
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Lỗi hệ thống!
 */
router.post("/register", authController.register);

// Đăng nhập
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Đăng nhập tài khoản
 *     description: Đăng nhập bằng email và mật khẩu.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "test@gmail.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "Abc@123456"
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Đăng nhập thành công!
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email hoặc mật khẩu không đúng!
 *       500:
 *         description: Lỗi hệ thống
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Lỗi hệ thống!
 */
router.post("/login", authController.login);

// Rest mật khẩu
router.post("/reset-password", authController.resetPassword);

// Refresh token
router.post("/refresh-token", authController.refreshToken);

// Đổi mật khâu
router.post("/change-password", authController.changePassword);

module.exports = router;