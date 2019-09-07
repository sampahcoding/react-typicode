import React, { useContext } from "react";
import { CommentsContext } from "../context/CommentsContext";
import CommentItem from "../components/CommentItem";

const CommentList = () => {
  const [comments, setComments] = useContext(CommentsContext);

  return(
    <>
      {
        comments.map((comment) => <CommentItem comment={comment} key={comment.id}/>)
      }
    </>
  );
}

export default CommentList;
