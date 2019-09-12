import {
  useEffect,
  useContext,
  useReducer,
  useState,
} from 'react';
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

const UpdatePost = (id, title, body, status) => {
  const [data, setData] = useContext(PostsContext);
  const [isLoading, setIsLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);

  let formData;
  let url;
  let newPosts = [];
  if (status === 'add') {
    formData = {
      title,
      body,
      userId: id,
    };
    url = API.POSTS;
  } else {
    formData = {
      title,
      body,
      id,
    };
    url = `${API.POSTS}/${id}`;
  }

  useEffect(() => {
    if (id === 0) return;
    setError(null);
    setDone(false);
    setIsLoading(true);
    axios({
      method: status === 'add' ? 'POST' : 'PUT',
      url,
      headers: header,
      data: JSON.stringify(formData),
    }).then((res) => {
      // res done
      if (status === 'add') {
        res.data.id = 501 + (Math.random() * 4);
        data.posts.unshift(res.data);
        newPosts = data.posts.filter((c) => c.id !== -1);
      } else {
        data.posts.forEach((p) => {
          if (p.id === id) {
            const newP = { ...p, body, title };
            newPosts.push(newP);
          } else {
            newPosts.push(p);
          }
        });
      }
      setData({
        type: USERPOSTS.DONE,
        data: { posts: newPosts },
      });
      setDone(true);
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
      setError('Cannot save data...');
      setDone(false);
    });
  }, [id, body, title, status]);
  return { isLoading, done, error };
};

const DeletePost = (id) => {
  const [data, setData] = useContext(PostsContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id === 0) return;
    setIsLoading(true);
    axios({
      method: 'DELETE',
      url: `${API.POSTS}/${id}`,
    }).then(() => {
      // res done
      const newPosts = data.posts.filter((p) => p.id !== id);
      setData({
        type: USERPOSTS.DONE,
        data: { posts: newPosts },
      });
    }).catch(() => {});
  }, [id]);

  return isLoading;
};

export {
  GetPostByUser,
  GetPost,
  DeletePost,
  UpdatePost,
};
