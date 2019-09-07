import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PostsContext = React.createContext();

const PostsProvider = (props) => {
  const [posts, setPosts] = useState(props.posts);

  return (
    <PostsContext.Provider value={[posts, setPosts]}>
      {props.children}
    </PostsContext.Provider>
  );
}

export { PostsContext, PostsProvider };

PostsProvider.propTypes = {
  posts: PropTypes.array,
  children: PropTypes.object
};
