import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../.storybook/utils';
import ProjectMenu from './';
import ReadMe from './README.md';

const projectData = [
  {
    id: 1223,
    name: '1. Section 21.(1) application',
    graphData: [{ name: 'condition 1', count: 5, color: 'pink' }, { name: 'condition 2', count: 0, color: 'green' }],
  },
  {
    id: 1224,
    name: '2. Section 21.(1) application',
    graphData: [{ name: 'condition 1', count: 10, color: 'pink' }, { name: 'condition 2', count: 19, color: 'green' }],
  },
  {
    id: 1225,
    name: '3. Section 21.(1) application',
    graphData: [{ name: 'condition 1', count: 4, color: 'pink' }, { name: 'condition 2', count: 29, color: 'green' }],
  },
  {
    id: 1226,
    name: '4. Section 21.(1) application',
    graphData: [{ name: 'condition 1', count: 6, color: 'pink' }, { name: 'condition 2', count: 22, color: 'green' }],
  },
  {
    id: 1227,
    name: '5. Section 21.(1) application',
    graphData: [{ name: 'condition 1', count: 5, color: 'pink' }, { name: 'condition 2', count: 0, color: 'green' }],
  },
  {
    id: 1228,
    name: '6. Section 21.(1) application',
    graphData: [{ name: 'condition 1', count: 10, color: 'pink' }, { name: 'condition 2', count: 19, color: 'green' }],
  },
  {
    id: 1229,
    name: '7. Section 21.(1) application',
    graphData: [{ name: 'condition 1', count: 4, color: 'pink' }, { name: 'condition 2', count: 29, color: 'green' }],
  },
  {
    id: 1230,
    name: '8. Section 21.(1) application',
    graphData: [{ name: 'condition 1', count: 6, color: 'pink' }, { name: 'condition 2', count: 22, color: 'green' }],
  },
];

// const options = {
//   0: 1223,
//   1: 1224,
//   2: 1226,
//   3: 1227,
//   4: 1228,
// };
const options = projectData.reduce((acc, next) => ({
  ...acc,
  [next.name]: next.id,
}), {});

const selectedProjectID = 1226;

storiesForComponent('Components|ProjectMenu', module, ReadMe)
  .addDecorator(withKnobs)
  .add('Default Props', () => (
    <ProjectMenu
      projectData={projectData}
      selectedProjectID={select('Selected Project', options, 1226)}
      onChange={() => {}}
      selectedFeature="Theme"
    />
  ));

