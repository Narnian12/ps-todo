import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TODOS } from './graphql/queries/crudQueries';

import Header from './components/Header';
import AddTodo from './components/AddTodo';

import './App.css';

interface Todo {
  id: number,
  name: string,
  description: string
}

const App: React.FC = () => {
  const { loading, error, data } = useQuery(GET_TODOS);
  if (loading) return <p>Loading...</p>
  if (error) {
    console.log(error);
    return <p>Error</p>
  }
  console.log(data);

  return (
    <div className="App">
      <Header />
      <AddTodo />
      {data.Todos.map((elem: Todo) => {
        // return (
        //   <div key={elem.id}>
        //     <p>{elem.id}</p>
        //     <p>{elem.name}</p>
        //     <p>{elem.description}</p>
        //   </div>
        // )
      })}
    </div>
  );
}

export default App;
