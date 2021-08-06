import { useState } from "react";


const AddTodo = () => {
  const [todo, setTodo] = useState({
    id: 0,
    name: "",
    description: ""
  });
  
  return (
    <>
      <p>Name</p>
      <input></input>
      <p>Description</p>
      <input></input>
    </>
  );
}

export default AddTodo;