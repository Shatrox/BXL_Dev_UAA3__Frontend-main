import { useAtom } from 'jotai';
import { Link, useNavigate } from 'react-router';
import { tokenAtom } from '../../store.js';

const navLinks = [
    { href: '/', name: 'Mes reservations' },
    { href: '/new', name: 'Créer une reservation' },
];

export default function Header() {
    const [auth, setAuth] = useAtom(tokenAtom);
    const navigate = useNavigate();

    const authAction = () => {
        if(!auth) {
            navigate('/auth/login');
        }
        else {
            setAuth(null);
            navigate('/');
        }
    }

    return (
        <header>
            <p>Dev-UAA3</p>
            <nav>
                <ul>
                    {navLinks.map(elem => (
                        <li key={elem.href}>
                            <Link to={elem.href}>{elem.name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <button onClick={authAction}>
                {!auth ? 'Se connecter' : 'Se déconnecter'}
            </button>
        </header>
    );
}