import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import TrendButton from '.';
import ReadMe from './README.md';

const featureOptions = [
  'theme',
  'phase',
  'instrument',
  'type',
  'status',
  'filing',
];

storiesForComponent('Components|TrendButton', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withKnobs)
  .add('Static image', () => (
    <TrendButton
      selectedFeature={select('selectedFeature', featureOptions, featureOptions[0])}
      onClick={() => alert('Clicked')}
    />
  ))
  .add('Svg background placeholder', () => (
    <TrendButton
      selectedFeature={select('selectedFeature', featureOptions, featureOptions[2])}
      onClick={() => alert('Clicked')}
      streamGraphData={[1, 2, 3]}
    />
  ));