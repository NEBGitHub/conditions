import React from 'react';
import { shallow } from 'enzyme';

import StackGroup from '.';
import { conditionCountsByYear } from '../../../mockData';

const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

const width = 350;
const height = 200;
const yearValues = {
  2010: 5,
  2011: 12,
  2012: 22,
  2013: 32,
  2014: 42,
  2015: 12,
  2016: 22,
  2017: 32,
};
const years = Object.keys(yearValues);
const values = Object.values(yearValues);
const domain = {
  x: [Math.min(...years), Math.max(...years)],
  y: [Math.min(...values), Math.max(...values)],
};
const yearSize = width / (domain.x[1] - domain.x[0]);

const stackProps = {
  domain: { x: domain.x },
  scale: {
    x: val => (val - domain.x[0]) * yearSize,
    y: val => Math.round((height - (val / (domain.y[1] / height))) * 100) / 100,
  },
  // eslint-disable-next-line object-curly-newline
  padding: { left: 0, right: 0, top: 0, bottom: 0 },
  width,
  height,
};

describe('Components|StreamGraph/StackGroup', () => {
  describe('events', () => {
    let wrapper;
    let stackGroup;
    let spy;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(
        <StackGroup
          onChange={spy}
          totalPerYear={yearValues}
          stackProps={stackProps}
        />,
      );
      stackGroup = wrapper.find('.StackGroup');
    });

    test('should call onChange with the correct position when clicking', () => {
      // Simulate mouseDown and mouseUp since Enzyme would call `onClick` which
      // isn't used.
      let mouseEvent = { ...eventFuncs, clientX: 0, clientY: 0 };
      stackGroup.simulate('mouseDown', mouseEvent);
      stackGroup.simulate('mouseUp', mouseEvent);
      expect(spy).toHaveBeenLastCalledWith(2010);

      mouseEvent = { ...eventFuncs, clientX: width, clientY: height };
      stackGroup.simulate('mouseDown', mouseEvent);
      stackGroup.simulate('mouseUp', mouseEvent);
      expect(spy).toHaveBeenLastCalledWith(2017);

      // This should fall just to the right of the gap between 2010 and 2011
      mouseEvent = { ...eventFuncs, clientX: 25, clientY: 0 };
      stackGroup.simulate('mouseDown', mouseEvent);
      stackGroup.simulate('mouseUp', mouseEvent);
      expect(spy).toHaveBeenLastCalledWith(2011);
    });

    test('should not call onChange if mouseMove is fired before mouseDown', () => {
      const mouseEvent = { ...eventFuncs, clientX: 0, clientY: 0 };
      stackGroup.simulate('mouseMove', mouseEvent);
      expect(spy).not.toHaveBeenCalled();
    });

    test('should call onChange with the correct position when using mouseMove', () => {
      let mouseEvent = { ...eventFuncs, clientX: 0, clientY: 0 };
      stackGroup.simulate('mouseDown', mouseEvent);
      expect(spy).toHaveBeenLastCalledWith(2010);

      mouseEvent = { ...eventFuncs, clientX: width, clientY: height };
      stackGroup.simulate('mouseMove', mouseEvent);
      expect(spy).toHaveBeenLastCalledWith(2017);
    });

    test('should call onChange with the first year when the chart is focused', () => {
      stackGroup.simulate('focus', eventFuncs);
      expect(spy).toHaveBeenLastCalledWith(2010);
    });

    test('should increase the year if the right arrow is pressed and not at the edge', () => {
      const keyEvent = { ...eventFuncs, key: 'ArrowRight' };
      const simulateKeyDownUp = () => {
        stackGroup.simulate('keyDown', keyEvent);
        stackGroup.simulate('keyUp', keyEvent);
      };

      // First time pressing right arrow
      simulateKeyDownUp();
      expect(spy).toHaveBeenLastCalledWith(2017);

      wrapper.setProps({ controlYear: 2010 });
      simulateKeyDownUp();
      expect(spy).toHaveBeenLastCalledWith(2011);

      // Press right again at the edge, and don't expect it to change
      wrapper.setProps({ controlYear: 2017 });
      simulateKeyDownUp();
      expect(spy).toHaveBeenLastCalledWith(2017);
    });

    test('should decrease the year if the left arrow is pressed and not at the edge', () => {
      const keyEvent = { ...eventFuncs, key: 'ArrowLeft' };
      const simulateKeyDownUp = () => {
        stackGroup.simulate('keyDown', keyEvent);
        stackGroup.simulate('keyUp', keyEvent);
      };

      // First time pressing right arrow
      simulateKeyDownUp();
      expect(spy).toHaveBeenLastCalledWith(2010);

      wrapper.setProps({ controlYear: 2017 });
      simulateKeyDownUp();
      expect(spy).toHaveBeenLastCalledWith(2016);

      // Press left again at the edge, and don't expect it to change
      wrapper.setProps({ controlYear: 2010 });
      simulateKeyDownUp();
      expect(spy).toHaveBeenLastCalledWith(2010);
    });
  });

  // TODO: These tests were couple so tightly to the mock data that simply adding
  // more data broke them. We should still test them, but something more dynamic
  // and less "you should have this many pixels" is necessary.
  xdescribe('ChartIndicator', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <StackGroup
          onChange={noop}
          projectData={conditionCountsByYear.counts}
          stackProps={stackProps}
        />,
      );
    });

    test('should not be visible when no year is selected', () => {
      expect(wrapper.find('ChartIndicator')).toHaveLength(0);
    });

    test('should position correctly', () => {
      wrapper.setProps({ controlYear: 2010 });
      expect(wrapper.find('ChartIndicator').props()).toMatchObject({
        x: 0,
        yTop: 137.72,
        yBottom: height,
      });

      wrapper.setProps({ controlYear: 2012 });
      expect(wrapper.find('ChartIndicator').props()).toMatchObject({
        x: yearSize * 2,
        yTop: 116.96,
        yBottom: height,
      });

      wrapper.setProps({ controlYear: 2017 });
      expect(wrapper.find('ChartIndicator').props()).toMatchObject({
        x: width,
        yTop: -185.67,
        yBottom: height,
      });
    });

    test('should display a label of the condition count', () => {
      wrapper.setProps({ controlYear: 2013 });
      expect(wrapper.find('ChartIndicator').prop('label')).toBe(438);

      wrapper.setProps({ controlYear: 2015 });
      expect(wrapper.find('ChartIndicator').prop('label')).toBe(742);

      wrapper.setProps({ controlYear: 2016 });
      expect(wrapper.find('ChartIndicator').prop('label')).toBe(1646);
    });
  });
});
