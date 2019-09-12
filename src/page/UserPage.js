import React from 'react';
import {
  Row, Col, Card, Button,
} from 'react-bootstrap';
import { GetAllUser } from '../api/UserApi';
import Loader from '../components/Loader';

const UserPage = () => {
  const data = GetAllUser();

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
                  {`Website: ${user.website}`}
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
