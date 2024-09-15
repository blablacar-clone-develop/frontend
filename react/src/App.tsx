import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Profile from "./pages/Profile.tsx";
import BrandSelect from "./pages/BrandSelect.tsx";
import ModelSelect from "./pages/ModelSelect.tsx";
import ColorSelect from "./pages/ColorSelect.tsx";
import PersonSettings from "./pages/PersonSettings.tsx";


function App() {


    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/personSettings" element={<PersonSettings/>}/>
                    <Route path="/brandSelect" element={<BrandSelect/>}/>
                    <Route path="/modelSelect" element={<ModelSelect/>}/>
                    <Route path="/colorSelect" element={<ColorSelect/>}/>
                </Routes>
            </Router>

        </div>
    )
}

export default App