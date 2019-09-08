import React, {
  useEffect, useCallback, useContext, useState,
} from 'react';
import {
  Row, Col, Card, ListGroup,
  ButtonToolbar, Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getPostByUser } from '../api/PostApi';
import { USERPOSTS } from '../const/ActionType';
import Loader from './Loader';
import PostEditModal from './PostEditModal';
import PostItem from './PostItem';
import { PostsContext } from '../context/PostsContext';

const Posts = ({ id }) => {
  const [data, setData] = useContext(PostsContext);
  const [isShown, setIsShown] = useState(false);
  const [post, setPost] = useState({});
  const getData = useCallback(async () => {
    const res = await getPostByUser(id);
    setData({
      type: res.error ? USERPOSTS.ERROR : USERPOSTS.DONE,
      data: res,
    });
  }, [id, setData]);

  useEffect(() => {
    setData({ type: USERPOSTS.LOADING });
    setTimeout(getData, 500);
  }, [getData, setData]);

  const edit = useCallback((postData) => {
    setIsShown(!isShown);
    setPost(postData);
  }, [isShown]);

  return (
    <>
      {data.isError && <p>Something wrong....</p>}
      <Card>
        <Card.Header>
          <Row>
            <Col>
              Posts
            </Col>
            <Col>
              <ButtonToolbar style={{ justifyContent: 'flex-end' }}>
                <Button variant="primary" size="sm" onClick={() => edit({})}>Add</Button>
              </ButtonToolbar>
            </Col>
          </Row>
        </Card.Header>
        <ListGroup variant="flush">
          {data.isLoading && <Loader mid />}
          {
            data.isDone && data.posts.map((p) => (
              <PostItem post={p} edit={edit} key={p.id} />
            ))
          }
        </ListGroup>
      </Card>
      <PostEditModal isShown={isShown} post={post} />
    </>
  );
};

export default Posts;

Posts.propTypes = {
  id: PropTypes.number.isRequired,
};
