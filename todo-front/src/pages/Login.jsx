import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Paper,
  Typography,
  Button,
  Stack,
  TextField
} from '@mui/material';
import { useNavigate, Navigate } from 'react-router-dom';
import { setToken, getToken } from '../utils/cookies/cookies';
import axiosCommonInstance from '../utils/axios/axiosCommonInstance';
import toast from 'react-hot-toast';
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());

  const loginSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleLogin = async (values) => {
    const res = await axiosCommonInstance.post('/users/login', values);
    if (res?.data?.token) {
      setToken(res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setIsLoggedIn(true); // ✅ trigger redirect
    }
  };

  // ✅ If already logged in, redirect
  if (isLoggedIn) {
    return <Navigate to="/todos/list" />;
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" gutterBottom>Login</Typography>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack spacing={2}>
                <Field
                  as={TextField}
                  name="email"
                  label="Email"
                  fullWidth
                  helperText={<ErrorMessage name="email" />}
                  error={Boolean(<ErrorMessage name="email" />)}
                />
                <Field
                  as={TextField}
                  name="password"
                  type="password"
                  label="Password"
                  fullWidth
                  helperText={<ErrorMessage name="password" />}
                  error={Boolean(<ErrorMessage name="password" />)}
                />
                <Button variant="contained" type="submit" disabled={isSubmitting}>
                  Login
                </Button>

                {/* ✅ Signup redirect button */}
                <Button variant="text" onClick={() => navigate('/register')}>
                  Don&apos;t have an account? Sign Up
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default Login;
