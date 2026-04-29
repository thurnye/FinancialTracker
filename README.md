# FrontEnd React Typescript Template


## Available Scripts

In the project directory, you can run:

#### `npm start`

#### `npm test`

### `npm run build`

### To create a feature
#### `cd script`

then run the command
### `node createFeature [featureName]`

## Front End Template Features
 * - ReactJs
 * - Axios
 * - Typescript
 * - Microservice Architecture structure
 * - Redux
 * - React Hook Form

#### Styling
 * - Bootstrap
 * - Tailwind

#### Security Features
 * - Bot Detection
 * - Input sanitization
 * - Validation
 * - Sensitive data redaction
 * - Sensitive Data Redaction

#### Available Features - APIs and Routes
##### Auth
 * - Login - /login
 * - Register -  /register
 * - Forgotten Password - /forgot-password

##### Auth
 * - user profile - /my-account
 * - profile -  /:userId
 
## Project Structure

```text
FinancialTracker/
├── public/
├── src/
│   ├── app/
│   ├── assets/
│   ├── components/
│   ├── features/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── shared/
│   ├── store/
│   └── utils/
├── package.json
├── tsconfig.json
└── README.md
```

Adjust the structure above if your local folders differ.

## Environment Notes

If API requests fail, confirm that:

- The backend API is running.
- The frontend proxy points to the correct backend URL.
- The backend CORS policy allows the frontend origin.
- The backend HTTPS certificate is trusted locally.

For local HTTPS certificate issues on Mac, run:

```bash
dotnet dev-certs https --trust
```

##### Note
connect with a backend for data. 
