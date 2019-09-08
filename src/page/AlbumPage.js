import React, { useEffect, useReducer, useCallback } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { getAlbum } from '../api/AlbumApi';
import { getPhotosByAlbum } from '../api/PhotoApi';
import { initialState, albumReducer } from '../reducer/AlbumReducer';
import { initialPhotosState, photoReducer } from '../reducer/PhotoReducer';
import { ALBUM, PHOTOS } from '../const/ActionType';
import Loader from '../components/Loader';

const AlbumPage = (history) => {
  const { match } = history;
  const { id } = match.params;
  const [data, setData] = useReducer(albumReducer, initialState);
  const [photos, setPhotos] = useReducer(photoReducer, initialPhotosState);

  const getData = useCallback(async () => {
    const res = await getAlbum(id);
    setData({
      type: res.error ? ALBUM.ERROR : ALBUM.DONE,
      data: res,
    });
  }, [id]);

  const getPhotos = useCallback(async () => {
    const res = await getPhotosByAlbum(id);
    setPhotos({
      type: res.error ? PHOTOS.ERROR : PHOTOS.DONE,
      data: res,
    });
  }, [id]);

  useEffect(() => {
    setData({ type: ALBUM.LOADING });
    setTimeout(getData, 500);
    setPhotos({ type: PHOTOS.LOADING });
    setTimeout(getPhotos, 500);
  }, [getData, getPhotos]);

  return (
    <>
      {data.isLoading && <Loader />}
      {data.isError && <p>Something wrong....</p>}
      {
        data.isDone && (
          <>
            <h4>{data.album.title}</h4>
            <br />
            <br />
          </>
        )
      }
      {photos.isLoading && <Loader />}
      {photos.isError && <p>Something with loading photos....</p>}
      <Row>
        {photos.photos.map((photo) => (
          <Col md={3} key={photo.id}>
            <Card style={{ marginBottom: '15px' }}>
              <Card.Img variant="top" src={photo.thumbnailUrl} />
              <Card.Body>
                <Card.Text>{photo.title}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default AlbumPage;
