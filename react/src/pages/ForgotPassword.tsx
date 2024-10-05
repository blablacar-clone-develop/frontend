import React, {useEffect} from 'react';
import NavbarComponent from '../components/NavbarComponent';
import Footer from '../components/main/Footer/Footer';
import {useNavigate} from "react-router-dom";
import ForgotPasswordComponent from "../components/register/ForgotPasswordComponent.tsx";


const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    ///Зміна заголовку сторінки
    useEffect(() => {
        document.title = 'Забули пароль';
        const token = localStorage.getItem("token");
        if(token != null) navigate("/");
    });

    return (
        <main className="main">
            <NavbarComponent />
            <ForgotPasswordComponent />
            <Footer/>
        </main>
    );
};

export default LoginPage;
