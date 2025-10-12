import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Button,
  Form,
  Spinner,
  Container,
  Row,
  Col,
} from "react-bootstrap";

// Define form input types
interface ForgotPasswordForm {
  email: string;
}

export function ForgotPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ForgotPasswordForm>({
    defaultValues: { email: "" },
  });

  const email = watch("email");

  const onSubmit: SubmitHandler<ForgotPasswordForm> = async (data) => {
    setIsLoading(true);

    // Simulated API call
    setTimeout(() => {
      setIsLoading(false);
      setIsEmailSent(true);
      toast.success(`Password reset link sent to ${data.email}`);
    }, 2000);
  };

  if (isEmailSent) {
    return (
      <Container
        fluid
        className="min-vh-100 d-flex align-items-center justify-content-center bg-light"
      >
        <Row className="w-100 justify-content-center">
          <Col xs={12} md={6} lg={4}>
            <Card className="shadow-lg border-0 p-4 text-center">
              <div
                className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: "64px",
                  height: "64px",
                  backgroundColor: "#2ECC71",
                }}
              >
                <CheckCircle size={32} color="white" />
              </div>

              <Card.Title className="mb-3 fw-semibold text-dark">
                Check Your Email
              </Card.Title>
              <Card.Text className="text-muted mb-4">
                We've sent password reset instructions to{" "}
                <strong>{email}</strong>. Please check your inbox and follow the
                link to reset your password.
              </Card.Text>

              <div className="d-grid gap-2">
                <p className="small text-secondary mb-1">
                  Didn’t receive the email? Check your spam folder or try again.
                </p>
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    setIsEmailSent(false);
                    reset();
                  }}
                >
                  Try a Different Email
                </Button>
                <Button
                  variant="success"
                  onClick={() => navigate("/login")}
                  className="text-white"
                >
                  Back to Login
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container
      fluid
      className="min-vh-100 d-flex align-items-center justify-content-center bg-light"
    >
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <Card className="shadow-lg border-0 p-4">
            <div
              className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
              style={{
                width: "64px",
                height: "64px",
                backgroundColor: "#2ECC71",
              }}
            >
              <Mail size={32} color="white" />
            </div>

            <Card.Title className="text-center fw-semibold text-dark">
              Forgot Password?
            </Card.Title>
            <Card.Text className="text-center text-muted mb-4">
              No worries! Enter your email address and we’ll send you a link to
              reset your password.
            </Card.Text>

            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email address"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-grid">
                <Button
                  type="submit"
                  variant="success"
                  disabled={isLoading}
                  className="text-white"
                >
                  {isLoading ? (
                    <>
                      <Spinner
                        animation="border"
                        size="sm"
                        className="me-2"
                      />
                      Sending Reset Link...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              </div>
            </Form>

            <div className="text-center mt-4">
              <Button
                variant="link"
                onClick={() => navigate("/login")}
                className="text-success text-decoration-none"
              >
                <ArrowLeft size={16} className="me-1" />
                Back to Login
              </Button>
            </div>
          </Card>

          <div className="text-center mt-3">
            <small className="text-muted">
              Remember your password?{" "}
              <Button
                variant="link"
                onClick={() => navigate("/login")}
                className="text-success p-0 text-decoration-none"
              >
                Sign in here
              </Button>
            </small>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
