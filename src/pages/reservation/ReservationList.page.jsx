import { Suspense, use, useState, useTransition } from 'react';
import { cancelReservation, getMyReservations } from '../../services/reservation.service.js';
import { toast } from 'sonner';

export default function ReservationListPage() {

  const [promise, setPromise] = useState(() => getMyReservations());

  const refreshReservations = () => {
    setPromise(getMyReservations());
  };

  return (
    <>
      <h2>Liste de mes reservations</h2>
      <Suspense>
        <ReservationListPageInner reservationPromise={promise} onCancel={refreshReservations} />
      </Suspense>
    </>
  );
}

function ReservationListPageInner({ reservationPromise, onCancel }) {
  const reservations = use(reservationPromise);
  const [isPending, startTransition] = useTransition();

  const handleCancel = async (id) => {
    const result = await cancelReservation(id);

    startTransition(() => {
      onCancel();
      toast(`Reservation supprimée pour la salle ${result?.room?.name}`); // The issue problem is the ${result.room.name}, because result, room are undefinied after deletion, which trows an error during render and the page do not refresh; You can either delete the ${result.room.name} or write it this way: ${result?.room?.name}
    });
  };

  return (
    <ul className="reservation-list">
      {reservations.map(reservation => (
        <li key={reservation.id}>
          <p>{new Date(reservation.dateReserved).toLocaleDateString()}</p>
          <p>{reservation.name}</p>
          <p>{reservation.room.name}</p>
          <button onClick={() => handleCancel(reservation.id)} disabled={isPending}>Annuler</button>
        </li>
      ))}
    </ul>
  );
}