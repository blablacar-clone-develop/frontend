import React, {useEffect} from 'react';
import NavbarComponent from '../components/NavbarComponent';
import LoginComponent from "../components/login/LoginComponent";
import Footer from '../components/main/Footer/Footer';
import {useNavigate} from "react-router-dom";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();


    ///Зміна заголовку сторінки
    useEffect(() => {
        document.title = 'Увійти';
        const token = localStorage.getItem("token");
        if(token != null) navigate("/");
    });


    return (
        <main className="main">
            <NavbarComponent />
            <LoginComponent />
            <Footer/>
        </main>
    );
};

export default LoginPage;
