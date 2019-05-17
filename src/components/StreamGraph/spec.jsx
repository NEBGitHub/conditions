import React from 'react';
import { shallowWithIntl } from '../../tests/utilities';
import StreamGraph from '.';
import { conditionCountsByYear } from '../../mockData';

describe('Components|StreamGraph', () => {
  describe('with default props', () => {
    let wrapper;
    let handleOnChange;
    beforeEach(() => {
      wrapper = shallowWithIntl(<StreamGraph
        countsData={conditionCountsByYear.counts}
        handleOnChange={handleOnChange}
        feature="theme"
        subFeature=""
      />);
    });

    test('should render', () => {
      expect(wrapper.type()).toBe('div');
    });

    test('should have a className', () => {
      expect(wrapper.is('.StreamGraph')).toBe(true);
    });

    test('should render a chart', () => {
      expect(wrapper.find('VictoryChart')).toHaveLength(1);
    });

    test('should render the x and y axis', () => {
      expect(wrapper.find('VictoryAxis')).toHaveLength(2);
    });
  });
});
