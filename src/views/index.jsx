import '../css/index/index.css';

import { Link, useLocation } from "react-router-dom";

export default function index() {



  return (
    <div className="wrapper">
      <div className="left-wrapper">
        <div className="content">
          <div className='title dark'>I AM HERE TO BOOK</div>
          <div className='title-dark-bold'>AN APPOINTMENT</div>
          <span className='title-light'>I want to book an appointment with a house designer</span>
          <Link to="/appointment" relative='path'>
            <button className='button primary mt-50'>Discover More</button>
          </Link>
        </div>
      </div>
      <div className="right-wrapper">
      <div className="content">
          <div className='title dark'>TAKE ME TO</div>
          <div className='title-light-bold'>SofaX WEBSITE</div>
          <span className='title-light'>Want to design and furnish your home?</span>
          <a href="https://www.sofax.com/">
          <button className='button primary mt-50'>Discover More</button>
          </a>
        </div>
      </div>
    </div>
  )
}
