import { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Stack
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosAuthInstance from '../../utils/axios/axiosAuthInstance';


const UpdateTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialTitle, setInitialTitle] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const res = await axiosAuthInstance.get(`/todos/detail/${id}`);
      if (res?.data) setInitialTitle(res.data.title);
    };
    fetch();
  }, [id]);

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const res = await axiosAuthInstance.put(`/todos/update/${id}`, values);
    if (res?.data) {
      navigate('/todos/list');
    }
    setSubmitting(false);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
        <Typography variant="h5" gutterBottom>Update Todo</Typography>

        {initialTitle && (
          <Formik
            enableReinitialize
            initialValues={{ title: initialTitle }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Stack spacing={2}>
                  <Field
                    as={TextField}
                    name="title"
                    label="Title"
                    fullWidth
                    helperText={<ErrorMessage name="title" />}
                    error={Boolean(<ErrorMessage name="title" />)}
                  />
                  <Button type="submit" variant="contained" disabled={isSubmitting}>
                    Update
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        )}

        {!initialTitle && <Typography>Loading...</Typography>}
      </Paper>
    </Container>
  );
};

export default UpdateTodo;
