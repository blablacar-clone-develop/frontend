// src/components/CardsSection.tsx
import React from 'react';
import { Container } from 'react-bootstrap';
import '../styles/homePage.css';


const CardsSection: React.FC = () => {
    return (
        <Container fluid className="myContLine position-relative">
            <div className="d-flex justify-content-between align-items-center cards">
                <div className="card-item position-relative card1">
                    <h5 className="headerOfCards">Вибирайте поїздки за низькою ціною</h5>
                    <p>Куди б ви не їхали, автобусом чи з попутниками, знайдіть ідеальну поїздку з безлічі напрямків
                        і маршрутів – і подорожуйте за низькими цінами.</p>
                </div>
                <div className="card-item position-relative card2">
                    <h5 className="headerOfCards" >Довіряйте своїм попутникам</h5>
                    <p>Ми добре знаємо всіх своїх пасажирів і автобусних партнерів. Ми перевіряємо відгуки та
                        профілі, щоб ви подорожували із впевненістю.</p>
                </div>
                <div className="card-item position-relative card3">
                    <h5 className="headerOfCards">Прокрутіть, клацніть, натисніть і забронюйте!</h5>
                    <p>Забронювати поїздку ще ніколи не було так легко! Завдяки потужному алгоритму наш застосунок знайде водія поруч із вами всього за кілька хвилин.</p>
                </div>
            </div>

        </Container>
    );
};

export default CardsSection;
