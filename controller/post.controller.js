const User = require("../model/user.model");
const Post = require("../model/post.model");
const { v4: uuidv4 } = require("uuid");


// Create a new post
const createPost = async (req, res) => {
  const { post, imgUrl } = req.body;
  try {
    // const getUser = await User.findOne({ email: email });
    // if (getUser) {
      const newPost = new Post({
        id: uuidv4(),
        post,
        userEmail: 'amir@mail.com',
        imgUrl,
      });
      await newPost.save();
      res.send({ status: 201, message: 'Post created succeffullly.', data: newPost });
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
      const allPost = await Post.find({});
      res.send({ status: 200, data: allPost });
    } catch (error) {
    res.status(500).send(error.message);
  }
};


// Update a post
const updatePost = async (req, res) => {
    const { post } = req.body;
    const params = req.params
  try {
      const check = await Post.find({ id: params });
      if (check.userEmail == email) {
          
        res.send({ status: 200, data: allPost });
      } 
    } catch (error) {
    res.status(500).send(error.message);
  }
};

// Update a post
const comment = async (req, res) => {
    const { comment } = req.body;
    const params = req.params
  try {
      const check = await Post.find({ id: params });
      
        res.send({ status: 200, data: allPost });
    } catch (error) {
    res.status(500).send(error.message);
  }
};

// Delete a post
const deletePost = async (req, res) => {
    const params = req.params
  try {
      const check = await Post.find({ id: params });
      if (check.userEmail == email) {
          
        res.send({ status: 200, data: allPost });
      } 
    } catch (error) {
    res.status(500).send(error.message);
  }
};


module.exports = { createPost };
