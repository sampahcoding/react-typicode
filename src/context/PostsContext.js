import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { initialState, postReducer } from '../reducer/PostReducer';

const PostsContext = React.createContext();

const PostsProvider = (props) => {
  const { children } = props;
  const [data, setData] = useReducer(postReducer, initialState);

  return (
    <PostsContext.Provider value={[data, setData]}>
      {children}
    </PostsContext.Provider>
  );
};

export { PostsContext, PostsProvider };

PostsProvider.propTypes = {
  children: PropTypes.instanceOf(Object),
};

PostsProvider.defaultProps = {
  children: <></>,
};
