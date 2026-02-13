const express = require('express')
const router = express.Router()
const userController = require('../controllers/user');
const { isAdmin } = require('../utils/auth');

router.post('/users/register', (req, res) => userController.register(req, res))
router.post('/users/login', (req, res) => userController.login(req, res))
router.post('/users/change-role', isAdmin, (req, res) => userController.changeRole(req, res))

module.exports = router