import React, {
  useEffect, useReducer, useCallback, useMemo,
} from 'react';
import { Row, Col } from 'react-bootstrap';
import { getUser } from '../api/UserApi';
import { initialState, usersReducer } from '../reducer/UserReducer';
import { USERDETAIL } from '../const/ActionType';
import Loader from '../components/Loader';
import Posts from '../components/Posts';
import Albums from '../components/Albums';
import { PostsProvider } from '../context/PostsContext';

const UserPage = (history) => {
  const { match } = history;
  const { id } = match.params;
  const [data, setData] = useReducer(usersReducer, initialState);

  const getData = useCallback(async () => {
    const res = await getUser(id);
    setData({
      type: res.error ? USERDETAIL.ERROR : USERDETAIL.DONE,
      data: res,
    });
  }, [id]);

  useEffect(() => {
    setData({ type: USERDETAIL.LOADING });
    setTimeout(getData, 500);
  }, [getData]);

  const MemoizedPost = useMemo(() => (<Posts id={id} />), [id]);

  const { user } = data;
  return (
    <>
      {data.isLoading && <Loader mid />}
      {data.isError && <p>Something wrong....</p>}
      {
        data.isDone && (
          <>
            <h1>{user.name}</h1>
            <br />
            {`Email: ${user.email}`}
            <br />
            {`Address: ${user.address.street}, ${user.address.suite}, ${user.address.city}`}
            <br />
            {`Company: ${user.company.name}`}
            <br />
            {`Website: ${user.website}`}
            <br />
            <br />
          </>
        )
      }
      <Row>
        <Col md={6}><Albums id={id} /></Col>
        <Col md={6}>
          <PostsProvider posts={[]}>
            {MemoizedPost}
          </PostsProvider>
        </Col>
      </Row>
    </>
  );
};

export default UserPage;
