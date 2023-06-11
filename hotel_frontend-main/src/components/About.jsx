import React from 'react'
import '../css/About.css';
import Bhopal4 from '../assets/Bhopal/Bhopal4.jpg';


const About = () => {
  return (
    <div>
      <div className="content-head">
        <div className="content-mid">
            <div className="content-img">
                <img src={Bhopal4} alt="About" />
            </div>
            <div className="content-cont">
                <p className='Para-about'>Located In The Heart Of City, Lemon Tree Hotel, Bhopal Welcomes You With Cheery Greetings, A Friendly Smile And A Whiff Of The Signature</p>
                <p className='Para-about'>Luxury, elegance, personalized service, and all the contemporary facilities are combined to provide an environmentally friendly hotel. Don't miss out on our offers. We guarantee you the best price for all our properties.</p>
                <p className='Para-about'>Lemon Fragrance.Defined By Our Values And Is A Serene Experience That We Offer Our Guests, Who Seek To Enter A World Of Leisure And Rejuvenation.</p>
                <p className='Para-about'>In The Edge Of A Green Forest Or The Palace That Speaks The Story Of Century-Old History, Our Beautiful Properties In Bhopal Will Astonish You With Exceptional Hospitality And Facilities.</p>
                <p className='Para-about'>We look forward to having you visit our hotels and creating memories with us.</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default About