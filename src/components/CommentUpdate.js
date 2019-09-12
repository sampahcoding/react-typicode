import React, {
  useRef, useState, useEffect,
} from 'react';
import {
  Button, Form,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { AddComment } from '../api/CommentApi';

const CommentUpdate = ({ id }) => {
  const inputNewComment = useRef('');
  const [newComment, setNewComment] = useState('');
  const { isLoading, done } = AddComment(id, 'anonymous', 'anonymous@example.com', newComment);

  useEffect(() => {
    // clear input on finished posting new comment
    if (done) inputNewComment.current.value = '';
  }, [newComment, done]);

  return (
    <Form.Group controlId="exampleForm.ControlTextarea1">
      <Form.Control
        as="textarea"
        rows="3"
        ref={inputNewComment}
        disabled={isLoading}
        placeholder="Write a comment..."
      />
      <Button
        variant="primary"
        size="sm"
        onClick={() => {
          setNewComment(inputNewComment.current.value);
        }}
        disabled={isLoading}
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
