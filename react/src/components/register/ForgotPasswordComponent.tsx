import React, { useState } from 'react';
import axios from 'axios';
import {Form, Button, Container, Alert, Card, Row, Col} from 'react-bootstrap';
import { BiShow, BiHide } from 'react-icons/bi';
import './RegisterComponent.css';
import {useLocation, useNavigate} from "react-router-dom";

const ForgotPassword: React.FC = () => {

    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_BASE_URL_API || "KeyNOTfound";

    /// ---- сутність яку передаємо
    const location = useLocation();
    const { email }  = location.state;
    const [password, setPassword] = useState('');

    /// ---- сутність яку передаємо (END)


    const validatePassword = (password: string) => {
        // Перевіряємо, що пароль містить як великі, так і малі літери та цифри, і має мінімум 6 символів
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
        return re.test(password);
    };

    // ---- Валідація email та пароля (END)

    const [step, setStep] = useState(1); //
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    //// --- Логіка обробки переходу на наступний крок
    const handlelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        //// логіка перевірки кода



        setStep(2); // Якщо валідація успішна, перейти на наступний крок
    };
    //// --- Логіка обробки переходу на наступний крок (END)


    /**
     *  Обробка реестрації
     */
    const handlerChanhePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!validatePassword(password)) {
            setError('Password must be at least 6 characters long, contain upper and lower case letters, and include a number.');
            return;
        }

        try {

            // const response = await axios.post(`${API_URL}/api/signUp`, {
            //     name,
            //     surname,
            //     email,
            //     gender,
            //     dateOfBirth,
            //     password,
            // });
            // const { token, id, username } = response.data;
            // localStorage.setItem('token', token);
            // localStorage.setItem('userId', id.toString());
            // localStorage.setItem('username', username);
            // navigate("/");

        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response && err.response.data) {
                setError(err.response.data || 'Failed to register. Please check your input.');
            } else {
                setError('An unknown error occurred.');
            }
        } finally {
            setLoading(false);
        }

    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="p-4 shadow-sm" style={{ maxWidth: '752px', width: '100%' }}>
                {step === 1 ? (
                    <div className="align-self-center pt-4 pb-4" style={{maxWidth: '100%', width: '495px'}}>

                        <Card.Title className="mb-4 myCardTitleForgot">Update password</Card.Title>
                        <p className="myh2title">Enter the code we sent you to the address <br></br>
                            {email} </p>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handlelSubmit}>

                            <Button variant="primary" type="submit" disabled={loading} className="w-100 h55px">
                                {loading ? 'Loading...' : 'Next'}
                            </Button>
                        </Form>

                    </div>
                ) : (
                    <div className="align-self-center pt-4 pb-4" style={{maxWidth: '100%', width: '495px'}}>
                        <Card.Title className="mb-4 myCardTitle">Create an account</Card.Title>
                        <p className="myh2title">Do you already have an account? <a
                            href="/login">Sign in</a></p>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handlerChanhePasswordSubmit}>
                            <Form.Group controlId="formBasicPassword" className="mb-3">
                                <Form.Label className="formLabelMyText">Password</Form.Label>
                                <div className="position-relative">
                                    <Form.Control className="formControlMy"
                                                  type={showPassword ? 'text' : 'password'}
                                                  placeholder=""
                                                  value={password}
                                                  onChange={(e) => setPassword(e.target.value)}
                                                  required
                                    />
                                    <span
                                        className="password-toggle"
                                        onClick={togglePasswordVisibility}
                                        style={{
                                            cursor: 'pointer',
                                            position: 'absolute',
                                            right: '10px',
                                            top: '50%',
                                            transform: 'translateY(-50%)'
                                        }}
                                    >
                                    {showPassword ? <BiHide/> : <BiShow/>}
                                    </span>
                                </div>
                            </Form.Group>
                            <Button variant="primary" type="submit" disabled={loading} className="w-100 h55px">
                                {loading ? 'Loading...' : 'Create'}
                            </Button>
                        </Form>
                    </div>
                )}
            </Card>
        </Container>
    );
};

export default ForgotPassword;