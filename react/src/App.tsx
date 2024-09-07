import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";

function App() {


    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>

                </Routes>
            </Router>

        </div>
    )
}

export default App