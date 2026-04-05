import React from "react";
import { useParams, Link } from "react-router";
import "./styles.css";

function PostPage({ posts }) {
  const { postId } = useParams();

  const post = posts.find((item) => item.id === Number(postId));

  if (!post) {
    return (
      <div className="postpage-container">
        <h2>Post not found</h2>
        <Link to="/" className="postpage-link">
          Back to News Feed
        </Link>
      </div>
    );
  }

  return (
    <div className="postpage-container">
      <div className="postpage-card">
        <h2 className="postpage-username">@{post.username}</h2>

        <img src={post.image} alt={post.caption} className="postpage-image" />

        <p className="postpage-caption">{post.caption}</p>

        <Link to="/" className="postpage-link">
          Back to News Feed
        </Link>
      </div>
    </div>
  );
}

export default PostPage;
