import React, { useEffect, useReducer, useCallback } from "react";
import { getCommentByPost } from "../api/CommentApi";
import { initialState, commentReducer } from "../reducer/CommentReducer";
import { COMMENTS } from "../const/ActionType";
import Loader from "../components/Loader";
import CommentList from "../components/CommentList";
import CommentUpdate from "../components/CommentUpdate";
import { CommentsProvider } from "../context/CommentsContext";
import { Card, ListGroup } from 'react-bootstrap';

const Comments = ({ id }) => {
  const [data, setData] = useReducer(commentReducer, initialState);
  const getData = useCallback( async() => {
    const res = await getCommentByPost(id);
    setData({
      type: res.error ? COMMENTS.ERROR : COMMENTS.DONE,
      data: res
    });
  }, [id]);

  useEffect(() => {
    setData({type: COMMENTS.LOADING});
    setTimeout(getData, 500);
  }, [getData]);

  return(
    <>
      {data.isError && <p>Something wrong....</p>}
      <Card style={{ width: "70%", border: "none"}}>
        <Card.Title>Comments</Card.Title>
        {data.isLoading && <Loader mid/>}
        {data.isDone && data.comments && (
          <CommentsProvider comments={data.comments}>
            <CommentUpdate id={id}/>
            <ListGroup variant="flush">
              <CommentList/>
            </ListGroup>
          </CommentsProvider>
        )}
      </Card>
    </>
  );
}

export default Comments;
