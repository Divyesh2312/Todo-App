import { Container, TextField, Button, Paper, Typography, Stack } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosAuthInstance from '../../utils/axios/axiosAuthInstance';
import { useNavigate } from 'react-router-dom';

const AddTodo = () => {
  const navigate = useNavigate();

  const initialValues = {
    title: ''
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required')
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const res = await axiosAuthInstance.post('/todos/add', values);
    if (res?.data) {
      resetForm();
      navigate('/todos/list');
    }
    setSubmitting(false);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
        <Typography variant="h5" gutterBottom>Add Todo</Typography>

        <Formik
          initialValues={initialValues}
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

                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  Add
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default AddTodo;
