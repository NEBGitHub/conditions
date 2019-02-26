import React from 'react';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import InstrumentBubble from '.';
import ReadMe from './README.md';
import d3HierarchyCalculation from '../d3HierarchyCalculation';

const instrumentChartData2 = {
  name: 'data',
  children: [{
    parentName: 'ANY_COMMODITY_TYPES',
    children: [
      {
        name: 'MO',
        children: [],
        value: 40,
        category: 'MISC',
      }, {
        name: 'AO',
        children: [],
        value: 40,
        category: 'MISC',
      },
      {
        name: 'ZO',
        children: [],
        value: 20,
        category: 'ROUTING',
      },
    ],
  },
  {
    parentName: 'NOT_SPECIFIED',
    children: [
      {
        name: 'XC',
        children: [],
        value: 10,
        category: 'CONSTRUCTION',
      },
      {
        name: 'CO',
        children: [],
        value: 10,
        category: 'MISC',
      },
    ],
  }],
};

storiesForComponent('Components|BubbleChart/InstrumentBubble', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .add('default', () => (
    <svg width={300} height={400}>
      <InstrumentBubble
        onClick={() => alert('you clicked')}
        keyPress={() => alert('you pressed a key')}
        d3Calculation={d3HierarchyCalculation(
          instrumentChartData2,
          300,
          400,
        )}
      />
    </svg>
  ));
