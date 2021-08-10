import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { INSERT_TODO } from '../graphql/mutations/crudMutations';
import { InsertTodosParams } from '../graphql/params/insertTodosParams';
import { v4 as uuid_v4 } from 'uuid';

import './AddTodo.css';

const AddTodo = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [insertTodo] = useMutation(INSERT_TODO);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)

  const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)

  const addTodo = (event: React.SyntheticEvent) => {
    event.preventDefault();
    insertTodo({ 
      variables: { 
        [InsertTodosParams.Id]: uuid_v4(),
        [InsertTodosParams.Name]: name,
        [InsertTodosParams.Description]: description
      }
    });
    setName('');
    setDescription('');
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