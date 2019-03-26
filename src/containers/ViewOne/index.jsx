import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import ConditionExplorer from '../../components/ConditionExplorer';
import keywords from '../../components/ConditionExplorer/mockKeywords';
import BrowseByBtn from '../../components/BrowseByBtn';
import ShortcutInfoBar from '../../components/ShortcutInfoBar';
import SkipIntro from '../../components/SkipIntro';
import './styles.scss';

const noop = () => {};
const uniqueKeywords = keywords.filter((v, i) => keywords.indexOf(v) === i);

const ViewOne = props => (
  <section className={classNames('ViewOne', { layoutOnly: props.layoutOnly })}>
    <section className="row intro">
      <section className="introduction">
        <FormattedMessage id="views.view1.header.title" tagName="h1" />
        <FormattedMessage id="views.view1.header.subtitle" />
      </section>
    </section>
    <section className="row explorer">
      <section className="explorer">
        <ConditionExplorer keywords={uniqueKeywords} />
      </section>
    </section>
    <section className="row buttons">
      <section className="browseBy">
        <SkipIntro className="showArrow" />
        <BrowseByBtn classNames="company" mode="company" onClick={noop} />
        <BrowseByBtn classNames="location" mode="location" onClick={noop} />
      </section>
      <section className="infoBar">
        <ShortcutInfoBar
          handleInfoBar={false}
          jumpToAbout={noop}
          openDataModal={noop}
          openScreenshotModal={noop}
        />
      </section>
    </section>
  </section>
);

ViewOne.propTypes = {
  layoutOnly: PropTypes.bool,
};

ViewOne.defaultProps = {
  layoutOnly: PropTypes.false,
};

export default ViewOne;
