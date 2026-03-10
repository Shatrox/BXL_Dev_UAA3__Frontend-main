import { useAtomValue } from 'jotai';
import { tokenAtom } from '../../store.js';
import { Navigate, Outlet } from 'react-router';

export default function ReservationPage() {

  const auth = useAtomValue(tokenAtom);

  if (!auth) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <>
      <h1>Reservation</h1>
      <Outlet />
    </>
  );
}