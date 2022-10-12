import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './AddNewHospital.module.scss'
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { createHospital } from "../../../../redux/actions/actions";

const cx = classNames.bind(styles)

function AddNewHospital() {
    const [hospital, setHospital] = useState({
        hospitalName: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
        role: 'R2'
    })

    const { hospitalName, email, password, phoneNumber, address, role } = hospital;
    const [err, setErr] = useState('');

    let history = useNavigate();
    const dispatch = useDispatch();
    // const 


    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setHospital({ ...hospital, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!hospitalName || !email || !password || !phoneNumber || !address) {
            setErr('Vui lòng nhập đầy đủ thông tin')
        } else {
            console.log(hospital);
            dispatch(createHospital(hospital));
            history('/admin/manage_hospital/');
            setErr('');
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('back')} onClick={() => history('/admin/manage_hospital/')}>
                <FontAwesomeIcon icon={faArrowLeft} />
                &nbsp; Trở về
            </div>
            <h3>Thêm mới bệnh viện</h3>
            {err && <h4 style={{ color: 'red' }}>{err}</h4>}
            <form className={cx('content')} onSubmit={handleSubmit}>
                <TextField
                    inputProps={{ style: { fontSize: 14 } }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                    margin="normal"
                    fullWidth
                    id="standard-basic" label="Tên bệnh viện"
                    variant="standard"
                    value={hospitalName}
                    type='text'
                    name='hospitalName'
                    onChange={handleInputChange} />
                <br />
                <TextField
                    inputProps={{ style: { fontSize: 14 } }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                    margin="normal"
                    fullWidth
                    id="standard-basic"
                    label="Email"
                    variant="standard"
                    value={email}
                    type='email'
                    name='email'
                    onChange={handleInputChange} />
                <br />
                <TextField
                    inputProps={{ style: { fontSize: 14 } }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                    margin="normal"
                    fullWidth
                    id="standard-basic"
                    label="Mật khẩu"
                    variant="standard"
                    value={password}
                    type='password'
                    name='password'
                    onChange={handleInputChange} />
                <br />
                <TextField
                    inputProps={{ style: { fontSize: 14 } }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                    margin="normal"
                    fullWidth
                    id="standard-basic"
                    label="Số điện thoại"
                    variant="standard"
                    value={phoneNumber}
                    type='text'
                    name='phoneNumber'
                    onChange={handleInputChange} />
                <br />
                <TextField
                    inputProps={{ style: { fontSize: 14 } }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                    margin="normal"
                    fullWidth
                    id="standard-basic"
                    label="Địa chỉ"
                    variant="standard"
                    value={address}
                    type='text'
                    name='address'
                    onChange={handleInputChange} />
                <br />
                <div className={cx('button')}>

                    <Button variant="contained" type='submit'>Thêm</Button>
                </div>
            </form >
        </div >
    );
}

export default AddNewHospital;