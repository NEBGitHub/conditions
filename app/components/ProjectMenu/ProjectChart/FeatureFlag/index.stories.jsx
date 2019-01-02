import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../../../.storybook/utils';
import FeatureFlag from '.';
import ReadMe from './README.md';

const options = {
  range: true,
  min: 1,
  max: 20,
  step: 1,
};

storiesForComponent('Components|ProjectMenu/ProjectChart/FeatureFlag', module, ReadMe)
  .addDecorator(withKnobs)
  .add('With color', () => (
    <FeatureFlag color="pink" count={number('Amount of conditions', 1, options)} chartType="Theme" name="Damage Prevention" />
  ))
  .add('Without color', () => (
    <FeatureFlag color="#a1a8a7" count={number('Amount of conditions', 1, options)} chartType="Theme" name="Damage Prevention" />
  ));
