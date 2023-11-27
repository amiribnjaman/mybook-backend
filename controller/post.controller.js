const User = require("../model/user.model");
const Post = require("../model/post.model");
const { v4: uuidv4 } = require("uuid");

// Create a new post
const createPost = async (req, res) => {
  const { post, imgUrl, userId } = req.body;
  try {
    const getUser = await User.findOne({ id: userId });
    console.log(getUser, req.body)
    // if (getUser) {
    const newPost = new Post({
      id: uuidv4(),
      post,
      userName: getUser.firstName + ' ' + getUser.surName,
      userId,
      imgUrl,
    });
    await newPost.save();
    res.send({
      status: 201,
      message: "Post created successfully.",
      data: newPost,
    });
    // }
    // else {
    //   res.send({ status: 400, message: "Something went wrong" });
    // }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Get all post
const getAllPost = async (req, res) => {
  try {
    const allPost = await Post.find({}).sort({ createOn: -1 });
    res.send({ status: 200, data: allPost });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Update a post
const updatePost = async (req, res) => {
  const { post } = req.body;
  const params = req.params;
  try {
    const check = await Post.find({ id: params });
    if (check.userEmail == email) {
      res.send({ status: 200, data: allPost });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Create a new comment 
const createComment = async (req, res) => {
  const { postId, comment, userId } = req.body;
  try {
    const post = await Post.find({ id: postId });
    const comments = await Post.updateOne(
      { id: postId },
      {
        $set: {
          comments: [
            ...post[0].comments,
            {
              id: uuidv4(),
              postId,
              userId,
              comment,
              replies: []
            },
          ],
        },
      }
    );
    res.send({ status: 200, data: comments });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Delete a post
const deletePost = async (req, res) => {
  const { postId, userId } = req.params;
  try {
    const post = await Post.findOne({ id: postId });
    if (post.userId == userId) {
      await Post.deleteOne({id: postId})
      res.send({ status: 201, message: 'Post deleted' });
    } else {
      res.send({ status: 401, message: "Unathorised access." });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { createPost, getAllPost, createComment, deletePost };
