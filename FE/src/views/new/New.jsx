import React, { useCallback, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";

const NewBlogPost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Viaggi");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleChange = useCallback((value) => {
    setEditorState(value);
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    const data = {
      title: title,
      category: category,
      content: content,
      readTime: {
        value: 5,
        unit: "min",
      },
      author: {
        name: "Giulia Ros",
        avatar: "https://www.example.com/avatars/giulia-rossi.jpg",
      },
      cover:
        "https://res.cloudinary.com/ddsgne1cx/image/upload/v1713985263/avatar/gkcpo9wwdigvy0ryjijm.jpg",
      comments: [],
    };

    try {
      const response = await fetch("http://localhost:3005/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Post inviato con successo!");
        // Pulisci il form
        setTitle("");
        setCategory("Viaggi");
        setEditorState(() => EditorState.createEmpty());
      } else {
        console.log("Errore nell'invio del post");
      }
    } catch (error) {
      console.error("Errore nell'invio del post:", error);
    }
  };

  return (
    <Container className="new-blog-container">
      <Form className="mt-5" onSubmit={handleSubmit}>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Titolo</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Control
            size="lg"
            as="select"
            value={category}
            onChange={handleCategoryChange}
          >
            <option>Viaggi</option>
            <option>Tecnologia</option>
            <option>Cucina</option>
            <option>Salute</option>
            <option>Altro</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Contenuto Blog</Form.Label>
          <Editor
            editorState={editorState}
            wrapperClassName="new-blog-content"
            editorClassName="editor-content"
            onEditorStateChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            Invia
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
