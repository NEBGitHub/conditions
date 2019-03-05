import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';
import './styles.scss';
import ShareIcon from '../ShareIcon';
import AboutTextBox from './AboutTextBox';
import MethodologyTextBox from './MethodologyTextBox';
import DownloadsTextBox from './DownloadsTextBox';
import CircleContainer from '../CircleContainer';
import Icon from '../Icon';

library.add(
  faTwitter,
  faEnvelope,
  faFacebook,
  faLinkedin,
  faAngleDoubleUp,
);

class MainInfoBar extends React.PureComponent {
  // state = {
  //   activeDialog: this.props.activeDialog,
  // }

  // setActiveDialog = activeDialog => this.setState({ activeDialog });

  getDialogContent() {
    const { activeDialog } = this.props;
    if (activeDialog === 'About') { return <AboutTextBox />; }
    if (activeDialog === 'Methodology') { return <MethodologyTextBox />; }
    if (activeDialog === 'Downloads') { return <DownloadsTextBox />; }

    // Still need to render something so the container can animate
    return (<i />);
  }

  closeDialog = () => this.props.setActiveDialog('');

  textButtons() {
    const buttons = ['About', 'Methodology', 'Downloads'];
    const textButton = buttons.map(k => (
      <button
        key={k}
        id={k}
        className={`textButton ${this.props.activeDialog === k ? 'selected' : ''}`}
        type="button"
        onClick={() => this.props.setActiveDialog(k)}
      >
        {k}
      </button>
    ));
    return textButton;
  }

  render() {
    const iconsList = ['twitter', 'facebook', 'linkedin'];
    const emailIcon = (
      <ShareIcon
        target="email"
        prefix="fas"
      />
    );
    const icons = iconsList.map(k => (
      <ShareIcon
        key={k}
        target={k}
        prefix="fab"
      />
    ));
    return (
      <div className="MainInfoBar">
        <div className={classNames('topLine', { view1: this.props.isView1 })} />
        <div>
          {this.textButtons()}
        </div>
        <div className={classNames('content', { collapsed: this.props.activeDialog === '' })}>
          {this.getDialogContent()}
        </div>
        <div className="shareIcons">
          {emailIcon}
          {icons}
        </div>
        {
          this.props.activeDialog === ''
            ? null
            : (
              <CircleContainer
                className="angleDoubleDown"
                size={20}
                onClick={this.closeDialog}
              >
                <Icon size="1x" icon="angle-double-up" prefix="fas" />
              </CircleContainer>
            )
        }
      </div>
    );
  }
}

MainInfoBar.propTypes = {
  activeDialog: PropTypes.string,
  isView1: PropTypes.bool,
  setActiveDialog: PropTypes.func.isRequired,
};

MainInfoBar.defaultProps = {
  activeDialog: '',
  isView1: false,
};

export default MainInfoBar;
