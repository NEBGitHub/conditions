import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss';
import handleInteraction from '../../utilities/handleInteraction';

const CircleContainer = props => (
  <div
    className={classNames(
        'CircleContainer',
        { elevated: props.elevated, disabled: props.disabled },
      )}
    style={{
        width: props.size,
        height: props.size,
      }}
    {...(!props.onClick ? {} : handleInteraction(props.onClick))}
  >
    <div className="CircleContainer__Content">
      {props.children}
    </div>
  </div>
);

CircleContainer.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  size: PropTypes.string.isRequired,
  elevated: PropTypes.bool,
  disabled: PropTypes.bool,
};

CircleContainer.defaultProps = {
  onClick: null,
  disabled: false,
  elevated: false,
};

export default CircleContainer;
