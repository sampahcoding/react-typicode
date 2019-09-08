import React, {
  useCallback, useContext, useState,
} from 'react';
import {
  Card, ListGroup, ButtonGroup,
  ButtonToolbar, Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { deletePost } from '../api/PostApi';
import { USERPOSTS } from '../const/ActionType';
import { PostsContext } from '../context/PostsContext';

const PostItem = ({ post, edit }) => {
  const [data, setData] = useContext(PostsContext);
  const [isLoading, setIsLoading] = useState(false);
  const remove = useCallback(async (removedId) => {
    setIsLoading(true);
    const res = await deletePost(removedId);
    if (!res.error) {
      const newPosts = data.posts.filter((p) => p.id !== removedId);
      setData({
        type: USERPOSTS.DONE,
        data: { posts: newPosts },
      });
    } else {
      setIsLoading(false);
    }
  }, [data, setData]);
  return (
    <ListGroup.Item key={post.id} disabled={isLoading} variant={isLoading ? '' : 'light'}>
      <Card.Link href={`/post/${post.id}`}>{post.title}</Card.Link>
      <ButtonToolbar style={{ justifyContent: 'flex-end' }}>
        <ButtonGroup className="mr-2">
          <Button variant="primary" size="sm" onClick={() => edit(post)}>Edit</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="secondary" size="sm" onClick={() => remove(post.id)}>Delete</Button>
        </ButtonGroup>
      </ButtonToolbar>
    </ListGroup.Item>
  );
};

export default PostItem;

PostItem.propTypes = {
  post: PropTypes.instanceOf(Object).isRequired,
  edit: PropTypes.func.isRequired,
};
