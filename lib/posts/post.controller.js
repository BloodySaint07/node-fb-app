const express = require('express');
const router = express.Router();
const postService = require('./post.service');

function createNewPost(req, res, next) {
    postService.createNewPost(req.body)
        .then(res.status(200).json({ message: 'Post created successfully' }))
        .catch(err => next(err));
}

function findAllPosts(req, res, next) {
    postService.findAllPosts()
        .then(posts => res.json(posts))
        .catch(err => next(err));
}

function findPostById(req, res, next) {
    postService.findPostById(req.params.id)
        .then(post => post ? res.json(post) : res.sendStatus(404))
        .catch(err => next(err));
}

function findPostByUserId(req, res, next) {
    postService.findPostByUserId(req.body.id)
        .then(posts => posts ? res.json(posts) : res.sendStatus(404))
        .catch(err => next(err));
}

function updatePost(req, res, next) {
    postService.updatePost(req.params.id, req.body)
        .then(() => {
            res.json({});
        })
        .catch(err => next(err));
}

function updateManyPosts(req, res, next) {
    postService.updateManyPost(req.body.userId, req.body.photoId)
        .then(result => {
            res.json(result)
        })
        .catch(err => next(err));
}

function deletePost(req, res, next) {
    postService.deletePost(req.params.id)
        .then(() => {
            res.json({});
        })
        .catch(err => next(err));
}

// Posts routes
router.post('/createpost', createNewPost);
router.get('/', findAllPosts);
router.get('/:id', findPostById);
router.post('/findpostbyuserid', findPostByUserId);
router.put('/:id', updatePost);
router.post('/updatemanyposts', updateManyPosts);
router.delete('/:id', deletePost);

module.exports = router;
