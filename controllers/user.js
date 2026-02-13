const bcrypt = require('bcrypt')
const UserModel = require('../models/user')

class UserController {
    constructor() {
        this.changeRole = this.changeRole.bind(this);
    }

    async register(req, res) {
        try {
            if (!req.body || !req.body.username || !req.body.email || !req.body.password) {
                return res.status(400).render('error', { error: 'Missing required fields: username, email, password' });
            }
            
            const { username, email, password } = req.body;
            
            if (password.length < 8) {
                return res.status(400).render('error', { error: 'Password must be at least 8 characters long' });
            }
            if (!/[A-Z]/.test(password)) {
                return res.status(400).render('error', { error: 'Password must contain at least one capital letter' });
            }
            if (!/[0-9]/.test(password)) {
                return res.status(400).render('error', { error: 'Password must contain at least one number' });
            }
            
            const existingUser = await UserModel.findByUsername(username);
            if (existingUser) {
                return res.status(400).render('error', { error: 'Username already exists' });
            }
            
            const cryptPassword = await bcrypt.hash(password, 10)
            const registeredId = await UserModel.create({
                username: username,
                email: email,
                password: cryptPassword,
                role: 'user'
            })
            if (registeredId) {
                const userData = await UserModel.findById(registeredId)
                req.session.user = {
                    username: userData.username,
                    user_id: userData.id,
                    role: userData.role
                }
                res.redirect('/')
            }
        } catch (error) {
            res.status(500).render('error', { error: error.message })
        }
    }

    async login(req, res) {
        try {
            if (!req.body || !req.body.username || !req.body.password) {
                return res.status(400).render('error', { error: 'Missing required fields: username, password' });
            }

            const { username, password } = req.body;

            const user = await UserModel.findByUsername(username);
            if (!user) {
                return res.status(401).render('error', { error: 'User not found' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).render('error', { error: 'Invalid password' });
            }

            req.session.user = {
                username: user.username,
                user_id: user.id,
                role: user.role
            };

            res.redirect('/');
        } catch (error) {
            res.status(500).render('error', { error: error.message })
        }
    }

    async changeRole(req, res) {
        try {
            if (!req.body || !req.body.user_id || !req.body.role) {
                return res.status(400).json({ error: 'Missing required fields: user_id, role' });
            }

            const allowedRoles = ['user', 'admin'];
            if (!allowedRoles.includes(req.body.role)) {
                return res.status(400).json({ error: 'Invalid role. Allowed roles: user, admin' });
            }

            const user = await UserModel.findById(req.body.user_id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Update user role (this will require a new update method or use direct SQL)
            const updated = await UserModel.updateRole(req.body.user_id, req.body.role);
            
            if (updated) {
                res.json({
                    message: `User role changed to ${req.body.role} successfully`,
                    user_id: req.body.user_id,
                    new_role: req.body.role
                });
            } else {
                res.status(500).json({ error: 'Failed to update user role' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}

module.exports = new UserController();