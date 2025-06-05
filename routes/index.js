const authRoutes = require('./authRoute')
const feedbackRoutes = require('./feedbackRoute')
const adminRoutes = require('./adminRoute')
const bookRoutes = require('./bookRoute')
const cartRoutes = require('./cartRoute')
const orderRoutes = require('./orderRoute')
const userRoutes = require('./userRoute')





const routes = (app) => {
    app.use('/auth', authRoutes)
    app.use('/feedback', feedbackRoutes)
    app.use('/admin', adminRoutes)
    app.use('/book', bookRoutes)
    app.use('/cart', cartRoutes)
    app.use('/order', orderRoutes)
    app.use('/user', userRoutes)
}

module.exports = routes