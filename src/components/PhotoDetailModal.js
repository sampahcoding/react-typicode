import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Modal, Figure } from 'react-bootstrap';

const PhotoDetailModal = ({ photo, isShown }) => {
  const [show, setShow] = useState(isShown);
  const handleClose = () => setShow(false);
  const skipInitialRender = useRef(true);

  useEffect(() => {
    if (skipInitialRender.current) {
      skipInitialRender.current = false;
    } else {
      setShow(true);
    }
  }, [setShow, isShown]);

  return (
    <>
      <Modal show={show} onHide={handleClose} size="md">
        <Modal.Header closeButton>
          <Modal.Title>Detail Photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Figure>
            <Figure.Image
              fluid
              alt={photo.title}
              src={photo.url}
            />
            <Figure.Caption>
              {photo.title}
            </Figure.Caption>
          </Figure>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PhotoDetailModal;

PhotoDetailModal.propTypes = {
  photo: PropTypes.instanceOf(Object),
  isShown: PropTypes.bool.isRequired,
};

PhotoDetailModal.defaultProps = {
  photo: {
    title: '',
    url: '#',
  },
};
