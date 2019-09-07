import axios from "axios";
import { API } from "../const/Api";

export const getPhotosByAlbum = async(id) => {
  try {
    const response = await axios(API.PHOTOS + "?albumId=" + id);
    return {
      photos: response.data,
    };
  } catch(err) {
    return {
      error: true,
      message: err,
    };
  }
};

export const getPhoto = async(id) => {
  try {
    const response = await axios(API.PHOTOS + "/" + id);
    return {
      photo: response.data,
    };
  } catch(err) {
    return {
      error: true,
      message: err,
    };
  }
};
