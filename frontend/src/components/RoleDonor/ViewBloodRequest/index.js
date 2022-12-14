import styles from './ViewBloodRequest.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchRequest } from '../../../redux/actions/requestAction';
import { DOMAIN_BACKEND } from '../../../config/settingSystem';
import { toast } from 'react-toastify';


const ENDPOINT = DOMAIN_BACKEND;
var socket;
socket = io(ENDPOINT);

const cx = classNames.bind(styles);

function ViewBloodRequest() {
  const dispatch = useDispatch();
  const [socketConnected, setSocketConnected] = useState(false);
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const groupBlood = useSelector((state) => state.auth.login.currentUser.groupBlood);
  const requests = useSelector((state) => state.request.listRequests);
  const [notification, setNotification] = useState([]);
  useEffect(() => {
    dispatch(fetchRequest(groupBlood));
  }, []);
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('join_group_blood', currentUser);
    socket.on('connection', () => {
      setSocketConnected(true);
    });
  }, []);
  useEffect(() => {
    socket.on('request_received', (newRequestReceived) => {
      // notification
      if (!notification.includes(newRequestReceived)) {
        setNotification([newRequestReceived, ...notification]);
      }
      dispatch(fetchRequest(groupBlood));
    });
    socket.on('recieved_recipient_confirm', (requestConfirmedByRecipient) => {
      dispatch(fetchRequest(groupBlood));
    });
    socket.on('recieved_recipient_delete', (requestDeleted) => {
      dispatch(fetchRequest(groupBlood));
    });
    socket.on('recieved_recipient_update', (requestUpdated) => {
      dispatch(fetchRequest(groupBlood));
    });
  }, [socket]);
  const handleConfirm = async (item) => {
    const data = { id: item.id, donorId: currentUser.id };
    await axios.put(`${DOMAIN_BACKEND}/api/donor-confirm-request`, data);
    dispatch(fetchRequest(groupBlood));
    socket.emit('donor_confirm_request', item);
    const notify = {
      donorName: currentUser.firstName + ' ' + currentUser.lastName,
      donorId: currentUser.id,
      recipientName: item.recipientData.firstName + ' ' + item.recipientData.lastName,
      recipientId: item.recipientId,
      unitRequire: item.unitRequire,
      type: 'donor_confirm',
      donorDeleted: '0',
      recipientDeleted: '0',
    };
    const resNotify = await axios.post(`${DOMAIN_BACKEND}/api/create-notify`, notify);
    socket.emit('send_notification_confirm_from_donor', resNotify.data.content);
  };
  return (
    <div className={cx('wrapper')}>
      <h2>Y??u c???u nh???n m??u t??? ng?????i c???n m??u</h2>
      <div className={cx('content')}>
        <div className={cx('header')}>
          <p>Ng?????i c???n m??u</p>
          <p>??i???n tho???i</p>
          <p>?????a ch???</p>
          <p >H??? tr??? t??? ng?????i nh???n</p>
          {/* style={{ marginRight: '70px' }} */}
          <p >S??? l?????ng m??u (ml)</p>
          {/* style={{ marginRight: '80px' }} */}
          <p>Tr???ng th??i</p>
        </div>
        <div className={cx('body')}>
          {requests &&
            requests.map((item, index) => {
              return (
                <div className={cx('item')}>
                  <div>{item.recipientData.firstName + ' ' + item.recipientData.lastName}</div>
                  <div>{item.recipientData.phoneNumber}</div>
                  <div>{item.recipientData.city}</div>
                  <div>{item.offerBenefit}</div>
                  <div>{item.unitRequire}</div>
                  <div>
                    {item.status === 'S1' ? (
                      <div
                        style={{ width: '120px' }}
                        className={cx(`button-confirm`, 'button')}
                        onClick={() => handleConfirm(item)}
                      >
                        ?????ng ?? y??u c???u
                      </div>
                    ) : (
                      <>
                        {item.status === 'S3' ? (
                          <div style={{ width: '120px' }} className={cx(`button-confirm`, 'button')}>
                            Ho??n th??nh
                          </div>
                        ) : (
                          <>
                            <div style={{ width: '120px' }} className={cx(`button-pending`, 'button')}>
                              ??ang ch??? x??c nh???n t??? ng?????i nh???n
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default ViewBloodRequest;
