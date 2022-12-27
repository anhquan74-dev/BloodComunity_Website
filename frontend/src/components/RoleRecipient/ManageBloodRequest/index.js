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
  // const formik = useFormik({
  //   initialValues: {
  //     unitRequire: itemUpdate?.unitRequire,
  //     offerBenefit: itemUpdate?.offerBenefit,
  //     id: itemUpdate?.id,
  //   },
  //   validationSchema: Yup.object({
  //     unitRequire: Yup.number().typeError('Số lượng máu phải là 1 số').required("Hãy nhập số lượng máu").positive("Số lượng máu phải lớn hơn 0").integer('Sai định dạng').max(Number.MAX_SAFE_INTEGER, "Số lượng máu phải nhỏ hơn 9007199254740991"),
  //   }),
  //   onSubmit: async (values) => {
  //     let dataUpdate = {
  //       id: itemUpdate.id,
  //       unitRequire: values.unitRequire,
  //       offerBenefit: values.offerBenefit
  //     }
  //     await axios.put(`${DOMAIN_BACKEND}/api/update-request`, dataUpdate)
  //     dispatch(fetchRecipientRequest(currentUser.id))
  //     socket.emit('recipient_delete_request', (itemUpdate));
  //     setModalOpen(false)
  //   },
  // });
  return (
    <div className={cx('wrapper')}>
      <h2>Yêu cầu nhận máu từ người cần máu</h2>
      <div className={cx('content')}>
        <div className={cx('header')}>
          <p>Số lượng máu cần</p>
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
                      {item.status === "S3" ? <div style={{ width: "150px" }} className={cx(`button-confirm`, 'button')}>Hoàn thành</div> : <><div>
                        <div style={{ width: "150px" }} className={cx(`button-pending`, 'button')} onClick={() => handleConfirmSuccess(item)}>Xác nhận nhận máu thành công</div>
                        <div style={{ width: "150px" }} className={cx(`button-reject`, 'button')} onClick={() => handleConfirmFailed(item)}>Xác nhận nhận máu thất bại</div>
                      </div></>}
                    </>
                  }
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {/* <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={customStyles}
      >
        <div>
          <span>Số lượng máu(ml):</span>
        </div>
        <input
          type="text"
          name="unitRequire"
          placeholder="Số lượng máu"
          defaultValue={formik.initialValues.unitRequire}
          onChange={formik.handleChange}
        />
        {formik.errors.unitRequire && (
          <p style={{ color: 'red' }}>
            {formik.errors.unitRequire}
          </p>
        )}
        <div>
          <span>Lợi ích cho người hiến máu:</span>
        </div>
        <input
          type="text"
          name="offerBenefit"
          placeholder="Lợi ích của người hiến"
          defaultValue={formik.initialValues.offerBenefit}
          onChange={formik.handleChange}
        />
        {formik.errors.offerBenefit && (
          <p style={{ color: 'red' }}>
            {formik.errors.offerBenefit}
          </p>
        )}
        <div>
          <button style={{ backgroundColor: "red", marginRight: "10px",marginTop: "10px", color:"white" , padding: "2px 3px", borderRadius: "5px"}} onClick={() => {
            setModalOpen(false)

          }}>Đóng</button>
          <button type='Submit'style={{ backgroundColor: "green", marginRight: "10px",marginTop: "10px", color:"white" , padding: "2px 3px", borderRadius: "5px"}} onClick={formik.handleSubmit}>
            Lưu
          </button>
        </div>

      </Modal> */}
      {/* <form onSubmit={formik.handleSubmit}>
        <div className={cx("Campaign-Model")}>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Cập nhật cầu nhận máu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ul className={cx("menu-list")}>
                <li className={cx("menu-item")}>
                  <div className={cx("Shared input-name")}>
                    <div>
                      <span>Số lượng máu cần(ml):</span>
                    </div>
                    <div className={cx("vali-form")}>
                      <input
                        type="text"
                        name="unitRequire"
                        placeholder="Hãy nhập số lượng máu:"
                        value={formik.values.unitRequire}
                        onChange={formik.handleChange}
                        style={{border: '1px solid gray'}}
                      />
                      {formik.errors.unitRequire && (
                        <p style={{ color: 'red' }}>
                          {formik.errors.unitRequire}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
                <li className={cx("menu-item")}>
                  <div className={cx("Shared input-name")}>
                    <div>
                      <span>Hỗ trợ người hiến máu:</span>
                    </div>
                    <div className={cx("vali-form")}>
                      <input
                        type="text"
                        name="offerBenefit"
                        placeholder="Hỗ trợ cho người hiến máu:"
                        value={formik.values.offerBenefit}
                        onChange={formik.handleChange}
                        style={{border: '1px solid gray'}}
                      />
                      {formik.errors.offerBenefit && (
                        <p style={{ color: 'red' }}>
                          {formik.errors.offerBenefit}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              </ul>
            </Modal.Body>
            <Modal.Footer>
            <div className={cx("close-btn")}>
                <Button  onClick={handleClose}>
                  Đóng
                </Button>
              </div>
              <div className={cx("save-btn")}>
                <Button variant="primary" type='Submit' onClick={formik.handleSubmit}>
                  Lưu
                </Button>
              </div>
            </Modal.Footer>
          </Modal>
        </div>

      </form> */}
      {isOpenModalEdit === true ? <ModalUpdateRequest isOpenModalEdit={isOpenModalEdit} setOpenModalEdit={setOpenModalEdit} /> : <></>}
    </div>
  );
}

export default ManageBloodRequest;
