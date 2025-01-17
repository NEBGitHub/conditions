/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Spring, animated } from 'react-spring/renderprops';
import PropTypes from 'prop-types';
import './styles.scss';

import hashValuesDiffer from '../../utilities/hashValuesDiffer';

import Ring from './Ring';
import PullToSpin from './PullToSpin';
import WheelRay from './WheelRay';
import { browseByType, displayOrder, featureTypes } from '../../proptypes';
import WheelList from './WheelList';

const reservedDegrees = 12;

const AnimatedWheelRay = animated(WheelRay);
const AnimatedWheelList = animated(WheelList);

class Wheel extends React.Component {
  static propTypes = {
    wheelType: browseByType.isRequired,
    wheelData: PropTypes.arrayOf(PropTypes.object).isRequired,
    // Incorrectly flagged by the linter:
    // eslint-disable-next-line react/no-unused-prop-types
    selectedRay: PropTypes.number,
    selectRay: PropTypes.func.isRequired,
    selectProject: PropTypes.func.isRequired,
    wheelMotionTrigger: PropTypes.func.isRequired,
    relevantProjectLookup: PropTypes.objectOf(PropTypes.bool),
    filteredProjectLookup: PropTypes.objectOf(PropTypes.bool),
    displayOrder: displayOrder.isRequired,
    selectedFeature: featureTypes.isRequired,
    searchedRegionsLookup: PropTypes.objectOf(PropTypes.bool),
  };

  static defaultProps = {
    selectedRay: null,
    relevantProjectLookup: {},
    filteredProjectLookup: {},
    searchedRegionsLookup: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      oldRotation: 0,
      newRotation: 0,
      degreesPerItem: 0,
      selectedIndex: 0,
      wheelModifiers: {
        spin: false,
      },
    };
  }

  static getDerivedStateFromProps(props, prevState) {
    const items = props.wheelData;
    if (!items.length > 0) return { ...prevState };
    if (props.selectedRay === null) {
      props.selectRay(items[Math.floor(Math.random() * items.length)].id);
    }
    const degreesPerItem = ((360 - reservedDegrees) / (items.length));
    const selectedIndex = items.findIndex(v => v.id === props.selectedRay);
    const { wheelModifiers } = prevState;
    let { newRotation } = prevState;
    if (props.wheelType !== prevState.wheelType) {
      newRotation = selectedIndex * (360 / items.length);
    } else if (wheelModifiers.spin || prevState.selectedIndex === -1) {
      const minimumRotation = 360 - (prevState.newRotation % 360);
      newRotation += minimumRotation + selectedIndex * (360 / items.length);
      wheelModifiers.spin = true;
    } else {
      wheelModifiers.spin = false;
      const diff = Math.abs(selectedIndex - prevState.selectedIndex);
      if (diff < items.length - 1) {
        const adding = (selectedIndex - prevState.selectedIndex) * (360 / items.length);
        newRotation += adding;
      } else {
        newRotation += -(Math.sign(selectedIndex - prevState.selectedIndex) * (360 / items.length));
      }
    }
    return {
      degreesPerItem,
      selectedIndex,
      oldRotation: prevState.newRotation || 0,
      newRotation,
      wheelModifiers,
      wheelType: props.wheelType,
    };
  }

  shouldComponentUpdate(nextProps) {
    return hashValuesDiffer(this.props, nextProps, [
      'wheelType',
      'selectedRay',
      'wheelData',
      'relevantProjectLookup',
      'filteredProjectLookup',
      'selectedFeature',
    ]);
  }

  onClickSpin = () => {
    const items = this.props.wheelData;
    const randomNum = Math.floor(Math.random() * items.length);
    this.setState(prevState => ({ wheelModifiers: { ...prevState.wheelModifiers, spin: true } }));
    this.props.selectRay(items[randomNum].id);
  };

  onChangeRay = (index) => {
    this.props.selectRay(this.props.wheelData[index].id);
  };

  onChangeDot = (index, e) => {
    const id = parseInt(e.target.dataset.id, 10);

    if (id) {
      this.props.selectProject(id);
    } else {
      this.onChangeRay(index);
    }
  };

  getIndex = (currentRotation) => {
    const { length } = this.props.wheelData;
    const index = Math.round(((360 + (currentRotation % 360)) % 360) / (360 / length));
    return (length + (length - index)) % length;
  };

  stopWheel = (index) => {
    this.setState(prevState => (
      {
        newRotation: prevState.newRotation + (index * (360 / this.props.wheelData.length)),
        wheelModifiers: { ...prevState.wheelModifiers, needsSpin: false },
      }
    ));
  };

  shouldRender = componentRenderFn => (
    this.props.wheelData.length > 0 ? componentRenderFn() : null)
  ;

  render() {
    return (
      <div className="Wheel">
        <Spring
          native
          immediate={!this.state.wheelModifiers.spin}
          config={{
            tension: 30,
            friction: 20,
            precision: 0.05,
            clamping: true,
            easing: t => t * t * t * t * t,
          }}
          onStart={() => {
            this.state.wheelModifiers.spin = false;
            this.props.wheelMotionTrigger(true);
          }}
          onRest={() => { this.props.wheelMotionTrigger(false); }}
          from={{ rotation: -this.state.oldRotation }}
          to={{ rotation: -this.state.newRotation }}
        >
          {(props) => {
            const currentIndex = props.rotation.interpolate(r => this.getIndex(r));
            return (
              <div className="svgContainer">
                <svg viewBox="0 0 860 860">
                  <animated.g style={{ transform: props.rotation.interpolate(r => `rotate(${r.toFixed(2)}deg)`), transformOrigin: '50% 50%' }} className="MovingContainer">
                    <Ring ringType={this.props.wheelType} />
                    {this.shouldRender(() => (
                      <AnimatedWheelRay
                        onChangeRay={this.onChangeRay}
                        onChangeDot={this.onChangeDot}
                        stopWheel={this.stopWheel}
                        wheelType={this.props.wheelType}
                        items={this.props.wheelData}
                        degreesPerItem={this.state.degreesPerItem}
                        reservedDegrees={reservedDegrees}
                        currentIndex={currentIndex}
                        rotation={props.rotation.interpolate(r => r * -1)}
                        relevantProjectLookup={this.props.relevantProjectLookup}
                        filteredProjectLookup={this.props.filteredProjectLookup}
                        displayOrder={this.props.displayOrder}
                        selectedFeature={this.props.selectedFeature}
                        searchedRegionsLookup={this.props.searchedRegionsLookup}
                      />
                    ))}
                  </animated.g>
                </svg>
                <div className="interactiveItems">
                  <svg viewBox="0 0 860 860">
                    <g className="pullToSpinContainer">
                      <PullToSpin
                        className="pullToSpin"
                        onClickSpin={this.onClickSpin}
                        role="button"
                      />
                    </g>
                  </svg>
                  <AnimatedWheelList
                    wheelType={this.props.wheelType}
                    listContent={this.props.wheelData}
                    onChange={this.onChangeRay}
                    selected={currentIndex}
                  />
                </div>
              </div>
            );
          }}
        </Spring>
      </div>
    );
  }
}

export default Wheel;
