import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { useOutletContext } from 'react-router-dom';
const ENDPOINT = 'http://localhost:8080';
var socket, a;

function BloodRequest() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [donorConfirm, setDonorConfirm] = useState();
    const socket = useOutletContext();
    console.log(socket);
    console.log(user);
    // const [socketConnected, setSocketConnected] = useState(false);
    // useEffect(() => {
    //     socket = io(ENDPOINT);
    //     socket.emit('join room', user);
    //     socket.on('connection', () => setSocketConnected(true));
    // }, []);

    const handleRequestBlood = () => {
        socket.emit('send blood request', user);
    };

    useEffect(() => {
        socket?.on('recieve donor confirm', (user) => {
            setDonorConfirm(user);
        });
    }, [socket]);
    console.log(donorConfirm);
    return (
        <div>
            <h1>BloodRequest</h1>
            <button onClick={handleRequestBlood}>Gửi yêu cầu</button>
            {donorConfirm && <h2>{donorConfirm.roleId}</h2>}
        </div>
    );
}

export default BloodRequest;
