import React, { useState } from "react";
import "../css/Available.css";
import { getAvailableRooms } from '../services/RoomService'
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Bills from "./Bills";


const Available = () => {

  const navigate = useNavigate();
  const [data, setData] = useState({
    checkInDate: new Date(),
    checkOutDate: new Date(),
    numAdults: '',
    numChildren: '',
    numNights: '',
  })

  const handleChange = (e) => {
    if (e.target.name === 'checkInDate' || e.target.name === 'checkOutDate') {
      setData({ ...data, [e.target.name]: new Date(e.target.value) });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const calculateNumNights = () => {
    if (data.checkInDate && data.checkOutDate) {
      const checkIn = new Date(data.checkInDate);
      const checkOut = new Date(data.checkOutDate);
      const timeDiff = checkOut - checkIn;
      const numNights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Calculate number of nights
      return numNights.toString(); // Convert to a string before returning
    }
    return '';
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkInDate = data.checkInDate.toISOString().split("T")[0];
    const checkOutDate = data.checkOutDate.toISOString().split("T")[0];
    const numAdults = parseInt(data.numAdults);
    const numChildren = parseInt(data.numChildren);
    const numNights = calculateNumNights(); 
    // const numRooms = parseInt();
    setData({...data,numNights});
    console.log(data.checkInDate.toISOString())
    console.log(data);

    if (checkOutDate < checkInDate) {
      toast.error("Check-out date should be after check-in date");
      return;
    }

    if(numAdults<=0){
      toast.error("numAdults should be greater than 0");
      return;
    }
    
    getAvailableRooms({
      checkInDate: data.checkInDate.toISOString().split('T')[0],
      checkOutDate: data.checkOutDate.toISOString().split('T')[0],
      numAdults: parseInt(data.numAdults),
      numChildren: parseInt(data.numChildren),
      numNights: numNights,

    }).then(res => {
      console.log(res.data)
      navigate('/image-slider', {
        state: {
          from: '/available',
          data: res.data,
          checkInDate: data.checkInDate.toISOString().split('T')[0],
          checkOutDate: data.checkOutDate.toISOString().split('T')[0],
          numAdults:parseInt(data.numAdults),
          numChildren:parseInt(data.numChildren),

        }
      })
    }).catch(err => {
      console.log(err)
    })

  }

  return (
    <div className="available">
      <div className="available-box">
        <form onSubmit={handleSubmit}>
          <label style={{ margin: "20px 150px" }}>
            <b>Check-In-Date:</b>
            <input
              type="date"
              name="checkInDate"
              value={
                data.checkInDate.getFullYear().toString() +
                "-" +
                (data.checkInDate.getMonth() + 1).toString().padStart(2, 0) +
                "-" +
                data.checkInDate.getDate().toString().padStart(2, 0)
              }
              onChange={handleChange}
              required />
          </label>
          <label>
            <b>Check-Out-Date:</b>
            <input
              type="date"
              name="checkOutDate"
              value={
                data.checkOutDate.getFullYear().toString() +
                "-" +
                (data.checkOutDate.getMonth() + 1).toString().padStart(2, 0) +
                "-" +
                data.checkOutDate.getDate().toString().padStart(2, 0)
              }
              onChange={handleChange}
              required />
          </label>
          <div className="inputBox">
              <h3>No of Adults</h3>
              <input
                type="number"
                name="numAdults"
                placeholder="Number of Guests"
                onChange={handleChange}
                value={data.numAdults}
                min={1}
                required
              />
            </div>
            <div className="inputBox">
              <h3>Number of Nights</h3>
              <input
                type="text" // Change input type to 'text' to display the calculated numNights
                name="numNights"
                placeholder="Number Of Nights"
                value={calculateNumNights()} // Use calculateNumNights() to display the calculated value
                readOnly // Make the input read-only
                required
              />
            </div>
            <div className="inputBox">
              <h3>Number Of Children</h3>
              <input
                type="number"
                name="numChildren"
                placeholder="Number Of Children"
                onChange={handleChange}
                value={data.numChildren}
                min={0}
                required
              />
            </div>
          <button className="con-button" type="submit">SEARCH</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Available;