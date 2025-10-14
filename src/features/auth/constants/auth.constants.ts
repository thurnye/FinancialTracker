// Auth feature constants

// Form validation rules
export const AUTH_VALIDATION = {
  minPasswordLength: 8,
  maxPasswordLength: 128,
  minUsernameLength: 3,
  maxUsernameLength: 30,
  maxEmailLength: 254,
} as const;

// Password requirements
export const PASSWORD_REQUIREMENTS = [
  'At least 8 characters long',
  'Contains at least one uppercase letter',
  'Contains at least one lowercase letter',
  'Contains at least one number',
  'Contains at least one special character',
] as const;

// Auth states
export const AUTH_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

// Auth error messages
export const AUTH_ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  USER_NOT_FOUND: 'User not found',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  WEAK_PASSWORD: 'Password is too weak',
  NETWORK_ERROR: 'Network error. Please try again.',
  VERIFICATION_REQUIRED: 'Please verify your email',
} as const;

// Auth success messages
export const AUTH_SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Successfully logged in',
  REGISTER_SUCCESS: 'Account created successfully',
  LOGOUT_SUCCESS: 'Successfully logged out',
  PASSWORD_RESET_SENT: 'Password reset email sent',
  PASSWORD_CHANGED: 'Password changed successfully',
} as const;

// Form field names
export const AUTH_FORM_FIELDS = {
  EMAIL: 'email',
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirmPassword',
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  USERNAME: 'username',
  AVATAR: 'avatar',
  BIRTHDATE: 'birthdate',
  GENDER: 'gender',
  PHONE_NUMBER: 'phoneNumber',
  ADDRESS: 'address',
  CITY: 'city',
  STATE: 'state',
  COUNTRY: 'country',
  POSTAL_CODE: 'postalCode',
} as const;