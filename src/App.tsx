import React from 'react';
import Alert from './components/Alert/Alert';

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
