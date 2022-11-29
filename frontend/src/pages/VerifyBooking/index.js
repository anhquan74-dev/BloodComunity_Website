import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styles from './VerifyBooking.module.scss';
import classNames from 'classnames/bind';
import BeatLoader from 'react-spinners/BeatLoader';

const cx = classNames.bind(styles);

export default function VerifyBooking() {
    // const location = useLocation();
    // const navigate = useNavigate();
    // const urlParams = new URLSearchParams(location.search);
    // const token = urlParams.get('token');
    // const hospitalId = urlParams.get('hospitalId');
    // const [statusVerify, setStatusVerify] = useState(false);
    // const dataVerify = {
    //     hospitalId,
    //     token,
    // };
    // useEffect(() => {
    //     axios.post('http://localhost:8080/api/verify-book-appointment', dataVerify).then((res) => {
    //         console.log('res status: ', res.data.statusCode);
    //         if (res.data.statusCode === 200) {
    //             setStatusVerify(true);
    //         }
    //     });
    // }, []);
    // const handleNavigate = () => {
    //     navigate('/donor/manage_schedule');
    // };
    // return (
    //     <>
    //         {statusVerify ? (
    //             <div className={cx('wrapper')}>
    //                 <h3>Xác nhận đặt lịch thành công!</h3>
    //                 <h4> Hãy đi tới trang quản lý lịch hẹn để kiểm tra lịch hẹn của bạn.</h4>
    //                 <button onClick={handleNavigate}>Đi tới trang quản lý lịch hẹn >></button>
    //             </div>
    //         ) : (
    //             <div className={cx('wrapper')}>
    //                 <h3>Lịch hẹn này đã được xác nhận trước đây!</h3>
    //                 <h4> Hãy đi tới trang quản lý lịch hẹn để kiểm tra lịch hẹn của bạn.</h4>
    //                 <button onClick={handleNavigate}>Đi tới trang quản lý lịch hẹn >></button>
    //             </div>
    //         )}
    //     </>
    // );

    const location = useLocation();
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    const hospitalId = urlParams.get('hospitalId');
    const [statusVerify, setStatusVerify] = useState(4);
    // 0: thông tin verify không đúng với thông tin trong db
    // 1: thông tin đúng nhưng curentNumber >= maxNumber
    // 2: đặt lịch thành công
    const dataVerify = {
        hospitalId,
        token,
    };
    useEffect(() => {
        axios
            .post('http://localhost:8080/api/verify-book-appointment', dataVerify)
            .then((res) => {
                if (res.data.statusCode === 200) {
                    console.log('thanhcong');
                    axios.post('http://localhost:8080/api/increase-current-number', dataVerify).then((res) => {
                        if (res.data.statusCode === 200) {
                            setStatusVerify(2);
                        } else {
                            setStatusVerify(1);
                        }
                    });
                }
            })
            .catch((e) => setStatusVerify(0));
    }, []);
    console.log(statusVerify);
    return (
        <>
            {statusVerify === 2 ? (
                <div className={cx('wrapper')}>
                    <h3>Xác nhận đặt lịch thành công!</h3>
                    <h4> Hãy đi tới trang quản lý lịch hẹn để kiểm tra lịch hẹn của bạn.</h4>
                    <button onClick={() => navigate('/donor/manage_schedule')}>Đi tới trang quản lý lịch hẹn >></button>
                </div>
            ) : statusVerify === 1 ? (
                <div>
                    <p>Số người hiến máu trong khung giờ này đã đạt tối đa, bạn hãy chọn khung giờ khác</p>
                    <div
                        onClick={() => {
                            navigate('/donor/donate');
                        }}
                    >
                        Quay lại trang đặt lịch hẹn
                    </div>
                </div>
            ) : statusVerify === 0 ? (
                <div className={cx('wrapper')}>
                    <h3>Lịch hẹn này đã được xác nhận trước đây!</h3>
                    <h4> Hãy đi tới trang quản lý lịch hẹn để kiểm tra lịch hẹn của bạn.</h4>
                    <button onClick={() => navigate('/donor/manage_schedule')}>Đi tới trang quản lý lịch hẹn >></button>
                </div>
            ) : (
                <div className="datatable-spinner">
                    <BeatLoader color="#36d7b7" size={10} aria-label="Loading Spinner" data-testid="loader" />
                </div>
            )}
        </>
    );
}
