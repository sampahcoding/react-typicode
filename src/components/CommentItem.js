import React, {
  useContext, useCallback, useState, useRef,
} from 'react';
import {
  ListGroup, Button, Form,
  ButtonToolbar, ButtonGroup,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { CommentsContext } from '../context/CommentsContext';
import { updateComment } from '../api/CommentApi';

const CommentItem = ({ comment }) => {
  const [comments, setComments] = useContext(CommentsContext);
  const [isEdit, setIsEdit] = useState(false);
  const inputComment = useRef();
  const handleClose = () => setIsEdit(false);

  const remove = useCallback(() => {
    const newComment = comments.filter((c) => c.id !== comment.id);
    setComments(newComment);
  }, [comments, comment, setComments]);

  const save = useCallback(async () => {
    const val = inputComment.current.value;
    if (val === '') return;
    const res = await updateComment(comment.id, val);
    if (!res.error) {
      const newComment = [];
      comments.forEach((c) => {
        if (c.id === comment.id) {
          const newC = { ...c, body: val };
          newComment.push(newC);
        } else {
          newComment.push(c);
        }
      });
      setComments(newComment);
      inputComment.current.value = '';
      setIsEdit(false);
    }
  }, [comment, comments, setComments]);

  return (
    <ListGroup.Item key={comment.id}>
      <h5>{`${comment.name}, ${comment.email}`}</h5>
      <br />
      { isEdit ? (
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control as="textarea" rows="3" ref={inputComment} defaultValue={comment.body} />
          <Button
            variant="primary"
            size="sm"
            onClick={() => save()}
            style={{ marginTop: '10px', float: 'right' }}
          >
            Save
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleClose}
            style={{ marginRight: '10px', marginTop: '10px', float: 'right' }}
          >
            Cancel
          </Button>
        </Form.Group>
      )
        : comment.body}
      <ButtonToolbar style={{ justifyContent: 'flex-end', display: isEdit ? 'none' : 'flex' }}>
        <ButtonGroup className="mr-2">
          <Button variant="primary" size="sm" onClick={() => setIsEdit(!isEdit)}>Edit</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="secondary" size="sm" onClick={() => remove()}>Delete</Button>
        </ButtonGroup>
      </ButtonToolbar>
    </ListGroup.Item>
  );
};

export default CommentItem;

CommentItem.propTypes = {
  comment: PropTypes.instanceOf(Object).isRequired,
};
