import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { yearRangeType } from '../../../proptypes';
import joinJsxArray from '../../../utilities/joinJsxArray';

const formatSummaryText = (arr, mapFunc) => joinJsxArray(arr.map(mapFunc), ', ');

const HighlightSummary = props => (
  <div className="HighlightSummary">
    {!props.showFilterSummary ? null : (
      <>
        <FormattedMessage
          id="components.searchBar.highlightSummary.showing"
          values={{
            status: <FormattedMessage
              id={`components.searchBar.highlightSummary.${props.includedStatuses[1] ? 'ALL' : props.includedStatuses[0]}`}
            />,
            start: props.selectedYear.start,
            end: props.selectedYear.end,
          }}
        />
        <br />
      </>
    )}
    {props.includeKeywords.length === 0 ? null : (
      <>
        <FormattedMessage id="components.searchBar.highlightSummary.includes" tagName="p" />
        <div className="keywordsText">
          {formatSummaryText(
            props.includeKeywords,
            keyword => <span key={keyword}>{keyword}</span>,
          )}
        </div>
      </>
    )}
    {props.excludeKeywords.length === 0 ? null : (
      <>
        <FormattedMessage id="components.searchBar.highlightSummary.excludes" tagName="p" />
        <div className="keywordsText">
          {formatSummaryText(
            props.excludeKeywords,
            keyword => <span key={keyword}>{keyword}</span>,
          )}
        </div>
      </>
    )}
  </div>
);

HighlightSummary.propTypes = {
  showFilterSummary: PropTypes.bool.isRequired,
  selectedYear: yearRangeType.isRequired,
  includeKeywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  excludeKeywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  includedStatuses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default React.memo(HighlightSummary);
