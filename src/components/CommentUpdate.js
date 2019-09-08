import React, { useContext, useRef, useCallback } from 'react';
import {
  Button, Form,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { CommentsContext } from '../context/CommentsContext';
import { addComment } from '../api/CommentApi';

const CommentUpdate = ({ id }) => {
  const [comments, setComments] = useContext(CommentsContext);
  const inputComment = useRef();

  const add = useCallback(async () => {
    const val = inputComment.current.value;
    if (val === '') return;
    const res = await addComment(id, 'anonymous', 'anonymous@example.com', val);
    if (!res.error) {
      comments.unshift(res.data);
      const newComment = comments.filter((c) => c.id !== -1);
      setComments(newComment);
      inputComment.current.value = '';
    }
  }, [comments, id, setComments]);

  return (
    <Form.Group controlId="exampleForm.ControlTextarea1">
      <Form.Control as="textarea" rows="3" ref={inputComment} />
      <Button
        variant="primary"
        size="sm"
        onClick={() => add()}
        style={{ marginTop: '10px', float: 'right' }}
      >
        Post
      </Button>
    </Form.Group>
  );
};

export default CommentUpdate;

CommentUpdate.propTypes = {
  id: PropTypes.number.isRequired,
};
