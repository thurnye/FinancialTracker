import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
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
import { Link } from 'react-router-dom';
// import { ImageWithFallback } from "../../../components/fallback/ImageWithFallback";
import {
  AUTH_FORM_FIELDS,
  AUTH_VALIDATION,
  PASSWORD_REQUIREMENTS,
  AUTH_SUCCESS_MESSAGES,
  AUTH_STATES,
} from '../constants/auth.constants';

type AccountRole = 'individual' | 'restaurant';

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function RegisterScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [authState, setAuthState] = useState<string>(AUTH_STATES.IDLE);
  const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    reset,
  } = useForm<RegisterFormInputs>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    // Validation
    if (data.name.trim().length < AUTH_VALIDATION.minUsernameLength) {
      setError('name', {
        message: `Name must be at least ${AUTH_VALIDATION.minUsernameLength} characters`,
      });
      return;
    }
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', { message: 'Passwords do not match' });
      return;
    }

    setIsLoading(true);
    setAuthState(AUTH_STATES.LOADING);

    // Simulated registration API
    setTimeout(() => {
      setIsLoading(false);
      setAuthState(AUTH_STATES.SUCCESS);
      setSuccessMessage(AUTH_SUCCESS_MESSAGES.REGISTER_SUCCESS);
      reset();
    }, 1500);
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
        <p className='text-muted'>Join the Movement for Transparent Giving.</p>
      </div>

      {/* Register Form Card */}
      <Row className='justify-content-center w-100'>
        <Col xs={12} md={6} lg={4}>
          <Card className='shadow-lg border-0 bg-light'>
            <Card.Body className='p-4'>
              <h2 className='text-center text-dark fs-4 fw-semibold mb-2'>
                Create your account
              </h2>
              <p className='text-center text-muted mb-4'>
                Fill in your details to get started
              </p>

              {successMessage && (
                <Alert variant='success' className='text-center py-2'>
                  {successMessage}
                </Alert>
              )}

              <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                {/* Full Name */}
                <Form.Group
                  className='mb-3'
                  controlId={AUTH_FORM_FIELDS.FIRST_NAME}
                >
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter your full name'
                    isInvalid={!!errors.name}
                    {...register('name', {
                      required: 'Name is required',
                      minLength: {
                        value: AUTH_VALIDATION.minUsernameLength,
                        message: `Name must be at least ${AUTH_VALIDATION.minUsernameLength} characters`,
                      },
                      maxLength: {
                        value: AUTH_VALIDATION.maxUsernameLength,
                        message: `Name must not exceed ${AUTH_VALIDATION.maxUsernameLength} characters`,
                      },
                    })}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.name?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Email */}
                <Form.Group className='mb-3' controlId={AUTH_FORM_FIELDS.EMAIL}>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter your email'
                    isInvalid={!!errors.email}
                    {...register('email', {
                      required: 'Email is required',
                      maxLength: {
                        value: AUTH_VALIDATION.maxEmailLength,
                        message: `Email must not exceed ${AUTH_VALIDATION.maxEmailLength} characters`,
                      },
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Please enter a valid email address',
                      },
                    })}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>


                {/* Password */}
                <Form.Group
                  className='mb-3'
                  controlId={AUTH_FORM_FIELDS.PASSWORD}
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Create a password'
                    isInvalid={!!errors.password}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: AUTH_VALIDATION.minPasswordLength,
                        message: `Password must be at least ${AUTH_VALIDATION.minPasswordLength} characters`,
                      },
                      maxLength: {
                        value: AUTH_VALIDATION.maxPasswordLength,
                        message: `Password must not exceed ${AUTH_VALIDATION.maxPasswordLength} characters`,
                      },
                    })}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.password?.message}
                  </Form.Control.Feedback>

                  <div className='mt-2'>
                    <p className='text-muted small mb-1'>Password must have:</p>
                    <ul className='text-muted small ps-3 mb-0'>
                      {PASSWORD_REQUIREMENTS.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                </Form.Group>

                {/* Confirm Password */}
                <Form.Group
                  className='mb-4'
                  controlId={AUTH_FORM_FIELDS.CONFIRM_PASSWORD}
                >
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Confirm your password'
                    isInvalid={!!errors.confirmPassword}
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: (value) =>
                        value === password || 'Passwords do not match',
                    })}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.confirmPassword?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Submit */}
                <div className='d-grid'>
                  <Button
                    type='submit'
                    variant='success'
                    className='text-white py-2'
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Spinner
                          animation='border'
                          size='sm'
                          className='me-2'
                        />
                        Creating account...
                      </>
                    ) : (
                      'Create account'
                    )}
                  </Button>
                </div>
              </Form>

              {/* Login Link */}
              <div className='text-center mt-4'>
                <span className='text-muted'>
                  Already have an account?{' '}
                  <Link
                    to='/login'
                    className='text-success text-decoration-none'
                  >
                    Sign in
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
