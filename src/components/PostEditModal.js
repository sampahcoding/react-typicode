import React, {
  useState, useRef, useEffect, useCallback, useContext,
} from 'react';
import PropTypes from 'prop-types';
import {
  Modal, Button, Form, Alert,
} from 'react-bootstrap';
import { PostsContext } from '../context/PostsContext';
import { addPost, updatePost } from '../api/PostApi';
import { USERPOSTS } from '../const/ActionType';

const PostEditModal = ({ isShown, post }) => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const title = useRef();
  const body = useRef();
  const skipInitialRender = useRef(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [modalErrorShow, setModalErrorShow] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useContext(PostsContext);
  useEffect(() => {
    if (skipInitialRender.current) {
      skipInitialRender.current = false;
    } else {
      handleShow();
    }
  }, [isShown]);

  const add = useCallback(async () => {
    setIsLoading(true);
    const inputTitle = title.current.value;
    const inputBody = body.current.value;
    if (inputTitle === '' || inputBody === '') {
      setError('Input cannot be empty');
      setModalErrorShow(true);
      setIsLoading(false);
      return;
    }
    setError('');
    const res = post.id
      ? await updatePost(post.id, inputTitle, inputBody) : await addPost(1, inputTitle, inputBody);
    let newPosts = [];
    if (!res.error) {
      if (!post.id) {
        data.posts.unshift(res.data);
        newPosts = data.posts.filter((c) => c.id !== -1);
      } else {
        data.posts.forEach((p) => {
          if (p.id === post.id) {
            const newP = { ...p, body: inputBody, title: inputTitle };
            newPosts.push(newP);
          } else {
            newPosts.push(p);
          }
        });
      }
      setData({
        type: USERPOSTS.DONE,
        data: { posts: newPosts },
      });
      handleClose();
    } else {
      setModalErrorShow(true);
    }
    setIsLoading(false);
  }, [data, post, setData]);

  return (
    <>
      <Modal show={show} onHide={handleClose} className={show ? 'tdd-modal' : ''}>
        <Modal.Header closeButton>
          <Modal.Title className="tdd-title">{post.id ? `Edit - ${post.title}` : 'Add Post'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            modalErrorShow && (
              <Alert variant="danger" onClose={() => setModalErrorShow(false)} dismissible>
                <Alert.Heading>Something Wrong!</Alert.Heading>
                <p>
                  {error !== '' ? error : 'Cannot save data...'}
                </p>
              </Alert>
            )
          }
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              disabled={isLoading}
              as="textarea"
              rows="2"
              placeholder="Write a title..."
              ref={title}
              defaultValue={post.title || ''}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Body</Form.Label>
            <Form.Control
              disabled={isLoading}
              as="textarea"
              placeholder="Write a content..."
              rows="3"
              ref={body}
              defaultValue={post.body || ''}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="tdd-close" onClick={handleClose} disabled={isLoading}>
            Close
          </Button>
          <Button variant="primary" onClick={() => add()} disabled={isLoading}>
            {post.id ? 'Save Changes' : 'Add Post'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PostEditModal;

PostEditModal.propTypes = {
  isShown: PropTypes.bool.isRequired,
  post: PropTypes.instanceOf(Object).isRequired,
};
