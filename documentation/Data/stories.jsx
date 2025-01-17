import { storiesOf } from '@storybook/react';
import { doc } from 'storybook-readme';
import GraphQL from './GraphQL.md';
import information from './information.md';
import redux from './redux.md';

storiesOf('Documentation|Data', module)
  .add('GraphQL', doc(GraphQL))
  .add('Information', doc(information))
  .add('Redux', doc(redux));
