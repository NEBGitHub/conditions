import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Legend from './';

describe('Components|ProjectLegend', () => {
  describe('with default props', () => {
    // TODO: Change this test to "should render virtualized projects if projectData is empty"
    it('should not render', () => {
      const wrapper = shallow(<Legend />);
      expect(wrapper.type()).to.equal(null);
    });
  });

  describe('with passed down items', () => {
    const legendData = [
      { name: 'condition 1', count: 1 },
      { name: 'condition 2', count: 45 },
      { name: 'condition 3', count: 55 },
      { name: 'condition 4', count: 23 },
      { name: 'condition 5', count: 3 },
      { name: 'condition 6', count: 13 },
    ];
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Legend items={legendData} />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('should have a class of Legend', () => {
      expect(wrapper.is('div.Legend')).to.equal(true);
    });
  });
});
