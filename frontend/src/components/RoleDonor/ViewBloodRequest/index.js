import styles from './ViewBloodRequest.module.scss';
import classNames from 'classnames/bind';
import StatusButton from '../../StatusButton';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
// import styles from '../../StatusButton/StatusButton.module.scss';
import { fetchRequest, fetchRequestSuccess } from '../../../redux/actions/requestAction';

const ENDPOINT = 'http://localhost:8080';
var socket;
socket = io(ENDPOINT);

const cx = classNames.bind(styles);

function ViewBloodRequest() {
  const dispatch = useDispatch()
  const [socketConnected, setSocketConnected] = useState(false)
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const groupBlood = useSelector((state) => state.auth.login.currentUser.groupBlood);
  const requests = useSelector((state) => state.request.listRequests)
  useEffect(() => {
    dispatch(fetchRequest(groupBlood))
  }, [])
  useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit('join_group_blood', currentUser)
    socket.on('connection', () => { setSocketConnected(true) })
  }, [])
  useEffect(() => {
    socket.on('request_received', (newRequestReceived) => {
      // notification 
      dispatch(fetchRequest(groupBlood))
    })
    socket.on('recieved_recipient_confirm' , (requestConfirmedByRecipient) => {
      dispatch(fetchRequest(groupBlood))
    })
  }, [socket])
  const handleConfirm = async (item) => {
    const data = { id: item.id, donorId:  currentUser.id}
    const res = await axios.put('http://localhost:8080/api/donor-confirm-request', data)
    console.log("res donor confirm", res.data)
    dispatch(fetchRequest(groupBlood))
    socket.emit('donor_confirm_request',(item));
  }
  return (
    <div className={cx('wrapper')}>
      <h2>Yêu cầu nhận máu từ người cần máu</h2>
      <div className={cx('content')}>
        <div className={cx('header')}>
          <p>Thông tin người cần máu</p>
          <p>unitRequire</p>
          <p>offerBenefit</p>
          <p>Nhóm máu</p>
          <p>Hành động</p>
        </div>
        <div className={cx('body')}>
          {requests && requests.map((item, index) => {
            return (
              <div className={cx('item')}>
                <div>{item.recipientData.lastName}</div>
                <div>{item.unitRequire}</div>
                <div>{item.offerBenefit}</div>
                <div>{item.groupBlood}</div>
                <div>
                  {item.status === "S1" ? 
                  <div>
                    <div className={cx(`button-confirm`, 'button')} onClick={() => handleConfirm(item)}>Đồng ý yêu cầu</div>
                  </div> : <>{item.status === "S3" ?  <div className={cx(`button-confirm`, 'button')} >Hoàn thành</div> : <><div>
                    <div className={cx(`button-pending`, 'button')}>Đang chờ xác nhận từ người nhận</div>
                  </div></>}</>
                  }
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
