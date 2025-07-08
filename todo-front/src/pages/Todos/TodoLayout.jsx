import Header from '../../components/Header';
import { Outlet } from 'react-router-dom';

const TodoLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default TodoLayout;
