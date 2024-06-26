import React, { useState, useEffect, useContext } from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";
import { AuthContext } from "../../context/token";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const { authorId } = useContext(AuthContext);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:3005/posts");
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

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`http://localhost:3005/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        console.log("Post eliminato con successo");
        fetchPosts();
      } else {
        console.log("Errore durante l'eliminazione del post");
      }
    } catch (error) {
      console.error("Errore durante l'eliminazione del post:", error);
    }
  };

  return (
    <Row>
      {posts.map((post, i) => (
        <Col
          key={`item-${i}`}
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem
            key={post._id}
            post={post}
            onDelete={handleDelete}
            userId={authorId}
          />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;
