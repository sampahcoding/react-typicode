import React, { useEffect, useReducer, useCallback } from "react";
import { getAlbumByUser } from "../api/AlbumApi";
import { initialState, albumReducer } from "../reducer/AlbumReducer";
import { USERALBUMS } from "../const/ActionType";
import Loader from "../components/Loader";
import { Card, ListGroup } from 'react-bootstrap';

const Albums = ({ id }) => {
  const [data, setData] = useReducer(albumReducer, initialState);
  const getData = useCallback( async() => {
    const res = await getAlbumByUser(id);
    setData({
      type: res.error ? USERALBUMS.ERROR : USERALBUMS.DONE,
      data: res
    });
  }, [id]);

  useEffect(() => {
    setData({type: USERALBUMS.LOADING});
    setTimeout(getData, 500);
  }, [getData]);

  return(
    <>
      {data.isError && <p>Something wrong....</p>}
      <Card>
        <Card.Header>Albums</Card.Header>
        <ListGroup variant="flush">
          {data.isLoading && <Loader mid/>}
          {
            data.isDone && data.albums.map((album) => {
              return (
                <ListGroup.Item key={album.id}>
                  <Card.Link href={"/album/" + album.id}>{album.title}</Card.Link>
                </ListGroup.Item>
              )
            })
          }
        </ListGroup>
      </Card>
    </>
  );
}

export default Albums;
