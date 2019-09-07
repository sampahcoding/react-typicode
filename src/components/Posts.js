import React, { useEffect, useReducer, useCallback, useContext, useState } from "react";
import { getPostByUser } from "../api/PostApi";
import { initialState, postReducer } from "../reducer/PostReducer";
import { USERPOSTS } from "../const/ActionType";
import Loader from "../components/Loader";
import PostEditModal from "../components/PostEditModal";
import { PostsContext } from "../context/PostsContext";
import {
  Row, Col, Card, ListGroup,
  ButtonToolbar, ButtonGroup, Button
} from 'react-bootstrap';

const Posts = ({ id }) => {
  const [data, setData] = useReducer(postReducer, initialState);
  const [posts, setPosts] = useContext(PostsContext);
  const [isShown, setIsShown] = useState(false);
  const [post, setPost] = useState({});
  const getData = useCallback( async() => {
    const res = await getPostByUser(id);
    setData({
      type: res.error ? USERPOSTS.ERROR : USERPOSTS.DONE,
      data: res
    });
    setPosts(res.posts);
  }, [id, setPosts]);

  useEffect(() => {
    setData({type: USERPOSTS.LOADING});
    setTimeout(getData, 500);
  }, [getData]);

  const remove = useCallback((id) => {
    const new_posts = posts.filter((p) => p.id !== id);
    setPosts(new_posts);
  }, [posts, setPosts]);

  const edit = useCallback((post) => {
    setIsShown(!isShown);
    setPost(post);
  }, [isShown]);

  return(
    <>
      {data.isError && <p>Something wrong....</p>}
      <Card>
        <Card.Header>
          <Row>
            <Col>
              Posts
            </Col>
            <Col>
              <ButtonToolbar style={{ justifyContent: "flex-end" }}>
                <Button variant="primary" size="sm" onClick={()=> edit({})}>Add</Button>
              </ButtonToolbar>
            </Col>
          </Row>
        </Card.Header>
        <ListGroup variant="flush">
          {data.isLoading && <Loader mid/>}
          {
            data.isDone && posts.map((post) => {
              return (
                <ListGroup.Item key={post.id}>
                  <Card.Link href={"/post/" + post.id}>{post.title}</Card.Link>
                  <ButtonToolbar style={{ justifyContent: "flex-end" }}>
                    <ButtonGroup className="mr-2">
                      <Button variant="primary" size="sm" onClick={()=> edit(post)}>Edit</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                      <Button variant="secondary" size="sm" onClick={()=> remove(post.id)}>Delete</Button>
                    </ButtonGroup>
                  </ButtonToolbar>
                </ListGroup.Item>
              )
            })
          }
        </ListGroup>
      </Card>
      <PostEditModal isShown={isShown} post={post}/>
    </>
  );
}

export default Posts;
