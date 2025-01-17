import React from 'react';
import { shallow } from 'enzyme';
import KeywordList from '.';
import Icon from '../../../Icon';
import './styles.scss';

const keywords = [
  {
    name: 'deer',
    category: ['wildlife & habitat'],
    conditionCount: 1300,
  },
  {
    name: 'alberta',
    category: ['administration & filings'],
    conditionCount: 500,
  },
];
const includeKeywords = ['deer'];
const excludeKeywords = [];

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

describe('Components|SearchBar/SuggestedKeywordsPopout/KeywordList', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <KeywordList
          includeKeywords={includeKeywords}
          excludeKeywords={excludeKeywords}
          keywords={keywords}
          setIncluded={noop}
          setExcluded={noop}
          isExclude={false}
        />,
      );
    });

    test('if word is selected, should have appropriately styled', () => {
      const updatedWrapper = wrapper.find('li');
      const first = updatedWrapper.first();
      expect((first).find(Icon).props().icon).toBe('minus-circle');
      expect((first).find(Icon).hasClass('selectedIcon')).toBe(true);
    });

    test('if word is not selected, should have appropriate styles', () => {
      const updatedWrapper = wrapper.find('li');
      const last = updatedWrapper.last();
      expect((last).find(Icon).props().icon).toBe('plus-circle');
      expect((last).find(Icon).hasClass('regularIcon')).toBe(true);
    });
  });

  describe('onClick for included', () => {
    let wrapper;
    let spy;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(
        <KeywordList
          includeKeywords={includeKeywords}
          excludeKeywords={excludeKeywords}
          keywords={keywords}
          setIncluded={spy}
          setExcluded={noop}
          isExclude={false}
        />,
      );
    });
    test('if include selected, onClick on - symbol, must call setIncluded prop', () => {
      const updatedWrapper = wrapper.find('li');
      const first = updatedWrapper.first().find('.icon');
      first.simulate('click', eventFuncs);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('if include selected, onClick on + symbol, must call setIncluded prop', () => {
      const updatedWrapper = wrapper.find('li');
      const last = updatedWrapper.last().find('.icon');
      last.simulate('click', eventFuncs);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onClick for excluded', () => {
    let wrapper;
    let spy;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(
        <KeywordList
          includeKeywords={[]}
          excludeKeywords={['deer']}
          keywords={keywords}
          setIncluded={noop}
          setExcluded={spy}
          isExclude
        />,
      );
    });
    test('if include selected, onClick on - symbol, must call setExcluded prop', () => {
      const updatedWrapper = wrapper.find('li');
      const first = updatedWrapper.first().find('.icon');
      first.simulate('click', eventFuncs);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('if include selected, onClick on + symbol, must call setExcluded prop', () => {
      const updatedWrapper = wrapper.find('li');
      const last = updatedWrapper.last().find('.icon');
      last.simulate('click', eventFuncs);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
