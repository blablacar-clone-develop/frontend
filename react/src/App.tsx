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
import ConfirmIdentity from "./pages/ConfirmIdentity.tsx";
import ConfirmDocument from "./pages/ConfirmDocument.tsx";
import ConfirmEmail from "./pages/ConfirmEmail.tsx";
import DateSelection from "./pages/DateSelection.tsx";
import TimeSelection from "./pages/TimeSelection.tsx";
import CountPassengerSelection from "./pages/CountPassengerSelection.tsx";
import ModeBookingSelection from "./pages/ModeBookingSelection.tsx";
import PriceSelection from "./pages/PriceSelection.tsx";
import AddInfoRoute from "./pages/AddInfoRoute.tsx";
import EditCarPage from "./pages/EditCarPage";
import UserVerification from "./pages/UserVerification";
import ConfirmPhone from "./pages/ConfirmPhone";

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
                    <Route path="/confirmIdentity" element={<ConfirmIdentity/>}/>
                    <Route path="/confirmDocument" element={<ConfirmDocument/>}/>
                    <Route path="/confirmEmail" element={<ConfirmEmail/>}/>
                    <Route path="/dateSelection" element={<DateSelection/>}/>
                    <Route path="/timeSelection" element={<TimeSelection/>}/>
                    <Route path="/countPassengerSelection" element={<CountPassengerSelection/>}/>
                    <Route path="/modeBookingSelection" element={<ModeBookingSelection/>}/>
                    <Route path="/priceSelection" element={<PriceSelection/>}/>
                    <Route path="/addInfoRoute" element={<AddInfoRoute/>}/>
                    <Route path="/userVerification" element={<UserVerification/>}/>
                    <Route path="/confirmPhone" element={<ConfirmPhone/>}/>
                </Routes>
            </Router>

        </div>
    )
}

export default App