import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import BrandSelect from "./pages/BrandSelect";
import ModelSelect from "./pages/ModelSelect";
import ColorSelect from "./pages/ColorSelect";
import PersonSettings from "./pages/PersonSettings";
import MapMode from "./pages/MapMode";
import RouteSelection from "./pages/RouteSelection";
import CreateTravel from "./pages/CreateTravel";
import React from "react";
import EditCarPage from "./pages/EditCarPage";



function App() {


    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/cars/:carId/edit" element={<EditCarPage />} />
                    <Route path="/personSettings" element={<PersonSettings/>}/>
                    <Route path="/brandSelect" element={<BrandSelect/>}/>
                    <Route path="/brandSelect/:carId" element={<BrandSelect/>}/>
                    <Route path="/modelSelect" element={<ModelSelect/>}/>
                    <Route path="/colorSelect" element={<ColorSelect/>}/>
                    <Route path="/createTravel" element={<CreateTravel/>}/>
                    <Route path="/mapMode" element={<MapMode/>}/>
                    <Route path="/routeSelection" element={<RouteSelection/>}/>
                </Routes>
            </Router>

        </div>
    )
}

export default App