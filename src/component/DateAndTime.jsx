import "react-datepicker/dist/react-datepicker.css";

import Bold2 from '../assets/svg/bold2.svg';
import DatePicker from "react-datepicker";
import React from 'react'
import Stars from './Stars'
import { useState } from 'react';

function DateAndTime(props) {
    const [startDate, setStartDate] = useState(new Date());
    const [date, setDate] = useState(new Date());
    
    const getSelectedDoctor = () => {
        let data = props.data
        return (
            <div
            className={'cardDoctor card-bg active'}
            style={{alignSelf: 'flex-start'}} 
            >
            <div className="card-header">
                <img width={'45%'} src={data.doctor.img}/>
                <div>
                    <span>{data.doctor.name}</span>
                    <div>
                        {
                            <Stars count={data.doctor.rating}/>
                        }
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="desc">
                {data.doctor.desc}
                </div>
                <div className="w-desc">
                    <p>Available From: <span>{data.doctor.available_from}</span></p>
                    <p>Working Hours: <span>{data.doctor.working_hours}</span></p>
                </div>
            </div>
            <div className="card-footer">
                {/* <div style={{display:'flex', alignItems: 'center'}}>
                    <input  type="radio" checked={currDoctor == data.name && data.availability == 1} id={data.name} name={"choice"} onChange={(e) => {handleOnChange(e)}} value={data.name}/>
                        <label style={{paddingLeft:'10px'}} htmlFor={data.name}>Choose</label>
                </div> */}
                <div>&#8594;View Profile</div>
            </div>
            </div>
        )
    }

    const onSubmit = () => {

        props.data['date_time'] = date;
        console.log(props.data);
        props.onDataReceived(props.data, 'add')
    }

    const handleDateChange = (data) => {
        console.log(data);
        setDate(data);
        console.log(date);
    }

  return (
    <>
        <div className="header">
            <div><img className='number-1' src={Bold2}/></div>
            <h5>DATE AND
                 TIME</h5>
        </div>
        <div style={{margin: '10px 0'}}>Your House Designer</div>
        <div className="dateTimeWrapper">
            {
                getSelectedDoctor()
            }
            <div className="date">
                <div>
                    <label style={{textAlign: 'left'}}>Please Book A Slot</label>
                    <DatePicker
                        selected={date}
                        onChange={handleDateChange}
                        showTimeSelect
                        dateFormat="Pp"
                    />
                </div>
                <div className="rules">
                    <ol>
                        <li>You can booked an appointment 2 business days in advance</li>
                        <li>You are not allowed to book an appointment that is more than 3 weeks in advance.</li>
                    </ol>
                </div>
                <div className="scheduled">
                    Your scheduled appointment: <span style={{color:'#216ba5',}}> {date.toLocaleString()}</span>  
                </div>
                <label style={{fontSize: '0.8em', color: '#216ba5', marginRight: '10px'}} htmlFor="">Yes, this is okay.</label>
                <button onClick={() => {onSubmit()}} style={{width: '175px', marginTop: '10px'}} type='submit' className='button secondary'>Next</button>
                <div><button onClick={() => {props.onDataReceived(props.data, 'minus');}} style={{width: '175px', marginTop: '20px'}} type='submit' className='button secondary'>Back</button></div>
            </div>
        </div>
    </>
  )
}

export default DateAndTime