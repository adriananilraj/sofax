import "react-datepicker/dist/react-datepicker.css";

import Bold2 from '../assets/svg/bold2.svg';
import DatePicker from "react-datepicker";
import React from 'react'
import Stars from './Stars'
import { useState } from 'react';

function DateAndTime(props) {
    // const [startDate, setStartDate] = useState(new Date());
    const [date, setStartDate] = useState(new Date());
    let removeVlad = false;
    const isWeekday = (date) => {
        const day = new Date(date).getDay();
        return day !== 0 && day !== 6;
      };
    
    const getSelectedDoctor = () => {
        let data = props.data
        return (
            <div className="col-6">
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
            </div>
        )
    }

    const onSubmit = () => {
        if (removeVlad) return false;
        else {
            props.data['date_time'] = date;
            props.onDataReceived(props.data, 'add')
        }
    }

    const handleDateChange = (data) => {
        removeVlad = true;
        setStartDate(data);
    }

    const addDays = (date, num) => {
        const currDate = new Date(date);
        return currDate.setDate(currDate.getDate() + num);
    }

    const addTime = (date, num) => {
        const currDate = new Date(date);
        currDate.setHours(num); // Following 24 hours system
        return currDate;
    }

    // const addTime = (time, type) => {
    //     let currDate = new Date();
    //     let timeArry = time.split('-');
    //     let target0 = timeArry[0];
    //     let target1 = timeArry[1];
    //     if (type == 'min') {
    //         let startTime = target0.slice(0,1);
    //         // console.log(target.slice(0,1));
    //         currDate.setHours(startTime);
    //         return currDate;
    //     } 
    //     if (type == 'max') {
    //         let endTime = target1.slice(1,2);
    //         console.log(endTime);
    //         currDate.setHours(endTime + 12); // Following 24 hours system
    //         return currDate;
    //     }
    //     // currDate.setHours(time);
    //     // return currDate;
    //     // let formatStart = startTime.slice(0,1) + ': ' + 00 + ' ' + startTime.slice(2,4)
    // }
    // addTime();

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
                        dateFormat="MMMM d, yyyy h:mm aa"
                        minDate={addDays(props.data.doctor.available_from, 2)}
                        maxDate={addDays(new Date(), 21)}
                        timeIntervals={60}
                        minTime={addTime(props.data.doctor.available_from, 9)}
                        maxTime={addTime(props.data.doctor.available_from, 18)}
                        filterDate={isWeekday}
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