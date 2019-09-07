import axios from "axios";
import { API } from "../const/Api";

export const getAlbumByUser = async(id) => {
  try {
    const response = await axios(API.ALBUMS + "?userId=" + id);
    return {
      albums: response.data,
    };
  } catch(err) {
    return {
      error: true,
      message: err,
    };
  }
};

export const getAlbum = async(id) => {
  try {
    const response = await axios(API.ALBUMS + "/" + id);
    return {
      album: response.data,
    };
  } catch(err) {
    return {
      error: true,
      message: err,
    };
  }
};
