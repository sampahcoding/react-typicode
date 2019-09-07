import React, { useContext, useRef, useCallback } from "react";
import { CommentsContext } from "../context/CommentsContext";
import { addComment } from "../api/CommentApi";
import {
  Button, Form,
} from 'react-bootstrap';

const CommentUpdate = ({ id }) => {
  const [comments, setComments] = useContext(CommentsContext);
  const inputComment = useRef();

  const add = useCallback( async() => {
    const val = inputComment.current.value;
    if (val === "") return;
    const res = await addComment(id, "anonymous", "anonymous@example.com", val);
    if (!res.error) {
      comments.unshift(res.data)
      const new_comment = comments.filter((c) => c.id !== -1); // bug
      setComments(new_comment);
      inputComment.current.value = "";
    }
  }, [comments, id, setComments]);

  return (
    <Form.Group controlId="exampleForm.ControlTextarea1">
      <Form.Control as="textarea" rows="3" ref={inputComment}/>
      <Button
        variant="primary"
        size="sm"
        onClick={() => add()}
        style={{ marginTop: "10px", float: "right" }}>
        Post
      </Button>
    </Form.Group>
  );
}

export default CommentUpdate;
