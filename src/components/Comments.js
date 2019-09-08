import React, {
  useEffect, useCallback, useContext,
} from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getCommentByPost } from '../api/CommentApi';
import { COMMENTS } from '../const/ActionType';
import Loader from './Loader';
import CommentUpdate from './CommentUpdate';
import { CommentsContext } from '../context/CommentsContext';
import CommentItem from './CommentItem';

const Comments = ({ id }) => {
  const [data, setData] = useContext(CommentsContext);
  const getData = useCallback(async () => {
    const res = await getCommentByPost(id);
    setData({
      type: res.error ? COMMENTS.ERROR : COMMENTS.DONE,
      data: res,
    });
  }, [id, setData]);

  useEffect(() => {
    setData({ type: COMMENTS.LOADING });
    setTimeout(getData, 500);
  }, [getData, setData]);

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
