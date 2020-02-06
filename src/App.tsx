import React from 'react';
import './App.css';
import { Message } from './Components/Message';

const App = () => {
  return (
    <div className="App">
      <Message message="hi" position={{x:"3%", y:"3%"}} />
    </div>
  );
}

export default App;
