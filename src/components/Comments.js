import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { GetCommentByPost } from '../api/CommentApi';
import Loader from './Loader';
import CommentUpdate from './CommentUpdate';
import CommentItem from './CommentItem';

const Comments = ({ id }) => {
  const data = GetCommentByPost(id);

  return (
    <>
      {data.isError && <p>Something wrong....</p>}
      <Card style={{ width: '70%', border: 'none' }}>
        <Card.Title>Comments</Card.Title>
        {data.isLoading && <Loader mid />}
        {data.isDone && data.comments && (
          <>
            <CommentUpdate id={id} />
            <ListGroup variant="flush">
              {
                data.comments.map((comment) => <CommentItem comment={comment} key={comment.id} />)
              }
            </ListGroup>
          </>
        )}
      </Card>
    </>
  );
};

export default Comments;

Comments.propTypes = {
  id: PropTypes.number.isRequired,
};
