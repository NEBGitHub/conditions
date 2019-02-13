import React from 'react';
import { shallow } from 'enzyme';
import HighlightSummary from '.';
import './styles.scss';
import { shouldBehaveLikeAComponent } from '../../../tests/utilities';

const keywords = ['test1', 'test2'];
const exceptKeywords = ['except1', 'except2'];
const selectedYear = { start: 2010, end: 2018 };

describe('Components|SearchBar/HighlightSummary', () => {
  describe('default', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <HighlightSummary
          keywords={keywords}
          exceptKeywords={exceptKeywords}
          selectedYear={selectedYear}
        />,
      );
    });

    shouldBehaveLikeAComponent(HighlightSummary, () => wrapper);

    test('formattedMessage for highlightCondition have new line break', () => {
      // console.log(wrapper.find('FormattedMessage').debug())
      const updatedWrapper = wrapper.find('FormattedMessage').at(1).shallowWithIntl();
      expect(updatedWrapper.find('br')).toHaveLength(2);
    });
  });
});
