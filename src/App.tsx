import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';

import Alert from './components/Alert/Alert';
import Menu from './components/Menu/Menu';
import MenuItem from './components/Menu/MenuItem';
import SubMenu from './components/Menu/SubMenu';
import Icon from './components/Icon/Icon';
import Upload from './components/Upload/Upload';

import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

const App: React.FC = () => {
  return (
    <div className="App">
      <Alert
        title="123"
        type="success"
        description="abcde"
        // onClose={() => setShow(false)}
      />
      <Upload action="https://jsonplaceholder.typicode.com/posts/" />
      <header className="App-header">
        <Icon icon="coffee" size="10x" theme="primary" />
        <Icon icon="arrow-down" />
        <Menu onSelect={() => {}} defaultOpenSubMenus={['3']}>
          <MenuItem>cool link 1</MenuItem>
          <MenuItem disabled>cool link 2</MenuItem>
          <MenuItem>cool link 3</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>dropdown1</MenuItem>
            <MenuItem>dropdown2</MenuItem>
            <MenuItem>dropdown3</MenuItem>
          </SubMenu>
          <MenuItem>cool link 4</MenuItem>
        </Menu>
        <div>hello</div>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
