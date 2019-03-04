import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import List from '../List';
import ProjectChart from './ProjectChart';
import './styles.scss';

class ProjectMenu extends React.PureComponent {
  static propTypes = {
    /** All of the project data and its condition data */
    projectData: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      graphData: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
      })),
    })).isRequired,
    /** The ID of the project that is currently selected */
    selectedProjectID: PropTypes.number.isRequired,
    /** The method tracking which project is currently being selected */
    onChange: PropTypes.func.isRequired,
    /** The selected feature */
    selectedFeature: PropTypes.string.isRequired,
  }

  getListItems = () => {
    const projectIndex = this.props.projectData
      .findIndex(project => project.id === this.props.selectedProjectID);

    const distanceFromEnd = this.props.projectData.length - projectIndex;
    const numBefore = Math.min(projectIndex, 2);
    const numAfter = Math.min(distanceFromEnd, 2);

    return this.props.projectData
      .slice(projectIndex - numBefore, projectIndex + numAfter + 1);
  }

  handleConditionChange = (listItemIndex) => {
    const visibleListItems = this.getListItems();
    this.props.onChange(visibleListItems[listItemIndex].id);
  }

  render() {
    const listItems = this.getListItems();
    const renderedItems = listItems
      .map(project => (
        <ProjectChart
          key={project.id}
          chartType={this.props.selectedFeature}
          graphData={project.graphData}
          projectName={project.name}
          selected={project.id === this.props.selectedProjectID}
        />
      ));
    const selected = listItems
      .findIndex(project => project.id === this.props.selectedProjectID);

    const itemsBefore = selected < 2 ? Math.max(2 - selected, 0) : 0;
    const itemsAfter = (selected > (listItems.length - 3)) ? (listItems.length - 2) : 0;

    return (
      <div
        className={classNames(
          'ProjectMenu',
          `paddingBefore${itemsBefore}`,
          `paddingAfter${itemsAfter}`,
        )}
      >
        <div className="pipe" />
        <List
          items={renderedItems}
          onChange={this.handleConditionChange}
          selected={selected}
          horizontal
        />
      </div>
    );
  }
}

export default ProjectMenu;
