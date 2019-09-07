import React, { useContext, useCallback, useState, useRef } from "react";
import { CommentsContext } from "../context/CommentsContext";
import { updateComment } from "../api/CommentApi";
import {
  ListGroup, Button, Form,
  ButtonToolbar, ButtonGroup
} from 'react-bootstrap';

const CommentItem = ({ comment }) => {
  const [comments, setComments] = useContext(CommentsContext);
  const [isEdit, setIsEdit] = useState(false);
  const inputComment = useRef();

  const remove = useCallback(() => {
    const new_comment = comments.filter((c) => c.id !== comment.id);
    setComments(new_comment);
  }, [comments, comment.id, setComments]);

  const save = useCallback( async() => {
    const val = inputComment.current.value;
    if (val === "") return;
    const res = await updateComment(comment.id, val);
    if (!res.error) {
      const new_comment = [];
      comments.forEach((c, i) => {
        if (c.id === comment.id) {
          c.body = val;
        }
        new_comment.push(c);
      });
      setComments(new_comment);
      inputComment.current.value = "";
      setIsEdit(false);
    }
  }, [comment.id, comments, setComments]);

  return (
    <ListGroup.Item key={comment.id}>
      <h5>{comment.name}, {comment.email}</h5>
      <br/>
      { isEdit ?
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows="3" ref={inputComment} defaultValue={comment.body}/>
            <Button
              variant="primary"
              size="sm"
              onClick={() => save()}
              style={{ marginTop: "10px", float: "right" }}>
              Save
            </Button>
          </Form.Group>
          :
          comment.body
      }

      <ButtonToolbar style={{ justifyContent: "flex-end", display: isEdit ? "none" : "flex" }}>
        <ButtonGroup className="mr-2">
          <Button variant="primary" size="sm" onClick={() => setIsEdit(!isEdit)}>Edit</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="secondary" size="sm" onClick={() => remove()}>Delete</Button>
        </ButtonGroup>
      </ButtonToolbar>
    </ListGroup.Item>
  );
}

export default CommentItem;
