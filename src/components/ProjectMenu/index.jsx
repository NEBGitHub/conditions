import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import List from '../List';
import ProjectChart from './ProjectChart';
import { project as projectData, nullableNumber } from '../../proptypes';
import './styles.scss';

class ProjectMenu extends React.PureComponent {
  static propTypes = {
    selectedProjectID: nullableNumber.isRequired,
    selectedFeature: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    projectsData: PropTypes.arrayOf(projectData).isRequired,
  }

  getListItems = () => {
    const { projectsData, selectedProjectID } = this.props;
    const projectIndex = selectedProjectID === null
      ? -1
      : projectsData.findIndex(project => project.id === selectedProjectID);
    if (projectsData.length === 0 && projectIndex === -1) {
      return [];
    }
    const distanceFromEnd = projectsData.length - projectIndex;
    const numBefore = Math.min(projectIndex, 2);
    const numAfter = Math.min(distanceFromEnd, 2);

    return projectsData
      .slice(projectIndex - numBefore, projectIndex + numAfter + 1);
  }

  handleConditionChange = (listItemIndex) => {
    const visibleListItems = this.getListItems();
    this.props.onChange(visibleListItems[listItemIndex].id);
  }

  getReformattedData = data => (
    Object.entries(data[this.props.selectedFeature])
      .map(([name, count]) => ({ name, count }))
  );

  render() {
    const listItems = this.getListItems();
    // If there are no listItems render virtualized data
    // TODO: Make fake renderedItems for loading of projectMenu
    const renderedItems = listItems ? listItems
      .map(project => (
        <ProjectChart
          key={project.id}
          chartType={this.props.selectedFeature}
          graphData={this.getReformattedData(project.data)}
          projectName={project.name.en}
          selected={project.id === this.props.selectedProjectID}
        />
      ))
      : [];

    const selected = this.props.selectedProjectID === null
      ? -1
      : listItems.findIndex(project => project.id === this.props.selectedProjectID);

    // If no project is selected, set it to the first project
    if (selected === -1) {
      if (listItems.length > 0) { this.props.onChange(listItems[0].id); }
      return null;
    }

    const paddingBefore = Math.max(0, 2 - selected);
    const paddingAfter = 5 - listItems.length - paddingBefore;

    return (
      <div
        className={classNames(
          'ProjectMenu',
          `paddingBefore${paddingBefore}`,
          `paddingAfter${paddingAfter}`,
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
