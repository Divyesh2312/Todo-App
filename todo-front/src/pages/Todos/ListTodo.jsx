import { useEffect, useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    List,
    ListItem,
    IconButton,
    Button,
    Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckIcon from '@mui/icons-material/Check';
import axiosAuthInstance from '../../utils/axios/axiosAuthInstance';
import { useNavigate } from 'react-router-dom';

const ListTodos = () => {
    const [todos, setTodos] = useState([]);
    const navigate = useNavigate();

    const fetchTodos = async () => {
        const res = await axiosAuthInstance.get('/todos/list');
        if (res?.data) setTodos(res.data);
    };

    const deleteTodo = async (id) => {
        const confirm = window.confirm('Are you sure you want to delete this todo?');
        if (!confirm) return;
        await axiosAuthInstance.delete(`/todos/delete/${id}`);
        fetchTodos();
    };

    const markAsDone = async (id) => {
        await axiosAuthInstance.put(`/todos/update/${id}`, { completed: true });
        fetchTodos();
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2
                    }}
                >
                    <Typography variant="h5">Todo List</Typography>

                    <Button
                        variant="contained"
                        onClick={() => navigate('/todos/add')}
                    >
                        + Add New
                    </Button>
                </Box>


                <List>
                    {todos.map((todo) => (
                        <ListItem
                            key={todo._id}
                            divider
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <Typography
                                sx={{
                                    textDecoration: todo.completed ? 'line-through' : 'none',
                                    color: todo.completed ? 'gray' : 'inherit',
                                    fontWeight: todo.completed ? 400 : 600
                                }}
                            >
                                {todo.title}
                            </Typography>

                            <Box>
                                {!todo.completed && (
                                    <IconButton onClick={() => markAsDone(todo._id)} title="Mark as Done">
                                        <CheckIcon color="success" />
                                    </IconButton>
                                )}

                                <IconButton onClick={() => navigate(`/todos/detail/${todo._id}`)} title="View">
                                    <VisibilityIcon color="primary" />
                                </IconButton>

                                <IconButton onClick={() => navigate(`/todos/update/${todo._id}`)} title="Edit">
                                    <EditIcon color="warning" />
                                </IconButton>

                                <IconButton onClick={() => deleteTodo(todo._id)} title="Delete">
                                    <DeleteIcon color="error" />
                                </IconButton>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default ListTodos;
