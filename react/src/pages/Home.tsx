import React from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import { useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Loader } from '@googlemaps/js-api-loader';
import '../styles/homePage.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
const HomePage: React.FC = () => {
    const searchInputRefFrom = useRef<HTMLInputElement>(null);
    const searchInputRefTo = useRef<HTMLInputElement>(null);
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "KeyNOTfound";

    useEffect(() => {
        const loader = new Loader({
            apiKey: API_KEY,
            version: 'weekly',
            libraries: ['places'],
        });

        loader.load().then(() => {
            if (searchInputRefFrom.current && window.google) {
                const autocomplete = new window.google.maps.places.Autocomplete(searchInputRefFrom.current, {
                    types: ['geocode'],
                });

                autocomplete.addListener('place_changed', () => {
                    const place = autocomplete.getPlace();
                    if (place.geometry) {
                        const location = place.geometry.location!;
                        console.log('Latitude:', location.lat());
                        console.log('Longitude:', location.lng());
                    }
                });
            }
            if (searchInputRefTo.current && window.google) {
                const autocomplete = new window.google.maps.places.Autocomplete(searchInputRefTo.current, {
                    types: ['geocode'],
                });

                autocomplete.addListener('place_changed', () => {
                    const place = autocomplete.getPlace();
                    if (place.geometry) {
                        const location = place.geometry.location!;
                        console.log('Latitude:', location.lat());
                        console.log('Longitude:', location.lng());
                    }
                });
            }
        }).catch(e => {
            console.error('Failed to load Google Maps API:', e);
        });
    }, []);

    return (
        <main className="main">
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container >
                    <Navbar.Brand href="#">Logo</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                        </Form>
                        <Nav className="me-auto">
                            <Nav.Link href="#">Something</Nav.Link>
                            <Nav.Link href="#">Something</Nav.Link>
                            <Nav.Link href="#">Something</Nav.Link>
                        </Nav>

                        <Nav className="ml-auto">
                            <Nav.Link href="#"><i className="bi bi-search" /></Nav.Link>
                            <Nav.Link href="#"><i className="bi bi-globe" /></Nav.Link>
                            <Nav.Link href="#"><i className="bi bi-person" /></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Основний контент */}
            <Container fluid className="text-center middlePanel">
                <h1 className="display-4 firstHeader">Low price</h1>
                <p className="lead">consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

                {/* Панель пошуку */}
                <div className="my-4 searchPanel">
                    <Form className="d-flex justify-content-center searchForm">
                        <input ref={searchInputRefFrom} type="text" placeholder="Відправка з" className="me-2" />
                        <input ref={searchInputRefTo} type="text" placeholder="Прямуєте до" className="me-2" />
                        <input type="text" placeholder="Коли?" className="me-2" />
                        <input type="text" placeholder="1 пасажир" className="me-2" />
                        <Button variant="primary">Шукати</Button>
                    </Form>
                </div>
            </Container>

            {/* Нижній блок з картками */}
            <Container fluid className="mt-5">
                <div className="d-flex justify-content-around cards">
                    <div className="bg-white p-4 m-2" >
                        <h5>Вибирайте поїздки за низькою ціною</h5>
                        <p>Куди б ви не їхали, автобусом чи з попутниками, знайдіть ідеальну поїздку з безлічі напрямків і маршрутів – і подорожуйте за низькими цінами.</p>
                    </div>
                    <div className="bg-white p-4 m-2" >
                        <h5>Довіряйте своїм попутникам</h5>
                        <p>Ми добре знаємо всіх своїх пасажирів і автобусних партнерів. Ми перевіряємо відгуки та профілі, щоб ви подорожували із впевненістю.</p>
                    </div>
                    <div className="bg-white p-4 m-2">
                        <h5>Прокрутіть, клацніть, натисніть і забронюйте!</h5>
                        <p>Забронювати поїздку ще ніколи не було так легко! Завдяки потужному алгоритму наш застосунок знайде водія поруч із вами всього за кілька хвилин.</p>
                    </div>
                </div>
            </Container>
        </main>
    );
};

export default HomePage;
