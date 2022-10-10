const express = require('express');

const comment_controller = require('../controllers/commentController');

const router = express.Router();

router.post('/', comment_controller.create_comment);

module.exports = router;
