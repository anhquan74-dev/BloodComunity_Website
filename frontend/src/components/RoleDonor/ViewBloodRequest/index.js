import styles from './ViewBloodRequest.module.scss';
import classNames from 'classnames/bind';
import StatusButton from '../../StatusButton';
import { requests } from '../../../services/data';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';

const ENDPOINT = 'http://localhost:8080';
var socket;
socket = io(ENDPOINT);

const cx = classNames.bind(styles);

function ViewBloodRequest() {
    // const [status, setStatus] = useState();
    const [userRequest, setUserRequest] = useState();
    const [socketConnected, setSocketConnected] = useState(false);
    const user = useSelector((state) => state.auth.login.currentUser);
    console.log(user);
    const socket = useOutletContext();
    console.log(socket);
    // useEffect(() => {
    //     socket.emit('join room', user);
    //     // socket.on('receive blood request', (data) => {
    //     //     setUserRequest(data);
    //     // });
    //     socket.on('connection', () => setSocketConnected(true));
    // }, []);
    useEffect(() => {
        socket?.on('recieve blood request', (user) => {
            setUserRequest(user);
        });
    }, [socket]);

    const handleConfirm = () => {
        socket.emit('donor confirm', user);
    };

    return (
        <div className={cx('wrapper')}>
            <h2>Yêu cầu nhận máu từ người cần máu</h2>
            <div className={cx('content')}>
                <div className={cx('header')}>
                    <p>Người nhận máu</p>
                    <p>Địa chỉ</p>
                    <p>Số điện thoại</p>
                    <p>Nhóm máu</p>
                    <p>Hành động</p>
                </div>
                <div className={cx('body')}>
                    {/* {requests.map((request, index) => {
                        return ( */}
                    {userRequest && (
                        <div className={cx('item')}>
                            <div>
                                <div>
                                    <img src="" alt="" />
                                </div>
                                <div>{`${userRequest.firstName} ${userRequest.lastName}`}</div>
                            </div>
                            <div>{`${userRequest.ward}, ${userRequest.district}, ${userRequest.city}`}</div>
                            <div>{userRequest.phoneNumber}</div>
                            <div>{userRequest.groupBlood}</div>
                            <div>
                                <div>
                                    <StatusButton onClick={handleConfirm} status="confirm" />
                                </div>
                                <div>
                                    <StatusButton status="reject" />
                                </div>
                                {/* <div>
                                <StatusButton status="pending" />
                            </div> */}
                            </div>
                        </div>
                    )}
                    {/* );
                    })} */}
                </div>
            </div>
        </div>
    );
}

export default ViewBloodRequest;
