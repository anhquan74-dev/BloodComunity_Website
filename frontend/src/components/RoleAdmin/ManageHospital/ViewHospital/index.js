import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './ViewHospital.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHospitalById, updateUser } from '../../../../redux/actions/hospitalManage';

const cx = classNames.bind(styles);

function ViewHospital() {
    const [hospital, setHospital] = useState({
        hospitalName: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
        role: 'R2',
    });
    const { hospitalName, email, password, phoneNumber, address, role } = hospital;

    const [err, setErr] = useState('');
    const { id } = useParams();
    let history = useNavigate();

    const dispatch = useDispatch();
    const hospitalState = useSelector((state) => state.users.hospital);

    useEffect(() => {
        dispatch(fetchHospitalById(id));
    }, []);

    useEffect(() => {
        if (hospitalState) {
            setHospital({ ...hospitalState });
        }
    }, [hospitalState]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('back')} onClick={() => history('/admin/manage_hospital/')}>
                <FontAwesomeIcon icon={faArrowLeft} />
                &nbsp; Trở về
            </div>
            <h3>Xem thông tin bệnh viện</h3>
            {err && <h4 style={{ color: 'red' }}>{err}</h4>}
            <div className={cx('content')}>
                <TextField
                    inputProps={{ style: { fontSize: 14 } }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                    margin="normal"
                    fullWidth
                    id="standard-basic"
                    label="Email"
                    variant="outlined"
                    color="info"
                    value={email || ''}
                    type="email"
                    name="email"
                />
                <br />
                <TextField
                    inputProps={{ style: { fontSize: 14 } }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                    margin="normal"
                    fullWidth
                    id="standard-basic"
                    label="Mật khẩu"
                    variant="outlined"
                    color="info"
                    value={password || ''}
                    type="password"
                    name="password"
                />
                <br />
                <TextField
                    inputProps={{ style: { fontSize: 14 } }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                    margin="normal"
                    fullWidth
                    id="standard-basic"
                    label="Tên bệnh viện"
                    variant="outlined"
                    color="info"
                    value={hospitalName || ''}
                    type="text"
                    name="hospitalName"
                />
                <br />
                <TextField
                    inputProps={{ style: { fontSize: 14 } }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                    margin="normal"
                    fullWidth
                    id="standard-basic"
                    label="Số điện thoại"
                    variant="outlined"
                    color="info"
                    value={phoneNumber || ''}
                    type="text"
                    name="phoneNumber"
                />
                <br />
                <TextField
                    inputProps={{ style: { fontSize: 14 } }}
                    InputLabelProps={{ style: { fontSize: 14 } }}
                    margin="normal"
                    fullWidth
                    id="standard-basic"
                    label="Địa chỉ"
                    variant="outlined"
                    color="info"
                    value={address || ''}
                    type="text"
                    name="address"
                />
                <br />
                <div className={cx('button')}>
                    <Button variant="contained" type="submit" onClick={() => history('/admin/manage_hospital/')}>
                        Trở về
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ViewHospital;
