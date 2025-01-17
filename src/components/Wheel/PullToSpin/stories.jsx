import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent, withStyles } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';

import PullToSpin from '.';
import ReadMe from './README.md';

storiesForComponent('Components|Wheel/PullToSpin', module, ReadMe)
  .addDecorator(withStyles)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({ actions: ['onClickSpin'] }))
  .add('default', () => (
    <svg viewBox="300 0 150 100" width="200">
      <PullToSpin {...getInteractionProps()} />
    </svg>
  ), { styles: '.Wheel { padding-top: 0px }' });

