import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import CommentSection from "../../components/blog/comment-section/CommentSection";
import "./styles.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Blog = () => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const { id } = params;

    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:3005/posts/${id}`);
        if (response.ok) {
          const blogData = await response.json();
          setBlog(blogData);
          setLoading(false);
        } else {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        setLoading(false);
        navigate("/404");
      }
    };

    fetchBlog();
  }, [params, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="blog-details-root">
        <Container>
          <Image className="blog-details-cover" src={blog.cover} fluid />
          <h1 className="blog-details-title">{blog.title}</h1>
          <div className="blog-details-container">
            <div className="blog-details-author">
              <BlogAuthor {...blog.author} />
            </div>
            <div className="blog-details-info">
              <div>{blog.createdAt}</div>
              <div>{`Lettura in ${blog.readTime.value} ${blog.readTime.unit}`}</div>
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          ></div>
          <CommentSection postId={blog._id} />{" "}
          <Button variant="outline-primary" className="mt-2" as={Link} to="/">
            Torna alla Home
          </Button>
        </Container>
      </div>
    );
  }
};

export default Blog;
