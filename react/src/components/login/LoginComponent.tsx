import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert, Card } from 'react-bootstrap';
import './LoginComponent.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [step, setStep] = useState(1); // Step 1: email input, Step 2: password input
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email) {
            setStep(2); // Move to the next step if email is filled
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('/api/signIn', { email, password });
            console.log('Login successful', response.data);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.id.toString());
            localStorage.setItem('username', response.data.username);
            window.location.href = '/';
        } catch (err) {
            setError('Неправильний емайл чи пароль');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center mt-4 mb-4">
            <Card className="p-4 shadow-sm" style={{ maxWidth: '752px', width: '100%' }}>
                {step === 1 ? (
                    <div className="align-self-center pt-4 pb-4" style={{maxWidth: '100%', width:'495px'}}>
                        <Card.Title className="mb-4 myCardTitle">Log in</Card.Title>
                        <p className="myh2title">New user? <a href="/register">Create an account</a></p>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleEmailSubmit}>
                            <Form.Group controlId="formBasicEmail" className="mb-3">
                                <Form.Label className="formLabelMyText">E-mail address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" disabled={loading} className="w-100 m-2">
                                {loading ? 'Loading...' : 'Next'}
                            </Button>
                        </Form>

                        <div className="social-login mt-3 text-center">
                            <hr />
                            <p>Or</p>
                            <div className="d-flex justify-content-center">
                                <Button className="social-btn mx-2" variant="outline-primary">
                                    <i className="bi bi-facebook"></i>
                                </Button>
                                <Button className="social-btn mx-2" variant="outline-dark">
                                    <i className="bi bi-apple"></i>
                                </Button>
                                <Button className="social-btn mx-2" variant="outline-danger">
                                    <i className="bi bi-google"></i>
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="align-self-center pt-4 pb-4" style={{maxWidth: '100%', width:'495px'}}>
                        <Card.Title className="mb-4 myCardTitle">Enter your password</Card.Title>
                        <p className="myh2titleWithIcon">{email} <br></br>
                            Personal account</p>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handlePasswordSubmit}>
                            <Form.Group controlId="formBasicPassword" className="mb-3">
                                <Form.Label className="formLabelMyText">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            {/*<div className="d-flex justify-content-between">*/}
                            {/*    <Form.Check label="Stay signed in" />*/}
                            {/*    <a href="/forgot-password">Forgot your password?</a>*/}
                            {/*</div>*/}
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="form-check custom-toggle">
                                    <input type="checkbox" id="staySignedIn" className="form-check-input"/>
                                    <label className="custom-slider" htmlFor="staySignedIn"></label>
                                </div>
                                <label htmlFor="staySignedIn" className="ms-2">Stay signed in</label>
                                <a href="/forgot-password" className="ms-auto">Forgot your password?</a>
                            </div>


                            <Button variant="primary" type="submit" disabled={loading} className="w-100 m-2">
                                {loading ? 'Logging in...' : 'Next'}
                            </Button>

                            <a href="/login" className="text-center d-block mt-2">Log in with another account</a>
                        </Form>
                    </div>
                )}
            </Card>
        </Container>
    );
};

export default Login;
