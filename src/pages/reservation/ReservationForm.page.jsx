import AsyncSelect from 'react-select/async';
import { createReservation, getRoomList } from '../../services/reservation.service.js';
import { toast } from 'sonner';

export default function ReservationFormPage() {

  const roomPromise = async () => {
    const data = await getRoomList();

    return data.map(item => ({
      value: item.id,
      label: item.name
    }));
  };

  const handleReservationAction = async (formData) => {
    const data = Object.fromEntries(formData.entries());
    const result = await createReservation(data);
    console.log(result);
    
    toast(`Reservation créée pour la salle ${result.room.name}`);
  };

  return (
    <>
      <h2>Nouvelle reservation</h2>
      <form action={handleReservationAction}>
        <div>
          <label htmlFor='reservation-name'>Nom :</label>
          <input id='reservation-name' type='text' name='name' />
        </div>
        <div>
          <label htmlFor='reservation-date'>Date :</label>
          <input id='reservation-date' type='date' name='dateReserved' />
        </div>
        <div>
          <label htmlFor='reservation-room'>Salle :</label>
          <AsyncSelect id='reservation-room' name='roomId'
            loadOptions={roomPromise} cacheOptions defaultOptions />
        </div>
        <div>
          <button type='submit'>Valider</button>
        </div>
      </form>
    </>
  );
}