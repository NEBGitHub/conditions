import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import './styles.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Icon from '../../Icon/index';
import Dropdown from '../../Dropdown';
import handleInteraction from '../../../utilities/handleInteraction';

library.add(
  faTimes,
  faPlusCircle,
);
class SearchContent extends React.PureComponent {
  static propTypes = {
    keywords: PropTypes.shape({
      include: PropTypes.arrayOf(PropTypes.string),
      exclude: PropTypes.arrayOf(PropTypes.string),
    }),
    updateKeywords: PropTypes.func.isRequired,
    closeTab: PropTypes.func.isRequired,
    findAnyOnChange: PropTypes.func,
    findAny: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    keywords: PropTypes.shape({
      include: [],
      exclude: [],
    }),
    findAnyOnChange: () => {},
  }

  constructor(props) {
    super(props);
    this.state = {
      inputInclude: '',
      inputExclude: '',
      mode: 'basic',
    };
  }

  searchWordsRender = (keywords, type) => (
    keywords.map(word => (
      <React.Fragment key={word}>
        <li className="liText"> {word} </li>
        <li className="deleteButton">
          <button type="button" {...handleInteraction(this.deleteWord, [word, type])}>
            <Icon className="iconInline timesIcon" icon="times" />
          </button>
        </li>
      </React.Fragment>
    ))
  )

  keyWordsRender = keywords => (<span>{keywords.join(', ')} </span>)

  deleteWord = (obj) => {
    const [word, type] = obj;
    const type2 = type === 'include' ? 'exclude' : 'include';
    const { keywords } = this.props;
    const filteredWords = keywords[type].filter(v => v !== word);
    const updatedKeywords = {};
    updatedKeywords[type] = filteredWords;
    updatedKeywords[type2] = keywords[type2];
    this.props.updateKeywords(updatedKeywords);
  }

  addWord = (word, type) => {
    if (word.length === 0) { return null; }
    const type2 = (type === 'include') ? 'exclude' : 'include';
    const { keywords } = this.props;
    if (keywords[type].length < 6
      && keywords[type].indexOf(word) === -1
      && keywords[type2].indexOf(word) === -1) {
      keywords[type].push(word);
      this.props.updateKeywords(keywords);
    }
    return null;
  }

  updateInputInclude = e => this.setState({ inputInclude: e.target.value });

  updateInputExclude = e => this.setState({ inputExclude: e.target.value });

  addIncludeWord = () => {
    this.addWord(this.state.inputInclude, 'include');
    return this.setState({ inputInclude: '' });
  }

  addExcludeWord = () => {
    this.addWord(this.state.inputExclude, 'exclude');
    this.setState({ inputExclude: '' });
  }

  excludeSearchTextAndWords = () => (
    <React.Fragment>
      <div className="includeText">
        <FormattedMessage id="components.searchBar.findWords.searchText.butDo" />
        <FormattedMessage id="components.searchBar.findWords.searchText.not">
          {text => <span className="spacedText"><strong> {text} </strong></span> }
        </FormattedMessage>
        <FormattedMessage id="components.searchBar.findWords.searchText.include">
          {text => <span className="lowerCase"> {text} </span>}
        </FormattedMessage>:
      </div>
      <div className="input">
        <input value={this.state.inputExclude} onChange={this.updateInputExclude} className="searchBar" />
        <button type="button" className="addInput" {...handleInteraction(this.addExcludeWord)}>
          <Icon className="iconInline plusIcon" icon="plus-circle" />
        </button>
      </div>
      <ul className="searchWords">
        {this.searchWordsRender(this.props.keywords.exclude, 'exclude')}
      </ul>
    </React.Fragment>
  )

  highlightConditions = () => (
    <div className="highlightConditions">
      <FormattedMessage id="components.searchBar.findWords.highlightText.highlightConditions">
        {text => <div className="highlightText">{text}</div>}
      </FormattedMessage>
      <div className="anyText">
        <FormattedMessage id="components.searchBar.findWords.highlightText.any">
          {text => <span className="upperCase"> {text} </span>}
        </FormattedMessage>
        <FormattedMessage id="components.searchBar.findWords.highlightText.following" />
      </div>
      <div className="keywordsText">{this.keyWordsRender(this.props.keywords.include)}</div>
      <div />
      {this.state.mode === 'basic' ? null
        : (
          <React.Fragment>
            <div className="anyText">
              <FormattedMessage id="components.searchBar.findWords.highlightText.none">
                {text => <span className="upperCase"> {text} </span>}
              </FormattedMessage>
              <FormattedMessage id="components.searchBar.findWords.highlightText.following" />
            </div>
            <div className="keywordsText">{this.keyWordsRender(this.props.keywords.exclude)}</div>
          </React.Fragment>
        )}
    </div>
  )

  includeSearchTextAndWords = () => (
    <React.Fragment>
      <div className="includeText">
        <FormattedMessage id="components.searchBar.findWords.searchText.include" />
        {this.state.mode === 'basic'
          ? (
            <FormattedMessage id="components.searchBar.findWords.highlightText.any">
              {text => <span className="spacedText"> {text} </span>}
            </FormattedMessage>
          )
          : (
            <Dropdown
              options={['any', 'all']}
              onChange={
                () => (this.props.findAny
                  ? this.props.findAnyOnChange(false)
                  : this.props.findAnyOnChange(true))}
              selectedOption={this.props.findAny ? 'any' : 'all'}
              optionID="components.searchBar.findWords.options"
            />
          )
      }
        <FormattedMessage id="components.searchBar.findWords.searchText.of" />:
      </div>
      <div className="input">
        <input
          value={this.state.inputInclude}
          onChange={this.updateInputInclude}
          className="searchBar"
        />
        <button
          type="button"
          className="addInput"
          {...handleInteraction(this.addIncludeWord)}
        >
          <Icon className="iconInline plusIcon" icon="plus-circle" />
        </button>
      </div>
      <ul className="searchWords">
        {this.searchWordsRender(this.props.keywords.include, 'include')}
      </ul>
    </React.Fragment>
  )

  changeSearchType = () => {
    this.setState(prevState => ({ mode: (prevState.mode === 'basic' ? 'advanced' : 'basic') }));
    this.props.findAnyOnChange(true);
    this.props.updateKeywords({ include: this.props.keywords.include, exclude: [] });
  }

  render() {
    return (
      <div className="SearchContent">
        {this.includeSearchTextAndWords()}
        {(this.state.mode !== 'advanced') ? null : (this.excludeSearchTextAndWords())}
        <div className="advancedSearchText">
          <button type="button" {...handleInteraction(this.changeSearchType)}>
            {(this.state.mode === 'basic'
              ? <FormattedMessage id="components.searchBar.findWords.advancedSearch" />
              : <FormattedMessage id="components.searchBar.findWords.basicSearch" />)
            }
          </button>
        </div>
        {this.highlightConditions()}
        <FormattedMessage id="components.searchBar.close">
          {text => (
            <div className="close">
              <button
                {...handleInteraction(this.props.closeTab)}
                type="button"
                className="upperCase"
              >
                {text}
              </button>
            </div>
          )}
        </FormattedMessage>
      </div>
    );
  }
}

export default SearchContent;
