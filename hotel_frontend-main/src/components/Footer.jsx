import React from "react"
import "../css/Footer.css"
const Footer = () => {
    return (
        <footer>
            <div className='container grid2 foot'>
                <div className='Footer-box '>
                    <h1 className="Head">Lemon-Tree</h1>
                    <p>Lemon Tree Hotel, Bhopal Welcomes You With Cheery Greetings, A Friendly Smile And A Whiff Of The Signature</p>
                    <p>For those seeking relaxation, our hotel offers a range of leisure facilities to help you unwind. </p>
                </div>

                <div className='Footer-box'>
                    <h1 className="Head">Highlights</h1>
                    <ul>
                        <li>Prime Location</li>
                        <li>Diverse Cuisines</li>
                        <li>Professional Staffs</li>
                        <li>24/7 Reception</li>
                        <li>Complimentry Services</li>
                    </ul>
                </div>
                {/* <div className='Footer-box'>
                    <h1 className="Head">Customer Care</h1>
                    <ul>
                        <li>Help Center </li>
                        <li>How to Book </li>
                        <li>Professional Staffs</li>
                        <li>24/7 Reception</li>
                        <li>Complimentry Services</li>
                    </ul>
                </div> */}
                <div className='Footer-box'>
                    <h1 className="Head">Contact Us</h1>
                    <ul>
                        <li>Near Hotel Surendra Vilas, Bhopal</li>
                        <li>Email: hotellemontree2@gmail.com</li>
                        <li>Mob : +91 7849999054</li>
                    </ul>
                </div>
                <div className='Footer-box'>
                <h1 className="Head">Our Brands</h1>
                <ul>
                        <li>Lemon-Tree</li>
                        
                    </ul>
                </div>
            </div>
            <p style={{marginLeft: "435px"}} >Copyright © 2023, The Lemon Tree Hotels & Banquet. All rights reserved. Powered by Lemon Tree.  </p>
            <p style={{marginLeft: "750px"}} >Lemon - Tree</p>
        </footer>
    )
}

export default Footer
