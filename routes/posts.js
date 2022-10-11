const express = require('express');
const router = express.Router();

const post_controller = require('../controllers/postController');

router.get('/', post_controller.posts_list);
router.get('/:postid', post_controller.get_post);
router.get('/:postid/comments', post_controller.comments_list);

router.post('/', post_controller.create_post);
router.post('/:postid/comments', post_controller.create_comment);

router.delete('/:postid', post_controller.delete_post);
router.delete('/:postid/comments/:commentid', post_controller.delete_comment);

module.exports = router;