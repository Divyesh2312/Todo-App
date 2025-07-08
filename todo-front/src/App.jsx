import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import TodoRoutes from './pages/Todos/TodoRoutes';
import { getToken } from './utils/cookies/cookies';

function App() {
  const isLoggedIn = !!getToken();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={isLoggedIn ? '/todos/list' : '/login'} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/todos/*"
          element={isLoggedIn ? <TodoRoutes /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
