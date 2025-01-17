/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import memoize from 'lodash.memoize';
import { browseByType, displayOrder, featureTypes } from '../../../proptypes';
import LocationRay from '../LocationRay';
import hashValuesDiffer from '../../../utilities/hashValuesDiffer';
import memoizeReference from '../../../utilities/memoizeReference';

import { handleAnalyticsInteraction } from '../../../utilities/analyticsReporting';

import flagLayoutCalculation from '../CompanyFlag/flagLayoutCalculation';
import CompanyFlag from '../CompanyFlag';

const updateFlagLayout = memoize((wheelType, items) => {
  const flagData = wheelType === 'company' ? items.map(company => company.projectIds) : [];
  return flagLayoutCalculation(flagData);
}, (type, items) => `${type}-${memoizeReference(items)}`);

class WheelRay extends React.Component {
  static propTypes = {
    onChangeRay: PropTypes.func.isRequired,
    onChangeDot: PropTypes.func.isRequired,
    wheelType: browseByType.isRequired,
    degreesPerItem: PropTypes.number.isRequired,
    reservedDegrees: PropTypes.number.isRequired,
    rotation: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentIndex: PropTypes.number.isRequired,
    relevantProjectLookup: PropTypes.objectOf(PropTypes.bool),
    filteredProjectLookup: PropTypes.objectOf(PropTypes.bool),
    displayOrder: displayOrder.isRequired,
    selectedFeature: featureTypes.isRequired,
    searchedRegionsLookup: PropTypes.objectOf(PropTypes.bool),
  }

  static defaultProps = {
    relevantProjectLookup: {},
    filteredProjectLookup: {},
    searchedRegionsLookup: {},
  };

  static getDerivedStateFromProps(props) {
    return {
      ...updateFlagLayout(props.wheelType, props.items),
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      flagLayouts: null,
      flagScale: 1,
    };
  }

  shouldComponentUpdate(nextProps) {
    return hashValuesDiffer(this.props, nextProps, [
      'currentIndex',
      'wheelType',
      'items',
      'relevantProjectLookup',
      'filteredProjectLookup',
      'selectedFeature',
      'flagLayouts',
      'flagScale',
    ]);
  }

  render() {
    const { props } = this;
    // eslint-disable-next-line object-curly-newline
    const { items, degreesPerItem, reservedDegrees, rotation,
      currentIndex, wheelType,
    } = props;
    const width = '19%';
    const halfReservedDegrees = reservedDegrees / 2;
    let legendTracker = null;

    const rays = items.map((item, index) => {
      let position = rotation;
      const plotIndex = currentIndex - index;
      if (plotIndex < 0) {
        position -= (plotIndex * degreesPerItem) - halfReservedDegrees;
      } else if (plotIndex > 0) {
        position -= halfReservedDegrees + (plotIndex * degreesPerItem);
      }

      const transform = `rotate(${(position % 360).toFixed(2)})`;

      const componentToReturn = wheelType === 'company'
        ? (
          <React.Fragment key={`${item.id}CompanyRay`}>
            {
              (!this.state.flagLayouts) ? null : (
                <g
                  key="flag"
                  transform={transform}
                  className="companyRay"
                  {...handleAnalyticsInteraction('select project from wheel', `${item.name}: project id ${index}`, props.onChangeDot, index)}
                >
                  <CompanyFlag
                    y={-65}
                    flagLayout={this.state.flagLayouts[index]}
                    svgHeight={100}
                    dotWidth={0.8 * this.state.flagScale}
                    dotSpacing={this.state.flagScale}
                    rotation={90}
                    relevantProjectLookup={this.props.relevantProjectLookup}
                    filteredProjectLookup={this.props.filteredProjectLookup}
                  />
                </g>
              )
            }
            {/* This rect will be used to denote the letter separation in the location wheel
            also to can be used to mark the search */}
            {
              (item.name.charAt(0) === legendTracker) ? null : (
                <text
                  key="legend"
                  className="textLabels"
                  transform={`${transform} translate(28.75) rotate(90)`}
                  {...handleAnalyticsInteraction('select company from wheel', item.name, props.onChangeRay, index)}
                >
                  {item.name.charAt(0)}
                </text>
              )
            }
          </React.Fragment>
        )
        : (
          <React.Fragment key={`${item.id}LocationRay`}>
            <g
              key="chart"
              transform={transform}
              className="locationRay"
              {...handleAnalyticsInteraction('select region from wheel', `${item.name}, ${item.province}`, props.onChangeRay, index)}
            >
              <LocationRay
                regionId={item.id}
                items={item.aggregatedCount}
                height={degreesPerItem * 0.5}
                width={width}
                searched={!!(this.props.searchedRegionsLookup[item.id])}
                adjustRotationReference={degreesPerItem / 2}
                displayOrder={this.props.displayOrder}
                selectedFeature={this.props.selectedFeature}
              />
            </g>
            {
              (item.province !== legendTracker)
                ? (
                  <g key="text" transform={`${transform} translate(28.75)`} className="locationRay">
                    <line
                      className="regionDivider"
                      transform="rotate(90)"
                      x1="0"
                      y1="0.6"
                      x2="0"
                      y2="-2"
                    />
                    <text
                      className="textLabels"
                      transform="rotate(94)"
                      textAnchor="right"
                      {...handleAnalyticsInteraction('select province from wheel', item.province, props.onChangeRay, index)}
                    >
                      &nbsp;{item.province}
                      <title>
                        {item.province}
                      </title>
                    </text>
                  </g>
                ) : null
            }
          </React.Fragment>
        );
      legendTracker = props.wheelType === 'company'
        ? item.name.charAt(0)
        : item.province;
      return index === currentIndex ? null : componentToReturn;
    });

    return (
      <svg className="WheelRay" width="100%" height="100%" viewBox="-50 -50 100 100 ">
        {rays}
      </svg>
    );
  }
}

export default WheelRay;
