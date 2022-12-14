import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './ViewDonor.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDonorById, updateDonor } from '../../../../redux/actions/donorManage';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { Buffer } from 'buffer';
Buffer.from('anything', 'base64');

const cx = classNames.bind(styles);

function ViewDonor() {
    const [donor, setDonor] = useState({
        // id: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        gender: '',
        birthday: '',
        phoneNumber: '',
        address: '',
        groupBlood: '',
        image: '',
        numberOfDonation: 0,
        status: 'active',
        roleId: 'R3',
        // ward: null,
        // district: "",
        // city: "",
        // image: {
        //     type: "Buffer",
        //     data: []
        // },
    });
    const [isOpen, setIsOpen] = useState(false);
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
        image,
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

    let previewImage = '';
    let imageBase64 = '';
    if (image) {
        imageBase64 = new Buffer(image, 'base64').toString('binary');
    }
    previewImage = imageBase64;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('back')} onClick={() => history('/admin/manage_donor/')}>
                <FontAwesomeIcon icon={faArrowLeft} />
                &nbsp; Tr??? v???
            </div>
            <h3>Xem th??ng tin ng?????i hi???n m??u</h3>
            {err && <h4 style={{ color: 'red' }}>{err}</h4>}
            <div className={cx('content')}>
                <div className={cx('content-info')}>
                    <div
                        onClick={() => {
                            if (!previewImage) return;
                            setIsOpen(true);
                        }}
                    >
                        {previewImage ? <img src={previewImage} alt="preview-avatar" /> : <span>Preview Image</span>}
                    </div>
                    {isOpen && <Lightbox mainSrc={previewImage} onCloseRequest={() => setIsOpen(false)} />}
                    <div>
                        <h3>T??n: </h3>
                        <p>{firstName}</p>
                        <br />
                        <h3>H???: </h3>
                        <p>{lastName}</p>
                        <br />
                        <h3>Email: </h3>
                        <p>{email}</p>
                        <br />
                        <h3>Gi???i t??nh: </h3>
                        <p>{gender}</p>
                        <br />
                    </div>
                    <div>
                        <h3>Ng??y sinh: </h3>
                        <p>{birthday}</p>
                        <br />
                        <h3>S??? ??i???n tho???i: </h3>
                        <p>{phoneNumber}</p>
                        <br />
                        <h3>?????a ch???: </h3>
                        <p>{address}</p>
                        <br />
                        <h3>Nh??m m??u: </h3>
                        <p>{groupBlood}</p>
                        <br />
                        <h3>S??? l???n hi???n m??u: </h3>
                        <p>{numberOfDonation}</p>
                        <br />
                    </div>
                </div>
                <div className={cx('button')}>
                    <Button variant="contained" type="submit" onClick={() => history('/admin/manage_donor/')}>
                        Tr??? v???
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ViewDonor;
