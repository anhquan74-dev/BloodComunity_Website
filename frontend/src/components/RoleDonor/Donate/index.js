import styles from './Donate.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const cx = classNames.bind(styles);

function Donate() {
    const startValue = new Date(new Date().getFullYear(), new Date().getMonth(), 14);
    const endValue = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 15);
    const minDate = new Date(new Date().getFullYear(), new Date().getMonth(), 8);
    const maxDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 20);

    const hospitals = [
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',
        'Carlos Abbott',
        'Miriam Wagner',
        'Bradley Wilkerson',
        'Virginia Andrews',
        'Kelly Snyder',
    ];
    const [hospital, setHospital] = useState('');

    const handleChange = (event) => {
        setHospital(event.target.value);
    };

    return (
        <div className={cx('wrapper')}>
            <h2>Đặt lịch hiến máu</h2>
            <div className={cx('content')}>
                <div className={cx('search')}>
                    <h3>Ban cần đặt lịch vào thời gian nào?</h3>
                    <div className={cx('datepicker')}>
                        <div>
                            <DateRangePickerComponent
                                style={{ fontSize: '1.4rem', padding: '6px 0' }}
                                placeholder="Từ ngày - Đến ngày"
                                startDate={startValue}
                                endDate={endValue}
                                min={minDate}
                                max={maxDate}
                                minDays={3}
                                maxDays={5}
                                format="dd-MMM-yy"
                            ></DateRangePickerComponent>
                        </div>
                        <div className={cx('searchBtn')}>Tìm kiếm</div>
                    </div>
                </div>
                <div className={cx('place')}>
                    <p>Đơn vị tổ chức:</p>
                    <FormControl style={{ fontSize: '1.4rem' }} fullWidth>
                        <InputLabel id="demo-simple-select-label" style={{ fontSize: '1.4rem' }}>
                            Đơn vị tổ chức
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={hospital}
                            label="hospital"
                            onChange={handleChange}
                        >
                            {hospitals.map((hospital) => (
                                <MenuItem key={hospital} value={hospital} style={{ fontSize: '1.4rem' }}>
                                    {hospital}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className={cx('result')}>
                    <h3>Kết quả</h3>
                    <div className={cx('schedule')}>
                        <div className={cx('info')}>
                            <div className={cx('image')}>
                                <img src={require('../../../assets/images/bg_3.jpg')} alt="hospital" />
                            </div>
                            <div className={cx('detail')}>
                                <h3>Bệnh viện C Đà Nẵng</h3>
                                <p>106 Thiên Phước, Phường 9, Quận Tân Bình, TP.HCM</p>
                                <p>09/10/2022</p>
                                <p>Từ 07:00 Đến 11:30</p>
                            </div>
                        </div>
                        <div className={cx('booking')}>
                            <p>Đã đăng ký</p>
                            <p>124/150 Người</p>
                            <span>Đặt lịch</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Donate;
