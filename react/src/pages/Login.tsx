import React, {useEffect} from 'react';
import NavbarComponent from '../components/NavbarComponent';

import LoginComponent from "../components/login/LoginComponent";
import Footer from '../components/main/Footer/Footer';

const LoginPage: React.FC = () => {

    ///Зміна заголовку сторінки
    useEffect(() => {
        document.title = 'Увійти';
    }, []);

    return (
        <main className="main">
            <NavbarComponent />
            <LoginComponent />
            <Footer/>
        </main>
    );
};

export default LoginPage;
