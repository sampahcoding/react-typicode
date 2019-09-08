import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CommentsContext = React.createContext();

const CommentsProvider = (props) => {
  const { data, children } = props;
  const [comments, setComments] = useState(data);

  return (
    <CommentsContext.Provider value={[comments, setComments]}>
      {children}
    </CommentsContext.Provider>
  );
};

export { CommentsContext, CommentsProvider };

CommentsProvider.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.instanceOf(Object).isRequired,
};

CommentsProvider.defaultProps = {
  data: [],
};
