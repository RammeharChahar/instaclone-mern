const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors'); 
const postsRouter = require('./routes/posts');
const Post = require('./models/Post')

const app = express();
const server = http.createServer(app);
const io = new Server(server,{cors: {
  origin: "*"
}});

const PORT = process.env.PORT || 3001;

// MongoDB Connection
mongoose.connect('mongodb+srv://rammeharchahar123:FrgE5TTXWvI1ug7V@instagramcluster.x8sz1gz.mongodb.net/?retryWrites=true&w=majority&appName=InstagramCluster', {
  useNewUrlParser: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('https://instaclone-mern-api.vercel.app/api/posts', postsRouter);

// Socket.io
io.on('connection', (socket) => {
  console.log('A user connected');
 
  socket.on('addLike', async (postId) => {
    try {
      const post = await Post.findById(postId);
      if (post) {
       // post.like++; // Increment likes count
        // Emit event to notify clients about like update
        io.emit('likeUpdated', { postId, likes: post.like });
      } else {
        console.log('Post not found');
      }
    } catch (error) {
      console.error('Error adding like:', error);
    }
  });

  socket.on('addComment', async (postId, comment) => {
    try {
      const post = await Post.findById(postId);
      if (post) {
       // post.comments.push(comment); // Add comment to the post
        // Emit event to notify clients about new comment
        io.emit('commentAdded', { postId, comment });
      } else {
        console.log('Post not found');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  });


socket.on('disconnect', () => {
    console.log('Client disconnected');
});
});


server.listen(PORT, () => {
  console.log(`Server is running cloud MongoDb`);
});
