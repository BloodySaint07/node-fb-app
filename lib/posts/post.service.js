const db = require('../shared/dataSource');
const Post = db.Post;

async function findAllPosts() {
    return await Post.find();
}

async function findPostById(id) {
    return await Post.findById(id);
}

async function findPostByUserId(userId) {
    return await Post.find({ userId: userId });
}

async function createNewPost(postPayload) {
    const newPost = new Post(postPayload);
    await newPost.save();
}

async function updatePost(id, postPayload) {
    const post = await Post.findById(id);
    Object.assign(post, postPayload);
    await post.save();
}

async function updateManyPost(userId, photoId) {
    const result = await Post.updateMany({ userId: userId }, { "$set": { userPhotoId: photoId } });
    return result;
}

async function deletePost(id) {
    await Post.findByIdAndRemove(id);
}

module.exports = {
    findAllPosts,
    findPostById,
    findPostByUserId,
    createNewPost,
    updatePost,
    updateManyPost,
    deletePost
};
