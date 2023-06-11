import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllStaffs, deleteStaffById } from '../services/StaffService';
import { Button, ButtonGroup } from 'reactstrap';


const ListStaffComponent = () => {
  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchStaffMembers = async () => {
      try {
        const response = await getAllStaffs(token);
        setStaffs(response.data);
        console.log(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log('Token is invalid or expired. Redirecting to login page...');
          // Redirect to the login page or show an error message to the user
        } else {
          console.log('Error fetching staff members:', error);
        }
      }
    };

    if (token) {
      fetchStaffMembers();
    } else {
      // Handle token not found, redirect to login page or show an error message
      console.log('Token not found. Redirecting to login page...');
      // Redirect to the login page or show an error message to the user
    }
  }, []);

  const deleteStaffMember = async (id) => {
    const token = localStorage.getItem('token');

    try {
      await deleteStaffById(id, token);
      setStaffs((prevStaffs) => prevStaffs.filter((staff) => staff.id !== id));
    } catch (error) {
      console.error('Error deleting staff member:', error);
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
      <h2 className='text-center'>List Staff</h2>
      <Link to='/add-Staff' className='btn btn-primary mb-2'>
        Add Staff
      </Link>
      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            <th>Staff id</th>
            <th>Staff name</th>
            <th>Staff email</th>
            <th>Staff salary</th>
            <th>Staff designation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffs.map((staff) => (
            <tr key={staff.id}>
              <td>{staff.id}</td>
              <td>{staff.name}</td>
              <td>{staff.email}</td>
              <td>{staff.salary}</td>
              <td>{staff.designation}</td>
              <td>
                <Link className='btn btn-info' to={`/editStaff/${staff.id}`}>
                  Update
                </Link>
                <button
                  className='btn btn-danger'
                  onClick={() => deleteStaffMember(staff.id)}
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

export default ListStaffComponent;