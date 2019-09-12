import React, {
  useState, useRef,
} from 'react';
import {
  ListGroup, Button, Form, Alert,
  ButtonToolbar, ButtonGroup,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { DeleteComment, UpdateComment } from '../api/CommentApi';

const CommentItem = ({ comment }) => {
  const inputComment = useRef('');
  const [commentId, setCommentId] = useState(0); // for del
  const [updatedCommentId, setUpdatedCommentId] = useState(0); // for update
  const [textComment, setComment] = useState(''); // for update
  const isLoadingDel = DeleteComment(commentId);
  const {
    errorShow, isLoadingEditComment, isEdit, setIsEdit,
  } = UpdateComment(updatedCommentId, textComment);
  const handleClose = () => setIsEdit(false);

  return (
    <ListGroup.Item key={comment.id} disabled={isLoadingDel}>
      <h5>{`${comment.name}, ${comment.email}`}</h5>
      <br />
      { isEdit ? (
        <Form.Group controlId="comment-item">
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Write a comment..."
            ref={inputComment}
            defaultValue={comment.body}
            disabled={isLoadingEditComment}
          />
          {
            errorShow && (
              <Alert variant="danger">
                Cannot save comment...
              </Alert>
            )
          }
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setUpdatedCommentId(comment.id);
              setComment(inputComment.current.value);
            }}
            disabled={isLoadingEditComment}
            style={{ marginTop: '10px', float: 'right' }}
          >
            Save
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleClose}
            disabled={isLoadingEditComment}
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
            disabled={isLoadingDel}
          >
            Edit
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setCommentId(comment.id)}
            disabled={isLoadingDel}
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
