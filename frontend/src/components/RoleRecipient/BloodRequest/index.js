import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { DOMAIN_BACKEND } from '../../../config/settingSystem';
const ENDPOINT = DOMAIN_BACKEND;
var socket

function BloodRequest() {
  const [socketConnected, setSocketConnected] = useState(false)
  const groupBlood = useSelector((state) => state.auth.login.currentUser.groupBlood);
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit('join_group_blood', currentUser)
    socket.on('connection', () => { setSocketConnected(true) })
  }, [])
  
  const formik = useFormik({
    initialValues: {
      recipientId: currentUser.id,
      groupBlood: groupBlood,
      unitRequire: "",
      offerBenefit: '',
    },
    validationSchema: Yup.object({
      unitRequire: Yup.number().typeError('Số lượng máu phải là 1 số').required("Hãy nhập số lượng máu").positive("Số lượng máu phải lớn hơn 0").max(Number.MAX_SAFE_INTEGER, "Số lượng máu phải nhỏ hơn 9007199254740991"),
    }),
    onSubmit: async (values) => {
      let dataSubmit = {
        recipientId: currentUser.id,
        groupBlood: groupBlood,
        unitRequire: values.unitRequire,
        offerBenefit: values.offerBenefit,
      }
      const res = await axios.post(`${DOMAIN_BACKEND}/api/create-request`, dataSubmit)
      socket.emit('new_request_from_recipient', (res.data.content))
    },
  });
  return (
    <div>
      <h1>Tạo yêu cầu nhận máu</h1>
      <label>Nhóm máu của bạn</label>
      <input type="text" name='groupBlood' value={formik.values.groupBlood} disabled />
      <label>Số lượng máu cần thiết</label>
      <input type="text" name='unitRequire' value={formik.values.unitRequire} placeholder="Nhập số lượng máu" onChange={formik.handleChange} />
      {formik.errors.unitRequire && (
        <p style={{ color: 'red' }}>
          {formik.errors.unitRequire}
        </p>
      )}
      <label>Phúc lợi cho người hiến máu</label>
      <input type="text" name='offerBenefit' value={formik.values.offerBenefit} placeholder="Phúc lợi cho người hiến máu" onChange={formik.handleChange} />

      <button type='Submit' onClick={formik.handleSubmit}>Gửi yêu cầu</button>
      {/* {donorConfirm && <h2>{donorConfirm.roleId}</h2>} */}
    </div>
  );
}
export default BloodRequest;
