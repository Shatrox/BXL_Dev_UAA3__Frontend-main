import { Route, Routes } from 'react-router';
import './App.css';
import Header from './ui/Header/Header.jsx';
import ReservationPage from './pages/reservation/Reservation.page.jsx';
import LoginPage from './pages/auth/Login.page.jsx';
import ReservationListPage from './pages/reservation/ReservationList.page.jsx';
import ReservationFormPage from './pages/reservation/ReservationForm.page.jsx';
import { Toaster } from 'sonner';

function App() {

  return (
    <>
      <Header/>
      <Toaster />
      <main>
        <Routes>
          <Route path='' element={<ReservationPage />}>
            <Route index element={<ReservationListPage />} />
            <Route path='new' element={<ReservationFormPage />} />
          </Route>
          <Route path='auth/login' element={<LoginPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
