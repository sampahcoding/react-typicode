import axios from 'axios';
import API from '../const/Api';

export const getAllUser = async () => {
  try {
    const resUser = await axios(API.USERS);
    return {
      users: resUser.data,
    };
  } catch (err) {
    return {
      error: true,
      message: err,
    };
  }
};

export const getUser = async (id) => {
  try {
    const resUser = await axios(`${API.USERS}/${id}`);
    return {
      user: resUser.data,
    };
  } catch (err) {
    return {
      error: true,
      message: err,
    };
  }
};
