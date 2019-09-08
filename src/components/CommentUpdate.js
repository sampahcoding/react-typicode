import React, {
  useContext, useRef, useCallback, useState,
} from 'react';
import {
  Button, Form,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { CommentsContext } from '../context/CommentsContext';
import { addComment } from '../api/CommentApi';
import { COMMENTS } from '../const/ActionType';

const CommentUpdate = ({ id }) => {
  const [data, setData] = useContext(CommentsContext);
  const inputComment = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const add = useCallback(async () => {
    setIsLoading(true);
    const val = inputComment.current.value;
    if (val === '') {
      setIsLoading(false);
      return;
    }
    const res = await addComment(id, 'anonymous', 'anonymous@example.com', val);
    if (!res.error) {
      res.data.id = 501 + (Math.random() * 4);
      data.comments.unshift(res.data);
      const newComment = data.comments.filter((c) => c.id !== -1);
      setData({
        type: COMMENTS.DONE,
        data: { comments: newComment },
      });
      setIsLoading(false);
      inputComment.current.value = '';
    }
  }, [data, id, setData]);

  return (
    <Form.Group controlId="exampleForm.ControlTextarea1">
      <Form.Control
        as="textarea"
        rows="3"
        ref={inputComment}
        disabled={isLoading}
        placeholder="Write a comment..."
      />
      <Button
        variant="primary"
        size="sm"
        onClick={() => add()}
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
