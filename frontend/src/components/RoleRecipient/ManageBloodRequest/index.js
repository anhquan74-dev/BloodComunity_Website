import styles from './ManageBloodRequest.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchRecipientRequest, moveDataUpdateToRedux } from '../../../redux/actions/requestAction';
import { DOMAIN_BACKEND } from '../../../config/settingSystem';
import '../BloodRequest/BloodRequest.css'
import ModalUpdateRequest from './ModalUpdateRequest';
import ModalInforDonor from './ModalInforDonor';
import { toast } from 'react-toastify';

const ENDPOINT = DOMAIN_BACKEND;
var socket;
socket = io(ENDPOINT);
const cx = classNames.bind(styles);
function ManageBloodRequest() {
  const dispatch = useDispatch()
  const [socketConnected, setSocketConnected] = useState(false)
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const requests = useSelector((state) => state.request.listRequestsOfEachRecipients)
  const [isOpenModalEdit, setOpenModalEdit] = useState(false);
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
      dispatch(fetchRecipientRequest(currentUser.id))
    })
  }, [socket])
  const handleConfirmSuccess = async (item) => {
    const data = { id: item.id }
    await axios.put(`${DOMAIN_BACKEND}/api/recipient-confirm-request-success`, data)
    dispatch(fetchRecipientRequest(currentUser.id))
    socket.emit('recipient_confirm_request', (item));
    let dataNotify = {
      donorId: item.donorId,
      recipientName: currentUser.firstName + ' ' + currentUser.lastName,
      recipientId: currentUser.id,
      unitRequire: item.unitRequire,
      type: 'recipient_confirm_success',
      donorDeleted: '0',
      recipientDeleted: '0'
    }
    await axios.post(`${DOMAIN_BACKEND}/api/create-notify`, dataNotify)
    socket.emit('recipient_confirm_notify_success', (item));
    toast.success("Qu?? tr??nh nh???n m??u ???? ho??n th??nh!")

  }
  const handleConfirmFailed = async (item) => {
    const data = { id: item.id }
    await axios.put(`${DOMAIN_BACKEND}/api/recipient-confirm-request-failed`, data)
    dispatch(fetchRecipientRequest(currentUser.id))
    socket.emit('recipient_confirm_request', (item));
    let dataNotify = {
      donorId: item.donorId,
      recipientName: currentUser.firstName + ' ' + currentUser.lastName,
      recipientId: currentUser.id,
      unitRequire: item.unitRequire,
      type: 'recipient_confirm_failed',
      donorDeleted: '0',
      recipientDeleted: '0'
    }
    await axios.post(`${DOMAIN_BACKEND}/api/create-notify`, dataNotify)
    socket.emit('recipient_confirm_notify_failed', (item));
    toast.success("Y??u c???u n??y c???a b???n s??? ???????c g???i l???i!")
  }
  const handleUpdateRequest = (item) => {
    setOpenModalEdit(!isOpenModalEdit)
    dispatch(moveDataUpdateToRedux(item))
  }
  const handleDeleteRequest = async (item) => {
    let notification = "B???n ch???c ch???n mu???n x??a y??u c???u n??y?"
    if (window.confirm(notification) === true) {
      const id = item.id
      await axios.delete(`${DOMAIN_BACKEND}/api/delete-request`, { data: { id } })
      dispatch(fetchRecipientRequest(currentUser.id))
      socket.emit('recipient_delete_request', (item));
      toast.success("X??a th??nh c??ng!")
    } else {
      return;
    }
  }
  const handleShowInforDonor = async (item) => {
    const res = await axios.get(`${DOMAIN_BACKEND}/api/get-user-by-id?id=${item.donorId}`)
    setInforDonor(res.data.content)
    setIsOpen(true)
  }
  return (
    <div className={cx('wrapper')}>
      <h2>Y??u c???u nh???n m??u t??? ng?????i c???n m??u</h2>
      <div className={cx('content')}>
        <div className={cx('header')}>
          <p>S??? l?????ng m??u c???n (ml)</p>
          <p>H??? tr??? cho ng?????i hi???n</p>
          <p>Tr???ng th??i</p>
        </div>
        <div className={cx('body')}>
          {requests && requests.map((item, index) => {
            return (
              <div key={index} className={cx('item')}>
                <div>{item.unitRequire}</div>
                <div>{item.offerBenefit}</div>
                <div>
                  {item.status === "S1" ?
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "150px" }} className={cx(`button-wait`, 'button')}>??ang t??m ng?????i hi???n m??u</div>
                      <div style={{ width: "150px" }} className={cx(`button-pending`, 'button')} onClick={
                        () => handleUpdateRequest(item)
                      }>C???p nh???t</div>
                      <div style={{ width: "150px" }} className={cx(`button-reject`, 'button')} onClick={() => handleDeleteRequest(item)}>H???y y??u c???u</div>
                    </div> : <>
                      {item.status === "S3" ? <div style={{ display: "flex" }}>
                        <div style={{ width: "150px" }} className={cx(`button-confirm`, 'button')}>Ho??n th??nh</div>
                        <div style={{ width: "150px" }} className={cx(`button-reject`, 'button')} onClick={() => handleDeleteRequest(item)}>X??a kh???i l???ch s???</div>
                      </div> : <div style={{ display: 'flex' }}>
                        <div style={{ width: "150px" }} className={cx(`button-pending`, 'button')} onClick={() => handleConfirmSuccess(item)}>X??c nh???n nh???n m??u th??nh c??ng</div>
                        <div style={{ width: "150px" }} className={cx(`button-reject`, 'button')} onClick={() => handleConfirmFailed(item)}>X??c nh???n nh???n m??u th???t b???i</div>
                        <div style={{ width: "150px" }} className={cx(`button-confirm`, 'button')} onClick={() => handleShowInforDonor(item)}>Th??ng tin ng?????i hi???n m??u</div>
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
