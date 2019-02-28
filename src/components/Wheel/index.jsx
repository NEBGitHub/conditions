/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Spring, animated } from 'react-spring/renderprops';
import PropTypes from 'prop-types';
import './styles.scss';

import Ring from './Ring';
import PullToSpin from './PullToSpin';
import WheelRay from './WheelRay';
import { browseByType } from '../../proptypes';

const reservedDegrees = 18;

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
    console.log(items);
    const degreesAvailForPlotting = 360 - reservedDegrees;
    const degreesPerItem = degreesAvailForPlotting / (items.length - 1);

    let selectedIndex = items.findIndex(v => v._id === props.selectedRay);
    // eslint-disable-next-line prefer-destructuring
    selectedIndex = selectedIndex >= 0 ? selectedIndex : 0;
    // eslint-disable-next-line prefer-destructuring
    let newRotation = prevState.newRotation;
    if (prevState.needsSpin) {
      const minimumRotation = 360 - (prevState.newRotation % 360);
      newRotation += minimumRotation + (selectedIndex * degreesPerItem);
    } else {
      newRotation += Math.abs(selectedIndex - prevState.selectedIndex) < items.length - 1
        ? ((selectedIndex - prevState.selectedIndex) * degreesPerItem)
        : -(Math.sign(selectedIndex - prevState.selectedIndex) * degreesPerItem);
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

  rotateWheelOneStep = (prev = false) => {
    this.setState({ unanimatedSpin: false });
    const { items } = this.props.itemsData;
    const direction = prev ? -1 : 1;
    const newIndex = (this.state.selectedIndex + direction + items.length) % items.length;
    this.props.selectRay(items[newIndex]._id);
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
          config={{ tension: 50, clamp: true, mass: 0.7 }}
          from={{
            transformOrigin: '50% 50.31%',
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
                  <g data-name="Group 3" transform="translate(-27.5 -122.8)">
                    {/* following outer limit lines can be deleted once everything is rendered.
                      It is an accurate representation of spacing */}
                    <g className="OuterLimitCircle OutterCircles" transform="translate(27.5 125.5)">
                      <circle cx="430" cy="430" r="426" />
                    </g>
                    <g data-name="wheelGroup" transform="translate(86 102)">
                      {/* following inner limit lines can be deleted once everything is rendered.
                      It is an accurate representation of spacing */}
                      <g className="OutterCircles RayCircle" transform="translate(107.5 189.5)">
                        <circle className="cls-1" cx="264" cy="264" r="263.5" />
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
                        legendPositionArray={this.props.itemsData.legendData}
                        {...props}
                      />
                    </g>
                  </g>
                </animated.g>
                <g transform="scale(2)">
                  <PullToSpin className="pullToSpin" onClickSpin={this.onClickSpin} role="button" />
                </g>
              </svg>
              <div className="list">
                {this.props.itemsData.items[
                  (this.props.itemsData.items.length + (this.getIndex(props.rotation)))
                    % this.props.itemsData.items.length
                ].company_name}
              </div>
              <button
                onClick={() => this.stopWheel(-props.rotation)}
                type="button"
              >Stop Rotation
              </button>
              <button className="plus" onClick={() => this.rotateWheelOneStep(false)} type="button">+1</button>
              <button className="minus" onClick={() => this.rotateWheelOneStep(true)} type="button">-1</button>
            </div>
          )
        }
        </Spring>
      </div>
    );
  }
}

export default Wheel;
