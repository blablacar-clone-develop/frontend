import React, {useEffect} from 'react';
import NavbarComponent from '../components/NavbarComponent.tsx';
import MainContent from '../components/MainContent';
import Footer from '../components/main/Footer/Footer.tsx';
import Register from "../components/register/RegisterComponent.tsx";

const LoginPage: React.FC = () => {

    ///Зміна заголовку сторінки
    useEffect(() => {
        document.title = 'Реестрація';
    }, []);

    return (
        <main className="main">
            <NavbarComponent />
            <MainContent />
            <Register />
            <Footer/>
        </main>
    );
};

export default LoginPage;
