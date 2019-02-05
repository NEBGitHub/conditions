import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import './styles.scss';

class FeatureTypesDescription extends React.PureComponent {
  constructor() {
    super();
    this.ref = React.createRef();
    this.headingRefs = {};
  }

  // Returns the localized heading and description text for a given feature type
  // in the form [heading, description]
  getFormattedTypeContent = (intl, feature, type) => {
    const headingId = `common.${feature}.${type}`;

    const heading = intl.formatMessage({ id: headingId });

    const description = intl.formatMessage({
      id: `components.featureTypesDescription.${feature}.${type}`,
    });

    return [heading, description];
  };

  // Adds color coding to Instrument codes at the beginning of a line
  addColorCoding = (item, colorCodes) => {
    const [, code, text] = item.match(/^([A-Z]+)(: .+)/);

    return (code)
      ? [
        <span key="type-code" className={`color-${colorCodes[code]}`}>{code}</span>,
        <span key="type-text">{text}</span>,
      ]
      : item;
  };

  // Returns a heading element and one or more paragraphs of localized text for a
  // given feature type, in the form [heading, description]
  renderTypeElements = (intl, feature, type, colorCodes) => {
    const [heading, description] = this.getFormattedTypeContent(
      intl,
      feature,
      type,
    );

    const typeDescription = description.split('\n')
      .map((item, idx) => {
        const text = (colorCodes)
          ? this.addColorCoding(item, colorCodes)
          : item;

        // eslint-disable-next-line react/no-array-index-key
        return <p key={`${type}-text-${idx}`}>{text}</p>;
      });

    return (
      <React.Fragment key={type}>
        <h4 data-heading={type}>{heading}</h4>
        {typeDescription}
      </React.Fragment>
    );
  };

  scrollTo = (type) => {
    const elm = this.ref.current.querySelector(`[data-heading="${type}"]`);
    this.ref.current.scrollTop = elm.offsetTop - this.ref.current.offsetTop;
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.scrollTarget !== this.props.scrollTarget) {
      this.scrollTo(this.props.scrollTarget);
    }
  };

  render() {
    const content = this.props.types.map((type) => {
      const elements = this.renderTypeElements(
        this.props.intl,
        this.props.feature,
        type,
        this.props.colorCodes,
      );

      return elements;
    });

    return (
      <div
        className="FeatureTypesDescription"
        ref={this.ref}
      >
        {content}
      </div>
    );
  }
}

FeatureTypesDescription.propTypes = {
  /** Keyword or path where types can be found (ex. "theme", "instrument.category" */
  feature: PropTypes.string.isRequired,
  /** Keywords in the translation file for each type
   * (ex. ["security", "managementSystem", "financial"]) */
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** Hash of instrument color codes (ex. {OPL: "routing"}  */
  colorCodes: PropTypes.objectOf(PropTypes.string),
  /** Heading that the container should scroll to (ex. "security") */
  scrollTarget: PropTypes.string,
  intl: intlShape.isRequired,
};

FeatureTypesDescription.defaultProps = {
  scrollTarget: '',
  colorCodes: null,
};

export default injectIntl(FeatureTypesDescription);
