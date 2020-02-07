import React from 'react';
import './App.css';
import { Message } from './Components/Message';
import { BackgroundImage } from './Components/BackgroundImage';

const App = () => {
  return (
    <div className="App">
      <BackgroundImage blur={true} />
      <Message message="hi" position={{x:"15%", y:"3%", width: "50%"}} />
    </div>
  );
}

export default App;
