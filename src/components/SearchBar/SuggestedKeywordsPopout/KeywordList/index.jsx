import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import Icon from '../../../Icon';
import handleInteraction from '../../../../utilities/handleInteraction';
import { reportAnalytics } from '../../../../utilities/analyticsReporting';
import BarContainer from '../../../BarContainer';
import './styles.scss';

library.add(faMinusCircle, faPlusCircle);

class KeywordList extends React.PureComponent {
  static propTypes = {
    includeKeywords: PropTypes.arrayOf(PropTypes.string).isRequired,
    excludeKeywords: PropTypes.arrayOf(PropTypes.string).isRequired,
    setIncluded: PropTypes.func.isRequired,
    setExcluded: PropTypes.func.isRequired,
    keywords: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      category: PropTypes.arrayOf(PropTypes.string),
      conditionCount: PropTypes.number,
    })).isRequired,
    isExclude: PropTypes.bool.isRequired,
  }

  keywordOnClick = (word, e) => {
    const { isExclude, includeKeywords, excludeKeywords } = this.props;
    if (excludeKeywords.includes(word)) {
      reportAnalytics(e.type, 'remove suggested keyword', `exclude: ${word}`);
      this.props.setExcluded(excludeKeywords.filter(v => v !== word));
    } else if (includeKeywords.includes(word)) {
      reportAnalytics(e.type, 'remove suggested keyword', `include: ${word}`);
      this.props.setIncluded(includeKeywords.filter(v => v !== word));
    } else if (isExclude) {
      reportAnalytics(e.type, 'add suggested keyword', `exclude: ${word}`);
      this.props.setExcluded(excludeKeywords.concat(word));
    } else {
      reportAnalytics(e.type, 'add suggested keyword', `include: ${word}`);
      this.props.setIncluded(includeKeywords.concat(word));
    }
  };

  findMaxConditions = () => (
    Math.max(...this.props.keywords.map(({ conditionCount }) => conditionCount))
  );

  render() {
    const { keywords, includeKeywords, excludeKeywords } = this.props;
    return (
      <div className="KeywordList">
        <ul>
          {
            (keywords).map((value) => {
              const key = value.name;
              const [icon, iconClass, selectedColor] = (includeKeywords.includes(key)
                || excludeKeywords.includes(key))
                ? ['minus-circle', 'selectedIcon', 'rgb(238,97,41)']
                : ['plus-circle', 'regularIcon', 'rgb(96,96,96)'];

              const maxConditions = this.findMaxConditions();

              const conditions = (value.conditionCount / maxConditions);
              const remainingSpace = (1 - conditions);

              const plural = (value.conditionCount === 1) ? '' : 's';
              const conditionTextId = `components.searchBar.suggestedKeywordsPopout.condition${plural}`;
              return (
                <li key={`${key} ${value.conditionCount}`}>
                  <div
                    className={classNames('icon', { disabled: (includeKeywords.length === 6 || excludeKeywords.length === 6) })}
                    {...handleInteraction(this.keywordOnClick, key)}
                  >
                    <Icon className={iconClass} icon={icon} />
                  </div>
                  <div className="keywordCategory" title={key}>{key} </div>
                  <BarContainer
                    items={[{ value: conditions, fill: selectedColor },
                      { value: remainingSpace, fill: 'transparent' }]}
                    height="8px"
                  />
                  <div className="conditionsText">
                    <FormattedMessage
                      id={conditionTextId}
                      values={{ conditions: value.conditionCount }}
                    />
                  </div>
                </li>
              );
            })
        }
        </ul>
      </div>
    );
  }
}

export default KeywordList;
