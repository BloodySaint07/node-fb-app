const fs = require('fs');
const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const fileService = require('../file-upload/file.service');

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function registerUser(req, res, next) {
    const defaultPhoto = fs.createReadStream(__dirname + '/user-male.png');
    fileService.uploadNewPhoto(defaultPhoto).then(uploadResult => {
        req.body.photoId = uploadResult.uploadId;
        userService.createUser(req.body)
            .then(res.status(200).json({ message: 'User registered successfully' }))
            .catch(err => next(err));
    }).catch(err => next(err));
}

function create(req, res, next) {
    console.log("Data Received ---", req.body);
    res.status(200).json({ message: 'User registered successfully' });
}

function findAllUsers(req, res, next) {
    userService.findAllUsers()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function findCurrentUser(req, res, next) {
    userService.findUserById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function finduserById(req, res, next) {
    userService.findUserById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function findUserByEmail(req, res, next) {
    userService.findUserByEmail(req.body.email)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function updateUser(req, res, next) {
    userService.updateUser(req.params.id, req.body)
        .then(() => {
            res.json({});
        })
        .catch(err => next(err));
}

function updateUserPhoto(req, res, next) {
    userService.updateUserPhoto(req.body.id, req.body.photoId)
        .then(() => {
            res.json({});
        })
        .catch(err => next(err));
}

function deleteUser(req, res, next) {
    userService.deleteUser(req.params.id)
        .then(() => {
            res.json({});
        })
        .catch(err => next(err));
}

// Users routes
router.post('/authenticate', authenticate);
router.post('/register', registerUser);
router.get('/', findAllUsers);
router.get('/current', findCurrentUser);
router.get('/:id', finduserById);
router.post('/finduserbyemail', findUserByEmail);
router.post('/updateuserphotoId', updateUserPhoto);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/create', create);

module.exports = router;
