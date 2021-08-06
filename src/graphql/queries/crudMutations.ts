import gql from 'graphql-tag';
import { InsertTodosParams } from '../params/insertTodosParams';

export const INSERT_TODO = gql`
  mutation InsertTodo(
    $${InsertTodosParams.Id}: Int!, 
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

