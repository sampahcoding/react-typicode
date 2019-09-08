import React, {
  useEffect, useReducer, useCallback, useContext,
} from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getCommentByPost } from '../api/CommentApi';
import { initialState, commentReducer } from '../reducer/CommentReducer';
import { COMMENTS } from '../const/ActionType';
import Loader from './Loader';
import CommentUpdate from './CommentUpdate';
import { CommentsContext } from '../context/CommentsContext';
import CommentItem from './CommentItem';

const Comments = ({ id }) => {
  const [data, setData] = useReducer(commentReducer, initialState);
  const [comments, setComments] = useContext(CommentsContext);
  const getData = useCallback(async () => {
    const res = await getCommentByPost(id);
    setData({
      type: res.error ? COMMENTS.ERROR : COMMENTS.DONE,
      data: res,
    });
    if (!res.error) {
      setComments(res.comments);
    }
  }, [id, setComments]);

  useEffect(() => {
    setData({ type: COMMENTS.LOADING });
    setTimeout(getData, 500);
  }, [getData]);

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
                comments.map((comment) => <CommentItem comment={comment} key={comment.id} />)
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
