import React from 'react';
import PropTypes from 'prop-types';

const Bar = props => (
  <rect
    className="Bar"
    width={props.width}
    height={props.height}
    x={props.x}
    y={props.y}
    fill={props.fill}
  />
);

Bar.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
};

export default Bar;
