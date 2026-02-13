const bcrypt = require('bcrypt')
const UserModel = require('../models/user')

class UserController {
    async register(req, res) {
        try {
            if (!req.body || !req.body.username || !req.body.email || !req.body.password) {
                return res.status(400).json({ error: 'Missing required fields: username, email, password' });
            }
            
            const { username, email, password } = req.body;
            
            if (password.length < 8) {
                return res.status(400).json({ error: 'Password must be at least 8 characters long' });
            }
            if (!/[A-Z]/.test(password)) {
                return res.status(400).json({ error: 'Password must contain at least one capital letter' });
            }
            if (!/[0-9]/.test(password)) {
                return res.status(400).json({ error: 'Password must contain at least one number' });
            }
            
            const existingUser = await UserModel.findByUsername(username);
            if (existingUser) {
                return res.status(400).json({ error: 'Username already exists' });
            }
            
            const cryptPassword = await bcrypt.hash(password, 10)
            const registeredId = await UserModel.create({
                username: username,
                email: email,
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

    async login(req, res) {
        try {
            if (!req.body || !req.body.username || !req.body.password) {
                return res.status(400).json({ error: 'Missing required fields: username, password' });
            }

            const { username, password } = req.body;

            const user = await UserModel.findByUsername(username);
            if (!user) {
                return res.status(401).json({ error: 'User not found' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid password' });
            }

            req.session.user = {
                username: user.username,
                user_id: user.id
            };

            res.json({
                message: 'User logged in successfully',
                user_session: req.session.user
            });
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}

module.exports = new UserController();