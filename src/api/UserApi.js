import { useEffect, useReducer } from 'react';
import axios from 'axios';
import API from '../const/Api';
import { initialState, usersReducer } from '../reducer/UserReducer';
import { USERS, USERDETAIL } from '../const/ActionType';

const GetAllUser = (id) => {
  const [data, setData] = useReducer(usersReducer, initialState);

  useEffect(() => {
    setData({ type: USERS.LOADING });
    axios(API.USERS).then((res) => setData({
      type: USERS.DONE,
      data: { users: res.data },
    })).catch((e) => setData({
      type: USERS.ERROR,
      message: e,
    }));
  }, [id, setData]);

  return data;
};

const GetUser = (id) => {
  const [data, setData] = useReducer(usersReducer, initialState);

  useEffect(() => {
    setData({ type: USERDETAIL.LOADING });
    axios(`${API.USERS}/${id}`).then((res) => setData({
      type: USERDETAIL.DONE,
      data: { user: res.data },
    })).catch((e) => setData({
      type: USERDETAIL.ERROR,
      message: e,
    }));
  }, [id, setData]);

  return data;
};

export { GetAllUser, GetUser };
