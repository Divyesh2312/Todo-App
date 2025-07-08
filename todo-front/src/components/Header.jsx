import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../utils/cookies/cookies';

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    removeToken();
    localStorage.clear();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6">Todo App</Typography>
        <Button color="inherit" onClick={logout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
