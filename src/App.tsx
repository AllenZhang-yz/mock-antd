import React from 'react';
import Alert from './components/Alert/Alert';
import Menu from './components/Menu/Menu';
import MenuItem from './components/Menu/MenuItem';
import SubMenu from './components/Menu/SubMenu';

const App: React.FC = () => {
  const [show, setShow] = React.useState(true);
  return (
    <div className="App">
      {show && (
        <Alert
          title="123"
          type="success"
          description="abcde"
          onClose={() => setShow(false)}
        />
      )}
      <header className="App-header">
        <Menu onSelect={() => {}} mode="vertical" defaultOpenSubMenus={['3']}>
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
