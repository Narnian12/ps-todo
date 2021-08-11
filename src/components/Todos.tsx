import React, { Dispatch, SetStateAction } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_TODOS } from '../graphql/queries/crudQueries';
import { DELETE_TODO } from '../graphql/mutations/crudMutations';
import { DeleteTodosParams } from '../graphql/params/deleteTodosParams';
// import { GET_TODOS_SUBSCRIPTION } from '../graphql/subscriptions/crudSubscriptions';
import { Todo } from '../todo-interface';

import './Todos.css';

interface TodosInterface {
  todos: Todo[],
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

const Todos: React.FC<TodosInterface> = ({ todos, setTodos }) => {
  const [deleteMutation] = useMutation(DELETE_TODO);

  const deleteTodo = (id: string) => {
    deleteMutation({
      variables: {
        [DeleteTodosParams.Id]: id
      }
    });
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return (
    <>
    {todos.map((elem: Todo) => {
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
