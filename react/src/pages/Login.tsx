import React, {useEffect} from 'react';
import NavbarComponent from '../components/NavbarComponent.tsx';
import MainContent from '../components/MainContent';
import LoginComponent from "../components/login/LoginComponent.tsx";
import Footer from '../components/main/Footer/Footer.tsx';

const LoginPage: React.FC = () => {

    ///Зміна заголовку сторінки
    useEffect(() => {
        document.title = 'Увійти';
    }, []);

    return (
        <main className="main">
            <NavbarComponent />
            <MainContent />
            <LoginComponent />
            <Footer/>
        </main>
    );
};

export default LoginPage;
