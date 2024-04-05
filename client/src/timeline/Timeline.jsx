import React, { useEffect, useState } from "react";
import io from 'socket.io-client';
import "./Timeline.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Avatar, Button, CardActionArea, CardActions } from "@mui/material";
import axios from "axios";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { v4 as uuidv4 } from 'uuid';

const socket = io('http://localhost:3001');
function Timeline() {
  const [allPost, setAllPosts] = useState(null);
  const [postId, setPostId] = useState(null);
  const [open, setOpen] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [counter, setNewCounter] = useState(0);

  

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentOpen = (id) => {
    setCommentId(id);
    setOpen(!open);
  };

  useEffect(() => {
    const getData = async () => {
      const getAllPost = await axios.get("http://localhost:3001/api/posts");
      console.log(getAllPost);
      setAllPosts(getAllPost.data);
    };
    getData();

    socket.on('likeUpdated', ({ postId, likes }) => {
      setAllPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId ? { ...post, like: likes } : post
        )
      );
    });

    socket.on('commentAdded', ({ postId, comment }) => {
      setAllPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId ? { ...post, comments: [...post.comments, comment] } : post
        )
      );
    });

    return () => {
      // Clean up socket event listeners
      socket.off('likeUpdated');
      socket.off('commentAdded');
    };
  }, []);

      const handleLikeUpdate = async (id) => {
        const response = await axios.post(
          "http://localhost:3001/api/posts/update_like",
          { postId: id },
          {
            header: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        socket.emit('addLike', id);
      };
 


  const handleAddComment = async (id) => {
    const response = await axios.post(
      "http://localhost:3001/api/posts/add_comment",
      { postId: commentId, comment: newComment },
      {
        header: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    socket.emit('addComment', commentId, newComment);
    setNewComment("");
  };

   

  return (
    <>
      {allPost?.map((post) => {
        return (
          <Card
            key={post._id}
            sx={{
              maxWidth: 400,
             
              backgroundColor: "black",
              color: "white",
              border: "1px solid white",
              mt: 2,
            }}
          >
            <CardActionArea sx={{
            }}>
              <CardMedia
                component="img"
                height="350"
                image={require(`../uploads/${post.photoUrl}`)}
                alt="green iguana"
              />
              <CardContent>
                <Typography variant="body2">{post.description}</Typography>
              </CardContent>
            </CardActionArea>
            <CardActions sx={{
              display: 'flex',
              flexDirection:'column'
            }}>
              <div className="btn-wrapper">
              <Button
                variant="outlined"
                onClick={() => {
                  handleLikeUpdate(post._id);
                }}
                sx={{
                  width: 100,
                  height: 40,
                  mb: 0.5,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 14,
                  fontWeight: 600,
                  marginRight:'20px'
                }}
              >
                Like {post.like}
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleCommentOpen(post._id)}
                sx={{
                  width: 100,
                  height: 40,
                  mb: 0.5,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Comment
              </Button>
              </div>
              {commentId===post._id ? (
                <List
                  sx={{
                    width: 400,
                    bgcolor: "background.paper",
                  }}
                >
                  {post.comments.map((comment) =>{
                    return <>
                    <ListItem alignItems="flex-start" key={uuidv4()}>
                    <ListItemAvatar>
                      <Avatar>
                      <AccountCircleIcon></AccountCircleIcon>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                           {comment}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  </>
                  })}
                   <Button
            style={{ position: 'absolute', top: 0, right: 0 , fontSize:12 ,marginBottom:10}}
            onClick={() => setCommentId(null)}
          >
            Close
          </Button>
          <TextField
            id="new-comment"
            label="Add a comment"
            variant="outlined"
            fullWidth
            value={newComment}
            onChange={handleCommentChange}
          />
          <Button variant="contained" onClick={handleAddComment}>
            Add
          </Button>
                </List>
              ) : (
                ""
                
              )}
            </CardActions>
          </Card>
        );
      })}
    </>
  );
}

export default Timeline;
