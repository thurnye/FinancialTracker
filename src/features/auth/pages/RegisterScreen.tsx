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

interface RegisterFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar: string;
  birthdate: string;
  gender: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
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
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
      birthdate: '',
      gender: '',
      phoneNumber: '',
      address: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
    },
  });

  const password = watch('password');

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    // Validation
    if (data.firstName.trim().length < AUTH_VALIDATION.minUsernameLength) {
      setError('firstName', {
        message: `First name must be at least ${AUTH_VALIDATION.minUsernameLength} characters`,
      });
      return;
    }
    if (data.lastName.trim().length < AUTH_VALIDATION.minUsernameLength) {
      setError('lastName', {
        message: `Last name must be at least ${AUTH_VALIDATION.minUsernameLength} characters`,
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
      console.log('Registration data:', data);
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
        <Col xs={12} md={8} lg={6}>
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
                {/* Personal Information Section */}
                <h6 className='text-dark mb-3 fw-semibold'>Personal Information</h6>

                <Row>
                  <Col md={6}>
                    {/* First Name */}
                    <Form.Group className='mb-3' controlId={AUTH_FORM_FIELDS.FIRST_NAME}>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter your first name'
                        isInvalid={!!errors.firstName}
                        {...register('firstName', {
                          required: 'First name is required',
                          minLength: {
                            value: AUTH_VALIDATION.minUsernameLength,
                            message: `First name must be at least ${AUTH_VALIDATION.minUsernameLength} characters`,
                          },
                          maxLength: {
                            value: AUTH_VALIDATION.maxUsernameLength,
                            message: `First name must not exceed ${AUTH_VALIDATION.maxUsernameLength} characters`,
                          },
                        })}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.firstName?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    {/* Last Name */}
                    <Form.Group className='mb-3' controlId={AUTH_FORM_FIELDS.LAST_NAME}>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter your last name'
                        isInvalid={!!errors.lastName}
                        {...register('lastName', {
                          required: 'Last name is required',
                          minLength: {
                            value: AUTH_VALIDATION.minUsernameLength,
                            message: `Last name must be at least ${AUTH_VALIDATION.minUsernameLength} characters`,
                          },
                          maxLength: {
                            value: AUTH_VALIDATION.maxUsernameLength,
                            message: `Last name must not exceed ${AUTH_VALIDATION.maxUsernameLength} characters`,
                          },
                        })}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.lastName?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

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

                <Row>
                  <Col md={6}>
                    {/* Birthdate */}
                    <Form.Group className='mb-3' controlId={AUTH_FORM_FIELDS.BIRTHDATE}>
                      <Form.Label>Birthdate</Form.Label>
                      <Form.Control
                        type='date'
                        isInvalid={!!errors.birthdate}
                        {...register('birthdate', {
                          required: 'Birthdate is required',
                        })}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.birthdate?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    {/* Gender */}
                    <Form.Group className='mb-3' controlId={AUTH_FORM_FIELDS.GENDER}>
                      <Form.Label>Gender</Form.Label>
                      <Form.Select
                        isInvalid={!!errors.gender}
                        {...register('gender', {
                          required: 'Gender is required',
                        })}
                      >
                        <option value=''>Select gender</option>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                        <option value='Other'>Other</option>
                        <option value='Prefer not to say'>Prefer not to say</option>
                      </Form.Select>
                      <Form.Control.Feedback type='invalid'>
                        {errors.gender?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Phone Number */}
                <Form.Group className='mb-3' controlId={AUTH_FORM_FIELDS.PHONE_NUMBER}>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type='tel'
                    placeholder='+1234-456-6789'
                    isInvalid={!!errors.phoneNumber}
                    {...register('phoneNumber', {
                      required: 'Phone number is required',
                    })}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.phoneNumber?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Address Section */}
                <h6 className='text-dark mb-3 mt-4 fw-semibold'>Address</h6>

                {/* Street Address */}
                <Form.Group className='mb-3' controlId={AUTH_FORM_FIELDS.ADDRESS}>
                  <Form.Label>Street Address</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='1234 Main Street'
                    isInvalid={!!errors.address}
                    {...register('address', {
                      required: 'Address is required',
                    })}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.address?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    {/* City */}
                    <Form.Group className='mb-3' controlId={AUTH_FORM_FIELDS.CITY}>
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Toronto'
                        isInvalid={!!errors.city}
                        {...register('city', {
                          required: 'City is required',
                        })}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.city?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    {/* State/Province */}
                    <Form.Group className='mb-3' controlId={AUTH_FORM_FIELDS.STATE}>
                      <Form.Label>State/Province</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Ontario'
                        isInvalid={!!errors.state}
                        {...register('state', {
                          required: 'State/Province is required',
                        })}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.state?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    {/* Country */}
                    <Form.Group className='mb-3' controlId={AUTH_FORM_FIELDS.COUNTRY}>
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Canada'
                        isInvalid={!!errors.country}
                        {...register('country', {
                          required: 'Country is required',
                        })}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.country?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    {/* Postal Code */}
                    <Form.Group className='mb-3' controlId={AUTH_FORM_FIELDS.POSTAL_CODE}>
                      <Form.Label>Postal Code</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='A1B2C3'
                        isInvalid={!!errors.postalCode}
                        {...register('postalCode', {
                          required: 'Postal code is required',
                        })}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {errors.postalCode?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Security Section */}
                <h6 className='text-dark mb-3 mt-4 fw-semibold'>Security</h6>

                {/* Password */}
                <Form.Group className='mb-3' controlId={AUTH_FORM_FIELDS.PASSWORD}>
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
                <Form.Group className='mb-4' controlId={AUTH_FORM_FIELDS.CONFIRM_PASSWORD}>
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
