import React from "react";
import { Button, Spinner } from 'react-bootstrap';

const Loader = ({ mid }) => {
  return(
    <center style={{ marginTop: "150px", marginBottom: mid ? "150px" : "0px" }}>
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
}

export default Loader;
