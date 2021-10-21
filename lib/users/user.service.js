const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const log = require('log4js').getLogger('application');
const db = require('../shared/dataSource');
const User = db.User;

async function authenticate({ email, password }) {
    const user = await User.findOne({ email });

    if (user && user.isActive === false) {
        let message = "You account has been blocked.";
        return { message: message };
    }

    const secret = config.get('authenticationSecret');
    const tokenTimeout = config.get('tokenExpireInTime');
    if (user && bcrypt.compareSync(password, user.password)) {
        const { password, ...userWithoutPassword } = user.toObject();
        const token = jwt.sign({ sub: user.id }, secret, { expiresIn: tokenTimeout });
        return {
            ...userWithoutPassword,
            token
        };
    }
}

async function findAllUsers() {
    return await User.find().select('-password');
}

async function findUserById(id) {
    return await User.findById(id).select('-password');
}

async function findUserByEmail(email) {
    return await User.find({ email: email });
}

async function findUserByResetToken(resetToken) {
    return await User.findOne({ resetToken: resetToken })
}

async function createUser(userParams) {
    if (await User.findOne({ email: userParams.email })) {
        throw 'Email "' + userParams.email + '" is already taken';
    }

    const user = new User(userParams);

    // hash password
    if (userParams.password) {
        user.password = bcrypt.hashSync(userParams.password, 10);
    }

    // save user
    await user.save();
}

async function updateUser(id, userParams) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.email !== userParams.email && await User.findOne({ email: userParams.email })) {
        log.warn('Email "' + userParams.email + '" is already taken')
        throw 'Email "' + userParams.email + '" is already taken';
    }

    // hash password if it was entered
    if (userParams.password) {
        userParams.password = bcrypt.hashSync(userParams.password, 10);
    }

    Object.assign(user, userParams);
    await user.save();
}

async function updateUserPhoto(id, photoId) {
    const user = await User.findById(id);
    user.photoId = photoId
    await user.save();
}

async function deleteUser(id) {
    await User.findByIdAndRemove(id);
}

module.exports = {
    authenticate,
    findAllUsers,
    findUserById,
    findUserByEmail,
    findUserByResetToken,
    createUser,
    updateUser,
    updateUserPhoto,
    deleteUser
};
