import React, { useState } from 'react';
import {
  Card, ListGroup, ButtonGroup,
  ButtonToolbar, Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { DeletePost } from '../api/PostApi';

const PostItem = ({ post, edit }) => {
  const [removedId, setRemovedId] = useState(0);
  const isLoading = DeletePost(removedId);

  return (
    <ListGroup.Item key={post.id} disabled={isLoading} variant={isLoading ? '' : 'light'}>
      <Card.Link href={`/post/${post.id}`}>{post.title}</Card.Link>
      <ButtonToolbar style={{ justifyContent: 'flex-end' }}>
        <ButtonGroup className="mr-2">
          <Button variant="primary" size="sm" onClick={() => edit(post)}>Edit</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="secondary" size="sm" onClick={() => setRemovedId(post.id)}>Delete</Button>
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
