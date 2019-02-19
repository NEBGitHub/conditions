import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import './styles.scss';

class ContentBlock extends React.PureComponent {
  // (id, content, isHalf) => (
  render() {
    return (
      <div className={`ContentBlock ${(this.props.half ? 'half' : '')}`}>
        <FormattedMessage id={this.props.id} tagName="h4" />: {this.props.content}
      </div>
    );
  }
}

ContentBlock.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  half: PropTypes.bool,
};

ContentBlock.defaultProps = {
  half: false,
};

export default ContentBlock;
