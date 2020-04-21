import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Alert, { AlertProps } from './Alert';

const testProps: AlertProps = {
  title: 'hello',
  onClose: jest.fn(),
};

const typeProps: AlertProps = {
  ...testProps,
  type: 'success',
  description: 'hello2',
  closable: false,
};

describe('test Alert Component', () => {
  it('should render the correct default Alert', () => {
    const { getByText, container } = render(<Alert {...testProps} />);
    expect(getByText('hello')).toBeInTheDocument();
    expect(container.querySelector('.antd-alert')).toHaveClass(
      'antd-alert-default'
    );
    fireEvent.click(getByText('close'));
    expect(testProps.onClose).toHaveBeenCalled();
  });
  it('should render the correct Alert based on different type and desc', () => {
    const { container, queryByText } = render(<Alert {...typeProps} />);
    expect(queryByText('hello')).toHaveClass('bold-title');
    expect(container.querySelector('.antd-alert')).toHaveClass(
      'antd-alert-success'
    );
    expect(queryByText('hello2')).toBeInTheDocument();
    expect(queryByText('close')).not.toBeInTheDocument();
  });
});
