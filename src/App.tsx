import React from 'react';
import './App.css';
import { Message } from './Components/Message';

const App = () => {
  return (
    <div className="App">
      <div style={{width: '100vw', height: '100vh', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundImage: 'url(https://source.unsplash.com/1920x1080/?mountains)'}}></div>
      <Message message="hi" position={{x:"15%", y:"3%", width: "50%"}} />
    </div>
  );
}

export default App;
