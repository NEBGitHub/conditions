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
    suggestedKeywords: PropTypes.objectOf(
      PropTypes.shape({
        conditions: PropTypes.number.isRequired,
        category: PropTypes.arrayOf(PropTypes.string).isRequired,
      }).isRequired,
    ).isRequired,
  }

  static defaultProps = {
    selectedWords: [],
  }

  keywordOnClick = (obj) => {
    const { selectedWords } = this.props;
    const [word, present] = obj;
    const updatedWords = (!present)
      ? selectedWords.concat(word)
      : selectedWords.filter(v => v !== word);
    return this.props.onClick(updatedWords);
  };

  findMaxConditions = () => (
    Math.max(...Object.entries(this.props.suggestedKeywords).map(([, value]) => value.conditions))
  );

  render() {
    const { selectedWords, suggestedKeywords } = this.props;
    return (
      <div className="KeywordList">
        <ul>
          {
            Object.entries(suggestedKeywords).map(([key, value]) => {
              const present = selectedWords.indexOf(key) > -1;
              const [icon, iconClass, selectedColor, textStyle] = (present)
                ? ['minus-circle', 'selectedIcon', 'rgb(238,97,41)', 'selectedText']
                : ['plus-circle', 'regularIcon', 'rgb(96,96,96)', 'regularText'];
              const maxConditions = this.findMaxConditions();
              const conditions = (value.conditions / maxConditions) * 200;
              const remainingSpace = (200 - conditions);
              return (
                <li key={`${key} ${value.conditions}`}>
                  <span
                    className="icon"
                    {...handleInteraction(this.keywordOnClick,
                      [key, present])}
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
                    <FormattedMessage id="components.searchBar.suggestedKeywordsPopout.conditions">
                      {text => <div className="conditionsText"> {value.conditions} {text}  </div>}
                    </FormattedMessage>
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
