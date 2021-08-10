import React from 'react';

import Header from './components/Header';
import AddTodo from './components/AddTodo';
import Todos from './components/Todos';

import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <AddTodo />
      <Todos />
    </div>
  );
}

export default App;
