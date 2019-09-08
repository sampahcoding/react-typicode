import React, {
  useContext, useCallback, useState, useRef,
} from 'react';
import {
  ListGroup, Button, Form, Alert,
  ButtonToolbar, ButtonGroup,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { CommentsContext } from '../context/CommentsContext';
import { updateComment, deleteComment } from '../api/CommentApi';
import { COMMENTS } from '../const/ActionType';

const CommentItem = ({ comment }) => {
  const [data, setData] = useContext(CommentsContext);
  const [isEdit, setIsEdit] = useState(false);
  const inputComment = useRef();
  const handleClose = () => setIsEdit(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorShow, setErrorShow] = useState(false);

  const remove = useCallback(async () => {
    setIsLoading(true);
    const res = await deleteComment(comment.id);
    if (!res.error) {
      const newComment = data.comments.filter((c) => c.id !== comment.id);
      setData({
        type: COMMENTS.DONE,
        data: { comments: newComment },
      });
    } else {
      setIsLoading(false);
    }
  }, [data, setData, comment]);

  const save = useCallback(async () => {
    setIsLoading(true);
    const val = inputComment.current.value;
    if (val === '') {
      setIsEdit(false);
      setIsLoading(false);
      return;
    }
    const res = await updateComment(comment.id, val);
    if (!res.error) {
      setErrorShow(false);
      const newComment = [];
      data.comments.forEach((c) => {
        if (c.id === comment.id) {
          const newC = { ...c, body: val };
          newComment.push(newC);
        } else {
          newComment.push(c);
        }
      });
      setData({
        type: COMMENTS.DONE,
        data: { comments: newComment },
      });
      setIsLoading(false);
      inputComment.current.value = '';
      setIsEdit(false);
    } else {
      setIsLoading(false);
      setErrorShow(true);
    }
  }, [comment, data, setData]);

  return (
    <ListGroup.Item key={comment.id} disabled={isLoading}>
      <h5>{`${comment.name}, ${comment.email}`}</h5>
      <br />
      { isEdit ? (
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Write a comment..."
            ref={inputComment}
            defaultValue={comment.body}
            disabled={isLoading}
          />
          {
            errorShow && (
              <Alert variant="danger" onClose={() => setErrorShow(false)} dismissible>
                Cannot save comment...
              </Alert>
            )
          }
          <Button
            variant="primary"
            size="sm"
            onClick={() => save()}
            disabled={isLoading}
            style={{ marginTop: '10px', float: 'right' }}
          >
            Save
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleClose}
            disabled={isLoading}
            style={{ marginRight: '10px', marginTop: '10px', float: 'right' }}
          >
            Cancel
          </Button>
        </Form.Group>
      )
        : comment.body}
      <ButtonToolbar style={{ justifyContent: 'flex-end', display: isEdit ? 'none' : 'flex' }}>
        <ButtonGroup className="mr-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsEdit(!isEdit)}
            disabled={isLoading}
          >
            Edit
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => remove()}
            disabled={isLoading}
          >
            Delete
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    </ListGroup.Item>
  );
};

export default CommentItem;

CommentItem.propTypes = {
  comment: PropTypes.instanceOf(Object).isRequired,
};
