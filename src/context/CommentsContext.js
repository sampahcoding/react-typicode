import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CommentsContext = React.createContext();

const CommentsProvider = (props) => {
  const [comments, setComments] = useState(props.comments);

  return (
    <CommentsContext.Provider value={[comments, setComments]}>
      {props.children}
    </CommentsContext.Provider>
  );
}

export { CommentsContext, CommentsProvider };

CommentsProvider.propTypes = {
  comments: PropTypes.array,
  children: PropTypes.array
};
