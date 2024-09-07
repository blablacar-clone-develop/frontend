// src/components/Login.tsx
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const Login: React.FC = () => {

    ///Зміна заголовку сторінки
    useEffect(() => {
        document.title = 'Увійти';
    }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('/api/signIn', { email, password });
            // Handle successful login
            console.log('Login successful', response.data);

            // Store token and other relevant data in local storage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.id.toString());
            localStorage.setItem('username', response.data.username);

            window.location.href = '/'; //redirect

        } catch (err) {
            // Handle error
            setError('Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-5">
            <h2>Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
            </Form>
        </Container>
    );
};

export default Login;
