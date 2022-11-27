import styles from './Donate.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import localization from 'moment/locale/vi';
import moment from 'moment';
import { formatDate } from '../../../utils/formatDate';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllHospital, fetchHospitalById } from '../../../redux/actions/hospitalManage';
import axios from 'axios';
import { Buffer } from 'buffer';
Buffer.from('anything', 'base64');

const cx = classNames.bind(styles);

function Donate() {
    const [allDays, setAllDays] = useState([]);
    const dispatch = useDispatch();
    const hospitals = useSelector((state) => state.users.listHospitals);
    const hospital = useSelector((state) => state.users.hospital);
    const [date, setDate] = useState('choose');
    const [hospitalId, setHospitalId] = useState('');
    const [listScheduleByDate, setListScheduleByDate] = useState([]);
    useEffect(() => {
        dispatch(fetchAllHospital());
    }, []);
    const capitalFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    useEffect(() => {
        let arrDate = [
            {
                label: 'Chọn ngày',
                value: 'choose',
            },
        ];
        for (let i = 0; i < 7; i++) {
            let object = {};
            let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            object.label = capitalFirstLetter(labelVi);
            object.value = moment(new Date(formatDate())).add(i, 'days').valueOf();
            arrDate.push(object);
        }
        setAllDays(arrDate);
    }, []);
    console.log(hospitals);

    const handleChangeHospital = (event) => {
        setHospitalId(event.target.value);
    };

    const handleChangeDate = (event) => {
        setDate(event.target.value);
    };

    const handleSearchSchedule = () => {
        console.log(hospitalId, date);
        setHospitalId('');
        setDate('');
        axios
            .get('http://localhost:8080/api/get-schedule-hospital-by-date', { params: { hospitalId, date } })
            .then((res) => setListScheduleByDate(res.data.content))
            .catch((e) => console.log(e));
        dispatch(fetchHospitalById(hospitalId));
    };

    console.log(listScheduleByDate);
    console.log('dayyy', allDays);
    console.log(hospital);

    let previewImage = '';
    let imageBase64 = '';
    if (hospital?.image) {
        imageBase64 = new Buffer(hospital.image, 'base64').toString('binary');
    }
    previewImage = imageBase64;
    return (
        <div className={cx('wrapper')}>
            <h2>Đặt lịch hiến máu</h2>
            <div className={cx('content')}>
                <div className={cx('place')}>
                    <p>Đơn vị tổ chức:</p>
                    <FormControl style={{ fontSize: '1.4rem' }} fullWidth>
                        <InputLabel id="demo-simple-select-label" style={{ fontSize: '1.4rem' }}>
                            Đơn vị tổ chức
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={hospitalId}
                            label="hospital"
                            onChange={handleChangeHospital}
                        >
                            {hospitals.map((hospital, index) => (
                                <MenuItem key={index} value={hospital.id} style={{ fontSize: '1.4rem' }}>
                                    {hospital.hospitalName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className={cx('search')}>
                    <h3>Ban cần đặt lịch vào thời gian nào?</h3>
                    <div className={cx('datepicker')}>
                        <div className="all-schedule">
                            <select onChange={handleChangeDate} value={date}>
                                {allDays &&
                                    allDays.length > 0 &&
                                    allDays.map((item, index) => {
                                        return (
                                            <option value={item.value} key={index}>
                                                {item.label}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <button
                            className={cx('searchBtn')}
                            onClick={handleSearchSchedule}
                            disabled={date === 'choose' || !hospitalId}
                        >
                            Tìm kiếm
                        </button>
                    </div>
                </div>

                <div className={cx('result')}>
                    <h3>Kết quả</h3>
                    {listScheduleByDate &&
                        listScheduleByDate.map((item, index) => {
                            return (
                                <div className={cx('schedule')} key={index}>
                                    <div className={cx('info')}>
                                        <div className={cx('image')}>
                                            {/* <img src={require('../../../assets/images/bg_3.jpg')} alt="hospital" /> */}
                                            {previewImage ? (
                                                <img src={previewImage} alt="hospital-image" />
                                            ) : (
                                                <span>Preview Image</span>
                                            )}
                                        </div>
                                        <div className={cx('detail')}>
                                            <h3>{hospital.hospitalName}</h3>
                                            <p>{hospital.address}</p>
                                            <p className={cx('timeType')}>{item.timeTypeData.valueVi}</p>
                                        </div>
                                    </div>
                                    <div className={cx('booking')}>
                                        <p>Đã đăng ký</p>
                                        <p>
                                            {item.currentNumber}/{item.maxNumber} Người
                                        </p>
                                        <span>Đặt lịch</span>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default Donate;
