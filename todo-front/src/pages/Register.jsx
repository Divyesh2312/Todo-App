import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Container, Paper, Typography, Button, Stack, TextField
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../utils/cookies/cookies';
import axiosCommonInstance from '../utils/axios/axiosCommonInstance';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();

  const registerSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().min(6).required('Password must be at least 6 characters'),
  });

  const handleRegister = async (values) => {
    const res = await axiosCommonInstance.post('/users/register', values);
    if (res?.data?.token) {
      setToken(res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/todos/list');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" gutterBottom>Register</Typography>

        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={registerSchema}
          onSubmit={handleRegister}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack spacing={2}>
                <Field
                  as={TextField}
                  name="name"
                  label="Name"
                  fullWidth
                  helperText={<ErrorMessage name="name" />}
                  error={<ErrorMessage name="name" /> ? true : false}
                />
                <Field
                  as={TextField}
                  name="email"
                  label="Email"
                  fullWidth
                  helperText={<ErrorMessage name="email" />}
                  error={<ErrorMessage name="email" /> ? true : false}
                />
                <Field
                  as={TextField}
                  name="password"
                  type="password"
                  label="Password"
                  fullWidth
                  helperText={<ErrorMessage name="password" />}
                  error={<ErrorMessage name="password" /> ? true : false}
                />
                <Button variant="contained" type="submit" disabled={isSubmitting}>
                  Register
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default Register;
