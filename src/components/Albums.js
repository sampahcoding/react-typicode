import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { GetAlbumByUser } from '../api/AlbumApi';
import Loader from './Loader';

const Albums = ({ id }) => {
  const data = GetAlbumByUser(id);

  return (
    <>
      {data.isError && <p>Something wrong....</p>}
      <Card>
        <Card.Header>Albums</Card.Header>
        <ListGroup variant="flush">
          {data.isLoading && <Loader mid />}
          {
            data.isDone && data.albums.map((album) => (
              <ListGroup.Item key={album.id} variant="light">
                <Card.Link href={`/album/${album.id}`}>{album.title}</Card.Link>
              </ListGroup.Item>
            ))
          }
        </ListGroup>
      </Card>
    </>
  );
};

export default Albums;

Albums.propTypes = {
  id: PropTypes.number.isRequired,
};
