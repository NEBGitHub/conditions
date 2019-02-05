import React from 'react';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from 'react-intl';
import handleInteraction from '../../../utilities/handleInteraction';
import CircleContainer from '../../CircleContainer';
import Icon from '../../Icon/index';
import './styles.scss';

library.add(
  faRedoAlt,
);
class FilterContent extends React.PureComponent {
  static propTypes = {
    yearRange: PropTypes.objectOf(PropTypes.number).isRequired,
    projectStatus: PropTypes.arrayOf(
      PropTypes.oneOf(
        ['OPEN', 'CLOSED', 'CANCELLED'],
      ),
    ).isRequired,
    onDragMove: PropTypes.func.isRequired,
    selectedYear: PropTypes.arrayOf(PropTypes.number).isRequired,
    changeProjectStatus: PropTypes.func.isRequired,
    display: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    closeTab: PropTypes.func.isRequired,
    yearSelect: PropTypes.func.isRequired,
    onYearKeyPress: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.isDragging = false;
  }

  onDragStart = () => {
    this.isDragging = true;
    this.props.yearSelect([]);
  }

  onDragMove = (event) => {
    if (!this.isDragging) { return; }
    this.props.onDragMove(event);
  }

  onDragStop = () => {
    this.isDragging = false;
  }

  onKeyPress = (event) => {
    const startYear = 70;
    const endYear = 80;
    const yearArray = [];
    for (let j = startYear; j <= endYear; j += 1) {
      yearArray.push(j);
    }
    if (event.key === 'ArrowRight' || event.keyCode === 39) {
      this.props.onYearKeyPress({
        array: yearArray,
        direction: 1,
      });
    }
    if (event.key === 'ArrowLeft' || event.keyCode === 37) {
      this.props.onYearKeyPress({
        array: yearArray,
        direction: -1,
      });
    }
  }

  yearRangeRender = (i) => {
    const startYear = i.start;
    const endYear = i.end;
    const yearArray = [];
    for (let j = startYear; j <= endYear; j += 1) {
      yearArray.push(j);
    }
    // Should remove this code.
    // if (yearArray.length === 0) { return null; }
    return (yearArray.map((i, index) => {
      const { selectedYear } = this.props;
      const arrayIndex = selectedYear.indexOf(index);

      if (arrayIndex === -1) {
        return (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <li
            {...handleInteraction(this.props.yearSelect, [yearArray.indexOf(i)])}
            key={i}
            onMouseDown={this.onDragStart}
            onMouseMove={this.onDragMove}
            onMouseUp={this.onDragStop}
            onKeyDown={this.onKeyPress}
          >
            <CircleContainer size={24} color="#999999" backgroundColor="#E6E6E6"> {i} </CircleContainer>
          </li>
        );
      }
      const classArray = [];
      classArray.push('regularBackground');
      if (selectedYear.length === 1) {
        classArray.push('rightCurve');
        classArray.push('leftCurve');
      } else if ((arrayIndex === 0 && selectedYear[1] > selectedYear[0])
        || (arrayIndex === selectedYear.length - 1
          && selectedYear[arrayIndex] < selectedYear[selectedYear.length - 2])) {
        classArray.push('leftCurve');
      } else if ((arrayIndex === 0 && selectedYear[1] < selectedYear[0])
        || (arrayIndex === selectedYear.length - 1
          && selectedYear[arrayIndex] > selectedYear[selectedYear.length - 2])) {
        classArray.push('rightCurve');
      }
      return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <li
          {...handleInteraction(this.props.yearSelect, [yearArray.indexOf(i)])}
          key={i}
          onMouseDown={this.onDragStart}
          onMouseMove={this.onDragMove}
          onMouseUp={this.onDragStop}
          onKeyDown={this.onKeyPress}
          className={classArray.toString().replace(/,/g, ' ')}
        >
          <CircleContainer size="24px" color="#4D4D4D" backgroundColor="white"> {i} </CircleContainer>
        </li>
      );
    }));
  }

  projectStatusRender = statusArray => (['OPEN', 'CLOSED', 'CANCELLED'].map(i => (
    <li
      key={i}
      {...handleInteraction(this.props.changeProjectStatus, i)}
      className={statusArray.indexOf(i) > -1 ? 'selectedProject' : ''}
    >
      <FormattedMessage id={`components.SearchBar.findWords.projectStatus.${i.toLowerCase()}`}>
        {text => text.toUpperCase()}
      </FormattedMessage>
    </li>
  )))

  render() {
    if (!this.props.display) { return null; }
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        onMouseUp={() => { this.isDragging = false; }}
        className="FilterContent"
      >
        <div {...handleInteraction(this.props.reset)} className="reset">
          <FormattedMessage id="components.SearchBar.reset">
            { text => text.toUpperCase()}
          </FormattedMessage>
          <Icon className="iconInline" icon="redo-alt" />
        </div>

        <div className="titleText">
          <FormattedMessage id="components.SearchBar.filter.projectYear" />
        </div>
        <ul className="projectList">
          {this.yearRangeRender(this.props.yearRange)}
        </ul>
        <div className="titleText">
          <FormattedMessage id="components.SearchBar.filter.projectStatus" />
        </div>
        <ul className="filter">
          {this.projectStatusRender(this.props.projectStatus)}
        </ul>
        <FormattedMessage id="components.SearchBar.close">
          { text => (
            <button {...handleInteraction(this.props.closeTab)} className="close" type="button">
              {text.toUpperCase()}
            </button>
          ) }
        </FormattedMessage>
      </div>
    );
  }
}

export default FilterContent;
