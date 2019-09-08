import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Loader = ({ mid }) => (
  <center style={{ marginTop: '150px', marginBottom: mid ? '150px' : '0px' }}>
    <Button variant="primary" disabled>
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      Loading...
    </Button>
  </center>
);

export default Loader;

Loader.propTypes = {
  mid: PropTypes.bool,
};

Loader.defaultProps = {
  mid: false,
};
