import styles from './ViewBloodRequest.module.scss';
import classNames from 'classnames/bind';
import StatusButton from '../../StatusButton';
import { useEffect, useState } from 'react';
import  io  from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { fetchRequest, fetchRequestSuccess } from '../../../redux/actions/requestAction';

const ENDPOINT = 'http://localhost:8080';
var socket;
socket = io(ENDPOINT);

const cx = classNames.bind(styles);

function ViewBloodRequest() {
  const dispatch = useDispatch()
  const [socketConnected , setSocketConnected] = useState(false)
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const groupBlood = useSelector((state) => state.auth.login.currentUser.groupBlood);
  const requests = useSelector((state) => state.request.listRequests)
  useEffect(() => {
    dispatch(fetchRequest(groupBlood))
  }, [])
  useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit('join_group_blood',currentUser)
    socket.on('connection', () => { setSocketConnected(true) })
  }, [])
  useEffect(() => {
    socket.on('request_received', (newRequestReceived) => {
      // notification 
      dispatch(fetchRequest(groupBlood))
    })
  }, [socket])
  return (
    <div className={cx('wrapper')}>
      <h2>Yêu cầu nhận máu từ người cần máu</h2>
      <div className={cx('content')}>
        <div className={cx('header')}>
          <p>Id </p>
          <p>unitRequire</p>
          <p>offerBenefit</p>
          <p>Nhóm máu</p>
          <p>Hành động</p>
        </div>
        <div className={cx('body')}>
          {requests && requests.map((item,index) => {
            return (
              <div className={cx('item')}>
                <div>{item.id}</div>
                <div>{item.unitRequire}</div>
                <div>{item.offerBenefit}</div>
                <div>{item.groupBlood}</div>
                <div>
                  <div>
                    <StatusButton status="confirm" />
                    {/* <StatusButton onClick={handleConfirm} status="confirm" /> */}
                  </div>
                  <div>
                    <StatusButton status="reject" />
                  </div>
                  <div>
                    <StatusButton status="pending" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default ViewBloodRequest;
