import { useEffect, useState } from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import axiosAuthInstance from '../../utils/axios/axiosAuthInstance';

const TodoDetail = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await axiosAuthInstance.get(`/todos/detail/${id}`);
      setTodo(res?.data);
    };
    fetch();
  }, [id]);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Todo Detail
        </Typography>

        {todo ? (
          <>
            <Box
              sx={{
                borderBottom: '1px solid #ccc',
                pb: 1,
                mb: 2,
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                Title
              </Typography>
              <Typography variant="body1">{todo.title}</Typography>
            </Box>

            <Box
              sx={{
                borderBottom: '1px solid #ccc',
                pb: 1,
                mb: 2,
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                Completed
              </Typography>
              <Typography variant="body1">
                {todo.completed ? 'Yes' : 'No'}
              </Typography>
            </Box>
          </>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default TodoDetail;
