import React, { useState } from 'react';
import styled from 'styled-components';

const PostContainer = styled.div`
  border: 1px solid black;
  margin: 10px 0;
  padding: 10px;
`

const Board = () => {
  const [posts, setPosts] = useState([]); // List of posts
  const [formData, setFormData] = useState({ title: '', content: '' }); // Writing new post
  const [editMode, setEditMode] = useState(null); // An ID of a post while editing
  const [editData, setEditData] = useState({ title: '', content: '' }); // Data for editing

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle create post
  const handleCreatePost = () => {
    if (formData.title && formData.content) {
      setPosts([...posts, { id: Date.now(), ...formData }]);
      setFormData({ title: '', content: '' });
    }
  };

  // Handle delete post
  const handleDeletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  // Start edit mode
  const handleEditPost = (post) => {
    setEditMode(post.id);
    setEditData({ title: post.title, content: post.content });
  };

  // Change edit data
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  // Save edit data
  const handleSaveEdit = () => {
    setPosts(posts.map((post) => (post.id === editMode ? { ...post, ...editData } : post)));
    setEditMode(null);
    setEditData({ title: '', content: '' });
  };

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
