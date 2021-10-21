const express = require('express');
const router = express.Router();
const friendService = require('./friend.service');

function createNewRequest(req, res, next) {
    friendService.createNewRequest(req.body)
        .then(res.status(200).json({ message: 'Friend added successfully' }))
        .catch(err => next(err));
}

function findAllFriends(req, res, next) {
    friendService.findAllFriends()
        .then(friends => res.json(friends))
        .catch(err => next(err));
}

function findFriendById(req, res, next) {
    friendService.findFriendById(req.params.id)
        .then(friend => friend ? res.json(friend) : res.sendStatus(404))
        .catch(err => next(err));
}

function findFriendByUserId(req, res, next) {
    friendService.findFriendByUserId(req.body.userId)
        .then(frineds => friends ? res.json(frineds) : res.sendStatus(404))
        .catch(err => next(err));
}

function findFriendByFriendId(req, res, next) {
    friendService.findFriendByFriendId(req.body.friendId)
        .then(frineds => friends ? res.json(frineds) : res.sendStatus(404))
        .catch(err => next(err));
}

function updateFriend(req, res, next) {
    friendService.updateFriend(req.params.id, req.body)
        .then(() => {
            res.json({});
        })
        .catch(err => next(err));
}

// Friends routes
router.post('/createrequest', createNewRequest);
router.get('/', findAllFriends);
router.get('/:id', findFriendById);
router.post('/findfriendbyuserid', findFriendByUserId);
router.post('/findfriendbyfriendid', findFriendByFriendId);
router.put('/:id', updateFriend);

module.exports = router;
