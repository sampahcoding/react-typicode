import React, { useContext } from 'react';
import { CommentsContext } from '../context/CommentsContext';
import CommentItem from './CommentItem';

const CommentList = () => {
  const [comments] = useContext(CommentsContext);

  return (
    <>
      {
        comments.map((comment) => <CommentItem comment={comment} key={comment.id} />)
      }
    </>
  );
};

export default CommentList;
