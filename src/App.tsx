import React from 'react';
import Button, { ButtonSize, ButtonType } from './components/Button/Button';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Button>Hello</Button>
        <Button disabled>Disabled Button</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          Primary Large
        </Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>
          Small Danger
        </Button>
        <Button
          btnType={ButtonType.Link}
          href="http://www.baidu.com"
          target="_blank"
        >
          Baidu Link
        </Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" disabled>
          Disabled Link
        </Button>
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
