import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteGuestById, getAllGuests } from '../services/GuestService';
import { Button, ButtonGroup } from 'reactstrap';

const ListGuest = () => {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchGuests = async () => {
      try {
        const response = await getAllGuests(token);
        setGuests(response.data);
        console.log(response.data);
      } catch (error) {
        console.log('Error fetching guests:', error);
      }
    };

    fetchGuests();
  }, []);

  const deleteGuest = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await deleteGuestById(id,token);
      setGuests((prevGuests) => prevGuests.filter((guest) => guest.id !== id));
    } catch (error) {
      console.error('Error deleting guest:', error);
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
      <h2 className='text-center'>List Guests</h2>
      <Link to='/addGuest' className='btn btn-primary mb-2'>
        Add Guest
      </Link>
      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            <th>Guest ID</th>
            <th>Email</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest.id}>
              <td>{guest.id}</td>
              <td>{guest.email}</td>
              <td>{guest.name}</td>
              <td>{guest.phone}</td>
              <td>{guest.address}</td>
              <td>
                <Link className='btn btn-info' to={`/editGuest/${guest.id}`}>
                  Update
                </Link>
                <button
                  className='btn btn-danger'
                  onClick={() => deleteGuest(guest.id)}
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

export default ListGuest;
