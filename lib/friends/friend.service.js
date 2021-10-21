const db = require('../shared/dataSource');
const Friend = db.Friend;

async function createNewRequest(payload) {
    const newRequest = new Friend(payload);
    await newRequest.save();
}

async function findAllFriends() {
    return await Friend.find();
}

async function findFriendById(id) {
    return await Friend.findById(id);
}

async function findFriendByUserId(userId) {
    return await Friend.find({ userId: userId });
}

async function findFriendByFriendId(friendId) {
    return await Friend.find({ friendId: friendId });
}

async function updateFriend(id, payload) {
    const friendRequest = await Friend.findById(id);
    Object.assign(friendRequest, payload);
    await friendRequest.save();
}

module.exports = {
    createNewRequest,
    findAllFriends,
    findFriendById,
    findFriendByUserId,
    findFriendByFriendId,
    updateFriend
};
