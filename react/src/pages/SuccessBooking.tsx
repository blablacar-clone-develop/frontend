import Navbar from "../components/NavbarComponent.tsx";
import "../styles/SuccessBooking.css";
const SuccessBooking = () =>
{
    return (
        <main className="mm">
            <Navbar/>
            <div className="mH">
                <div className="mD"><span className="iconSuccess"></span><span className="headBook">Your reservation has been approved</span></div>
            </div>
        </main>
    );
}
export default SuccessBooking;