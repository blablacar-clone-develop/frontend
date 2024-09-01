// src/components/CardsSection.tsx
import React from 'react';
import { Container } from 'react-bootstrap';
import '../styles/homePage.css';


const CardsSection: React.FC = () => {
    return (
        <Container fluid className="mt-5">
            <div className="d-flex justify-content-around cards">
                <div className="bg-white p-4 m-2">
                    <h5>Вибирайте поїздки за низькою ціною</h5>
                    <p>Куди б ви не їхали, автобусом чи з попутниками, знайдіть ідеальну поїздку з безлічі напрямків
                        і маршрутів – і подорожуйте за низькими цінами.</p>
                </div>
                <div className="bg-white p-4 m-2">
                    <h5>Довіряйте своїм попутникам</h5>
                    <p>Ми добре знаємо всіх своїх пасажирів і автобусних партнерів. Ми перевіряємо відгуки та
                        профілі, щоб ви подорожували із впевненістю.</p>
                </div>
                <div className="bg-white p-4 m-2">
                    <h5>Прокрутіть, клацніть, натисніть і забронюйте!</h5>
                    <p>Забронювати поїздку ще ніколи не було так легко! Завдяки потужному алгоритму наш застосунок знайде водія поруч із вами всього за кілька хвилин.</p>
                </div>
            </div>
        </Container>
    );
};

export default CardsSection;
