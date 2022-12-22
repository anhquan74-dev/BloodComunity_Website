import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
const ENDPOINT = 'http://localhost:8080';
var socket, a;

function BloodRequest() {
  const [socketConnected , setSocketConnected] = useState(false)
  const groupBlood = useSelector((state) => state.auth.login.currentUser.groupBlood);
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const fakeRequest = {
    recipientId: 1,
    groupBlood: groupBlood,
    offerBenefit: "abc",
    unitRequire: 0
  }
  const handleSendRequest = async () => {
    const res = await axios.post(`http://localhost:8080/api/create-request`, fakeRequest)
    console.log("res Send", res.data.content)
    socket.emit('new_request_from_recipient' , (res.data.content))
  }
  useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit('join_group_blood',currentUser)
    socket.on('connection', () => { setSocketConnected(true) })
  }, [])
  return (
    <div>
      <h1>BloodRequest</h1>
      <button onClick={handleSendRequest}>Gửi yêu cầu</button>
      {/* {donorConfirm && <h2>{donorConfirm.roleId}</h2>} */}
    </div>
  );
}
export default BloodRequest;
