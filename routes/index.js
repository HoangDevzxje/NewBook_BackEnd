const authRoutes = require('./authRoute')
const feedbackRoutes = require('./feedbackRoute')
const adminRoutes = require('./adminRoute')





const routes = (app) => {
    app.use('/auth', authRoutes)
    app.use('/feedback', feedbackRoutes)
    app.use('/admin', adminRoutes)
}

module.exports = routes