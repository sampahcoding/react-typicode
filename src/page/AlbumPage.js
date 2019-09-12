import React, { useCallback, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Loader from '../components/Loader';
import Image from '../components/Image';
import PhotoDetailModal from '../components/PhotoDetailModal';
import getParamId from '../helper/Browser';
import { GetAlbum } from '../api/AlbumApi';
import GetPhotosByAlbum from '../api/PhotoApi';

const AlbumPage = (history) => {
  const id = getParamId(history);
  const [isShown, setIsShown] = useState(false);
  const [modalPhotoData, setModalPhotoData] = useState({});
  const data = GetAlbum(id);
  const photos = GetPhotosByAlbum(id);

  const openModal = useCallback((dataPhoto) => {
    setModalPhotoData(dataPhoto);
    setIsShown(!isShown);
  }, [isShown]);

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
          <Col md={3} key={photo.id} onClick={() => openModal(photo)} style={{ cursor: 'pointer' }}>
            <Card style={{ marginBottom: '15px' }}>
              <Image>
                <Card.Img variant="top" src={photo.thumbnailUrl} style={{ position: 'absolute' }} />
              </Image>
              <Card.Body>
                <Card.Text className="mb-2 text-muted">{`${photo.title.substring(0, 20)}...`}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <PhotoDetailModal photo={modalPhotoData} isShown={isShown} />
    </>
  );
};

export default AlbumPage;
