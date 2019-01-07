import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Control from '.';

describe('Components|Control', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Control />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal(('g'));
    });
  });
});
