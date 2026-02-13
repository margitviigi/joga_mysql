const bcrypt = require('bcrypt')
const UserModel = require('../models/user')

class UserController {
    async register(req, res) {
        try {
            if (!req.body || !req.body.username || !req.body.email || !req.body.password) {
                return res.status(400).json({ error: 'Missing required fields: username, email, password' });
            }
            
            const cryptPassword = await bcrypt.hash(req.body.password, 10)
            const registeredId = await UserModel.create({
                username: req.body.username,
                email: req.body.email,
                password: cryptPassword
            })
            if (registeredId) {
                const userData = await UserModel.findById(registeredId)
                req.session.user = {
                    username: userData.username,
                    user_id: userData.id
                }
                res.json({ 
                    message: 'User registered successfully',
                    user_session: req.session.user 
                })
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}

module.exports = new UserController()