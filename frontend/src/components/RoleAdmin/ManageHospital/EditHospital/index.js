import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './EditHospital.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHospitalById, updateHospital } from '../../../../redux/actions/hospitalManage';

const cx = classNames.bind(styles);

function EditHospital() {
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

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setHospital({ ...hospital, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!hospitalName || !phoneNumber || !address) {
            setErr('Vui lòng nhập đầy đủ thông tin');
        } else {
            dispatch(updateHospital(hospital));
            history('/admin/manage_hospital/');
            setErr('');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('back')} onClick={() => history('/admin/manage_hospital/')}>
                <FontAwesomeIcon icon={faArrowLeft} />
                &nbsp; Trở về
            </div>
            <h3>Cập nhật thông tin bệnh viện</h3>
            {err && <h4 style={{ color: 'red' }}>{err}</h4>}
            <form className={cx('content')} onSubmit={handleSubmit}>
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
                    onChange={handleInputChange}
                    disabled
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
                    onChange={handleInputChange}
                    disabled
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                />
                <br />
                <div className={cx('button')}>
                    <Button variant="contained" type="submit">
                        Lưu thay đổi
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default EditHospital;
