import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";

const BlogItem = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3005/api/posts");
        if (response.ok) {
          const postsData = await response.json();
          setPosts(postsData);
        } else {
          console.log("Fetching posts failed.");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <Link to={`/blog/${post._id}`} className="blog-link" key={post._id}>
          <Card className="blog-card">
            <Card.Img variant="top" src={post.cover} className="blog-cover" />
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
            </Card.Body>
            <Card.Footer>
              <div>
                di <span>{post.author.name}</span>
              </div>
            </Card.Footer>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default BlogItem;
