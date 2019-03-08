import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAngleUp,
  faAngleDown,
  faAngleRight,
  faAngleLeft,
} from '@fortawesome/free-solid-svg-icons';

import handleInteraction from '../../utilities/handleInteraction';
import CircleContainer from '../CircleContainer';
import Icon from '../Icon';

import './styles.scss';

library.add(
  faAngleUp,
  faAngleDown,
  faAngleRight,
  faAngleLeft,
);

class List extends React.PureComponent {
  onWheel = (e) => {
    e.preventDefault();

    const inc = (e.deltaY > 0 && 1) || (e.deltaY < 0 && -1);
    if (!inc) return;

    const newIndex = Math.min(Math.max(0, this.props.selected + inc), this.props.items.length - 1);
    if (newIndex !== this.props.selected) this.props.onChange(newIndex);
  }

  render = () => {
    if (this.props.items.length === 0) { return null; }

    // Selected index cannot exceed the length of the array
    const selectedIndex = (this.props.selected < this.props.items.length) ? this.props.selected : 0;

    // arrowSize should match the legend style's arrow-size variable
    // (there are testing issues with :export)
    const arrowSize = 24;
    const previousIcon = this.props.horizontal ? 'angle-left' : 'angle-up';
    const nextIcon = this.props.horizontal ? 'angle-right' : 'angle-down';

    return (
      <div
        className={classNames(
          'List',
          this.props.className,
          { horizontal: this.props.horizontal, guideLine: this.props.guideLine },
        )}
        onWheel={this.onWheel}
      >
        <ul>
          {this.props.items.map((item, i) => (
            <li
              key={item.key || item}
              className={classNames('List-Item', { selected: selectedIndex === i })}
            >
              {selectedIndex !== i || selectedIndex === 0
                ? null
                : (
                  <CircleContainer
                    size={arrowSize}
                    onClick={() => this.props.onChange(i - 1)}
                    className="arrowPrevious"
                  >
                    <Icon size="1x" icon={previousIcon} />
                  </CircleContainer>
                )}
              <div
                {...handleInteraction(this.props.itemInteractions && this.props.onChange, i)}
                className="List-Item-Content"
              >
                {item}
              </div>
              {selectedIndex !== i || selectedIndex === (this.props.items.length - 1)
                ? null
                : (
                  <CircleContainer
                    size={arrowSize}
                    onClick={() => this.props.onChange(i + 1)}
                    className="arrowNext"
                  >
                    <Icon size="1x" icon={nextIcon} />
                  </CircleContainer>
                )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

List.propTypes = {
  /** Rendered items to be displayed in the list */
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
  /** The index of the currently selected item */
  selected: PropTypes.number.isRequired,
  /** The flag to determine if the component renders horizontally */
  horizontal: PropTypes.bool,
  /** The flag to determine if the component renders a guide line for vertical lists only */
  guideLine: PropTypes.bool,
  /** A function that will receive an array index when an item is selected */
  onChange: PropTypes.func.isRequired,
  /** Bind onKeyPress and onClick for selecting an item */
  itemInteractions: PropTypes.bool,
  /** Additional className to add to the list */
  className: PropTypes.string,
  elevated: PropTypes.bool,
};

List.defaultProps = {
  horizontal: false,
  guideLine: false,
  itemInteractions: true,
  className: '',
  elevated: false,
};

export default List;
