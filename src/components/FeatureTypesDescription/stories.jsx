import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { storiesForComponent, withStyles } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import { displayOrder } from '../../mockData';
import FeatureTypesDescription from '.';
import ReadMe from './README.md';

const defaultTargets = [
  'SECURITY',
  'MANAGEMENT_SYSTEM',
  'FINANCIAL',
];

const prefixOrder = [
  'GH',
  'XG',
  'OH',
  'MO',
  'KAX',
  'MHW',
  'CPTC',
  'XE',
  'MH',
  'ZO',
  'TG',
  'GPSO',
  'OPLO',
  'GPMO',
  'OPSP',
  'OPL',
  'GPL',
];

storiesForComponent('Components|FeatureTypesDescription', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withKnobs)
  .addDecorator(withStyles(`
    .FeatureTypesDescription { width: 600px; height: 200px }
  `))
  .add('default', () => (
    <FeatureTypesDescription
      feature="theme"
      subFeature={select('Scroll Target', defaultTargets, 'SECURITY')}
      displayOrder={displayOrder.theme}
    />
  ))
  .add('allThemes', () => (
    <FeatureTypesDescription
      feature="theme"
      subFeature=""
      displayOrder={displayOrder.theme}
    />
  ))
  .add('instruments', () => (
    <FeatureTypesDescription
      feature="instrument"
      subFeature=""
      displayOrder={prefixOrder}
    />
  ));
