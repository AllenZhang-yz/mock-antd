import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import Button from './Button';

// const styles: React.CSSProperties = {
//   textAlign: 'center',
// };

// const CenterDecorator = (storyFn: any) => <div style={styles}>{storyFn}</div>;

const defaultButton = () => (
  <Button onClick={action('clicked')}>default button</Button>
);

const buttonWithSize = () => (
  <>
    <Button size="lg" onClick={action('clicked')}>
      large button
    </Button>
    <Button size="sm" onClick={action('clicked')}>
      small button
    </Button>
  </>
);

const buttonWithType = () => (
  <>
    <Button btnType="primary">primary button</Button>
    <Button btnType="danger">danger button</Button>
    <Button btnType="link" href="https://google.com">
      link button
    </Button>
  </>
);

storiesOf('Button Component', module)
  // .addDecorator(CenterDecorator)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      text: 'this is a very nice component',
      inline: true,
    },
  })
  .add('Button', defaultButton)
  .add('Button with different size', buttonWithSize)
  .add('Button with different type', buttonWithType);
