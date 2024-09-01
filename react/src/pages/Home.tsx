import React from 'react';
import NavbarComponent from '../components/NavbarComponent.tsx';
import MainContent from '../components/MainContent';
import SearchPanel from '../components/SearchPanel';
import CardsSection from '../components/CardsSection';
import Footer from '../components/main/Footer/Footer.tsx';

const HomePage: React.FC = () => {
    return (
        <main className="main">
            <NavbarComponent />
            <MainContent />
            <SearchPanel />
            <CardsSection />
            <Footer/>
        </main>
    );
};

export default HomePage;
