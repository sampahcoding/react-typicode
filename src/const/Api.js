const endpoint = 'https://jsonplaceholder.typicode.com/';

const API = {
  ALBUMS: endpoint.concat('albums'),
  USERS: endpoint.concat('users'),
  PHOTOS: endpoint.concat('photos'),
  POSTS: endpoint.concat('posts'),
  COMMENTS: endpoint.concat('comments'),
};

export default API;
