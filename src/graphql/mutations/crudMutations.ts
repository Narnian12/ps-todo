import gql from 'graphql-tag';
import { InsertTodosParams } from '../params/insertTodosParams';
import { DeleteTodosParams } from '../params/deleteTodosParams';

export const INSERT_TODO = gql`
  mutation insertTodo(
    $${InsertTodosParams.Id}: String!, 
    $${InsertTodosParams.Name}: String!, 
    $${InsertTodosParams.Description}: String
  ) {
    insert_todos_one(object: { 
      id: $${InsertTodosParams.Id}, 
      name: $${InsertTodosParams.Name}, 
      description: $${InsertTodosParams.Description} }
    ) {
      id
      name
      description
    }
  }
`;

export const DELETE_TODO = gql`
  mutation deleteTodo(
    $${DeleteTodosParams.Id}: String!
  ) {
    delete_todos_by_pk(id: $${InsertTodosParams.Id}) {
      id
      name
      description
    }
  }
`;