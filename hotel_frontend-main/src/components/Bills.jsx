import React, { useEffect, useState } from "react";
import "../css/Bills.css";
import { useLocation, useNavigate } from "react-router";

const Bills = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const { checkInDate, checkOutDate , numAdult,numChildren } = location.state?.data;

  const calculateNumNights = () => {
    if (checkInDate && checkOutDate) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      const timeDiff = checkOut - checkIn;
      const numNights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      return numNights;
    }
    return 0;
  };

  useEffect(() => {
    if (location.state?.from !== "/payment" || localStorage.getItem("token") == null) {
      navigate("/login");
    } else {
      const { rooms ,data} = location.state?.data;

      const price = rooms.reduce((total, room) => total + room.price, 0);
      const numNights = calculateNumNights();
      const numAdult = location.state?.numAdults;
      const numChildren = location.state?.numChildren;
      const totalPrice = price * numNights;

      setTotalPrice(totalPrice);
    }
  }, []);

  const handlePaymentButtonClick = () => {
    navigate("/creditcard");
  };

  return (
    <div>
      <div className="bill-card">
        <div className="card-header" style={{ color: "white",letterSpacing: "1px" }}>
          <h1 style={{fontSize: "25px"}}>LEMON TREE HOTEL , BHOPAL</h1>
        </div>
        <div className="card-header" style={{ color: "white"}}>
          <h3 style={{marginLeft:"140px",  fontSize: "20px"}}>Invoice & Bills</h3>
        </div>
        <div className="BillDetails">
        <ul className="list-group list-group-flush">
        <li className="list-group-item"  style={{backgroundColor:"rgb(224, 224, 224)"}}>
          Billing Number : {location.state?.data.bookingId}
          <br/>
          <br/>
          Room Type: 
          <br/>
          <br/>
          Name of Guest : 
          </li>
          </ul>
        </div>
        <ul className="list-group list-group-flush" style={{backgroundColor:"rgb(224, 224, 224)"}}>
          <li className="list-group-item"  style={{backgroundColor:"rgb(238, 238, 238)"}}>
        
            Check-In-Date : {checkInDate} <br /> <br /> Check-Out-Date : {checkOutDate}
          </li>
          <li className="list-group-item"  style={{backgroundColor:"rgb(224, 224, 224)"}}>

            No Of Adult {location.state?.data.numAdults} :: No Of Children {location.state?.data.numChildren}
            <br />
            <br />
            Total Night = {calculateNumNights()} <br />
            <br />

            Amount To Be Paid is Rs = {totalPrice}/- <br />
            <br />
          </li>
          <li className="list-group-item"  style={{backgroundColor:"rgb(224, 224, 224)"}}>
          <button type="button" className="btnsuccess" onClick={handlePaymentButtonClick}>
              Pay Here
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Bills;
