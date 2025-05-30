const express = require("express");
const adminBookController = require("../controllers/AdminBookController")
const { checkAuthorize } = require("../middleware/authMiddleware");



const router = express.Router();

// ✅ Quản lý sách
router.post("/books", checkAuthorize(["admin"]), adminBookController.createBook);


// ✅ Quản lý danh mục sách
router.post("/categories", checkAuthorize(["admin"]), adminBookController.createCategory);


module.exports = router;