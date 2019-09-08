import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { initialState, commentReducer } from '../reducer/CommentReducer';

const CommentsContext = React.createContext();

const CommentsProvider = (props) => {
  const { children } = props;
  const [data, setData] = useReducer(commentReducer, initialState);

  return (
    <CommentsContext.Provider value={[data, setData]}>
      {children}
    </CommentsContext.Provider>
  );
};

export { CommentsContext, CommentsProvider };

CommentsProvider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};
