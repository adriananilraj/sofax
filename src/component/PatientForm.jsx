import Bold3 from '../assets/svg/bold3.svg';
import DatePicker from "react-datepicker";
import React from 'react'
import Stars from './Stars'
import { useForm } from "react-hook-form";
import { useState } from 'react';

function PatientForm(props) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const getDayName = (dateStr, locale) => 
    {
        var date = new Date(dateStr);
        return date.toLocaleDateString(locale, { weekday: 'long' });        
    }
  const formatDate = (dateStr) => {
    const yyyy = dateStr.getFullYear();
    let mm = dateStr.getMonth() + 1; // Months start at 0!
    let dd = dateStr.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    
    function formatAMPM(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }

    const formatted = dd + '/' + mm + '/' + yyyy + ' ' + formatAMPM(dateStr);
    return formatted

  }
    
  const getSelectedDoctor = () => {
    let data = props.data
    console.log(data);
    return (
      <>
      <div>
        <label>Scheduled To:</label>
            <div
            className={'cardDoctor card-bg active'}
            style={{alignSelf: 'flex-start', width: '100%'}} 
            >
            <div className="card-header">
                <img width={'45%'} src={data.doctor.img}/>
                <div>
                    <span>{data.doctor.name}</span>
                    <div>
                        {
                            <Stars count={data.rating}/>
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
      </>
    )
}

  const onSubmit = () => {
    return;
    props.onDataReceived(data);


}
  return (
    <>
      <div className="header">
      <div><img className='number-1' src={Bold3}/></div>
      <h5>PERSONAL DETAILS</h5>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="patient-content mt-25">
        <div className="left-content">
                <label>Your name:</label>
                <div className='form-input-group my-10'>
                  <div>
                    <input placeholder='First' className='c-input'  type='text' {...register("first_name", {required: true})} />
                    {errors.first_name && <span style={{color: 'red', fontSize: '13px', display: 'block', marginTop: '5px'}}>This field is required</span>}    
                  </div>
                  <div>
                    <input placeholder='Last' className='c-input'  type='text' {...register("last_name", {required: true})} />
                    {errors.last_name && <span style={{color: 'red', fontSize: '13px', display: 'block', marginTop: '5px'}}>This field is required</span>}    
                  </div>
                </div>
                <div>
                  <div className='my-10'>
                    <label className='d-block'>Email Address:</label>
                    <input placeholder='example@google.com' className='c-input'  type='text' {...register("email", {required: true})} />
                    {errors.email && <span style={{color: 'red', fontSize: '13px', display: 'block', marginTop: '5px'}}>This field is required</span>}    
                  </div>
                <div className='my-10'>
                  <label className='d-block'>Phone Number:</label>
                  <input className='c-input'  type='text' {...register("p_num", {required: true})} />
                  {errors.p_num && <span style={{color: 'red', fontSize: '13px', display: 'block', marginTop: '5px'}}>This field is required</span>}    
                </div>
                <div className='mt-50'>
                  <input style={{marginRight: '5px'}} type="checkbox" name="agree" id="" {...register("terms", {required: true})}/>
                  <label>I agree to the <span style={{color: '#da9e29'}}>SofaX Terms and Use</span> and to receive electronic communication from SofaX</label>
                  {errors.terms && <span style={{color: 'red', fontSize: '13px', display: 'block', marginTop: '5px'}}>This field is required</span>}
                </div>
              </div>
        </div>
        <div className="right-content">
          <div className="calendar-box mb-10">
            <label>Scheduled For:</label> 
            <div className="calendar-header">{getDayName(props.data.date_time, 'en-US')}</div>
            <div className="calendar-body">
              <div>{formatDate(props.data.date_time)}</div>
            </div>
          </div>
          {
            getSelectedDoctor()
          }
        </div>
      </div>
        <button onClick={() => {props.onDataReceived(props.data, 'minus');}} style={{width: '175px', marginRight: '5px'}} type='submit' className='button secondary'>Back</button>
        <button style={{width: '175px'}} type='submit' className='button primary'>Confirm</button>
      </form>
    </>
  )
}

export default PatientForm