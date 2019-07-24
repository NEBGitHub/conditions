import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import handleInteraction from '../../../utilities/handleInteraction';
import joinJsxArray from '../../../utilities/joinJsxArray';

import './styles.scss';

import ContentBlock from '../ContentBlock';

class Content extends React.PureComponent {
  renderContentText = (id, content) => (
    <FormattedMessage id={id}>
      {(text) => {
        const fullText = `<span class="contentHeading">${text}:&nbsp;</span>${content}`;
        return (
        // eslint-disable-next-line react/no-danger
          <div className="contentText" dangerouslySetInnerHTML={{ __html: fullText }} />
        );
      }
        }
    </FormattedMessage>
  )

  renderInstrumentLink = instrumentNumber => (
    <button
      type="button"
      className="instrumentLink"
      {...handleInteraction(this.props.openIntermediatePopup)}
    >
      {instrumentNumber}
    </button>
  )

  getHighlightedKeywords = (matchList, givenString) => {
    if (matchList.length === 0) {
      return { highlightedText: givenString, matchedKeywords: [] };
    }
    const matched = [];
    const highlightedText = givenString.replace(
      new RegExp(`(${matchList.join('|')})`, 'gi'),
      (_, match) => {
        const keyword = match.toLowerCase();
        if (!matched.includes(keyword)) {
          matched.push(keyword);
        }
        return `<span class="highlighted">${match}</span>`;
      },
    );

    const matchedKeywords = joinJsxArray(
      matched.map(keyword => (
        <span className="highlighted">{keyword}</span>
      )),
      ', ',
    );

    return { highlightedText, matchedKeywords };
  }

  render() {
    const data = this.props.instrument;
    const { highlightedText, matchedKeywords } = this.getHighlightedKeywords(
      this.props.includedKeywords,
      (this.props.itemIndex === -1) ? '' : data.conditions[this.props.itemIndex].text,
    );
    return (
      <div className="Content">{
        (this.props.itemIndex === -1)
          ? (
            <React.Fragment>
              <div className="half">
                <ContentBlock id="components.conditionDetails.issuanceDate" content={data.issuanceDate} />
                <ContentBlock id="components.conditionDetails.effectiveDate" content={data.effectiveDate} />
                {(data.sunsetDate !== 'null') ? (<ContentBlock id="components.conditionDetails.sunsetDate" content={data.sunsetDate} />) : null }
              </div>
              <div className="half">
                <ContentBlock id="components.conditionDetails.instrumentNumber" content={this.renderInstrumentLink(data.instrumentNumber)} />
                <ContentBlock id="components.conditionDetails.status" content={<FormattedMessage id={`common.status.${data.status}`} />} />
                <ContentBlock id="components.conditionDetails.location" content={data.location} />
              </div>
              {this.renderContentText('components.conditionDetails.activity', data.activity)}
            </React.Fragment>
          )
          : (
            <React.Fragment>
              <div className="half">
                <ContentBlock id="components.conditionDetails.effectiveDate" content={data.effectiveDate} />
              </div>
              <div className="half">
                <ContentBlock id="components.conditionDetails.instrumentNumber" content={this.renderInstrumentLink(data.instrumentNumber)} />
              </div>
              {(matchedKeywords.length !== 0) ? (<ContentBlock id="components.conditionDetails.keywords" content={matchedKeywords} />) : null}
              {this.renderContentText('components.conditionDetails.text', highlightedText)}
            </React.Fragment>
          )
        }
      </div>
    );
  }
}

Content.propTypes = {
  instrument: PropTypes.shape({
    instrumentNumber: PropTypes.string.isRequired,
    issuanceDate: PropTypes.string.isRequired,
    effectiveDate: PropTypes.string.isRequired,
    sunsetDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    location: PropTypes.array.isRequired,
    activity: PropTypes.string.isRequired,
    conditions: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  itemIndex: PropTypes.number.isRequired,
  openIntermediatePopup: PropTypes.func.isRequired,
  includedKeywords: PropTypes.arrayOf(PropTypes.string),
};
Content.defaultProps = {
  includedKeywords: [],
};

export default Content;
