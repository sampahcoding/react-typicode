import { useEffect, useContext, useReducer } from 'react';
import axios from 'axios';
import API from '../const/Api';
import { header } from '../const/Base';
import { USERPOSTS, POST } from '../const/ActionType';
import { initialState, postReducer } from '../reducer/PostReducer';

import { PostsContext } from '../context/PostsContext';

const GetPostByUser = (id) => {
  const [data, setData] = useContext(PostsContext);

  useEffect(() => {
    setData({ type: USERPOSTS.LOADING });
    axios(`${API.POSTS}?userId=${id}`).then((res) => setData({
      type: USERPOSTS.DONE,
      data: { posts: res.data },
    })).catch((e) => setData({
      type: USERPOSTS.ERROR,
      message: e,
    }));
  }, [id, setData]);

  return data;
};

const GetPost = (id) => {
  const [data, setData] = useReducer(postReducer, initialState);

  useEffect(() => {
    setData({ type: POST.LOADING });
    axios(`${API.POSTS}/${id}`).then((res) => setData({
      type: POST.DONE,
      data: { post: res.data },
    })).catch((e) => setData({
      type: POST.ERROR,
      message: e,
    }));
  }, [id, setData]);

  return data;
};

export const addPost = async (userId, title, body) => {
  try {
    return await axios({
      method: 'POST',
      url: API.POSTS,
      headers: header,
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
      headers: header,
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

export { GetPostByUser, GetPost };
