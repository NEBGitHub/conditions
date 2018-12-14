import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import FeatureDescription from './';

const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a ullamcorper elit. Nulla vitae molestie mauris. Nulla placerat ullamcorper quam a ornare. Ut tempor orci sed arcu faucibus, eu mollis turpis lobortis. Vivamus fermentum neque id tincidunt sagittis. Morbi blandit orci eu augue semper pellentesque. Aenean eleifend quis quam id rhoncus. Etiam tristique hendrerit elit, sit amet tempor lacus gravida vitae. Proin viverra erat sed hendrerit convallis.';

describe('Components|FeatureDescription', () => {
  describe('with no props', () => {
    it('should not render', () => {
      expect(<FeatureDescription description="" />);
    });
  });

  describe('with props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<FeatureDescription description={description} />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('should have a feature description class', () => {
      expect(wrapper.is('.feature-description')).to.equal(true);
    });
  });
});
