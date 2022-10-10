const express = require('express');
const router = express.Router();

const post_controller = require('../controllers/postController');

router.get('/', post_controller.posts_list);
router.get('/:id', post_controller.get_post);
router.get('/comments', post_controller.comments_list);

router.post('/', post_controller.create_post);
router.post('/comment', post_controller.create_comment);

router.delete('/:id', post_controller.delete_post);

module.exports = router;