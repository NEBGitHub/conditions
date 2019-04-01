import React from 'react';
import { makeDecorator } from '@storybook/addons';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withA11y } from '@storybook/addon-a11y';
import { withDocs, withReadme } from 'storybook-readme';
import withStatus from './addon-status';

export const storiesForComponent = (name, m, readme) => {
  let stories = storiesOf(name, m)
    // Wrap the story in css classes for each of the parent components in its path
    .addDecorator((storyFn, context) => {
      const { kind } = context;
      if (kind.startsWith('Components|')) {
        // Take everything after components and before the lowest component's folder
        const componentTree = kind.split('|')[1].split('/').slice(0, -1);
        // From the inside out, wrap it in the parent component's name as a classname
        return componentTree.reverse().reduce((acc, next) => (
          <div className={next}>{acc}</div>
        ), storyFn());
      }
      return storyFn();
    })
    .addDecorator(withInfo({ header: false, inline: true }))
    .addDecorator(withA11y);

  if (readme) {
    stories = stories.addDecorator(withDocs(readme));
  }
  // Add withStatus after the Readme, to make sure it groups on the outside
  stories = stories.addDecorator(withStatus);
  return stories;
};

export const storiesForView = (name, m, readme) => {
  let stories = storiesOf(name, m)
    .addParameters({ viewport: { defaultViewport: 'desktop' } });
  if (readme) {
    stories = stories.addDecorator(withReadme(readme));
  }
  return stories;
};

/**
 * This function will update the displayName and props of any components wrapped
 * in a HOC, so that it displays properly in Storybook.
 */
export const fixInfo = (Component) => {
  /* eslint-disable no-param-reassign */
  const { WrappedComponent } = Component;
  if (!WrappedComponent) { return; }
  Component.displayName = WrappedComponent.displayName;
  // eslint-disable-next-line no-underscore-dangle
  Component.__docgenInfo = WrappedComponent.__docgenInfo;
  /* eslint-enable no-param-reassign */
};

export const withStyles = makeDecorator({
  name: 'withStyles',
  parameterName: 'styles',
  allowDeprecatedUsage: false,
  skipIfNoParametersOrOptions: true,
  wrapper: (getStory, context, { options, parameters }) => {
    const styles = (`${options || ''}\n${parameters || ''}`).trim();
    if (!styles) { return getStory(context); }

    return (
      <React.Fragment>
        {getStory(context)}
        {/* eslint-disable-next-line react/no-danger */}
        <style dangerouslySetInnerHTML={{ __html: styles }} />
      </React.Fragment>
    );
  },
});