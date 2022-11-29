import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styles from './VerifyBooking.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default function VerifyBooking() {
    const location = useLocation();
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    const hospitalId = urlParams.get('hospitalId');
    const [statusVerify, setStatusVerify] = useState(false);
    const dataVerify = {
        hospitalId,
        token,
    };
    useEffect(() => {
        axios.post('http://localhost:8080/api/verify-book-appointment', dataVerify).then((res) => {
            console.log('res status: ', res.data.statusCode);
            if (res.data.statusCode === 200) {
                setStatusVerify(true);
            }
        });
    }, []);
    const handleNavigate = () => {
        navigate('/donor/manage_schedule');
    };
    return (
        <>
            {statusVerify ? (
                <div className={cx('wrapper')}>
                    <h3>Xác nhận đặt lịch thành công!</h3>
                    <h4> Hãy đi tới trang quản lý lịch hẹn để kiểm tra lịch hẹn của bạn.</h4>
                    <button onClick={handleNavigate}>Đi tới trang quản lý lịch hẹn >></button>
                </div>
            ) : (
                <div className={cx('wrapper')}>
                    <h3>Lịch hẹn này đã được xác nhận trước đây!</h3>
                    <h4> Hãy đi tới trang quản lý lịch hẹn để kiểm tra lịch hẹn của bạn.</h4>
                    <button onClick={handleNavigate}>Đi tới trang quản lý lịch hẹn >></button>
                </div>
            )}
        </>
    );
}
