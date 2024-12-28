import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const PostContainer = styled.div`
  border: 1px solid black;
  margin: 10px 0;
  padding: 10px;
`

const API_BASE_URL = "http://127.0.0.1:8000/api/board/posts/";

const Board = () => {
  const [posts, setPosts] = useState([]); // List of posts
  const [formData, setFormData] = useState({ title: '', content: '' }); // Writing new post
  const [editMode, setEditMode] = useState(null); // An ID of a post while editing
  const [editData, setEditData] = useState({ title: '', content: '' }); // Data for editing

  // API call: Read all posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      const data = response.data;
      setPosts(data.results);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // API call: Create new post
  const handleCreatePost = async () => {
    if (formData.title && formData.content) {
      try {
        const response = await axios.post(API_BASE_URL, formData);
        setPosts([...posts, response.data]);
        setFormData({ title: "", content: "" });
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }
  };

  // API call: Delete a post
  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}${id}/`);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // API call: Update a post
  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`${API_BASE_URL}${editMode}/`, editData);
      setPosts(
        posts.map((post) =>
          post.id === editMode ? { ...post, ...response.data } : post
        )
      );
      setEditMode(null);
      setEditData({ title: "", content: "" });
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  // Start edit mode
  const handleEditPost = (post) => {
    setEditMode(post.id);
    setEditData({ title: post.title, content: post.content });
  };

  // Get posts when mounting components
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>CRUD Board</h1>

      <div>
        <div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleInputChange} />
        </div>

        <div>
          <textarea
            name="content"
            placeholder="Content"
            value={formData.content}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <button onClick={handleCreatePost}>Add Post</button>
      </div>

      {/* Read & Update Section */}
      <div>
        <h2>Posts</h2>
        {posts.length > 0 ? (
          posts.map((post) =>
            editMode === post.id ? (
              // Edit Mode
              <PostContainer key={post.id}>
                <div>
                  <input
                    type="text"
                    name="title"
                    value={editData.title}
                    onChange={handleEditChange}
                  />
                </div>
                <div>
                  <textarea
                    name="content"
                    value={editData.content}
                    onChange={handleEditChange}
                  ></textarea>
                </div>
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={() => setEditMode(null)}>Cancel</button>
              </PostContainer>
            ) : (
              // Read Mode
              <PostContainer key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <button onClick={() => handleEditPost(post)}>Edit</button>
                <button onClick={() => handleDeletePost(post.id)}>Delete</button>
              </PostContainer>
            )
          )
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div >
  );
};

export default Board;
