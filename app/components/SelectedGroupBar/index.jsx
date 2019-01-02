import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const SelectedGroupBar = props => (
  <div className="SelectedGroupBar">
    <p style={{ background: props.backgroundColor }}>
      <span style={{ fontSize: props.groupSize }}>{props.group}:</span>
      <span style={{ fontSize: props.groupItemSize }}>{props.children}</span>
    </p>
  </div>
);

SelectedGroupBar.propTypes = {
  group: PropTypes.string.isRequired,
  groupSize: PropTypes.string,
  children: PropTypes.node.isRequired,
  groupItemSize: PropTypes.string,
  backgroundColor: PropTypes.string,
};

SelectedGroupBar.defaultProps = {
  backgroundColor: '',
  groupSize: '16px',
  groupItemSize: '14px',
};

export default SelectedGroupBar;