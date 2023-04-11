import React, { useRef, useState } from 'react';

import Bold1 from '../assets/svg/bold1.svg';
import HouseDesigner1 from '../assets/img/hD1.jpg'
import HouseDesigner2 from '../assets/img/hD2.jpg';
import HouseDesigner3 from '../assets/img/hD3.jpg'
import Industrial from '../assets/svg/minimalist.svg';
import Minimalist  from '../assets/svg/industrial.svg';
import ModernHouse from '../assets/svg/housemodern.svg';
import Nautical from '../assets/svg/nautical.svg';
import Stars from './Stars';
import Traditional from '../assets/svg/traditional.svg';
import { useForm } from "react-hook-form";

function GeneralInfo(props) {
    const [data, setData] = useState({});
    const [currHouseStyle, setCurrHouseStyle] = useState('');
    const [currDoctor, setCurrDoctor] = useState('');
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = () => {
        let vald1 = currDoctor;
        let vald2 = currHouseStyle;
        if (vald2 == '') return;
        if (vald1 == '') return;

        const target_doctor = doctors.find(d => d.name == currDoctor);
        const target_desgin = types.find(t => t.name == currHouseStyle);

        let data = {
            created_at: new Date(),
            design: {...target_desgin},
            doctor: {...target_doctor},
        }
        props.onDataReceived(data, 'add');


    }
    const handleStyleSelect = (data) => {
        if (data.disable == true) return 
        let name = data.name;
        console.log(name);
        setCurrHouseStyle(name);
    }

    const handleDoctorSelect = (data) => {
        if (data.availability != 1) return;
        let name = data.name;
        setCurrDoctor(name);
    }

    const handleOnChange = (e) => {
        return e.target.checked;
    }

    let types = [
        {
            name: 'modern',
            img: ModernHouse,
            display: 'Modern Style',
            disable: false,
            id: 1,
        },
        {
            name: 'industrial',
            img: Industrial,
            display: 'Industrial Style',
            disable: true,
            id: 2,
        },
        {
            name: 'minimalist',
            img: Minimalist,
            display: 'Minimalist Style',
            disable: true,
            id: 3,
        },
        {
            name: 'nautical',
            img: Nautical,
            display: 'Nautical Style',
            disable: true,
            id: 4,
        },
        {
            name: 'traditional',
            img: Traditional,
            display: 'Traditional Style',
            disable: true,
            id: 5,
        },
    ]



    const getDoctors = () => {
        const GetDoctorElement = [];

        doctors.map((d,i) => {
            GetDoctorElement.push(
                <div className='col-3'>
                    <div key={i}
                    onClick={() => {handleDoctorSelect(d)}}
                    // className={`cardDoctor card-bg`}
                    className={ (currDoctor == d.name && d.availability == 1) ? 'cardDoctor card-bg active' : '' || d.availability == 0 ? 'disabled cardDoctor card-bg' : ' '  + `cardDoctor card-bg`} 
                    >
                    <div className="card-header">
                        <img width={'45%'} src={d.img}/>
                        <div>
                            <span>{d.name}</span>
                            <div>
                                {
                                    <Stars count={d.rating}/>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="desc">
                        {d.desc}
                        </div>
                        <div className="w-desc">
                            <p>Available From: <span>{d.available_from}</span></p>
                            <p>Working Hours: <span>{d.working_hours}</span></p>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div style={{display:'flex', alignItems: 'center'}}>
                            <input  type="radio" checked={currDoctor == d.name && d.availability == 1} id={d.name} name={"choice"} onChange={(e) => {handleOnChange(e)}} value={d.name}/>
                            <label style={{paddingLeft:'10px'}} htmlFor={d.name}>Choose</label>
                        </div>
                        <div>&#8594;View Profile</div>
                    </div>
                    </div>
                </div>
            )
        })
        return <div className='general-content'>{GetDoctorElement}</div>
    }

    let doctors = [
        {
            name: 'Nancy Williams',
            img: HouseDesigner1,
            rating: 5,
            availability: 1,
            available_from: '2023-03-25',
            desc: 'A house designer should be highly creative, with the ability to envision unique...',
            working_hours: '9 am - 6 pm',
        },
        {
            name: 'Robby Downly',
            img: HouseDesigner2,
            rating: 3,
            availability: 0,
            available_from: '2023-05-01',
            desc: 'A house designer should be highly creative, with the ability to envision unique...',
            working_hours: '9 am - 6 pm',
        },
        {
            name: 'Frank Ribery',
            img: HouseDesigner3,
            rating: 5,
            availability: 1,
            available_from: '2023-04-09',
            desc: 'A house designer should be highly creative, with the ability to envision unique...',
            working_hours: '9 am - 6 pm',
        },
    ]


  return (
    <div>
        <div className="header">
            <div><img className='number-1' src={Bold1}/></div>
            <h5>GENERAL INFO</h5>
        </div>
        <div>
            <form onSubmit={handleSubmit(onSubmit
                )}>
                    <div className='mt-50 general-container'>
                        <div className='form-title'>Have you booked an appointment for a house designer before?</div>
                        <div className="input-box">
                            <div className="w-50">
                                <input value={'Yes'} type='radio' {...register("visited", {required: true})} />
                                <label style={{marginRight: '20px'}}>Yes</label>
                            </div>
                            <div className="w-50">
                                <input value={'No'} type='radio' {...register("visited", {required: true})} />
                                <label>No</label>
                            </div>
                        </div>
                        {errors.visited && <span style={{color: 'red', fontSize: '13px'}}>This field is required</span>}
                    </div>

                    <div className='mt-25'>
                        <div className='form-title'>What's the reason for your visit?</div>
                        <div className="designer-box">
                            { types.map((t, i) => (
                                <div className='col-3'>
                                    <div key={i} onClick={(e) => {handleStyleSelect(t)}} 
                                    className={ (currHouseStyle == t.name && t.disable == false) ? 'desginer-group active' : '' || t.disable == true ? 'disabled desginer-group' : ' '  + `desginer-group`} 
                                    id={t.name}>
                                    <img width={'50px'} src={t.img}/>
                                    <div className='text'>{t.display}</div>
                                </div>
                        </div>
                            ))}
                        </div>
                    </div>

                    <div className='mt-25'>
                        <div className='form-title'>Choose a house designer</div>

                        {
                            currHouseStyle == 'modern' ?
                            getDoctors()
                            :
                            <div style={{color:'red', fontSize:'11px'}}>Please Select A Style</div>
                        }
                    </div>
                    <div className='my-10'>
                        <button style={{width: '175px'}} type='submit' className='button secondary'>Next</button>
                    </div>
            </form>
        </div>
    </div>
  )
}

export default GeneralInfo