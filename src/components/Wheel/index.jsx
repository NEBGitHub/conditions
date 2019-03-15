/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Spring, animated } from 'react-spring/renderprops';
import PropTypes from 'prop-types';
import './styles.scss';

import Ring from './Ring';
import PullToSpin from './PullToSpin';
import WheelRay from './WheelRay';
import { browseByType } from '../../proptypes';
import WheelList from './WheelList';

const reservedDegrees = 14;

const AnimatedWheelRay = animated(WheelRay);

class Wheel extends React.Component {
  static propTypes = {
    wheelType: browseByType.isRequired,
    itemsData: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.object).isRequired,
      legendData: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
    selectedRay: PropTypes.string,
    selectRay: PropTypes.func.isRequired,
  };

  static defaultProps = {
    selectedRay: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      oldRotation: 0,
      newRotation: 0,
      degreesPerItem: 0,
      selectedIndex: 0,
      needsSpin: false,
      unanimatedSpin: false,
    };
  }

  static getDerivedStateFromProps(props, prevState) {
    const { items } = props.itemsData;
    const degreesAvailForPlotting = 360 - reservedDegrees;
    const degreesPerItem = degreesAvailForPlotting / (items.length - 1);
    let selectedIndex = items.findIndex(v => v._id === props.selectedRay);
    // eslint-disable-next-line prefer-destructuring
    selectedIndex = selectedIndex >= 0 ? selectedIndex : 0;
    // eslint-disable-next-line prefer-destructuring
    let newRotation = prevState.newRotation;
    // console.log(`prevNewRotation: ${prevState.newRotation}`);
    if (prevState.needsSpin) {
      const minimumRotation = 360 - (prevState.newRotation % 360);
      newRotation += minimumRotation + (selectedIndex * degreesPerItem);
    } else {
      const diff = Math.abs(selectedIndex - prevState.selectedIndex);
      // console.log(`diff: ${diff}, items.length - 1: ${items.length - 1}`);
      if (diff < items.length - 1) {
        const adding = ((selectedIndex - prevState.selectedIndex) * degreesPerItem);
        // console.log(`adding: ${adding}`);
        newRotation += adding;
      } else {
        newRotation += -(Math.sign(selectedIndex - prevState.selectedIndex) * degreesPerItem);
      }
      // console.log({ newRotation, selectedIndex });
    }
    return {
      degreesPerItem,
      selectedIndex,
      oldRotation: prevState.newRotation || 0,
      newRotation,
      needsSpin: false,
    };
  }

  onClickSpin = () => {
    const { items } = this.props.itemsData;
    const randomNum = Math.floor(Math.random() * items.length);
    this.setState({ needsSpin: true, unanimatedSpin: false });
    this.props.selectRay(items[randomNum]._id);
  };

  onChange = (index) => {
    this.setState({ unanimatedSpin: false });
    
    const { length } = this.props.itemsData.items;
    // TODO: check on resizing of letters on wheel list according to wheel size
    const newIndex = (2 * length - index)
    % length;
    
    this.setState(({ newRotation, degreesPerItem }) => {
      const currentIndex = (length
        + this.getIndex(newRotation))
          % length;
      const diff = Math.abs(newIndex - currentIndex);
      const isLargeDiff = diff > 50;
      
      let direction;
      if (newIndex > currentIndex && !isLargeDiff) {
        direction = 1;
      }  
      else if (newIndex < currentIndex && isLargeDiff) {
        direction = 1;
      } else {
        direction = -1;
      }
      const indexShift = isLargeDiff
        ? Math.min(newIndex, currentIndex) + 100 - Math.max(newIndex, currentIndex)
        : diff;
      return ({
        newRotation: newRotation + (direction * indexShift * degreesPerItem),
      });
    });
  };

  getIndex = currentRotation => Math.round((currentRotation % 360)
    / (360 / this.props.itemsData.items.length))

  stopWheel = (rotation) => {
    this.setState({ unanimatedSpin: true, newRotation: rotation });
  }

  render() {
    return (
      <div className="Wheel">
        <Spring
          immediate={this.state.unanimatedSpin}
          config={{ tension: 30, easing: 'easeInOutCirc' }}
          from={{
            transformOrigin: 'center',
            transform: `rotate(${this.state.oldRotation}deg)`,
            rotation: -this.state.oldRotation,
          }}
          to={{
            transform: `rotate(${this.state.newRotation}deg)`,
            rotation: -this.state.newRotation,
          }}
        >
          {props => (
            <div className="MovingContainer">
              <svg viewBox="0 0 860 860">
                <animated.g style={props}>
                  <g data-name="Group 3">
                    {/* following outer limit lines can be deleted once everything is rendered.
                      It is an accurate representation of spacing */}
                    <g className="OuterLimitCircle OutterCircles">
                      <circle cx="50%" cy="50%" r="50%" />
                    </g>
                    {/* following inner limit lines can be deleted once everything is rendered.
                    It is an accurate representation of spacing */}
                    <g className="OutterCircles RayCircle">
                      <circle className="cls-1" cx="50%" cy="50%" r="31%" />
                    </g>
                    <Ring ringType={this.props.wheelType} />
                    <AnimatedWheelRay
                      stopWheel={this.stopWheel}
                      wheelType={this.props.wheelType}
                      items={this.props.itemsData.items}
                      degreesPerItem={this.state.degreesPerItem}
                      reservedDegrees={reservedDegrees}
                      currentIndex={this.getIndex(props.rotation)
                        % this.props.itemsData.items.length}
                      {...props}
                    />
                  </g>
                </animated.g>
                <g transform="scale(2)">
                  <PullToSpin className="pullToSpin" onClickSpin={this.onClickSpin} role="button" />
                </g>
              </svg>
              <WheelList
                wheelType={this.props.wheelType}
                listContent={this.props.itemsData.items}
                textClippingRadius="60"
                onChange={this.onChange}
                selected={((this.props.itemsData.items.length + this.getIndex(props.rotation))
                  % this.props.itemsData.items.length)}
              />
            </div>
          )
        }
        </Spring>
      </div>
    );
  }
}

export default Wheel;
