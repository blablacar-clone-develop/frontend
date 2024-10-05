// // src/components/Login.tsx
// import React, {useState} from 'react';
// import axios from 'axios';
// import { Form, Button, Container, Alert, Card} from 'react-bootstrap';
// import './LoginComponent.css';
//
// const Login: React.FC = () => {
//
//
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState<string | null>(null);
//     const [loading, setLoading] = useState(false);
//
//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         setLoading(true);
//         setError(null);
//
//         try {
//             const response = await axios.post('/api/signIn', { email, password });
//             // Handle successful login
//             console.log('Login successful', response.data);
//
//             // Store token and other relevant data in local storage
//             localStorage.setItem('token', response.data.token);
//             localStorage.setItem('userId', response.data.id.toString());
//             localStorage.setItem('username', response.data.username);
//
//             window.location.href = '/'; //redirect
//
//         } catch (err) {
//             // Handle error
//             setError('Не вірний емайл чи пароль');
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     return (
//         <Container className="d-flex justify-content-center align-items-center m-4">
//             <Card className="p-4 shadow-sm" style={{ maxWidth: '752px', width: '100%', height: '828px'}}>
//                 <Card.Title className="text-center mb-4">Log in</Card.Title>
//                 {error && <Alert variant="danger">{error}</Alert>}
//                 <Form onSubmit={handleSubmit}>
//                     <Form.Group controlId="formBasicEmail" className="mb-3">
//                         <Form.Label>Електронна пошта</Form.Label>
//                         <Form.Control
//                             type="email"
//                             placeholder="Електронна пошта"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                     </Form.Group>
//
//                     <Form.Group controlId="formBasicPassword" className="mb-3">
//                         <Form.Label>Пароль</Form.Label>
//                         <Form.Control
//                             type="password"
//                             placeholder="Пароль"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </Form.Group>
//
//                     <Button variant="primary" type="submit" disabled={loading} className="w-100 m-2">
//                         {loading ? 'Виконується вхід' : 'Увійти'}
//                     </Button>
//
//                     <Button variant="secondary" className="w-100 m-2" href='/register'>
//                         Реестрація
//                     </Button>
//                 </Form>
//             </Card>
//         </Container>
//     );
// };
//
// export default Login;
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
                    <>
                        <Card.Title className="text-center mb-4">Enter your password</Card.Title>
                        <p className="text-center">{email}</p>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handlePasswordSubmit}>
                            <Form.Group controlId="formBasicPassword" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <div className="d-flex justify-content-between">
                                <Form.Check label="Stay signed in" />
                                <a href="/forgot-password">Forgot your password?</a>
                            </div>

                            <Button variant="primary" type="submit" disabled={loading} className="w-100 m-2">
                                {loading ? 'Logging in...' : 'Next'}
                            </Button>

                            <a href="/login" className="text-center d-block mt-2">Log in with another account</a>
                        </Form>
                    </>
                )}
            </Card>
        </Container>
    );
};

export default Login;
