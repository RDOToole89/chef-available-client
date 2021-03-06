import { axios } from "../../config/constants";
import { fetchUserMessages } from "../messages/messageActions";

export const SAVE_ALL_BOOKINGS = "SAVE_ALL_BOOKINGS";

export const saveAllBookings = (bookings) => {
  return {
    type: SAVE_ALL_BOOKINGS,
    payload: [...bookings],
  };
};

export const fetchBookings = (userId, userType) => async (dispatch, getState) => {
  try {
    const response = await axios.get(`/bookings/${userId}/${userType}`);

    if (response) {
      dispatch(saveAllBookings(response.data));
    }
  } catch (e) {
    console.log(e);
  }
};

export const updateBooking = (bookingId, bookingDate) => async (dispatch, getState) => {
  const userType = getState().userLogin.userType;
  const userId = getState().userLogin.id;

  try {
    const response = await axios.put("/bookings", { bookingId, bookingDate, userId });

    if (response) {
      dispatch(fetchUserMessages(userId));
      dispatch(fetchBookings(userId, userType));
    }
  } catch (e) {
    console.log(e);
  }
};

export const deleteBooking = (id) => async (dispatch, getState) => {
  const userId = getState().userLogin.id;
  const userType = getState().userLogin.userType;

  try {
    const response = await axios.delete(`/bookings/${id}`);

    if (response) {
      dispatch(fetchBookings(userId, userType));
    }
  } catch (e) {
    console.log(e);
  }
};
