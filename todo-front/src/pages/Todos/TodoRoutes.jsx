import { Routes, Route } from 'react-router-dom';
import AddTodo from './AddTodo';
import ListTodos from './ListTodo';
import TodoDetail from './TodoDetail';
import UpdateTodo from './UpdateTodo';
import TodoLayout from './TodoLayout';

const TodoRoutes = () => {
  return (
    <Routes>
      <Route element={<TodoLayout />}>

        <Route path="add" element={<AddTodo />} />
        <Route path="list" element={<ListTodos />} />
        <Route path="detail/:id" element={<TodoDetail />} />
        <Route path="update/:id" element={<UpdateTodo />} />
      </Route>
    </Routes>
  );
};

export default TodoRoutes;
