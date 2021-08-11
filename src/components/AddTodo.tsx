import { useMutation } from "@apollo/client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { INSERT_TODO } from '../graphql/mutations/crudMutations';
import { InsertTodosParams } from '../graphql/params/insertTodosParams';
import { v4 as uuid_v4 } from 'uuid';
import { Todo } from '../todo-interface';

import './AddTodo.css';

interface AddTodoInterface {
  todos: Todo[],
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

const AddTodo: React.FC<AddTodoInterface> = ({ todos, setTodos }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [insertTodo] = useMutation(INSERT_TODO);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)

  const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)

  const addTodo = (event: React.SyntheticEvent) => {
    event.preventDefault();
    let newTodo: Todo = {
      id: uuid_v4(),
      name: name,
      description: description
    };
    insertTodo({ 
      variables: { 
        [InsertTodosParams.Id]: newTodo.id,
        [InsertTodosParams.Name]: newTodo.name,
        [InsertTodosParams.Description]: newTodo.description
      }
    });
    setName('');
    setDescription('');
    setTodos([...todos, newTodo]);
  }
  
  return (
    <form className="add" onSubmit={addTodo}>
      <label>Name</label>
      <input value={name} onChange={onNameChange} />
      <label>Description</label>
      <input value={description} onChange={onDescriptionChange} />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodo;