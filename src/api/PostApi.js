import axios from 'axios';
import API from '../const/Api';

export const getPostByUser = async (id) => {
  try {
    const response = await axios(`${API.POSTS}?userId=${id}`);
    return {
      posts: response.data,
    };
  } catch (err) {
    return {
      error: true,
      message: err,
    };
  }
};

export const getPost = async (id) => {
  try {
    const response = await axios(`${API.POSTS}/${id}`);
    return {
      post: response.data,
    };
  } catch (err) {
    return {
      error: true,
      message: err,
    };
  }
};

export const addPost = async (userId, title, body) => {
  try {
    return await axios({
      method: 'POST',
      url: API.POSTS,
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      data: JSON.stringify({
        title,
        body,
        userId,
      }),
    });
  } catch (err) {
    return {
      error: true,
      message: err,
    };
  }
};

export const updatePost = async (id, title, body) => {
  try {
    return await axios({
      method: 'PUT',
      url: `${API.POSTS}/${id}`,
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      data: JSON.stringify({
        title,
        body,
        id,
      }),
    });
  } catch (err) {
    return {
      error: true,
      message: err,
    };
  }
};

export const deletePost = async (id) => {
  try {
    return await axios({
      method: 'DELETE',
      url: `${API.POSTS}/${id}`,
    });
  } catch (err) {
    return {
      error: true,
      message: err,
    };
  }
};
