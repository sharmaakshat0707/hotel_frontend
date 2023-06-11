import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllBookings, deleteBookingById } from '../services/BookingService';
import { Button, ButtonGroup } from 'reactstrap';


const ListBooking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchBookings = async () => {
      try {
        const response = await getAllBookings(token);
        setBookings(response.data);
        console.log(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log('Token is invalid or expired. Redirecting to login page...');
          // Redirect to the login page or show an error message to the user
        } else {
          console.log('Error fetching bookings:', error);
        }
      }
    };

    if (token) {
      fetchBookings();
    } else {
      // Handle token not found, redirect to login page or show an error message
      console.log('Token not found. Redirecting to login page...');
      // Redirect to the login page or show an error message to the user
    }
  }, []);

  const deleteBooking = async (id) => {
    const token = localStorage.getItem('token');

    try {
      await deleteBookingById(id, token);
      setBookings((prevBookings) => prevBookings.filter((booking) => booking.bookingId !== id));
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  return (
    <div className='container'>
          <div>
      <ButtonGroup>
        <Button tag={Link} to="/owner/dashboard">
            Home
        </Button>
        <Button tag={Link} to="/listOfRoom">
          Rooms
        </Button>
        <Button tag={Link} to="/listOfBooking">
          Bookings
        </Button>
        <Button tag={Link} to="/listOfStaff">
          Staff
        </Button>
        <Button tag={Link} to="/listOfGuest">
          Guest
        </Button>
      </ButtonGroup>
    </div>
      <h2 className='text-center'>List Bookings</h2>
      <Link to='/add-booking' className='btn btn-primary mb-2'>
        Add Booking
      </Link>
      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            <th>Booking id</th>
            <th>Booking numChildren</th>
            <th>Booking numAdults</th>
            <th>Booking checkInDate</th>
            <th>Booking checkOutDate</th>
            {/* <th>Booking numNights</th> */}
            <th>Room id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.bookingId}</td>
              <td>{booking.numChildren}</td>
              <td>{booking.numAdults}</td>
              <td>{booking.checkInDate}</td>
              <td>{booking.checkOutDate}</td>
              {/* <td>{booking.numNights}</td> */}
              <td>{booking.rooms.length > 0 ? booking.rooms[0].roomId : '-'}</td>
              <td>
                <Link className='btn btn-info' to={`/editBooking/${booking.bookingId}`}>
                  Update
                </Link>
                <button
                  className='btn btn-danger'
                  onClick={() => deleteBooking(booking.bookingId)}
                  style={{ marginLeft: '10px' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListBooking;