import './ManageSchedule.scss';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import moment from "moment";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTimeTypes } from '../../../redux/actions/allCodeAction';
import axios from 'axios';

let rangeTimeS = []

function ManageSchedule() {
    const [startDate, setStartDate] = useState(new Date());
    const [rangeTime, setRangeTime] = useState([]);

    const dispatch = useDispatch();
    const handleChangeDatePicker = (date: Date) => {
        setStartDate(date)
    }
    const listTimeTypesRedux = useSelector((state) => state.allCode.listTimeTypes);
    const hospitalId = useSelector((state) => state.auth.login.currentUser.id)
    console.log(hospitalId)
    useEffect(() => {
        dispatch(fetchAllTimeTypes());
    }, [])

    useEffect(()=>{
        let data = listTimeTypesRedux;
        if (data && data.length > 0) {
          data = data.map((item) => ({ ...item, isSelected: false }));
        }
        setRangeTime(data);
    }, [listTimeTypesRedux])



    const handleClickBtnTime = (time) => {
        let rangeTimeClone = rangeTime;
        if (rangeTimeClone && rangeTimeClone.length > 0) {
            rangeTimeClone = rangeTimeClone.map((item) => {
                if (item.id === time.id) {
                  item.isSelected = !item.isSelected;
                }
                return item;
              });
              setRangeTime(rangeTimeClone);
        }
    }
    const handleCreateSchedule = () => {
        const rangeTimeClone =  rangeTime.filter(item => {
            return item.isSelected
        })
        console.log(rangeTimeClone)
        const arrSchedule = rangeTimeClone.map((item, index)=>{
            if(item.isSelected){
                return {
                    hospitalId,
                    date: "1234123413",
                    timeType: item.keyMap
                }
            }
            
        })
        console.log(arrSchedule)
        const data = {
            arrSchedule,
            hospitalId,
            formatedDate:"1234123413"
        }
        axios.post('http://localhost:8080/api/create-schedule', data)
    }
    return <div className="manage-schedule-container">
        <div className="m-s-title">Quản lí lịch hiến máu của bệnh viện</div>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <label>Chọn ngày</label>
                    <DatePicker selected={startDate} onChange={handleChangeDatePicker} minDate={new Date()} />
                </div>
                <div className="col-12 pick-hour-container">
                    {rangeTime && rangeTime.length > 0 &&
                        rangeTime.map((item, index) => {
                            return (
                                <button className='btn btn-schedule' key={index}
                                    onClick={() => handleClickBtnTime(item)}
                                >{item.valueVi}</button>
                            )
                        })
                    }
                </div>
                <button className="btn btn-save" onClick={handleCreateSchedule}>Lưu thông tin</button>
            </div>
        </div>
    </div>;
}

export default ManageSchedule;
