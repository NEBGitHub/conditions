import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import SearchContent from '.';
import ReadMe from './README.md';

storiesForComponent('Components|SearchBar/SearchContent', module, ReadMe)
  .addDecorator(withStatus('functionalityUnderDevelopment'))
  .addDecorator(withInteraction({ actions: ['changeSearchType', 'updateKeywords', 'closeTab', 'includeOnChange'] }))
  .add('with interaction', () => (
    <SearchContent
      {...getInteractionProps()}
    />
  ), {
    interaction: {
      state: {
        keywords: { include: ['pipeline1', 'pipeline2'], exclude: ['safety', 'fire'] }, mode: 'basic', selectedIncludeType: 'any',
      },
      actions: {
        changeSearchType: state => () => {
          const mode = (state.mode === 'basic') ? 'advanced' : 'basic';
          return ({ mode });
        },
        updateKeywords: () => words => ({ keywords: words }),
        includeOnChange: () => e => ({ selectedIncludeType: e }),
      },
    },
  });
