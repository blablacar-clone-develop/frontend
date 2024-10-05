import React, {useEffect} from 'react';
import NavbarComponent from '../components/NavbarComponent';
import Footer from '../components/main/Footer/Footer';
import Register from "../components/register/RegisterComponent";
import {useNavigate} from "react-router-dom";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();


    ///Зміна заголовку сторінки
    useEffect(() => {
        document.title = 'Реестрація';
        const token = localStorage.getItem("token");
        if(token != null) navigate("/");
    });

    return (
        <main className="main">
            <NavbarComponent />
            <Register />
            <Footer/>
        </main>
    );
};

export default LoginPage;
