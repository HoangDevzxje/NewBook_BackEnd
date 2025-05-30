const router = require("express").Router();
const feedbackController = require("../controllers/FeedbackController");
const { checkAuthorize } = require("../middleware/authMiddleware");

// Tạo một đánh giá mới cho sách

// Lấy đánh giá của người dùng cho một cuốn sách
router.get("/user/:bookId", checkAuthorize(["user"]), feedbackController.getUserFeedback);

router.post("/:bookId", checkAuthorize(["user"]), feedbackController.createFeedback);

// Lấy tất cả đánh giá của một cuốn sách
router.get("/:bookId", feedbackController.getFeedbacksByBook);

// Cập nhật đánh giá của người dùng
router.put("/update/:feedbackId", checkAuthorize(["user"]), feedbackController.updateFeedback);

// Xóa đánh giá của người dùng
router.delete("/delete/:feedbackId", checkAuthorize(["user"]), feedbackController.deleteFeedback);



module.exports = router;
