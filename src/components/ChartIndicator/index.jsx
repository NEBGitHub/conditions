import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

import { lang } from '../../constants';

const ChartIndicator = (props) => {
  const lineHeight = props.yBottom - props.yTop;
  const circle = (props.radius <= 0) ? null : (
    <circle
      className="selectedCircle"
      cx={0}
      cy={lineHeight + props.radius}
      r={props.radius}
      strokeWidth={4}
    />
  );
  const label = typeof props.label === 'undefined' ? null : (
    <text x="0" y="-16" textAnchor="middle" alignmentBaseline="bottom">
      {(typeof props.label === 'number') ? props.label.toLocaleString(lang) : props.label}
      {(props.allThemes) ? '*' : ''}
    </text>
  );
  return (
    <g className="ChartIndicator" transform={`translate(${props.x}, ${props.yTop})`}>
      <path
        className="arrow"
        d="M -5 -10 L 5 -10 L 0 0 z"
      />
      <line
        className="line"
        x1={0}
        x2={0}
        y1={5}
        y2={lineHeight}
      />
      {circle}
      {label}
    </g>
  );
};

ChartIndicator.propTypes = {
  x: PropTypes.number,
  yBottom: PropTypes.number,
  yTop: PropTypes.number.isRequired,
  radius: PropTypes.number,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  allThemes: PropTypes.bool,
};

ChartIndicator.defaultProps = {
  radius: 0,
  label: '',
  x: 0,
  yBottom: 0,
  allThemes: false,
};

export default React.memo(ChartIndicator);
