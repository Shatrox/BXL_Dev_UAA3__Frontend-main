import { useAtom } from 'jotai';
import { tokenAtom } from '../../store.js';
import { authLogin } from '../../services/auth.service.js';
import { Navigate } from 'react-router';

export default function LoginPage() {
  const [token, setToken] = useAtom(tokenAtom);

  const loginAction = async (formData) => {
    const data = await authLogin(formData.get('email'), formData.get('password'));
    setToken(data.token);
  };

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <h1>Se connecter</h1>
      <form action={loginAction}>
        <div>
          <label htmlFor='auth-email'>Email :</label>
          <input id='auth-email' type='email' name='email' />
        </div>
        <div>
          <label htmlFor='auth-pwd'>Mot de passe :</label>
          <input id='auth-pwd' type='password' name='password' />
        </div>
        <div>
          <button type='submit'>Valider</button>
        </div>
      </form>
    </>
  )
}