import {
  useEffect, useContext, useState,
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

const AddComment = (postId, name, email, body) => {
  const [data, setData] = useContext(CommentsContext);
  const [isLoading, setIsLoading] = useState(false);
  const [done, setIsDone] = useState(false);

  useEffect(() => {
    if (body === '') {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    axios({
      method: 'POST',
      url: API.COMMENTS,
      headers: header,
      data: JSON.stringify({
        name,
        email,
        body,
        postId,
      }),
    }).then((res) => {
      // res done
      res.data.id = 501 + (Math.random() * 4);
      data.comments.unshift(res.data);
      const newComment = data.comments.filter((c) => c.id !== -1);
      setData({
        type: COMMENTS.DONE,
        data: { comments: newComment },
      });
      setIsLoading(false);
      setIsDone(true);
    }).catch(() => {
      setIsDone(true);
      setIsLoading(false);
    });
  }, [body]);

  return { isLoading, done };
};

const UpdateComment = (id, body) => {
  const [data, setData] = useContext(CommentsContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorShow, setErrorShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (id === 0) return;
    if (body === '') {
      setIsLoading(false);
      setIsEdit(false);
      return;
    }
    setIsLoading(true);
    axios({
      method: 'PUT',
      url: `${API.COMMENTS}/${id}`,
      headers: header,
      data: JSON.stringify({
        body,
        id,
      }),
    }).then(() => {
      // res done
      setErrorShow(false);
      const newComment = [];
      data.comments.forEach((c) => {
        if (c.id === id) {
          const newC = { ...c, body };
          newComment.push(newC);
        } else {
          newComment.push(c);
        }
      });
      setData({
        type: COMMENTS.DONE,
        data: { comments: newComment },
      });
      setIsLoading(false);
      setIsEdit(false);
    }).catch(() => {
      setIsLoading(false);
      setErrorShow(true);
    });
  }, [id, body]);

  return {
    errorShow, isLoading, isEdit, setIsEdit,
  };
};

const DeleteComment = (id) => {
  const [data, setData] = useContext(CommentsContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id === 0) return;
    setIsLoading(true);
    axios({
      method: 'DELETE',
      url: `${API.COMMENTS}/${id}`,
    }).then(() => {
      // res done
      const newComment = data.comments.filter((c) => c.id !== id);
      setData({
        type: COMMENTS.DONE,
        data: { comments: newComment },
      });
    }).catch(() => {});
  }, [id]);

  return isLoading;
};

export {
  GetCommentByPost,
  DeleteComment,
  UpdateComment,
  AddComment,
};
