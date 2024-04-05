// routes/posts.js
const express = require("express");
const router = express.Router();
const Post = require("../models/Post");


// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/update_like", async (req, res) => {
  const {postId} = req.body;
  try {
    const post = await Post.findById(postId);
    post.like = (post.like || 0) + 1;
    await post.save();
    res.json("like updated");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/add_comment", async (req, res) => {
  const {postId,comment} = req.body;
  try {
    const post = await Post.findById(postId);
    post.comments.push(comment);
    await post.save();
    res.json("comment added");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../src/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });
// Create a new post
router.post("/", upload.single("photoUrl"), async (req, res) => {
  const imageName = req.file.filename;
  const { description, like, comment } = req.body;
  try {
    const newPost = new Post({ photoUrl: imageName, description:description,like : like, comment:comment });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
