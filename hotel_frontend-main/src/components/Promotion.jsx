import React from 'react'
import '../css/Promotion.css';
import Image1 from '../assets/Promotion/Image1.png';
import Image3 from '../assets/Promotion/Image3.png';
import Image2 from '../assets/Promotion/Image2.png';


const Promotion = () => {
  return (
    <div>
      <h1>Offers & Promotion</h1>
      <div className="promo-one">
        <div className="promo-first">
          <img src={Image1} alt="" style={{height:"750px" , width:"680px" , objectFit:"bottom"}}/>
          <div className="promo-overlay">
          <div className="promo-text"><button type="button" className="btn btn-success" style={{marginRight: "60px"}}>Book Your Rooms Now!</button></div>

          </div>
        </div>
        <div className="promo-second">
          <div className="promo-third">
            <img src={Image3} alt="" style={{height:"370px" , width:"360px" , objectFit:"cover"}}/>
            <div className="promo-overlay">
              <div className="promo-text"><button type="button" className="btn btn-success" style={{marginRight: "60px"}}>Book Your Rooms Now!</button></div>
            </div>
          </div>
          <div className="promo-four">
            <img src={Image2} alt="" style={{height:"360px" , width:"360px"}}/>
            <div className="promo-overlay">
                 <div className="promo-text"><button type="button" className="btn btn-success" style={{marginRight: "60px"}}>Book Your Rooms Now!</button></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Promotion