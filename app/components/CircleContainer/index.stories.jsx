/* eslint-disable react/no-danger */
import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import ReadMe from './README.md';
import CircleContainer from '.';

storiesForComponent('Components|CircleContainer', module, ReadMe)
  .add('default', () => (
    <CircleContainer
      size="24px"
    >
    &nbsp;
    </CircleContainer>))
  .add('with icon', () => (
    <CircleContainer
      size="24px"
    >
      &lt;
    </CircleContainer>
  ))
  .add('with text', () => (
    <CircleContainer
      size="24px"
    >
      150
    </CircleContainer>
  ))
  .add('with prop: size ', () => (
    <CircleContainer
      size="60px"
    >
    &nbsp;
    </CircleContainer>
  ))
  .add('with prop: onClick ', () => (
    <CircleContainer
      size="24px"
      onClick={() => alert('clicked')}
    >
    &nbsp;
    </CircleContainer>
  ))
  .add('with prop: elevated', () => (
    <CircleContainer
      size="24px"
      elevated
    >
    &nbsp;
    </CircleContainer>
  ))
  .add('with prop: className', () => (
    <React.Fragment>
      <CircleContainer
        size="24px"
        className="blue"
      >
        &nbsp;
      </CircleContainer>
      <style dangerouslySetInnerHTML={
        { __html: '.CircleContainer.blue { background: blue } ' }}
      />
    </React.Fragment>
  ))
  .add('with prop: disabled', () => (
    <CircleContainer
      size="24px"
      disabled
    >
    &nbsp;
    </CircleContainer>));