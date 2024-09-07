// src/components/Login.tsx
import React, {useState} from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert, Card} from 'react-bootstrap';
import './LoginComponent.css';

const Login: React.FC = () => {


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
            setError('Не вірний емайл чи пароль');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center m-2">
            <Card className="p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
                <Card.Title className="text-center mb-4">Сторінка входу</Card.Title>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail" className="mb-3">
                        <Form.Label>Електронна пошта</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Електронна пошта"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className="mb-3">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={loading} className="w-100 m-2">
                        {loading ? 'Виконується вхід' : 'Увійти'}
                    </Button>

                    <Button variant="secondary" className="w-100 m-2" href='/register'>
                        Реестрація
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default Login;
