import React from 'react';
import { shallow } from 'enzyme';

import WheelRay from '.';

import { companyWheelData as wheelData } from '../randomDataSample';

describe('Components|CompanyWheel/WheelRay', () => {
  describe('with default props', () => {
    const reservedDegrees = 30;
    const degreesPerItem = (360 - reservedDegrees) / (wheelData.items.length - 1);
    const rotation = 0;

    const wrapperSetup = (propOverrides) => {
      const props = Object.assign({
        items: wheelData.items,
        reservedDegrees,
        degreesPerItem,
        rotation,
        selectRay: '',
        wheelType: 'company',
        currentIndex: 0,
      }, propOverrides);

      const wrapper = shallow(<WheelRay {...props} />);

      return {
        props,
        wrapper,
      };
    };

    it('should render and return a react fragment', () => {
      const { wrapper } = wrapperSetup({});
      expect(wrapper.type()).toBe(React.Fragment);
    });

    it('should render the same amount of items as the length of the array passed less 1', () => {
      const { wrapper } = wrapperSetup({});
      expect(wrapper.children()).toHaveLength(wheelData.items.length - 1);
    });

    it('should not render anything between ROTATION +/- (reserved degrees/2)', () => {
      const { wrapper } = wrapperSetup({});
      expect(wrapper.children()).not.toHaveProperty('transform', `translate(371 209) rotate(${wrapper.rotate}, 0, 245)`);
      expect(wrapper.children()).not.toHaveProperty('transform', `translate(371 209) rotate(${wrapper.rotation - (wrapper.reservedDegrees / 2)}, 0, 245)`);
      expect(wrapper.children()).not.toHaveProperty('transform', `translate(371 209) rotate(${wrapper.rotation + (wrapper.reservedDegrees / 2)}, 0, 245)`);
    });

    it('should render an item before the gap', () => {
      const positionBeforeGap = (Math.abs(rotation - (reservedDegrees / 2)) % 360);
      const transformValue = `translate(50%, 50%) rotate(${positionBeforeGap.toFixed(2)}deg)`;
      const { wrapper } = wrapperSetup({});
      expect(wrapper.children().first().props().style.transform === transformValue).toBe(true);
    });

    it('should render an item after the gap', () => {
      const positionAfterGap = (Math.abs(rotation + (reservedDegrees / 2) - 360 + degreesPerItem));
      const transformValue = `translate(50%, 50%) rotate(${positionAfterGap.toFixed(2)}deg)`;
      const { wrapper } = wrapperSetup({});
      expect(wrapper.childAt(wheelData.items.length - 2).props().style.transform === transformValue).toBe(true);
    });
  });
});
