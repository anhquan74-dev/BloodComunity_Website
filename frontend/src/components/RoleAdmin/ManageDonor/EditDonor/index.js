import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './EditDonor.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDonorById, updateDonor } from '../../../../redux/actions/donorManage';

const cx = classNames.bind(styles);

function EditDonor() {
    const [donor, setDonor] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        gender: '',
        birthday: '',
        phoneNumber: '',
        address: '',
        groupBlood: '',
        numberOfDonation: 0,
        status: 'active',
        roleId: 'R3',
    });

    const [err, setErr] = useState('');
    const { id } = useParams();
    let history = useNavigate();

    const dispatch = useDispatch();
    const donorState = useSelector((state) => state.users.donor);

    const {
        email,
        password,
        firstName,
        lastName,
        gender,
        birthday,
        phoneNumber,
        address,
        groupBlood,
        numberOfDonation,
        status,
        roleId,
    } = donor;

    useEffect(() => {
        dispatch(fetchDonorById(id));
    }, []);

    useEffect(() => {
        if (donorState) {
            setDonor({ ...donorState });
        }
    }, [donorState]);

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setDonor({ ...donor, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!status) {
            setErr('Vui lòng nhập đầy đủ thông tin');
        } else {
            dispatch(updateDonor(donor));
            history('/admin/manage_donor/');
            setErr('');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('back')} onClick={() => history('/admin/manage_donor/')}>
                <FontAwesomeIcon icon={faArrowLeft} />
                &nbsp; Trở về
            </div>
            <h3>Cập nhật thông tin người hiến máu</h3>
            {err && <h4 style={{ color: 'red' }}>{err}</h4>}
            <form className={cx('content')} onSubmit={handleSubmit}>
                <div className={cx('content-flex')}>
                    <div>
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
                            label="Tên đầu"
                            variant="outlined"
                            color="info"
                            value={firstName || ''}
                            type="text"
                            name="firstName"
                        />
                        <br />
                        <TextField
                            inputProps={{ style: { fontSize: 14 } }}
                            InputLabelProps={{ style: { fontSize: 14 } }}
                            margin="normal"
                            fullWidth
                            id="standard-basic"
                            label="Tên cuối"
                            variant="outlined"
                            color="info"
                            value={lastName || ''}
                            type="text"
                            name="lastName"
                        />
                        <br />
                        <TextField
                            inputProps={{ style: { fontSize: 14 } }}
                            InputLabelProps={{ style: { fontSize: 14 } }}
                            margin="normal"
                            fullWidth
                            id="standard-basic"
                            label="Giới tính"
                            variant="outlined"
                            color="info"
                            value={gender || ''}
                            type="text"
                            name="gender"
                        />
                        <br />
                        <TextField
                            inputProps={{ style: { fontSize: 14 } }}
                            InputLabelProps={{ style: { fontSize: 14 } }}
                            margin="normal"
                            fullWidth
                            id="standard-basic"
                            label="Ngày sinh"
                            variant="outlined"
                            color="info"
                            value={birthday || ''}
                            type="text"
                            name="birthday"
                        />
                        <br />
                    </div>
                    <div>
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
                        <TextField
                            inputProps={{ style: { fontSize: 14 } }}
                            InputLabelProps={{ style: { fontSize: 14 } }}
                            margin="normal"
                            fullWidth
                            id="standard-basic"
                            label="Nhóm máu"
                            variant="outlined"
                            color="info"
                            value={groupBlood || ''}
                            type="text"
                            name="groupBlood"
                        />
                        <br />
                        <TextField
                            inputProps={{ style: { fontSize: 14 } }}
                            InputLabelProps={{ style: { fontSize: 14 } }}
                            margin="normal"
                            fullWidth
                            id="standard-basic"
                            label="Số lần hiến máu"
                            variant="outlined"
                            color="info"
                            value={numberOfDonation || ''}
                            type="text"
                            name="numberOfDonation"
                        />
                        <br />
                        <TextField
                            inputProps={{ style: { fontSize: 14 } }}
                            InputLabelProps={{ style: { fontSize: 14 } }}
                            margin="normal"
                            fullWidth
                            id="standard-basic"
                            label="Trạng thái"
                            variant="outlined"
                            color="info"
                            value={status || ''}
                            type="text"
                            name="status"
                            onChange={handleInputChange}
                        />
                        <br />
                        <TextField
                            inputProps={{ style: { fontSize: 14 } }}
                            InputLabelProps={{ style: { fontSize: 14 } }}
                            margin="normal"
                            fullWidth
                            id="standard-basic"
                            label="Quyền"
                            variant="outlined"
                            color="info"
                            value={roleId || ''}
                            type="text"
                            name="roleId"
                        />
                        <br />
                    </div>
                </div>
                <div className={cx('button')}>
                    <Button variant="contained" type="submit">
                        Lưu thay đổi
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default EditDonor;
