import gql from 'graphql-tag';

export const GET_TODOS_SUBSCRIPTION = gql`
  subscription GetTodosSub {
    todos {
      id
      name
      description
    }
  }
`;
