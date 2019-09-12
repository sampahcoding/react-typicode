import { useReducer, useEffect } from 'react';
import axios from 'axios';
import API from '../const/Api';
import { initialState, albumReducer } from '../reducer/AlbumReducer';
import { ALBUM, USERALBUMS } from '../const/ActionType';

const GetAlbumByUser = (id) => {
  const [data, setData] = useReducer(albumReducer, initialState);

  useEffect(() => {
    setData({ type: USERALBUMS.LOADING });
    axios(`${API.ALBUMS}?userId=${id}`).then((res) => setData({
      type: USERALBUMS.DONE,
      data: { albums: res.data },
    })).catch((e) => setData({
      type: USERALBUMS.ERROR,
      message: e,
    }));
  }, [id, setData]);

  return data;
};

const GetAlbum = (id) => {
  const [data, setData] = useReducer(albumReducer, initialState);

  useEffect(() => {
    setData({ type: ALBUM.LOADING });
    axios(`${API.ALBUMS}/${id}`).then((res) => setData({
      type: ALBUM.DONE,
      data: { album: res.data },
    })).catch((e) => setData({
      type: ALBUM.ERROR,
      message: e,
    }));
  }, [id, setData]);

  return data;
};

export { GetAlbum, GetAlbumByUser };
