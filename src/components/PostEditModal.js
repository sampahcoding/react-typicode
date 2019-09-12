import React, {
  useState, useRef, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import {
  Modal, Button, Form, Alert,
} from 'react-bootstrap';
import { UpdatePost } from '../api/PostApi';

const PostEditModal = ({ isShown, post }) => {
  const [show, setShow] = useState(false);
  const title = useRef();
  const body = useRef();
  const skipInitialRender = useRef(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [inputTitle, setInputTitle] = useState('');
  const [inputBody, setInputBody] = useState('');
  const [id, setId] = useState(0);
  const { isLoading, done, error } = UpdatePost(id, inputTitle, inputBody, post.id ? 'edit' : 'add');
  // blm di handle
  const [modalErrorShow, setModalErrorShow] = useState(false);

  const add = () => {
    setInputTitle(title.current.value);
    setInputBody(body.current.value);
    setId(post.id || 1);
  };

  useEffect(() => {
    if (skipInitialRender.current) {
      skipInitialRender.current = false;
    } else {
      handleShow();
      setModalErrorShow(false);
    }
  }, [isShown]);

  // close modal when done
  useEffect(() => {
    if (done) {
      handleClose();
      setId(0);
    }
  }, [done]);

  // error
  useEffect(() => {
    if (error !== null) setModalErrorShow(true);
  }, [error]);

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
                  {error}
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
