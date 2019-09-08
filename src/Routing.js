import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';
import { createBrowserHistory } from 'history';
import UserPage from './page/UserPage';
import UserDetailPage from './page/UserDetailPage';
import PostPage from './page/PostPage';
import AlbumPage from './page/AlbumPage';

const history = createBrowserHistory();

const Routing = () => (
  <>
    <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
    </Breadcrumb>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={UserPage} />
        <Route exact path="/user/:id" component={UserDetailPage} />
        <Route exact path="/post/:id" component={PostPage} />
        <Route exact path="/album/:id" component={AlbumPage} />
      </Switch>
    </Router>
  </>
);

export default Routing;
