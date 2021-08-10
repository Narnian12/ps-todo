import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TODOS } from '../graphql/queries/crudQueries';
import { GET_TODOS_SUBSCRIPTION } from '../graphql/subscriptions/crudSubscriptions';
import { Todo } from '../todo-interface';

const Todos: React.FC = () => {
  const { loading, error, data, subscribeToMore } = useQuery(GET_TODOS);
  if (loading) return <p>Loading...</p>
  if (error) {
    console.log(error);
    return <p>Error</p>
  }
  subscribeToMore({
    document: GET_TODOS_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      console.log(subscriptionData);
    }
  });

  // Define todos as [Todo] instead of any if we send the prop as data.Todos
  let todos: [Todo] = data.Todos;

  return (
    <>
    </>
  )
}

export default Todos;


// TODO: Keeping this here to showcase how to combine two interfaces and create a functional component
// Define props interface and use the global Todo interface as the inner prop
// interface TodosInterface {
//   todos: [Todo]
// };

// const Todos: React.FC<TodosInterface> = ({ todos }) => {
//   console.log(todos);
//   return <></>;
// }