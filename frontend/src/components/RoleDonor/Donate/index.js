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
import { toast } from 'react-toastify';
import ModalCheckMail from './ModalCheckMail/ModalCheckMail';
import { fetchNewestDonorBooking } from '../../../redux/actions/hospitalServices';
import { monthDiff } from '../../../utils/monthDiff';
import { DOMAIN_BACKEND } from '../../../config/settingSystem';
// import { info } from 'console';
Buffer.from('anything', 'base64');

const cx = classNames.bind(styles);

function Donate() {
    const [allDays, setAllDays] = useState([]);
    const [date, setDate] = useState('choose');
    const [hospitalId, setHospitalId] = useState('');
    const [listScheduleByDate, setListScheduleByDate] = useState([]);
    const [isNotFoundSchedule, setIsNotFoundSchedule] = useState(null);
    const [showModalCheckMail, setShowModalCheckMail] = useState(false);
    const [statusCode, setStatusCode] = useState(null);
    const [isLoadingSendEmail, setIsLoadingSendEmail] = useState(false);

    const dispatch = useDispatch();
    const hospitals = useSelector((state) => state.users.listHospitals);
    const hospital = useSelector((state) => state.users.hospital);
    const user = useSelector((state) => state.auth.login.currentUser);
    const newestDonorBooking = useSelector((state) => state.hospital.newestDonorBooking);

    const handleClose = () => {
        setShowModalCheckMail(false);
        setHospitalId('');
        setDate('');
        setIsNotFoundSchedule(null);
        setListScheduleByDate([]);
    };

    const capitalFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    useEffect(() => {
        dispatch(fetchAllHospital());
    }, []);

    useEffect(() => {
        dispatch(fetchNewestDonorBooking(user));
    }, []);

    useEffect(() => {
        let arrDate = [
            {
                label: 'Ch???n ng??y',
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

    const handleChangeHospital = (event) => {
        setHospitalId(event.target.value);
    };

    const handleChangeDate = (event) => {
        setDate(event.target.value);
    };

    const handleSearchSchedule = () => {
        // setHospitalId('');
        // setDate('');
        dispatch(fetchHospitalById(hospitalId));
        axios
            .get(`${DOMAIN_BACKEND}/api/get-schedule-hospital-by-date`, { params: { hospitalId, date } })
            .then((res) => {
                setListScheduleByDate(res.data.content);
                setIsNotFoundSchedule(null);
            })
            .catch((e) => setIsNotFoundSchedule(e.response.data.message));
    };

    let previewImage = '';
    let imageBase64 = '';
    if (hospital?.image) {
        imageBase64 = new Buffer(hospital.image, 'base64').toString('binary');
    }
    previewImage = imageBase64;

    const checkDonorBooking = () => {
        const newestDateBooking = Number(newestDonorBooking?.date);
        return monthDiff(new Date(newestDateBooking), new Date());
    };

    const handleBookingSchedule = async (schedule) => {
        if (checkDonorBooking() <= 3) {
            setStatusCode(null);
            setShowModalCheckMail(true);
            return;
        }
        // hi???n l??n modal confirm th??ng tin ?????t l???ch -> ng?????i d??ng b???m confirm th?? g???i api
        const date = new Date(Number(schedule.date));
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const dataSend = {
            email: user.email,
            hospitalId: hospital.id,
            date: schedule.date,
            fullName: user.firstName + ' ' + user.lastName,
            hospitalName: hospital.hospitalName,
            timeString: schedule.timeTypeData.valueVi + ' ng??y ' + `${day}/${month}/${year}`,
            timeType: schedule.timeType,
            donorId: user.id,
        };
        setIsLoadingSendEmail(true);
        const res = await axios.post(`${DOMAIN_BACKEND}/api/donor-booking-schedule`, dataSend);
        setIsLoadingSendEmail(false);
        if (res.data.statusCode === 201) {
            setStatusCode(201);
        } else {
            setStatusCode(null);
        }
        setShowModalCheckMail(true);
    };

    return (
        <>
            {isLoadingSendEmail && (
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>
            )}
            <div className={cx('wrapper')}>
                <ModalCheckMail show={showModalCheckMail} handleClose={handleClose} statusCode={statusCode} />
                <h2>?????t l???ch hi???n m??u</h2>
                <div className={cx('content')}>
                    <div className={cx('place')}>
                        <p>????n v??? t??? ch???c:</p>
                        <FormControl style={{ fontSize: '1.4rem' }} fullWidth>
                            <InputLabel id="demo-simple-select-label" style={{ fontSize: '1.4rem' }}>
                                ????n v??? t??? ch???c
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
                        <h3>Ban c???n ?????t l???ch v??o th???i gian n??o?</h3>
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
                                T??m ki???m
                            </button>
                        </div>
                    </div>

                    <div className={cx('result')}>
                        <h3>K???t qu???</h3>
                        {isNotFoundSchedule && isNotFoundSchedule}
                        {!isNotFoundSchedule &&
                            listScheduleByDate &&
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
                                                <h3>{hospital?.hospitalName}</h3>
                                                <p>{hospital?.address}</p>
                                                <p className={cx('timeType')}>{item.timeTypeData.valueVi}</p>
                                            </div>
                                        </div>
                                        <div className={cx('booking')}>
                                            <p>???? ????ng k??</p>
                                            <p>
                                                {item.currentNumber}/{item.maxNumber} Ng?????i
                                            </p>
                                            <button
                                                onClick={() => handleBookingSchedule(item)}
                                                disabled={item.currentNumber === item.maxNumber}
                                            >
                                                ?????t l???ch
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Donate;
