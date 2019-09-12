import React, {
  useMemo,
} from 'react';
import { Row, Col } from 'react-bootstrap';
import { GetUser } from '../api/UserApi';
import Loader from '../components/Loader';
import Posts from '../components/Posts';
import Albums from '../components/Albums';
import { PostsProvider } from '../context/PostsContext';
import getParamId from '../helper/Browser';

const UserPage = (history) => {
  const id = getParamId(history);
  const data = GetUser(id);

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
