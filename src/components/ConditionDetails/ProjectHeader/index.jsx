import React from 'react';
import PropTypes from 'prop-types';
import AdvancedFormattedMessage from '../../AdvancedFormattedMessage';

import CountBubble from '../../CountBubble';

import handleInteraction from '../../../utilities/handleInteraction';
import { handleAnalyticsInteraction } from '../../../utilities/analyticsReporting';

import './styles.scss';

const lessButton = (
  <>
    <AdvancedFormattedMessage
      id="components.conditionDetails.less"
      className="upperCase"
      tag="h1"
    />
    <svg className="arrow" viewBox="0 0 16 24">
      <polyline points="4,4 12,12.5 4,20 4,4" />
    </svg>
  </>
);

const moreButton = (
  <>
    <svg className="arrow" viewBox="0 0 16 24">
      <polyline points="12,4 4,12.5 12,20 12,4" />
    </svg>
    <AdvancedFormattedMessage
      id="components.conditionDetails.more"
      className="upperCase"
      tag="h1"
    />
  </>
);

const ProjectHeader = props => (
  <div className="ProjectHeader">
    <div className="topBar">
      {(props.browseBy === 'company')
        ? (
          <>
            <AdvancedFormattedMessage
              id="components.conditionDetails.selectedProject"
              tag="h1"
            />
            {(props.selectedProject !== '')
              ? (
                <button
                  type="button"
                  className="openProject"
                  {...handleAnalyticsInteraction('project details', props.selectedProject, props.openProjectDetails)}
                >
                  <h2 title={props.selectedProject}>
                    <span className="projectName">{props.selectedProject}</span>
                    <span className="asterisk">*</span>
                  </h2>
                </button>
              )
              : <div className="openProject" />}
          </>
        )
        : (
          <>
            <AdvancedFormattedMessage
              id="components.conditionDetails.selectedCondition"
              tag="h1"
            />
            <div className="openProject" />
          </>
        )}
      {!props.isExpandable ? null : (
        <button
          type="button"
          className="toggleExpand"
          {...handleInteraction(props.toggleExpanded, !props.expanded)}
        >
          {props.expanded ? lessButton : moreButton}
        </button>
      )}
    </div>
    {(props.counts.instruments)
      ? (
        <div className="counts">
          <CountBubble count={props.counts.instruments} textId="instruments" />
          <CountBubble count={props.counts.conditions} textId="conditions" />
        </div>
      )
      : null}
  </div>
);

ProjectHeader.propTypes = {
  isExpandable: PropTypes.bool,
  expanded: PropTypes.bool,
  selectedProject: PropTypes.string.isRequired,
  toggleExpanded: PropTypes.func.isRequired,
  browseBy: PropTypes.oneOf(['company', 'location']),
  openProjectDetails: PropTypes.func.isRequired,
  counts: PropTypes.shape({
    instruments: PropTypes.number,
    conditions: PropTypes.number,
  }),
};

ProjectHeader.defaultProps = {
  isExpandable: false,
  expanded: false,
  browseBy: 'company',
  counts: {
    instruments: 0,
    conditions: 0,
  },
};

export default React.memo(ProjectHeader);
