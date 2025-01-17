import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faInfoCircle,
  faAngleDoubleDown,
} from '@fortawesome/free-solid-svg-icons';
import './styles.scss';
import ShareIcon from '../ShareIcon';
import CircleContainer from '../CircleContainer';
import Icon from '../Icon';
import handleInteraction from '../../utilities/handleInteraction';

library.add(
  faTwitter,
  faEnvelope,
  faFacebook,
  faLinkedin,
  faInfoCircle,
  faAngleDoubleDown,
);

class ShortcutInfoBar extends React.PureComponent {
  static propTypes = {
    jumpToAbout: PropTypes.func.isRequired,
    openDataModal: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  toggleExpanded = () => this.setState(({ expanded }) => ({ expanded: !expanded }));

  render() {
    const expandedContent = !this.state.expanded
      ? null
      : (
        <div className="InfoBar">
          <div className="About" {...handleInteraction(this.props.jumpToAbout)}>
            <button
              type="button"
              onClick={this.props.jumpToAbout}
            >
              <FormattedMessage id="components.shortcutInfoBar.about" />
            </button>
            <CircleContainer className="AngleDoubleDown" size={20}>
              <Icon color="#D1057A" size="1x" icon="angle-double-down" prefix="fas" />
            </CircleContainer>
          </div>
          <div className="Icons">
            <FormattedMessage id="components.shortcutInfoBar.share" />
            &nbsp;
            <ShareIcon target="email" prefix="fas" />
            <ShareIcon target="twitter" />
            <ShareIcon target="facebook" />
            <ShareIcon target="linkedin" />
          </div>
          <div className="Icons" {...handleInteraction(this.props.openDataModal)}>
            <FormattedMessage id="components.shortcutInfoBar.download" />
            &nbsp;
            <svg className="downloadIcons" width="40" height="16">
              <g
                key="file-download"
                icon="file-download"
              >
                <path fill="#666" d="M2.9,13.3s-.4-.3,0-.3H4.5V9.2c0-.1.1-.2.3-.2H7c.1,0,.2.1.3.2v3.7H8.8c.5,0,.2.3.2.3L6.1,16Z" />
                <polygon fill="none" points="0 0 0 11.6 3.4 11.6 3.4 6.7 8.3 6.7 8.3 11.6 11.6 11.6 11.6 0 0 0" />
                <line strokeMiterlimit="10" x1="0.5" y1="11.1" x2="11.2" y2="11.1" />
                <rect fill="none" width="11.6" height="11.6" />
                <path fill="#666" d="M7.8,1l2.8,2.9v6.8H1V1.1H7.8M8.2,0H0V11.6H11.6V3.4L8.2,0Z" />
                <line stroke="#666" strokeWidth="0.75p" x1="7.7" y1="0.4" x2="7.7" y2="4" />
                <line stroke="#666" strokeWidth="0.75px" x1="11.2" y1="4" x2="7.3" y2="4" />
              </g>
            </svg>
          </div>
        </div>
      );

    return (
      <div className="ShortcutInfoBar">
        <div className="Content">
          <svg
            viewBox="0 0 50 50"
            className="InfoButton"
            {...handleInteraction(this.toggleExpanded)}
          >
            <g transform="scale(3)">
              <path fill="none" stroke="#fff" strokeMiterlimit={10} d="M8.3.5a7.8,7.8,0,1,0,7.8,7.8A7.81,7.81,0,0,0,8.3.5" />
              <path fill="#fff" d="M6,7.2a4.3,4.3,0,0,1,1.8-.5c.9,0,1.7.5,1.7,1.3a9,9,0,0,1-.3,1.9s-.2.9-.3,1.2-.2.8.2,1,1.2-.4,1.2-.4l-.4,1.1a4,4,0,0,1-1.5.4,2.35,2.35,0,0,1-1.6-.5,2,2,0,0,1-.4-1.9c.1-.5.8-2.5.6-3S5.8,8,5.8,8Z" />
              <path fill="#fff" d="M7.3,4.3A1.42,1.42,0,0,1,8.7,3,1.33,1.33,0,0,1,9.9,4.4,1.42,1.42,0,0,1,8.5,5.7,1.17,1.17,0,0,1,7.3,4.3" />
            </g>
          </svg>
          {expandedContent}
        </div>
        <div className="clearfix" />
      </div>
    );
  }
}

export default ShortcutInfoBar;
