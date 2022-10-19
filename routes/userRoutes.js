const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');

router.post('/sign-up', user_controller.create_user);
router.post('/login', user_controller.log_in);

module.exports = router;