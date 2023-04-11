import '../css/appointment/appointment.css';

import DateAndTime from '../component/DateAndTime';
import GeneralInfo from '../component/GeneralInfo';
import { Link } from "react-router-dom";
import One from '../assets/svg/one.svg';
import PatientForm from '../component/PatientForm';
import Three from '../assets/svg/three.svg';
import Two from '../assets/svg/two.svg';
import { useState } from 'react';

// import { three } from '../assets/svg/two.svg';
// import { two } from '../assets/svg/three.svg';


export default function appointment() {

  const [dateSelected, setDateSelected] = useState(new Date());
  const [data, setData] = useState({});
  const [currPage, setCurrPage] = useState(1);
  const [selectedHouseDesigner, setSelectedHouseDesigner] = useState({});
  // let selectedHouseDesigner = {};

  const handleSelect = (date) => {
    console.log(date);
    setDateSelected(date);
  }

  const handleInput = (key, e) => {

    data[key] = e.target.value;
  }

  const nextPage = (data, action) => {
    console.log(action);
    let target = currPage + (action == 'add' ? 1 : -1);
    setCurrPage(target);
    setSelectedHouseDesigner(data);
  }

  const handleSubmit = (e) => {
    let target = {...data};
    target.booked_date = dateSelected;
    
    //Send data back to backend via POST

    fetch('http://127.0.0.1:8000/api/customers', {

      method: 'POST',
      mode: 'cors',
      body: target
    })
    e.preventDefault();
  } 

    return (
      <section className='wrapper'>
        <div className="card">
          <div className="card-title">
            <h1>Book An Appointment To A House Designer</h1>
          </div>
          <div className="tabs">
            <div className="tab-group">
              <img className='tab' src={One}/>
              <h4>Fill in General Info</h4>
            </div>
            <div className="tab-group">
            <img className='tab' src={Two}/>
              <h4>Choose Date and Time</h4>
            </div>
            <div className="tab-group">
            <img className='tab' src={Three}/>
              <h4>Fill in Personal Details</h4>
            </div>
          </div>
          <div className="mt-50 general-container">
            {
              currPage == 1 ? <GeneralInfo onDataReceived={(data, action) => {nextPage(data, action);}}/> : ''
            }
            {
              currPage == 2 ? <DateAndTime onDataReceived={(data, action) => {nextPage(data, action);}} data={selectedHouseDesigner}/> : ''
            }
            {
              currPage == 3 ? <PatientForm onDataReceived={(data) => {nextPage(data);}} data={selectedHouseDesigner}/> : ''
            }
            </div>
          {/* <div className="content">
            <form onSubmit={(e) => {handleSubmit(e)}}>
              <div className="date-picker">
              <Calendar
                  date={dateSelected}
                  onChange={handleSelect}
              />
              </div>
              <div>
                <label className='color-white'>Name</label>
                <input required type="text" onInput={(e) => {handleInput('name', e)}}/>
                <label className='color-white'>Email</label>
                <input required type='email' onInput={(e) => {handleInput('email', e)}}/>
                <button type='submit' className='button primary'>BOOK NOW</button>
              </div>
            </form>
          </div> */}
        </div>
      </section>
    )
  }
  