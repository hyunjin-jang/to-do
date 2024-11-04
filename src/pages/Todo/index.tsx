import styled from "styled-components"
import { ToDoStatus, useTodoListStore } from "./store"
import { SubmitHandler, useForm } from "react-hook-form"
import { useMemo, useState } from "react"
import ToDo from "./components/ToDo"


const Container = styled.div`
  background-color: ${prop => prop.theme.bgColor};
  position: fixed;
  height: 100vh;
  width: 100vw;
`
const Contents = styled.div`
  padding: 20px;
`

const Header = styled.div`
  border-bottom: 1px solid white;
  padding: 0px 20px 20px 20px;
  justify-content: space-between;
  align-items: center;
  display: flex;
`

const Title = styled.div`
  color: ${prop => prop.theme.textColor};
  align-items: center;
  display: flex;
  gap: 20px;
`

const Status = styled.div`
  
`

const InputError = styled.p`
  color: #ff1111;
  margin-top: 6px;
  font-size: small;
`

const Selector = styled.select`
  display: flex;
  border: 0px;
  border-radius: 10px;
  height: 40px;
  width: 120px;
`

const Button = styled.button`
  margin-left: 10px;
  border-radius: 6px;
  cursor: pointer;
  height: 30px;
  border: 0px;
`

const TodoList = () => {
  const { toDoList, statusList, addNewTodo, addStatus, deleteStatus } = useTodoListStore(state => state)
  const [currentOption, setCurrentOption] = useState<ToDoStatus>(ToDoStatus.TO_DO)

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm()

  const {
    register: statusRegister,
    handleSubmit: statusSubmit,
    getValues: statusGetValues,
    reset: statusReset,
    formState: { errors: statusErrors },
  } = useForm()

  const onSubmit = () => {
    addNewTodo(getValues().exampleRequired)
    reset()
  }

  const onStatusSubmit = () => {
    const newStatus = statusGetValues().status;
    if (newStatus) {
      addStatus(newStatus);
      statusReset();
    }
  }

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCurrentOption(event.currentTarget.value as ToDoStatus)
  }

  return (
    <Container>
      <Header>
        <Title>
          <h3>To Dos</h3>
          <Selector onInput={onInput}>
            {
              statusList.map(status => <option key={status} value={status}>{status}</option>)
            }
          </Selector>
        </Title>
        <Status>
          <h5 style={{ margin: '0px 0px 8px 0px', color: '#ffffff' }}>Add Status</h5>
          <form onSubmit={statusSubmit(onStatusSubmit)}>
            <input {...statusRegister("status", { required: true })} style={{borderRadius: '4px', border: '0px', marginRight: '6px', padding: '4px'}}/>
            <input type="submit" value='add' style={{border: '0px', borderRadius: '4px', padding: '4px'}}/>
            {statusErrors.status && <InputError>This status field is required</InputError>}
          </form>
        </Status>
      </Header>
      <Contents>
        <h4 style={{ margin: '0px 0px 8px 0px', color: '#ffffff' }}>Add ToDo</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input style={{ padding: '12px', borderRadius: '6px', border: '0px', marginRight: '6px', minWidth: '300px' }} {...register("exampleRequired", { required: true })} />
          <input style={{ padding: '12px', borderRadius: '6px', border: '0px', marginRight: '4px' }} type="submit" value='add' />
          {errors.exampleRequired && <InputError>This todo field is required</InputError>}
        </form>
        <h3 style={{marginTop: '40px', marginBottom: '0px', color: 'white'}}>{currentOption}</h3>
        {toDoList
          .filter(todo => todo.status === currentOption)
          .map((todo, i) => {
            return (
              <>
                <ToDo todo={todo} />
              </>
            )
          })}
      </Contents>
      <ul style={{ position: 'absolute', bottom: '0px', right: '20px' }}>
        {statusList.slice(3).map(status => <li style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}><p>{status}</p><Button onClick={() => deleteStatus(status)}>Delete</Button></li>)}
      </ul>
    </Container>
  )
}

export default TodoList