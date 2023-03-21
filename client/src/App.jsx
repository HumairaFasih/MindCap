import React from 'react';
import SignIn from './components/SignIn';

function App() {
  const dummyStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div className="App">
      <SignIn/>
    </div>
  );
}

export default App;
