// // src/components/Register.tsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Form, Button, Container, Alert, Card } from 'react-bootstrap';
// import {useNavigate} from "react-router-dom";
//
// const Register: React.FC = () => {
//     const [name, setName] = useState('');
//     const [surname, setSurname] = useState('');
//     const [email, setEmail] = useState('');
//     const [gender, setGender] = useState('');
//     const [dateOfBirth, setDateOfBirth] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState<string | null>(null);
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();
//
//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         setLoading(true);
//         setError(null);
//
//         try {
//             const response = await axios.post('http://localhost:8080/api/signUp', {
//                 name,
//                 surname,
//                 email,
//                 gender,
//                 dateOfBirth,
//                 password,
//             });
//
//             const { token, id, username } = response.data;
//
//             localStorage.setItem('token', token);
//             localStorage.setItem('userId', id.toString());
//             localStorage.setItem('username', username);
//             navigate("/");
//
//         } catch (err: unknown) {
//             if (axios.isAxiosError(err) && err.response && err.response.data) {
//                 setError(err.response.data || 'Failed to register. Please check your input.');
//             } else {
//                 setError('An unknown error occurred.');
//             }
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     return (
//         <Container className="d-flex justify-content-center align-items-center vh-100">
//             <Card className="p-4 shadow-sm" style={{ maxWidth: '500px', width: '100%' }}>
//                 <Card.Title className="text-center mb-4">Реєстрація</Card.Title>
//                 {error && <Alert variant="danger">{error}</Alert>}
//                 <Form onSubmit={handleSubmit}>
//                     <Form.Group controlId="formBasicName" className="mb-3">
//                         <Form.Label>First Name</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Enter first name"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             required
//                         />
//                     </Form.Group>
//
//                     <Form.Group controlId="formBasicSurname" className="mb-3">
//                         <Form.Label>Last Name</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Enter last name"
//                             value={surname}
//                             onChange={(e) => setSurname(e.target.value)}
//                             required
//                         />
//                     </Form.Group>
//
//                     <Form.Group controlId="formBasicEmail" className="mb-3">
//                         <Form.Label>Email address</Form.Label>
//                         <Form.Control
//                             type="email"
//                             placeholder="Enter email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                     </Form.Group>
//
//                     <Form.Group controlId="formBasicGender" className="mb-3">
//                         <Form.Label>Gender</Form.Label>
//                         <Form.Control
//                             as="select"
//                             value={gender}
//                             onChange={(e) => setGender(e.target.value)}
//                             required
//                         >
//                             <option value="">Select gender</option>
//                             <option value="male">Male</option>
//                             <option value="female">Female</option>
//                         </Form.Control>
//                     </Form.Group>
//
//                     <Form.Group controlId="formBasicDateOfBirth" className="mb-3">
//                         <Form.Label>Date of Birth</Form.Label>
//                         <Form.Control
//                             type="date"
//                             value={dateOfBirth}
//                             onChange={(e) => setDateOfBirth(e.target.value)}
//                             required
//                         />
//                     </Form.Group>
//
//                     <Form.Group controlId="formBasicPassword" className="mb-3">
//                         <Form.Label>Password</Form.Label>
//                         <Form.Control
//                             type="password"
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </Form.Group>
//
//                     <Button variant="primary" type="submit" disabled={loading} className="w-100">
//                         {loading ? 'Registering...' : 'Register'}
//                     </Button>
//                 </Form>
//             </Card>
//         </Container>
//     );
// };
//
// export default Register;
import React, { useState } from 'react';
import axios from 'axios';
import {Form, Button, Container, Alert, Card, Row, Col} from 'react-bootstrap';
import { BiShow, BiHide } from 'react-icons/bi';
import './RegisterComponent.css';
import {useNavigate} from "react-router-dom";

const Register: React.FC = () => {

    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_BASE_URL_API || "KeyNOTfound";

    /// ---- сутність яку передаємо
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    /// ---- сутність яку передаємо (END)

    const [step, setStep] = useState(1); //
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);




    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const handlelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email && password) {
            setStep(2); // наступний крок
        }
    };

    const handlerRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

         try {
             const response = await axios.post(`${API_URL}/api/signUp`, {
                 name,
                 surname,
                 email,
                 gender,
                 dateOfBirth,
                 password,
             });

             console.log(response);

             const { token, id, username } = response.data;
             localStorage.setItem('token', token);
             localStorage.setItem('userId', id.toString());
             localStorage.setItem('username', username);
             navigate("/");

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
                        <Card.Title className="mb-4 myCardTitle">Create an account</Card.Title>
                        <div className="social-login mt-5 text-center">
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
                            <div className="or-divider">
                                <span>Or</span>
                            </div>
                        </div>
                        <p className="myh2title">Sign up with your email or phone number Already have an account? <a href="/login">Sign in</a></p>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handlelSubmit}>
                            <Form.Group controlId="formBasicEmail" className="mb-3">
                                <Form.Label className="formLabelMyText">E-mail address</Form.Label>
                                <Form.Control className="formControlMy"
                                    type="email"
                                    placeholder=""
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>
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
                        <Form onSubmit={handlerRegisterSubmit}>
                            <Row>
                                <Col md={6} className="mb-3">
                                    <Form.Group controlId="formBasicName" className="mb-3">
                                        <Form.Label className="formLabelMyText">Name</Form.Label>
                                        <Form.Control className="formControlMy"
                                                      type="text"
                                                      placeholder=""
                                                      value={name}
                                                      onChange={(e) => setName(e.target.value)}
                                                      required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6} className="mb-3">
                                    <Form.Group controlId="formBasicSurName" className="mb-3">
                                        <Form.Label className="formLabelMyText">Surname</Form.Label>
                                        <Form.Control className="formControlMy"
                                                      type="text"
                                                      placeholder=""
                                                      value={surname}
                                                      onChange={(e) => setSurname(e.target.value)}
                                                      required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12} className="mb-3">
                                    <Form.Group controlId="formBasicDateOfBirth" className="mb-3">
                                        <Form.Label>Date of Birth</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={dateOfBirth}
                                            onChange={(e) => setDateOfBirth(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                </Col>
                            </Row>


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

export default Register;
