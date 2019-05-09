import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { storiesForComponent } from '../../../.storybook/utils';
import Arrow from '.';
import ReadMe from './README.md';


storiesForComponent('Components|Arrow', module, ReadMe)
  .addDecorator(withStatus('underReview'))
  .add('default arrow', () => (
    <Arrow orientation="Up"/>
  ))
  .add('Up orientation', () => (
    <Arrow orientation="Up"/>
  ))
  .add('Down orientation', () => (
    <Arrow orientation="Down"/>
  ))
  .add('Up orientation', () => (
    <Arrow orientation="Right"/>
  ))
  .add('Up orientation', () => (
    <Arrow orientation="Left"/>
  ))