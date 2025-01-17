import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent } from '../../tests/utilities';
import Wheel from '.';
import { companyWheelData as wheelData } from './randomDataSample';
import { displayOrder } from '../../mockData';

describe('Components|Wheel', () => {
  let wrapper;
  let spy;
  beforeEach(() => {
    spy = jest.fn();
    wrapper = shallow((
      <Wheel
        wheelType="company"
        wheelData={wheelData}
        selectRay={spy}
        selectProject={spy}
        wheelMotionTrigger={() => {}}
        displayOrder={displayOrder}
        selectedFeature="theme"
      />
    ));
  });

  shouldBehaveLikeAComponent(Wheel, () => wrapper);

  // TODO: IMPLEMENT THE LOCATION TESTS ONCE THEY ARE IMPLEMENTED ON THE DESIGN DOC
});

