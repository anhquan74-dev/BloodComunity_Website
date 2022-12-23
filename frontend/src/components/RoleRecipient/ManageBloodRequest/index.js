import styles from './ManageBloodRequest.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchRecipientRequest, fetchRequest, fetchRequestSuccess } from '../../../redux/actions/requestAction';
import ModalUpdate from './ModalUpdate';

const ENDPOINT = 'http://localhost:8080';
var socket;
socket = io(ENDPOINT);
const cx = classNames.bind(styles);
function ManageBloodRequest() {
  const dispatch = useDispatch()
  const [socketConnected, setSocketConnected] = useState(false)
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const groupBlood = useSelector((state) => state.auth.login.currentUser.groupBlood);
  const requests = useSelector((state) => state.request.listRequestsOfEachRecipients)
  useEffect(() => {
    dispatch(fetchRecipientRequest(currentUser.id))
  }, [])
  useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit('join_group_blood', currentUser)
    socket.on('connection', () => { setSocketConnected(true) })
  }, [])
  useEffect(() => {
    socket.on('recieved_donor_confirm', (requestConfirmed) => {
      // notification 
      console.log("request confirmed from donor", requestConfirmed)
      dispatch(fetchRecipientRequest(currentUser.id))
    })
  }, [socket])
  const handleConfirmSuccess = async (item) => {
    const data = { id: item.id }
    const res = await axios.put('http://localhost:8080/api/recipient-confirm-request-success', data)
    console.log("res recipient confirm success", res.data)
    dispatch(fetchRecipientRequest(currentUser.id))
    socket.emit('recipient_confirm_request', (item));
  }
  const handleConfirmFailed = async (item) => {
    const data = { id: item.id }
    const res = await axios.put('http://localhost:8080/api/recipient-confirm-request-failed', data)
    console.log("res recipient confirm failed", res.data)
    dispatch(fetchRecipientRequest(currentUser.id))
    socket.emit('recipient_confirm_request', (item));
  }
  const handleUpdateRequest = async (item) => {
    const fakeDataUpdate = {
      id: item.id,
      unitRequire: "123450",
      offerBenefit: "1 hộp sữa"
    }
    const res = await axios.put(`http://localhost:8080/api/update-request`, fakeDataUpdate)
    console.log("res update" , res.data)
    dispatch(fetchRecipientRequest(currentUser.id))
    socket.emit('recipient_delete_request', (item));

  }
  const handleDeleteRequest = async (item) => {
    let notification = "Bạn chắc chắn muốn xóa yêu cầu này?"
    if (window.confirm(notification) === true) {
      const id = item.id
      await axios.delete(`http://localhost:8080/api/delete-request`, { data: { id } })
      dispatch(fetchRecipientRequest(currentUser.id))
      socket.emit('recipient_delete_request', (item));
    } else {
      return;
    }
  }
  return (
    <div className={cx('wrapper')}>
      <h2>Yêu cầu nhận máu từ người cần máu</h2>
      <div className={cx('content')}>
        <div className={cx('header')}>
          <p>unitRequire</p>
          <p>offerBenefit</p>
          <p>Nhóm máu</p>
          <p>Hành động</p>
        </div>
        <div className={cx('body')}>
          {requests && requests.map((item, index) => {
            return (
              <div className={cx('item')}>
                <div>{item.unitRequire}</div>
                <div>{item.offerBenefit}</div>
                <div>{item.groupBlood}</div>
                <div>
                  {item.status === "S1" ?
                    <div>
                      <div className={cx(`button-confirm`, 'button')}>Đang tìm người hiến máu</div>
                      <div className={cx(`button-pending`, 'button')} onClick={() => handleUpdateRequest(item)}>Cập nhật</div>
                      <div className={cx(`button-reject`, 'button')} onClick={() => handleDeleteRequest(item)}>Hủy yêu cầu</div>
                    </div> : <>
                      {item.status === "S3" ? <div className={cx(`button-confirm`, 'button')}>Hoàn thành</div> : <><div>
                        <div className={cx(`button-pending`, 'button')} onClick={() => handleConfirmSuccess(item)}>Xác nhận nhận máu thành công</div>
                        <div className={cx(`button-reject`, 'button')} onClick={() => handleConfirmFailed(item)}>Xác nhận nhận máu thất bại</div>
                      </div></>}
                    </>
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

export default ManageBloodRequest;
