import axios from "axios";
import { API } from "../const/Api";

export const getAllUser = async() => {
  try {
    const res_user = await axios(API.USERS);
    return {
      users: res_user.data,
    };
  } catch(err) {
    return {
      error: true,
      message: err,
    };
  }
};

export const getUser = async(id) => {
  try {
    const res_user = await axios(API.USERS + "/" + id);
    return {
      user: res_user.data,
    };
  } catch(err) {
    return {
      error: true,
      message: err,
    };
  }
};
