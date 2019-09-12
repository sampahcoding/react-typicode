import { useReducer, useEffect } from 'react';
import axios from 'axios';
import API from '../const/Api';
import { initialPhotosState, photoReducer } from '../reducer/PhotoReducer';
import { PHOTOS } from '../const/ActionType';

const GetPhotosByAlbum = (id) => {
  const [data, setData] = useReducer(photoReducer, initialPhotosState);

  useEffect(() => {
    setData({ type: PHOTOS.LOADING });
    axios(`${API.PHOTOS}?albumId=${id}`).then((res) => setData({
      type: PHOTOS.DONE,
      data: { photos: res.data },
    })).catch((e) => setData({
      type: PHOTOS.ERROR,
      message: e,
    }));
  }, [id, setData]);

  return data;
};

export default GetPhotosByAlbum;
