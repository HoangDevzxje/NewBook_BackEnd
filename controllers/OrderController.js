const Order = require('../models/Order');
const Book = require('../models/Book');
const Cart = require('../models/Cart');
const Discount = require('../models/Discount');

const createOrder = async (req, res) => {
    try {

        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart || cart.cartItems.length === 0) {
            return res.status(400).json({ message: 'Giỏ hàng không được để trống!' });
        }

        const items = [];

        const { shippingInfo, paymentMethod, discountUsed, pointUsed } = req.body;

        const discount = await Discount.findById(discountUsed);

        const userId = req.user.id; // Lấy user từ token

        // Tính tổng giá trị đơn hàng
        let totalAmount = 0;
        for (const item of cart.cartItems) {
            const book = await Book.findById(item.book);
            if (!book) {
                return res.status(404).json({ message: `Sách ID ${item.book} không tồn tại!` });
            }
            if (book.stock < item.quantity) {
                return res.status(400).json({ message: `Sách "${book.title}" không đủ hàng!` });
            }
            totalAmount += book.price * item.quantity;

            items.push({
                book: book._id,
                quantity: item.quantity,
                price: book.price
            });
            // Cập nhập kho hàng
            book.stock -= item.quantity;
            await book.save();
        }
        // Áp dụng giảm giá
        if (discount) {
            if (discount.type === 'fixed') {
                totalAmount -= discount.value;
            }
            else if (discount.type === 'percentage')
                totalAmount -= (totalAmount * discount.value) / 100;
        }

        totalAmount -= pointUsed;

        if (paymentMethod === 'COD' && totalAmount > 500000) {
            return res.status(400).json({ message: 'Đơn vượt quá giá trị cho phép' });
        }

        const newOrder = new Order({
            user: userId,
            items,
            shippingInfo,
            paymentMethod,
            discountUsed,
            pointUsed,
            paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Completed',
            orderStatus: 'Pending',
        });

        const savedOrder = await newOrder.save();
        await Cart.findOneAndUpdate(
            { user: userId },
            { $set: { cartItems: [] } }, // Xóa toàn bộ cartItems nhưng giữ cart
            { new: true }
        );
        if (savedOrder) {
            if (paymentMethod === 'COD') {
                if (discount) {
                    discount.usedCount = discount.usedCount + 1;
                    await discount.save();
                }
            }
        }
        res.status(201).json({ data: savedOrder, totalAmount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateBoxInfo = async (req, res) => {
    try {
        const { boxInfo } = req.body;
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
        }
        order.boxInfo = boxInfo;
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getOrderDetails = async (req, res) => {
    const orderId = req.params.id;
    const user = req.user;
    try {
        const order = await Order.findById(orderId).populate('items.book', 'title').populate("discountUsed");
        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
        }

        if (order.user.toString() !== user._id.toString() && user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createOrder,
    updateBoxInfo,
    getMyOrders,
    getOrderDetails
}