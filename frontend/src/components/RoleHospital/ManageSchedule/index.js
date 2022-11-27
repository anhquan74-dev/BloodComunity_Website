import './ManageSchedule.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState } from 'react';
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTimeTypes } from '../../../redux/actions/allCodeAction';
import axios from 'axios';
import { toast } from 'react-toastify';
import { createSchedule } from '../../../redux/actions/hospitalServices';
import Table from 'react-bootstrap/esm/Table';
import { Button } from '@mui/material';
import { formatDate } from '../../../utils/formatDay';

function ManageSchedule() {
    const [startDate, setStartDate] = useState(new Date());
    const [rangeTime, setRangeTime] = useState([]);
    const [maxNumber, setMaxNumber] = useState(20);
    const [listSchedules, setListSchedules] = useState([]);

    const dispatch = useDispatch();

    const listTimeTypesRedux = useSelector((state) => state.allCode.listTimeTypes);
    const hospitalId = useSelector((state) => state.auth.login.currentUser.id);
    useEffect(() => {
        dispatch(fetchAllTimeTypes());
        axios
            .get('http://localhost:8080/api/get-schedule-hospital-by-id', { params: { id: hospitalId } })
            .then((res) => {
                // convert today -> timestamp to compare
                const date = new Date(formatDate());
                var timestamp = date.getTime();
                console.log(date, timestamp);
                const listSchedulesClone = res.data.content
                    .filter((item) => +item.date >= timestamp)
                    .map((item, index) => {
                        const date = new Date(+item.date);
                        console.log(date);
                        const day = new Date(+item.date).getDate();
                        const month = new Date(+item.date).getMonth() + 1;
                        const year = new Date(+item.date).getFullYear();
                        return {...item, date: `${day}/${month}/${year}`};
                    });
                console.log(listSchedulesClone);
                setListSchedules(listSchedulesClone);
            })
            .catch((e) => console.log(e));
    }, []);
    console.log(listSchedules);
    useEffect(() => {
        let data = listTimeTypesRedux;
        if (data && data.length > 0) {
            data = data.map((item) => ({ ...item, isSelected: false }));
        }
        setRangeTime(data);
    }, [listTimeTypesRedux]);

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
    };
    const handleCreateSchedule = async () => {
        let result = [];
        const selectedTime = rangeTime.filter((item) => {
            return item.isSelected;
        });
        var date = new Date(startDate);
        var formatedDate = date.getTime();
        console.log(formatedDate);
        if (selectedTime.length < 1) {
            toast.error('Bạn chưa chọn khung giờ');
            return;
        }
        if (!startDate) {
            toast.error('Ngày không hợp lệ!');
            return;
        }
        if (selectedTime && selectedTime.length > 0) {
            selectedTime.map((time) => {
                let object = {};
                object.hospitalId = hospitalId;
                object.date = formatedDate;
                object.timeType = time.keyMap;
                object.maxNumber = maxNumber;
                result.push(object);
            });
        }
        const data = {
            arrSchedule: result,
            hospitalId,
            formatedDate: formatedDate,
        };
        // await axios.post('http://localhost:8080/api/create-schedule', data)
        await dispatch(createSchedule(data));
    };

    const [queryDay, setQueryDay] = useState('');
    const search = (data) => {
        return data.filter((item) => item.date.includes(queryDay));
    };
    return (
        <div className="manage-schedule-container">
            <div className="m-s-title">Quản lí lịch hiến máu của bệnh viện</div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <label>Chọn ngày</label>
                        <input
                            type="date"
                            name="date"
                            id="date"
                            min={new Date()}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        {/* <DatePicker
                            dateFormat="dd/MM/yyyy"
                            selected={startDate}
                            onChange={handleChangeDatePicker}
                            
                        /> */}
                    </div>
                    <div className="col-12">
                        <label>Số lượng người hiến máu tối đa </label>
                        <input
                            type="number"
                            id="maxNumber"
                            name="maxNumber"
                            min="1"
                            max="20"
                            value={maxNumber}
                            onChange={(e) => setMaxNumber(e.target.value)}
                        ></input>
                    </div>
                    <div className="col-12 pick-hour-container">
                        {rangeTime &&
                            rangeTime.length > 0 &&
                            rangeTime.map((item, index) => {
                                return (
                                    <button
                                        className={
                                            item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule'
                                        }
                                        key={index}
                                        onClick={() => handleClickBtnTime(item)}
                                    >
                                        {item.valueVi}
                                    </button>
                                );
                            })}
                    </div>
                    <button className="btn btn-save col-1" onClick={handleCreateSchedule}>
                        Lưu thông tin
                    </button>
                    <div>
                        <input
                            type="text"
                            placeholder="Search by date..."
                            onChange={(e) => setQueryDay(e.target.value)}
                        />
                    </div>
                    <div className="col-12 mt-4">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Ngày</th>
                                    <th>Khoảng thời gian</th>
                                    <th>Số lượng tối đa</th>
                                    <th>Số lượng hiện tại</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listSchedules &&
                                    search(listSchedules).map((item, index) => {
                                        return (
                                            <tr key={`event ${index}`}>
                                                <td>{item.date}</td>
                                                <td>{item.timeTypeData.valueVi}</td>
                                                <td>{item.maxNumber}</td>
                                                <td>{item.currentNumber}</td>
                                                <td>
                                                    <Button
                                                        variant="outlined"
                                                        color="error"
                                                        // onClick={() => handleShowModalDelete(event)}
                                                    >
                                                        Xoá
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageSchedule;
