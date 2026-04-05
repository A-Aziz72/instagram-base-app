import React from "react";
import { Link } from "react-router";
import "./styles.css";

function NewsFeed({ posts }) {
  return (
    <div className="feed-container">
      <h2 className="feed-title">News Feed</h2>

      {posts.map((post) => (
        <div key={post.id} className="feed-card">
          <h3 className="feed-username">@{post.username}</h3>

          <img src={post.image} alt={post.caption} className="feed-image" />

          <p className="feed-caption">{post.caption}</p>

          <Link to={`/posts/${post.id}`} className="feed-link">
            View Full Post
          </Link>
        </div>
      ))}
    </div>
  );
}

export default NewsFeed;
