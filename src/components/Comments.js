import React, { useEffect, useReducer, useCallback, useRef } from "react";
import { getCommentByPost, addComment } from "../api/CommentApi";
import { initialState, commentReducer } from "../reducer/CommentReducer";
import { COMMENTS } from "../const/ActionType";
import Loader from "../components/Loader";
import {
  Card, ListGroup, Button,
  ButtonToolbar, ButtonGroup, Form
} from 'react-bootstrap';

const Comments = ({ id }) => {
  const [data, setData] = useReducer(commentReducer, initialState);
  const inputComment = useRef();
  const getData = useCallback( async() => {
    const res = await getCommentByPost(id);
    setData({
      type: res.error ? COMMENTS.ERROR : COMMENTS.DONE,
      data: res
    });
  }, [id]);

  const add = useCallback( async(comments) => {
    const val = inputComment.current.value;
    if (val === "") return;
    const res = await addComment(id, "anonymous", "anonymous@example.com", val);
    if(!res.error) {
      setData({
        type: COMMENTS.DONE,
        data: comments.unshift(res.data)
      });
      inputComment.current.value = "";
    }
  }, [id])

  useEffect(() => {
    setData({type: COMMENTS.LOADING});
    setTimeout(getData, 500);
  }, [getData]);

  return(
    <>
      {data.isError && <p>Something wrong....</p>}
      <Card style={{ width: "70%", border: "none"}}>
        <Card.Title>Comments</Card.Title>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control as="textarea" rows="3" ref={inputComment}/>
          <Button
            variant="primary"
            size="sm"
            onClick={() => add(data.comments)}
            style={{ marginTop: "10px", float: "right" }}>
            Post
          </Button>
        </Form.Group>
        <ListGroup variant="flush">
          {data.isLoading && <Loader mid/>}
          {
            data.isDone && data.comments.map((comment) => {
              return (
                <ListGroup.Item key={comment.id}>
                  <h6>{comment.name}, {comment.email}</h6>
                  <br/>
                  {comment.body}
                  <ButtonToolbar style={{ justifyContent: "flex-end" }}>
                    <ButtonGroup className="mr-2">
                      <Button variant="primary" size="sm">Edit</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                      <Button variant="secondary" size="sm">Delete</Button>
                    </ButtonGroup>
                  </ButtonToolbar>
                </ListGroup.Item>
              )
            })
          }
        </ListGroup>

      </Card>
    </>
  );
}

export default Comments;
