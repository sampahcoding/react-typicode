import {
  useEffect, useContext,
} from 'react';
import axios from 'axios';
import API from '../const/Api';
import { COMMENTS } from '../const/ActionType';
import { CommentsContext } from '../context/CommentsContext';
import { header } from '../const/Base';

const GetCommentByPost = (id) => {
  const [data, setData] = useContext(CommentsContext);

  useEffect(() => {
    setData({ type: COMMENTS.LOADING });
    axios(`${API.COMMENTS}?postId=${id}`).then((res) => setData({
      type: COMMENTS.DONE,
      data: { comments: res.data },
    })).catch((e) => setData({
      type: COMMENTS.ERROR,
      message: e,
    }));
  }, [id, setData]);

  return data;
};

export const addComment = async (postId, name, email, body) => {
  try {
    const res = await axios({
      method: 'POST',
      url: API.COMMENTS,
      headers: header,
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
      headers: header,
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

export { GetCommentByPost };
