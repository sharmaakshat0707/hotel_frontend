import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteRoomById, getAllRooms } from '../services/RoomService';
import { Button, ButtonGroup } from 'reactstrap';

const ListRoomComponent = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchRooms = async () => {
      try {
        const response = await getAllRooms(token);
        setRooms(response.data);
        console.log(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log('Token is invalid or expired. Redirecting to login page...');
          // Redirect to the login page or show an error message to the user
        } else {
          console.log('Error fetching rooms:', error);
        }
      }
    };

    if (token) {
      fetchRooms();
    } else {
      // Handle token not found, redirect to login page or show an error message
      console.log('Token not found. Redirecting to login page...');
      // Redirect to the login page or show an error message to the user
    }
  }, []);

  const deleteRoom = async (roomId) => {
    const token = localStorage.getItem('token');

    try {
      await deleteRoomById(roomId, token);
      setRooms((prevRooms) => prevRooms.filter((room) => room.roomId !== roomId));
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  return (
    <div className='container'>
       <div>
        <ButtonGroup>
          <Button tag={Link} to="/manager/dashboard">
            Home
          </Button>
          <Button tag={Link} to="/listRooms">
            Rooms
          </Button>
          <Button tag={Link} to="/listStaff">
            Staff
          </Button>
          </ButtonGroup>
          </div>
      <h2 className='text-center'>List Rooms</h2>
      <Link to='/addRoom' className='btn btn-primary mb-2'>
        Add Rooms
      </Link>
      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            <th>Room ID</th>
            <th>Room Number</th>
            <th>Room Type</th>
            <th>Price</th>
            <th>Max Capacity</th>
            {/* <th>Booking ID</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.roomId}>
              <td>{room.roomId}</td>
              <td>{room.roomNumber}</td>
              <td>{room.roomType}</td>
              <td>{room.price}</td>
              <td>{room.maxCapacity}</td>
              {/* <td>{room.booking ? room.booking.bookingId : '-'}</td> */}
              <td>
                <Link className='btn btn-info' to={`/editRoom/${room.roomId}`}>
                  Update
                </Link>
                <button
                  className='btn btn-danger'
                  onClick={() => deleteRoom(room.roomId)}
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

export default ListRoomComponent;