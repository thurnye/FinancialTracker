import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Spinner,
  Alert,
} from 'react-bootstrap';
// import { ImageWithFallback } from "../../../components/fallback/ImageWithFallback";
import { useAppDispatch, useAppSelector } from '../../../app/hooks/app.hooks';
import {
  AUTH_FORM_FIELDS,
  AUTH_ERROR_MESSAGES,
} from '../constants/auth.constants';
import { isValidEmail } from '../../../shared/utils/security.utils';
import { loginUser } from '../redux/slice/asyncThunkServices';

interface LoginFormInputs {
  email: string;
  password: string;
}

export function LoginScreen() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: 'test@test.com',
      password: 'strongPassword123!',
    },
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    // basic validation
    if (!isValidEmail(data.email)) {
      setError('email', { message: 'Please enter a valid email address' });
      return;
    }
    if (data.password.length < 6) {
      setError('password', {
        message: 'Password must be at least 6 characters',
      });
      return;
    }

    try {
      await dispatch(
        loginUser({ email: data.email, password: data.password })
      ).unwrap();
      navigate('/');
    } catch (err: any) {
      setError('root', {
        message: err.message || AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS,
      });
    }
  };

  return (
    <Container
      fluid
      className='min-vh-100 d-flex flex-column align-items-center justify-content-center bg-white px-3'
    >
      {/* Logo Section */}
      <div className='text-center mb-5'>
        <div className='d-flex justify-content-center mb-3'>
          {/* <ImageWithFallback
            src="https://images.unsplash.com/photo-1631507623082-a9031c4cb969?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtYXJrZXRwbGFjZSUyMGxvZ28lMjBicmFuZHxlbnwxfHx8fDE3NTkwMDI4NTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Donations Tracker Logo"
            className="rounded-3"
            style={{ width: 64, height: 64, objectFit: "cover" }}
          /> */}
        </div>
        <h1 className='fw-bold fs-3 text-dark mb-1'>Donations Tracker</h1>
        <p className='text-muted'>Track, manage, and celebrate your generosity.</p>
      </div>

      {/* Login Card */}
      <Row className='justify-content-center w-100'>
        <Col xs={12} md={6} lg={4}>
          <Card className='shadow-lg border-0 bg-light'>
            <Card.Body className='p-4'>
              <h2 className='text-center text-dark fs-4 fw-semibold mb-2'>
                Sign in to your account
              </h2>
              <p className='text-center text-muted mb-4'>
                Enter your credentials to access your account
              </p>

              {/* Global Error */}
              {(errors.root?.message || error) && (
                <Alert variant='danger' className='text-center py-2'>
                  {errors.root?.message || error}
                </Alert>
              )}

              <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                {/* Email */}
                <Form.Group className='mb-3' controlId={AUTH_FORM_FIELDS.EMAIL}>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter your email'
                    isInvalid={!!errors.email}
                    {...register('email', {
                      required: 'Email is required',
                      validate: (value) =>
                        isValidEmail(value) ||
                        'Please enter a valid email address',
                    })}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Password */}
                <Form.Group
                  className='mb-2'
                  controlId={AUTH_FORM_FIELDS.PASSWORD}
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Enter your password'
                    isInvalid={!!errors.password}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.password?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Forgot Password */}
                <div className='text-end mb-3'>
                  <Link
                    to='/forgot-password'
                    className='text-success text-decoration-none'
                  >
                    Forgot your password?
                  </Link>
                </div>

                {/* Submit */}
                <div className='d-grid mb-3'>
                  <Button
                    type='submit'
                    variant='success'
                    className='text-white py-2'
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner
                          animation='border'
                          size='sm'
                          className='me-2'
                        />
                        Signing in...
                      </>
                    ) : (
                      'Sign in'
                    )}
                  </Button>
                </div>
              </Form>

              {/* Register Link */}
              <div className='text-center mt-3'>
                <span className='text-muted'>
                  Don’t have an account?{' '}
                  <Link
                    to='/register'
                    className='text-success text-decoration-none'
                  >
                    Create account
                  </Link>
                </span>
              </div>
            </Card.Body>
          </Card>

          {/* Footer */}
          <div className='text-center mt-4'>
            <small className='text-muted'>
              © 2025 Donations Tracker. All rights reserved.
            </small>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
