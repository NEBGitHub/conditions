import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { storiesForComponent } from '../../../.storybook/utils';
import withStatus from '../../../.storybook/addon-status';
import ReadMe from './README.md';

import DownloadPopup from '.';

const noop = () => {};

storiesForComponent('Components|DownloadPopup', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withKnobs)
  .add('default', () => (
    <DownloadPopup
      isOpen={boolean('Visible', true)}
      closeModal={noop}
    />
  ));
