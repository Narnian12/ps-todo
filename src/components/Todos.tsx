import React, { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_TODOS } from '../graphql/queries/crudQueries';
import { DELETE_TODO } from '../graphql/mutations/crudMutations';
import { DeleteTodosParams } from '../graphql/params/deleteTodosParams';
// import { GET_TODOS_SUBSCRIPTION } from '../graphql/subscriptions/crudSubscriptions';
import { Todo } from '../todo-interface';

import './Todos.css';

const Todos: React.FC = () => {
  const [deleteMutation] = useMutation(DELETE_TODO);
  const { loading, error, data, } = useQuery(GET_TODOS, {
    pollInterval: 1000
  });
  if (loading) return <p>Loading...</p>
  if (error) {
    console.log(error);
    return <p>Error</p>
  }

  // subscribeToMore({
  //   document: GET_TODOS_SUBSCRIPTION,
  //   updateQuery: (prev, { subscriptionData }) => {
  //     console.log(subscriptionData);
  //   }
  // });
  
  const deleteTodo = (id: string) => {
    deleteMutation({
      variables: {
        [DeleteTodosParams.Id]: id
      }
    });
  }

  return (
    <>
    {data.todos.map((elem: Todo) => {
      return (
        <div className="todos" key={elem.id}>
          <p>{elem.name}</p>
          <p>{elem.description}</p>
          <button onClick={() => deleteTodo(elem.id)}>x</button>
        </div>
      )
    })}
    </>
  )
}

export default Todos;


// Keeping this here to showcase how to combine two interfaces and create a functional component
// Define props interface and use the global Todo interface as the inner prop
// interface TodosInterface {
//   todos: [Todo]
// };

// const Todos: React.FC<TodosInterface> = ({ todos }) => {
//   console.log(todos);
//   return <></>;
// }