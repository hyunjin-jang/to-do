import styled from "styled-components"
import { ToDoStatus, tTodo, useTodoListStore } from "../store";

const Todo = styled.div`
  align-items: center;
  display: flex;
`

const Button = styled.button`
  cursor: pointer;
  height: 30px;
  border: 0px;
`

interface ToDoProps {
  todo: tTodo
}

const ToDo = ({ todo }: ToDoProps) => {
  const { statusList, changeTodoStatus, deleteTodo } = useTodoListStore(state => state)

  return (
    <Todo>
      <h3 key={todo.id} style={{ marginRight: '20px', color: '#ffffff' }}>{todo.contents}</h3>
      {todo.status === ToDoStatus.DOING ? <Button onClick={() => { changeTodoStatus(todo.id, ToDoStatus.TO_DO) }}>TO DO</Button> : null}
      {todo.status !== ToDoStatus.DOING ? <Button onClick={() => { changeTodoStatus(todo.id, ToDoStatus.DOING) }}>DOING</Button> : null}
      {todo.status === ToDoStatus.DOING ? <Button onClick={() => { changeTodoStatus(todo.id, ToDoStatus.DONE) }}>DONE</Button> : null}
      <Button onClick={() => { deleteTodo(todo.id) }} style={{borderLeft: '1px solid black'}}>DELETE</Button>
      {statusList.filter(status => ![ToDoStatus.TO_DO, ToDoStatus.DOING, ToDoStatus.DONE].includes(status)).map((status, i) => (
        <Button key={status} onClick={() => { changeTodoStatus(todo.id, status) }} style={{marginLeft: i===0?'10px':'0px'}}>{status}</Button>
      ))}
    </Todo>
  )
}

export default ToDo