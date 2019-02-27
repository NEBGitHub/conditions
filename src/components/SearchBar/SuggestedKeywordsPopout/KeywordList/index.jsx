import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Icon from '../../../Icon/index';
import handleInteraction from '../../../../utilities/handleInteraction';
import BarContainer from '../../../BarContainer';
import './styles.scss';

library.add(faMinusCircle, faPlusCircle);

class KeywordList extends React.PureComponent {
  static propTypes = {
    selectedWords: PropTypes.arrayOf(PropTypes.string),
    onClick: PropTypes.func.isRequired,
    keywords: PropTypes.arrayOf((props, propName, componentName, location, propFullName) => {
      const value = props[propName];
      if (!Array.isArray(value) || value.length !== 2) {
        return new Error(
          `Invalid prop \`${propFullName}\` supplied to \`${componentName}\`. Expected keyword tuple.`,
        );
      }
      if (typeof value[0] !== 'string') {
        return new Error(
          `Invalid prop \`${propFullName}[0]\` supplied to \`${componentName}\`. Expected keyword tuple.`,
        );
      }
      return PropTypes.checkPropTypes({
        conditions: PropTypes.number.isRequired,
        category: PropTypes.arrayOf(PropTypes.string).isRequired,
      }, value[1], `${propFullName}[1]`, componentName);
    }).isRequired,
    isExclude: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    selectedWords: [],
  }

  keywordOnClick = (word) => {
    const { selectedWords, isExclude } = this.props;
    const updatedWords = (!selectedWords.includes(word))
      ? selectedWords.concat(word)
      : selectedWords.filter(v => v !== word);
    return this.props.onClick([updatedWords, (isExclude ? 'exclude' : 'include')]);
  };

  findMaxConditions = () => (
    Math.max(...this.props.keywords.map(([, { conditions }]) => conditions))
  );

  render() {
    const { selectedWords, keywords } = this.props;
    return (
      <div className="KeywordList">
        <ul>
          {
            keywords.map(([key, value]) => {
              const [icon, iconClass, selectedColor, textStyle] = (selectedWords.includes(key))
                ? ['minus-circle', 'selectedIcon', 'rgb(238,97,41)', 'selectedText']
                : ['plus-circle', 'regularIcon', 'rgb(96,96,96)', 'regularText'];
              const maxConditions = this.findMaxConditions();

              const conditions = (value.conditions / maxConditions) * 200;
              const remainingSpace = (200 - conditions);
              return (
                <li key={`${key} ${value.conditions}`}>
                  <span
                    className="icon"
                    {...handleInteraction(this.keywordOnClick, key)}
                  >
                    <Icon className={iconClass} icon={icon} />
                  </span>
                  <span className={`keywordCategory ${textStyle}`}>{key} </span>
                  <span className="BarContainer">
                    <BarContainer
                      title="ConditionTitle"
                      desc="conditionDesc"
                      items={[{ value: conditions, fill: selectedColor },
                        { value: remainingSpace, fill: 'transparent' }]}
                      size={8}
                      scale={1}
                      vert={false}
                    />
                  </span>
                  <div className="conditionsText">
                    <FormattedMessage
                      id="components.searchBar.suggestedKeywordsPopout.conditions"
                      values={{ conditions: value.conditions }}
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
