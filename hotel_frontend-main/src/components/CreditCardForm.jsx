import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/CreditCard.css";
import { saveCard } from "../services/CreditCardService";
import Swal from "sweetalert2";

const CreditCardForm = () => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expirationMonth, setExpirationMonth] = useState("");
  const [expirationYear, setExpirationYear] = useState("");
  const [cvv, setCVV] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (cardNumber.length !== 16) {
      Swal.fire({
        icon: "error",
        title: "Invalid Card Number",
        text: "Card Number should be exactly 16 digits.",
      });
      return;
    }

    if (!cardHolderName) {
      Swal.fire({
        icon: "error",
        title: "Missing Card Holder Name",
        text: "Please enter the Card Holder Name.",
      });
      return;
    }

    if (!expirationMonth || !expirationYear || !cvv) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Details",
        text: "Please enter all required fields.",
      });
      return;
    }

    const creditCardData = {
      cardNumber,
      cardHolderName,
      expirationMonth,
      expirationYear,
      cvv,
    };

    const token = localStorage.getItem("token");

    try {
      // Send the credit card data to the server
      const response = await saveCard(creditCardData, token);
      console.log(response.data);

      // Reset the form
      setCardNumber("");
      setCardHolderName("");
      setExpirationMonth("");
      setExpirationYear("");
      setCVV("");
      Swal.fire({
        icon: "success",
        title: "Payment Successful!",
        text: "Your payment has been successfully processed.",
      }).then(() => {
        // Navigate to homepage after clicking "OK" button
        navigate("/");
      });
    } catch (error) {
      console.error("Error saving credit card details:", error);
    }
  };

  return (
    <div>
      <div className="creditbg">
        <div className="credit-con">
          <form onSubmit={handleSubmit}>
            <div className="mb-3 taking">
              <label htmlFor="cardNumberInput" className="form-label">
                Card Number
              </label>
              <input
                type="text"
                className="form-control"
                id="cardNumberInput"
                placeholder="Enter Your Card Number Here"
                style={{ width: "400px" }}
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
                minLength={16}
                maxLength={16}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cardHolderNameInput" className="form-label">
                Name on Card
              </label>
              <input
                type="text"
                className="form-control"
                id="cardHolderNameInput"
                placeholder="Enter Your Name on Card"
                style={{ width: "400px" }}
                value={cardHolderName}
                onChange={(e) => setCardHolderName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cvvInput" className="form-label">
                Card CVV
              </label>
              <input
                type="text"
                className="form-control"
                id="cvvInput"
                placeholder="Enter Card CVV"
                style={{ width: "400px" }}
                value={cvv}
                onChange={(e) => setCVV(e.target.value)}
                required
                minLength={3}
                maxLength={3}
              />
            </div>
            <div
              className="form-row"
              style={{ margin: "20px 2px", display: "flex" }}
            >
              <div className="form-group col-6">
                <label htmlFor="expirationMonthSelect">Expiration Month</label>
                <select
                  className="form-control"
                  id="expirationMonthSelect"
                  value={expirationMonth}
                  onChange={(e) => setExpirationMonth(e.target.value)}
                  required
                  style={{ marginTop: "9px", marginLeft: "13px" }}
                >
                  <option value="">Select Month</option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>
              <div className="form-group col-6">
                <label htmlFor="expirationYearSelect">Expiration Year</label>
                <select
                  className="form-control"
                  id="expirationYearSelect"
                  value={expirationYear}
                  onChange={(e) => setExpirationYear(e.target.value)}
                  required
                  style={{ marginTop: "9px", marginLeft: "13px" }}
                >
                  <option value="">Select Year</option>
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
              </div>
            </div>
            <br />
            <button type="submit" className="btn btn-success">
              Confirm Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreditCardForm;
