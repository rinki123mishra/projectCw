
import './App.css'
 import React, { useState } from 'react';

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  const addPost = () => {
    if (newPost.trim()) {
      setPosts([
        ...posts,
        { id: Date.now(), content: newPost, likes: 0, unlikes:0, comments: [] },
      ]);
      setNewPost("");
    }
  };

  const likePost = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };


  const unlikePost = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, unlikes: post.unlikes + 1 } : post
      )
    );
  };

  const addComment = (id, comment) => {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? { ...post, comments: [...post.comments, comment] }
          : post
      )
    );
  };

  return (
    <div className="App" style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Create a Thread</h1>
      <textarea
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        placeholder="Write your thread here..."
        style={{ width: "100%", height: "100px", marginBottom: "10px" }}
      ></textarea>
      <button onClick={addPost} style={{ marginBottom: "20px" }}>Post</button>

      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "10px",
            marginBottom: "20px",
          }}
        >
          <p>{post.content}</p>
          <button onClick={() => likePost(post.id)}>Like ({post.likes})</button>
          <button onClick={() => unlikePost(post.id)}>Unlike ({post.unlikes})</button>
          <div style={{ marginTop: "10px" }}>
            <h4>Comments</h4>
            {post.comments.map((comment, index) => (
              <p key={index} style={{ margin: "5px 0" }}>- {comment}</p>
            ))}
            <CommentInput postId={post.id} addComment={addComment} />
          </div>
        </div>
      ))}
    </div>
  );
}

function CommentInput({ postId, addComment }) {
  const [comment, setComment] = useState("");

  const submitComment = () => {
    if (comment.trim()) {
      addComment(postId, comment);
      setComment("");
    }
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        style={{ width: "calc(100% - 60px)", marginRight: "10px" }}
      />
      <button onClick={submitComment}>Comment</button>
    </div>
  );
}

export default App;

//export default App
