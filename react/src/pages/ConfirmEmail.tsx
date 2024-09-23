import React, {useState} from "react";
import Navbar from "../components/NavbarComponent.tsx";
import Footer from "../components/main/Footer/Footer.tsx";
import "../styles/ConfirmEmail.css";
const ConfirmEmail: React.FC = () =>
{
    const [email, setEmail] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSending(true);
        setError('');
        try {
        } catch (error) {
            setError('Виникла помилка при підтвердженні email');
            console.error('Error sending confirmation email:', error);
        } finally {
            setIsSending(false);
        }
    };
    return(
        <main className="main">
            <Navbar/>
            <div className="email-confirmation-container">
                <h2>Підтвердження електронної пошти</h2>
                <p>Ми надішлемо вам код для підтвердження</p>
                <form onSubmit={handleSubmit}>
                    <div className="email-input-container">
                        <input
                            type="email"
                            placeholder="Введіть вашу електронну пошту"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" disabled={isSending}>
                        {isSending ? 'Відправка...' : 'Підтвердити'}
                    </button>
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
            <Footer/>

        </main>
    );
}
export default ConfirmEmail;