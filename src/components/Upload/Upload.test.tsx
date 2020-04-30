import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import axios from 'axios';
import {
  render,
  RenderResult,
  fireEvent,
  wait,
  createEvent,
} from '@testing-library/react';

import { Upload, IUploadProps } from './Upload';

jest.mock('../Icon/Icon', () => {
  return (props: any) => <span onClick={props.onClick}>{props.icon}</span>;
});

const testProps: IUploadProps = {
  action: 'fakeurl.com',
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true,
};

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('test upload component', () => {
  let wrapper: RenderResult,
    fileInput: HTMLInputElement,
    uploadArea: HTMLElement;
  const testFile = new File(['xyz'], 'test.png', { type: 'image/png' });
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>Click to upload</Upload>);
    fileInput = wrapper.container.querySelector(
      '.antd-file-input'
    ) as HTMLInputElement;
    uploadArea = wrapper.queryByText('Click to upload') as HTMLElement;
  });
  it('upload process should work fine', async () => {
    const { queryByText } = wrapper;
    // mockedAxios.post.mockImplementation(() => {
    //   return Promise.resolve({ data: 'cool' });
    // });
    mockedAxios.post.mockResolvedValue({ data: 'cool' });
    expect(uploadArea).toBeInTheDocument();
    expect(fileInput).not.toBeVisible();
    fireEvent.change(fileInput, { target: { files: [testFile] } });
    expect(queryByText('spinner')).toBeInTheDocument();
    await wait(() => {
      expect(queryByText('test.png')).toBeInTheDocument();
    });
    expect(queryByText('check-circle')).toBeInTheDocument();
    expect(testProps.onSuccess).toHaveBeenCalledWith(
      'cool',
      expect.objectContaining({
        raw: testFile,
        // status: 'success',
        name: 'test.png',
      })
    );
    // expect(testProps.onChange).toHaveBeenCalledWith(testFile);

    //remove the uploaded file
    expect(queryByText('times')).toBeInTheDocument();
    fireEvent.click(queryByText('times') as HTMLElement);
    expect(queryByText('test.png')).not.toBeInTheDocument();
    expect(testProps.onRemove).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: testFile,
        status: 'success',
        name: 'test.png',
      })
    );
  });

  it('upload process fail', async () => {
    const { queryByText } = wrapper;
    mockedAxios.post.mockRejectedValue('upload fail');
    fireEvent.change(fileInput, { target: { files: [testFile] } });
    expect(queryByText('spinner')).toBeInTheDocument();
    await wait(() => {
      expect(queryByText('test.png')).toBeInTheDocument();
    });
    expect(queryByText('times-circle')).toBeInTheDocument();
  });

  it('drag and drop files should work fine', async () => {
    const { queryByText } = wrapper;
    fireEvent.dragOver(uploadArea);
    expect(uploadArea).toHaveClass('is-dragover');
    fireEvent.dragLeave(uploadArea);
    expect(uploadArea).not.toHaveClass('is-dragover');
    const mockDropEvent = createEvent.drop(uploadArea);
    Object.defineProperty(mockDropEvent, 'dataTransfer', {
      value: {
        files: [testFile],
      },
    });
    fireEvent(uploadArea, mockDropEvent);
    // fireEvent.drop(uploadArea, { dataTransfer: { files: [testFile] } });
    await wait(() => {
      expect(queryByText('test.png')).toBeInTheDocument();
    });
  });
});
