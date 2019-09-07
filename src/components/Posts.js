import React, { useEffect, useReducer, useCallback } from "react";
import { getPostByUser } from "../api/PostApi";
import { initialState, postReducer } from "../reducer/PostReducer";
import { USERPOSTS } from "../const/ActionType";
import Loader from "../components/Loader";
import { Card, ListGroup } from 'react-bootstrap';

const Posts = ({ id }) => {
  const [data, setData] = useReducer(postReducer, initialState);
  const getData = useCallback( async() => {
    const res = await getPostByUser(id);
    setData({
      type: res.error ? USERPOSTS.ERROR : USERPOSTS.DONE,
      data: res
    });
  }, [id]);

  useEffect(() => {
    setData({type: USERPOSTS.LOADING});
    setTimeout(getData, 500);
  }, [getData]);

  return(
    <>
      {data.isError && <p>Something wrong....</p>}
      <Card>
        <Card.Header>Posts</Card.Header>
        <ListGroup variant="flush">
          {data.isLoading && <Loader mid/>}
          {
            data.isDone && data.posts.map((post) => {
              return (
                <ListGroup.Item key={post.id}>
                  <Card.Link href={"/post/" + post.id}>{post.title}</Card.Link>
                </ListGroup.Item>
              )
            })
          }
        </ListGroup>
      </Card>
    </>
  );
}

export default Posts;
