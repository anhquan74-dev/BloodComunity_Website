import styles from './ManageBloodRequest.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { fetchRecipientRequest, moveDataUpdateToRedux } from '../../../redux/actions/requestAction';
import Modal from "react-modal";
import { DOMAIN_BACKEND } from '../../../config/settingSystem';
import '../BloodRequest/BloodRequest.css'
import ModalUpdateRequest from './ModalUpdateRequest';
import ModalInforDonor from './ModalInforDonor';
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    width: 400,
  },
};
const ENDPOINT = DOMAIN_BACKEND;
var socket;
socket = io(ENDPOINT);
const cx = classNames.bind(styles);
function ManageBloodRequest() {
  const dispatch = useDispatch()
  const [socketConnected, setSocketConnected] = useState(false)
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const requests = useSelector((state) => state.request.listRequestsOfEachRecipients)
  const [modalOpen, setModalOpen] = useState(false);
  const [itemUpdate, setItemUpdate] = useState(null);
  const [isOpenModalEdit, setOpenModalEdit] = useState(false);
  const [isOpenModalInforDonor, setIsOpenModalInforDonor] = useState(false)
  const [inforDonor, setInforDonor] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
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
      dispatch(fetchRecipientRequest(currentUser.id))
    })
  }, [socket])
  const handleConfirmSuccess = async (item) => {
    const data = { id: item.id }
    await axios.put(`${DOMAIN_BACKEND}/api/recipient-confirm-request-success`, data)
    dispatch(fetchRecipientRequest(currentUser.id))
    socket.emit('recipient_confirm_request', (item));
  }
  const handleConfirmFailed = async (item) => {
    const data = { id: item.id }
    await axios.put(`${DOMAIN_BACKEND}/api/recipient-confirm-request-failed`, data)
    dispatch(fetchRecipientRequest(currentUser.id))
    socket.emit('recipient_confirm_request', (item));
  }
  const handleUpdateRequest =  (item) => {
    setOpenModalEdit(!isOpenModalEdit)
    dispatch(moveDataUpdateToRedux(item))
  }
  const handleDeleteRequest = async (item) => {
    let notification = "Bạn chắc chắn muốn xóa yêu cầu này?"
    if (window.confirm(notification) === true) {
      const id = item.id
      await axios.delete(`${DOMAIN_BACKEND}/api/delete-request`, { data: { id } })
      dispatch(fetchRecipientRequest(currentUser.id))
      socket.emit('recipient_delete_request', (item));
    } else {
      return;
    }
  }
  const handleShowInforDonor =async (item) => {
    console.log("item infor" , item)
    const res = await axios.get(`${DOMAIN_BACKEND}/api/get-user-by-id?id=${item.donorId}`)
    console.log(res.data.content)
    setInforDonor(res.data.content)
    setIsOpen(true)
  }
  return (
    <div className={cx('wrapper')}>
      <h2>Yêu cầu nhận máu từ người cần máu</h2>
      <div className={cx('content')}>
        <div className={cx('header')}>
          <p>Số lượng máu cần (ml)</p>
          <p>Hỗ trợ cho người hiến</p>
          <p>Trạng thái</p>
        </div>
        <div className={cx('body')}>
          {requests && requests.map((item, index) => {
            return (
              <div className={cx('item')}>
                <div>{item.unitRequire}</div>
                <div>{item.offerBenefit}</div>
                <div>
                  {item.status === "S1" ?
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "150px" }} className={cx(`button-wait`, 'button')}>Đang tìm người hiến máu</div>
                      <div style={{ width: "150px" }} className={cx(`button-pending`, 'button')} onClick={
                        () => handleUpdateRequest(item)
                      }>Cập nhật</div>
                      <div style={{ width: "150px" }} className={cx(`button-reject`, 'button')} onClick={() => handleDeleteRequest(item)}>Hủy yêu cầu</div>
                    </div> : <>
                      {item.status === "S3" ? <div style={{ width: "150px" }} className={cx(`button-confirm`, 'button')}>Hoàn thành</div> : <div style={{display:'flex'}}>
                        <div style={{ width: "150px" }} className={cx(`button-pending`, 'button')} onClick={() => handleConfirmSuccess(item)}>Xác nhận nhận máu thành công</div>
                        <div style={{ width: "150px" }} className={cx(`button-reject`, 'button')} onClick={() => handleConfirmFailed(item)}>Xác nhận nhận máu thất bại</div>
                        <div style={{ width: "150px" }} className={cx(`button-confirm`, 'button')} onClick={() => handleShowInforDonor(item)}>Thông tin người hiến máu</div>
                      </div>}
                    </>
                  }
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {isOpenModalEdit === true ? <ModalUpdateRequest isOpenModalEdit={isOpenModalEdit} setOpenModalEdit={setOpenModalEdit} /> : <></>}
      {isOpen && <ModalInforDonor inforDonor={inforDonor} setIsOpen={setIsOpen} />}
    </div>
  );
}

export default ManageBloodRequest;
