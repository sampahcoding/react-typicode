import axios from "axios";
import { API } from "../const/Api";

export const getCommentByPost = async(id) => {
  try {
    const response = await axios(API.COMMENTS + "?postId=" + id);
    return {
      comments: response.data,
    };
  } catch(err) {
    return {
      error: true,
      message: err,
    };
  }
};

export const addComment = async(postId, name, email, body) => {
  try {
    const res =  await axios({
      method: 'POST',
      url: API.COMMENTS,
      headers: { "Content-type": "application/json; charset=UTF-8" },
      data: JSON.stringify({
        name: name,
        email: email,
        body: body,
        postId: postId
      })
    });
    return res;
  } catch(err) {
    return {
      error: true,
      message: err,
    };
  }
};

export const updateComment = async(id, name, email, body) => {
  try {
    return await axios({
      method: 'PUT',
      url: API.COMMENTS,
      headers: { "Content-type": "application/json; charset=UTF-8" },
      data: JSON.stringify({
        name: name,
        email: email,
        body: body,
        id: id
      })
    });
  } catch(err) {
    return {
      error: true,
      message: err,
    };
  }
};

export const deleteComment = async(id) => {
  try {
    return await axios({
      method: 'DELETE',
      url: API.COMMENTS + '/' + id,
    });
  } catch(err) {
    return {
      error: true,
      message: err,
    };
  }
};
