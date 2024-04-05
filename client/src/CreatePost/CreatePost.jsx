import React, { useState } from 'react';
import './CreatePost.css';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormData from 'form-data';
import { Link } from "react-router-dom";


// const useStyles = makeStyles((theme) => ({
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     maxWidth: '400px',
//     margin: '0 auto',
//     padding: theme.spacing(2),
//     backgroundColor: '#f0f0f0',
//     borderRadius: '10px',
//     boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//   },
//   textField: {
//     margin: theme.spacing(1),
//     width: '100%',
//   },
//   button: {
//     marginTop: theme.spacing(2),
//     width: '100%',
//   },
// }));

const AddPostForm = () => {
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState('');


  const handleFileChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!photo) {
      console.error('No photo selected');
      return;
    }

    const formData = new FormData();
    formData.append('photoUrl', photo);
    formData.append('description', description);
    formData.append('like', 0);
    formData.append('comment', '');

    try {
      const response = await axios.post('http://localhost:3001/api/posts',formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
        },
      });
      setPhoto(null);
      setDescription('');
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit} className={'postWrapper'}>
      <span className='spanText'>Please Select File</span>
      <input type="file" accept="image/*" onChange={handleFileChange} className='inputFileBox'/>
      <TextField
        label="Add caption"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        required
        multiline
        sx={{
          width: 970,
          height: 100,
        }}
      />
    <Button type="submit" variant="contained" color="primary" sx={{}}>
        Add Post
      </Button>
    </form>
    </>
  );
};

export default AddPostForm;
