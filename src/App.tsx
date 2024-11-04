import { createGlobalStyle } from 'styled-components';
import './App.css';
import TodoList from './pages/Todo';

const GlobalStyle = createGlobalStyle`
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <TodoList />
    </>
  );
}

export default App;
