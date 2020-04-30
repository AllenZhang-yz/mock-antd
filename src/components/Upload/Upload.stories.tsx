import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Upload, IUploadFile } from './Upload';
import Icon from '../Icon/Icon';

const defaultFileList: IUploadFile[] = [
  {
    uid: '123',
    size: 1234,
    name: 'hello.md',
    status: 'uploading',
    percent: 30,
  },
  { uid: '124', size: 1234, name: 'abc.md', status: 'success', percent: 100 },
  { uid: '125', size: 1234, name: 'xyz.md', status: 'error', percent: 0 },
];

const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    alert('file too big');
    return false;
  }
  return true;
};

const filePromise = (file: File) => {
  const newFile = new File([file], 'new_name.docx', { type: file.type });
  return Promise.resolve(newFile);
};

const SimpleUpload = () => {
  return (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onChange={action('changed')}
      onProgress={action('progress')}
      onSuccess={action('success')}
      onError={action('error')}
      defaultFileList={defaultFileList}
      onRemove={action('removed')}
      accept=".docx"
      multiple
      drag
      // beforeUpload={filePromise}
    >
      <Icon icon="upload" size="5x" theme="secondary" />
      <br />
      <p>Drag file over to upload</p>
    </Upload>
  );
};

storiesOf('Upload component', module).add('Upload', SimpleUpload);
