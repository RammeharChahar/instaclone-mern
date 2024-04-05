// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  photoUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  comments: [{
    type: String,
  }],
  like: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},{
  collection : "AllPostsDetails"
}
);

const Post = mongoose.model('AllPostsDetails', postSchema);

module.exports = Post;
