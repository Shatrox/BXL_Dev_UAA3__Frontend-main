import axios from 'axios';
import { tokenAtom, store } from '../store.js';

export async function getRoomList() {
  const response = await axios.get('/Room', {
    baseURL: import.meta.env.VITE__BASE_URL_API
  });
  return response.data;
}

export async function getMyReservations() {
  const token = store.get(tokenAtom);

  const response = await axios.get('/Reservation', {
    baseURL: import.meta.env.VITE__BASE_URL_API,
    headers: {
      authorization: `Bearer ${token}`
    }
  });
  return response.data;
}

export async function cancelReservation(reservationId) {
  const token = store.get(tokenAtom);

  const response = await axios.delete(`/Reservation/${reservationId}`, {
    baseURL: import.meta.env.VITE__BASE_URL_API,
    headers: {
      authorization: `Bearer ${token}`
    }
  });
  return response.data;
}

export async function createReservation(data) {
  const token = store.get(tokenAtom);

  const response = await axios.post('/Reservation', data, {
    baseURL: import.meta.env.VITE__BASE_URL_API,
    headers: {
      authorization: `Bearer ${token}`
    }
  });
  return response.data;
}