import React, {useEffect} from 'react';
import NavbarComponent from '../components/NavbarComponent';
import Footer from '../components/main/Footer/Footer';
import Register from "../components/register/RegisterComponent";

const LoginPage: React.FC = () => {

    ///Зміна заголовку сторінки
    useEffect(() => {
        document.title = 'Реестрація';
    }, []);

    return (
        <main className="main">
            <NavbarComponent />

            <Register />
            <Footer/>
        </main>
    );
};

export default LoginPage;
