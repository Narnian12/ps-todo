import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import Header from './components/Header';
import AddTodo from './components/AddTodo';
import Todos from './components/Todos';
import { GET_TODOS } from './graphql/queries/crudQueries';

import { Todo } from './todo-interface';
import './App.css';

const App: React.FC = () => {
  const { loading, error, data, } = useQuery(GET_TODOS);
  let typedTodos: Todo[] = data ? data.todos : null;
  const [todos, setTodos] = useState(typedTodos);
  if (loading) return <p>Loading...</p>
  if (error) {
    console.log(error);
    return <p>Error</p>
  }
  if (data && !todos) setTodos(typedTodos);

  return (
    <div className="App">
      <Header />
      <AddTodo todos={todos} setTodos={setTodos}/>
      <Todos todos={todos} setTodos={setTodos}/>
    </div>
  );
}

export default App;
