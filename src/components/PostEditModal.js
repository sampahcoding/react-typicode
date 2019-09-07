import React, { useState, useRef, useEffect, useCallback, useContext } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import { PostsContext } from "../context/PostsContext";
import { addPost, updatePost } from "../api/PostApi";

const PostEditModal = ({ isShown, post }) => {
  const [show, setShow] = useState(false);
  const title = useRef();
  const body = useRef();
  const skipInitialRender = useRef(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [posts, setPosts] = useContext(PostsContext);

  useEffect(() => {
    if (skipInitialRender.current) {
      skipInitialRender.current = false;
    } else {
      handleShow();
    }
  }, [isShown]);

  const add = useCallback( async() => {
    const inputTitle = title.current.value;
    const inputBody = body.current.value;
    if (inputTitle === "" || inputBody === "") return;
    const res = post.id ?
      await updatePost(post.id, inputTitle, inputBody)
      :
      await addPost(1, inputTitle, inputBody);
    if (!res.error) {
      var new_posts = [];
      if (!post.id) {
        posts.unshift(res.data)
        new_posts = posts.filter((c) => c.id !== -1);
      } else {
        posts.forEach((p, i) => {
          if (p.id === post.id) {
            p.body = inputBody;
            p.title = inputTitle;
          }
          new_posts.push(p);
        });
      }
      setPosts(new_posts);
      handleClose();
    }
  }, [posts, post.id, setPosts]);

  return(
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{post.id ? "Edit Post" : "Add Post"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Title</Form.Label>
            <Form.Control as="textarea" rows="3" ref={title} defaultValue={post.title || ""}/>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Body</Form.Label>
            <Form.Control as="textarea" rows="3" ref={body} defaultValue={post.body || ""}/>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => add()}>
            {post.id ? "Save Changes" : "Add Post"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PostEditModal;
