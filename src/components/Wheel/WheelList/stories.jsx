import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import ReadMe from './README.md';
import WheelList from '.';

const companyList = [
  'Company A',
  'Company B',
  'Company C',
  'Company D',
  'Company E',
  'Company F',
  'Company G',
  'Company H moreThan15Characters',
  'Company I',
  'Company J',
  'Company K',
  'Company L',
  'Company M',
];

const locationList = [
  'Calgary',
  'Camrose--Drumheller',
  'Edmonton',
  'Lethbridge--Medicine Hat',
  'Red Deer',
  'Wood Buffalo--Cold Lake',
];

const innerRadius = 150;
const outerRadius = 200;
const magenta = '255, 0, 255';
const exampleDivProps = {
  position: 'relative',
  width: 300,
  height: 300,
  border: `1px dashed rgba(${magenta}, 0.4)`,
  boxShadow: `0 0 0px ${outerRadius - innerRadius}px rgba(${magenta}, 0.05)`,
  borderRadius: '50%',
};

const onChange = () => index => ({ selected: index });

storiesForComponent('Components|Wheel/WheelList', module, ReadMe)
  .addDecorator(withInteraction({ actions: ['onChange'] }))
  .addDecorator(withStatus({
    name: 'underReview',
  }))
  .add('with company data', () => (
    <div style={exampleDivProps}>
      <WheelList
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        wheelType="company"
        listContent={companyList}
        {...getInteractionProps()}
      />
    </div>
  ), { interaction: { state: { selected: 4 }, actions: { onChange } } })
  .add('with location data', () => (
    <div style={exampleDivProps}>
      <WheelList
        innerRadius={innerRadius}
        outerRadius={innerRadius}
        wheelType="location"
        listContent={locationList}
        {...getInteractionProps()}
      />
    </div>
  ), { interaction: { state: { selected: 2 }, actions: { onChange } } });
