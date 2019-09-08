import axios from 'axios';
import API from '../const/Api';

export const getCommentByPost = async (id) => {
  try {
    const response = await axios(`${API.COMMENTS}?postId=${id}`);
    return {
      comments: response.data,
    };
  } catch (err) {
    return {
      error: true,
      message: err,
    };
  }
};

export const addComment = async (postId, name, email, body) => {
  try {
    const res = await axios({
      method: 'POST',
      url: API.COMMENTS,
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      data: JSON.stringify({
        name,
        email,
        body,
        postId,
      }),
    });
    return res;
  } catch (err) {
    return {
      error: true,
      message: err,
    };
  }
};

export const updateComment = async (id, body) => {
  try {
    return await axios({
      method: 'PUT',
      url: `${API.COMMENTS}/${id}`,
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      data: JSON.stringify({
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

export const deleteComment = async (id) => {
  try {
    return await axios({
      method: 'DELETE',
      url: `${API.COMMENTS}/${id}`,
    });
  } catch (err) {
    return {
      error: true,
      message: err,
    };
  }
};
