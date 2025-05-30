const Book = require("../models/Book");
const Category = require("../models/Category");

// Thêm một sách mới
exports.createBook = async (req, res) => {
    try {
        const { title, author, categories } = req.body;

        if (!title || !author) {
            return res.status(400).json({ message: "Vui lòng nhập đầy đủ tiêu đề và tác giả." });
        }
        if (!categories || !Array.isArray(categories) || categories.length === 0) {
            return res.status(400).json({ message: "Vui lòng chọn ít nhất một danh mục." });
        }

        const newBook = new Book(req.body);
        await newBook.save();
        res.status(201).json({ message: "Sách đã được tạo", newBook });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi tạo sách", error: error.message });
    }
};


exports.createCategory = async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).json({ message: "Tên danh mục là bắt buộc." });
        }

        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(201).json({ message: "Danh mục đã được tạo", newCategory });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi tạo danh mục", error: error.message });
    }
};