import React, { useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import PropTypes from 'prop-types';

const Image = (props) => {
  const { children } = props;
  const [shown, setShown] = useState(false);
  return (
    <VisibilitySensor partialVisibility delayedCall intervalDelay={200}>
      {
        ({ isVisible }) => {
          // load image only one time, first time visible on screen.
          if (isVisible && !shown) {
            setShown(true);
          }
          return (
            <>
              { shown ? children : (
                <div style={{
                  width: '100%',
                  paddingTop: '100%',
                  position: 'relative',
                  backgroundColor: '#bfbfbf12',
                }}
                />
              ) }
            </>
          );
        }
      }
    </VisibilitySensor>
  );
};

export default Image;

Image.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};
