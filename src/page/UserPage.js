import React, { useEffect, useReducer, useCallback } from 'react';
import {
  Row, Col, Card, Button,
} from 'react-bootstrap';
import { getAllUser } from '../api/UserApi';
import { initialState, usersReducer } from '../reducer/UserReducer';
import { USERS } from '../const/ActionType';
import Loader from '../components/Loader';

const UserPage = () => {
  const [data, setData] = useReducer(usersReducer, initialState);

  const getData = useCallback(async () => {
    const res = await getAllUser();
    setData({
      type: res.error ? USERS.ERROR : USERS.DONE,
      data: res,
    });
  }, []);

  useEffect(() => {
    setData({ type: USERS.LOADING });
    setTimeout(getData, 300);
  }, [getData]);

  return (
    <>
      {data.isLoading && <Loader />}
      {data.isError && <p>Something wrong....</p>}
      <Row>
        {data.users.map((user) => (
          <Col md={6} key={user.id}>
            <Card style={{ marginBottom: '15px' }}>
              <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Text>
                  {`Username: ${user.username}`}
                  <br />
                  {`Email: ${user.email}`}
                  <br />
                  {`Address: ${user.address.street}, ${user.address.suite}, ${user.address.city}`}
                  <br />
                  {`Company: ${user.company.name}`}
                  <br />
                  {`Website: ${user.company.website}`}
                </Card.Text>
                <Button variant="primary" href={`/user/${user.id}`}>Show Detail</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default UserPage;
