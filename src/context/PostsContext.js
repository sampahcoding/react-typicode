import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PostsContext = React.createContext();

const PostsProvider = (props) => {
  const { data, children } = props;
  const [posts, setPosts] = useState(data);

  return (
    <PostsContext.Provider value={[posts, setPosts]}>
      {children}
    </PostsContext.Provider>
  );
};

export { PostsContext, PostsProvider };

PostsProvider.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.instanceOf(Object),
};
PostsProvider.defaultProps = {
  data: [],
  children: <></>,
};
