import React from "react";
import NavbarComponent from "../components/NavbarComponent.tsx";
import Footer from "../components/main/Footer/Footer.tsx";
import ComingSoon from "../components/ComingSonComponent.tsx";

const CommingSoon: React.FC = () => {

    return (
        <main className="main">
            <NavbarComponent />
            <ComingSoon/>
            <Footer/>
        </main>
    );
};


export default CommingSoon;
